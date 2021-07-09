const diffLocalWithRemoteTranslations = require('./diffLocalWithRemoteTranslations');
const translationsApi = require('../api/translationsApi');
const { LOCALES_ARGUMENT } = require('./arguments');

const MESSAGES = {
    diffing: (locale) => `Comparing translations for locale ${locale} ...`,
    diffsDetected: (locale) => (`\nFound to-be-synced diffs for locale ${locale}:`),
    addingMissing: (locale, howMany) => (`\nAdding ${howMany} translations for locale ${locale} ...`),
    enablingMissingDeprecated: (locale, howMany) => (`\nEnabling ${howMany} translations for locale ${locale} ...`),
    deprecatingUnnecessary: (locale, howMany) => (`\nDeprecating ${howMany} translations for locale ${locale} ...`),
    forceUpdatingExisting: (locale, howMany) => (`\nForce-updating ${howMany} translations for locale ${locale} ...`),
};

module.exports = syncLocalWithRemoteTranslations;

/**
 * Returns a promise with on success an object of the format:
 * {
 *   "nl_BE": {
 *     "some.translation.key": "backend value after sync",
 *     ...
 *   },
 *   ...
 * }
 */
function syncLocalWithRemoteTranslations({
    locales = [],
    analysisDiffs,
    targetEnvBaseUrl,
    targetEnvApiKey,
    translationsDomain,
    missingKeyPlaceholder,
    forceTranslationsLocales = [],
    sendLocaleAsQueryParam,
    sendLocaleAsHeader,
}) {
    const domain = translationsDomain;

    const promises = [];

    locales.forEach((locale) => {
        promises.push(syncTranslationsForLocale({
            analysisDiffs,
            baseUrl: targetEnvBaseUrl,
            domain,
            locale,
            apiKey: targetEnvApiKey,
            missingKeyPlaceholder,
            forceTranslations: shouldForceTranslationsForLocale({ locale, forceTranslationsLocales }),
            sendLocaleAsQueryParam,
            sendLocaleAsHeader,
        }));
    });

    return Promise.all(promises)
        .then(groupLocaleFixes);
}

function syncTranslationsForLocale({
    analysisDiffs,
    baseUrl,
    domain,
    locale,
    apiKey,
    missingKeyPlaceholder,
    forceTranslations = false,
    sendLocaleAsQueryParam,
    sendLocaleAsHeader,
}) {
    console.log(MESSAGES.diffing(locale));

    return diffLocalWithRemoteTranslations({
        analysisDiffs,
        baseUrl,
        domain,
        locale,
        missingKeyPlaceholder,
        forceTranslations,
        sendLocaleAsQueryParam,
        sendLocaleAsHeader,
    }).then((diffs) => {
        // console.log(`\n[DEBUG] Diffs for locale ${locale}:\n${JSON.stringify(diffs)}`);

        const promises = [];

        if (diffs.areDiffsDetected) {
            console.log(MESSAGES.diffsDetected(locale));

            if (diffs.missing.length > 0) {
                console.log(MESSAGES.addingMissing(locale, diffs.missing.length));

                const translations = diffs.missing.map((keyword) => ({
                    keyword,
                    text: diffs.fixed[keyword],
                }));

                promises.push(translationsApi.addTranslations({
                    baseUrl,
                    domain,
                    locale,
                    apiKey,
                    translations,
                }));
            }

            if (diffs.missingDeprecated.length > 0) {
                console.log(MESSAGES.enablingMissingDeprecated(locale, diffs.missingDeprecated.length));

                promises.push(translationsApi.enableTranslations({
                    baseUrl,
                    domain,
                    apiKey,
                    translations: diffs.missingDeprecated.map((keyword) => ({
                        keyword,
                        text: diffs.fixed[keyword],
                    })),
                }));
            }

            if (diffs.unnecessary.length > 0) {
                console.log(MESSAGES.deprecatingUnnecessary(locale, diffs.unnecessary.length));

                promises.push(translationsApi.deprecateTranslations({
                    baseUrl,
                    domain,
                    apiKey,
                    translations: diffs.unnecessary.map((keyword) => ({
                        keyword,
                    })),
                }));
            }
        }

        if (forceTranslations && diffs.existing.length > 0) {
            console.log(MESSAGES.forceUpdatingExisting(locale, diffs.existing.length));

            const translations = diffs.existing.map((keyword) => ({
                keyword,
                text: diffs.fixed[keyword],
            }));

            promises.push(translationsApi.addTranslations({
                baseUrl,
                domain,
                locale,
                apiKey,
                translations,
                force: true,
            }));
        }

        return Promise.all(promises)
            .then(() => ({
                locale,
                fixed: diffs.fixed,
            }));
    });
}

function groupLocaleFixes(localeFixes = []) {
    return localeFixes
        .reduce(
            (objAccumulator, localeFix) => ({
                ...objAccumulator,
                [localeFix.locale]: localeFix.fixed,
            }),
            {},
        );
}

function shouldForceTranslationsForLocale({ locale, forceTranslationsLocales }) {
    if (!forceTranslationsLocales || forceTranslationsLocales.length === 0) {
        return false;
    }

    if (forceTranslationsLocales.some(matchesCaseInsensitive(LOCALES_ARGUMENT.NO_LOCALES))) {
        return false;
    }

    if (forceTranslationsLocales.some(matchesCaseInsensitive(LOCALES_ARGUMENT.ALL_LOCALES))) {
        return true;
    }

    return forceTranslationsLocales.some(matchesCaseInsensitive(locale));
}

function matchesCaseInsensitive(compareTo) {
    return (input) => input.toUpperCase() === compareTo.toUpperCase();
}
