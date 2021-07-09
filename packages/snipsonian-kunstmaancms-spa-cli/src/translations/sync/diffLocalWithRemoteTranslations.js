const translationsApi = require('../api/translationsApi');
const diffObjectKeys = require('../utils/diffObjectKeys');

module.exports = diffLocalWithRemoteTranslations;

/**
 * Returns:
 * {
 *   missing: [], // -> translation keys that have to be added
 *   missingDeprecated: [], // -> translation keys that have to be un-deprecated
 *   unnecessary: [], // -> translation keys that have to be deprecated
 *   existing: [], // -> translation keys that were already there
 *   fixed: {},
 *   areDiffsDetected: true/false
 * }
 */
function diffLocalWithRemoteTranslations({
    analysisDiffs,
    baseUrl,
    domain,
    locale,
    missingKeyPlaceholder,
    forceTranslations,
    sendLocaleAsQueryParam,
    sendLocaleAsHeader,
}) {
    return translationsApi.getTranslations({
        baseUrl,
        domain,
        locale,
        sendLocaleAsQueryParam,
        sendLocaleAsHeader,
    }).then(({ data: remoteTranslations }) => {
        const localTranslations = combineAllTranslationsForLocale({ analysisDiffs, locale });

        // console.log(`\n[DEBUG] remoteTranslations for locale ${locale}: ${JSON.stringify(remoteTranslations)}`);
        // console.log(`\n[DEBUG] localTranslations for locale ${locale}: ${JSON.stringify(localTranslations)}`);

        const remoteTranslationWithoutDeprecated = remoteTranslations
            .filter((translation) => !translation.isDeprecated);

        const diffWithNonDeprecatedTranslations = diffObjectKeys({
            master: localTranslations,
            slave: transformRemoteTranslationsForDiffing(remoteTranslationWithoutDeprecated),
            missingKeyPlaceholder,
            takeMasterValueIfMissing: true,
            takeMasterValueIfExisting: forceTranslations,
        });

        const missing = diffWithNonDeprecatedTranslations.missing
            .filter((key) => !isRemoteTranslationDeprecated(key, remoteTranslations));

        const missingDeprecated = diffWithNonDeprecatedTranslations.missing
            .filter((key) => isRemoteTranslationDeprecated(key, remoteTranslations));

        return {
            ...diffWithNonDeprecatedTranslations,
            missing,
            missingDeprecated,
            areDiffsDetected: (missing.length + missingDeprecated.length
                + diffWithNonDeprecatedTranslations.unnecessary.length) > 0,
        };
    });
}

function combineAllTranslationsForLocale({ analysisDiffs, locale }) {
    // console.log(`\n[DEBUG] analysisDiffs: ${JSON.stringify(analysisDiffs)}`);

    return Object.keys(analysisDiffs)
        .reduce(
            (translationsAccumulator, translationsParentPath) => {
                const diffPerPath = analysisDiffs[translationsParentPath];

                return {
                    ...translationsAccumulator,
                    ...diffPerPath[locale].fixed,
                };
            },
            {},
        );
}

/**
 * Transforms input array of the form:
 * [
 *   {
 *     "keyword": "some.translation.key",
 *     "text": "some value",
 *     "domain": "webapp"
 *   },
 *   ...
 * ]
 * to the form:
 * {
 *   "some.translation.key": "some value",
 *   ...
 * }
 */
function transformRemoteTranslationsForDiffing(remoteTranslations = []) {
    return remoteTranslations
        .reduce(
            (translationsAccumulator, remoteTranslation) => ({
                ...translationsAccumulator,
                [remoteTranslation.keyword]: remoteTranslation.text,
            }),
            {},
        );
}

function isRemoteTranslationDeprecated(keyword, remoteTranslations) {
    const match = remoteTranslations.find((remoteTranslation) => remoteTranslation.keyword === keyword);

    if (!match) {
        return false;
    }

    return match.isDeprecated;
}
