const clone = require('ramda/src/clone');
const analyseTranslations = require('../prepareSync/analyseTranslations');
const writeFixedTranslations = require('../prepareSync/writeFixedTranslations');
const syncLocalWithRemoteTranslations = require('./syncLocalWithRemoteTranslations');
const logStyles = require('../utils/logStyles');

const MESSAGES = {
    targetEnv: (targetEnv, forceTranslationsLocales) =>
        logStyles.emphasis(`Target sync environment: ${targetEnv} (force: ${forceTranslationsLocales.join(',')})\n`),
    start: 'Analysing all translation keys of the different languages before sync can start ...\n',
    analysisError: logStyles.error('[ERROR] The translation keys of the different languages do not match.\n\n'),
    analysisSuccess: logStyles.success('[SUCCESS] All the translation keys match.\n\n'),
    syncing: (targetEnv) => logStyles.status(`Syncing translations with the ${targetEnv} environment now ...\n`),
    syncError: logStyles.error('[ERROR] The translation files could not be synced.\n\n'),
    writeDone: logStyles.emphasis('Check & commit the synced translation files.\n'),
    writeError: logStyles.error('[ERROR] The translations were synced but there was a problem ' +
        'while writing the results to the translation files.\n\n'),
    shouldPrepareFirst:
        `You should run ${logStyles.emphasis('npm run translations-sync-prepare')} to fix these errors.\n`,
};

module.exports = syncTranslations;

function syncTranslations({
    locales,
    masterLocale,
    targetEnv,
    targetEnvBaseUrl,
    targetEnvApiKey,
    translationsFoldersGlob,
    translationFileExtension,
    missingKeyPlaceholder,
    translationsDomain,
    forceTranslationsLocales = [],
    sendLocaleAsQueryParam = true,
    sendLocaleAsHeader = false,
}) {
    console.log(MESSAGES.targetEnv(targetEnv, forceTranslationsLocales));
    console.log(MESSAGES.start);

    return analyseTranslations({
        locales,
        masterLocale,
        translationsFoldersGlob,
        translationFileExtension,
        missingKeyPlaceholder,
    }).then((analysis) => {
        // console.log(`\n[DEBUG] analysis: ${JSON.stringify(analysis)}`);

        if (analysis.areDiffsDetected) {
            console.log(MESSAGES.analysisError + MESSAGES.shouldPrepareFirst);

            return Promise.reject(MESSAGES.analysisError);
        }

        console.log(MESSAGES.analysisSuccess + MESSAGES.syncing(targetEnv));

        const analysisDiffs = analysis.data;

        return syncLocalWithRemoteTranslations({
            locales,
            analysisDiffs,
            targetEnvBaseUrl,
            targetEnvApiKey,
            translationsDomain,
            missingKeyPlaceholder,
            forceTranslationsLocales,
            sendLocaleAsQueryParam,
            sendLocaleAsHeader,
        })
            .then((syncedData) => {
                const diffs = separateSyncedDataPerYamlFile({
                    analysisDiffs,
                    syncedData,
                });

                // console.log(`\n[DEBUG] separated syncedData per Yaml file: ${JSON.stringify(diffs)}`);

                writeFixedTranslations({
                    diffs,
                    translationFileExtension,
                }).then(() => {
                    console.log(MESSAGES.writeDone);
                }).catch((writeError) => {
                    console.log(MESSAGES.writeError);
                    console.log(writeError);
                });
            })
            .catch((syncError) => {
                console.log(MESSAGES.syncError);
                console.log(syncError);
                throw syncError;
            });
    });
}

/**
 * Returns an object of the following format:
 * {
 *   "./src/views/appShell/translations": {
 *     "fr_BE": {
 *       "fixed": {...}
 *     },
 *     ...
 *   },
 *   ...
 * }
 */
function separateSyncedDataPerYamlFile({ analysisDiffs, syncedData }) {
    const result = clone(analysisDiffs);

    Object.keys(syncedData)
        .forEach((locale) => {
            const fixed = syncedData[locale];

            Object.keys(fixed)
                .forEach((translationKey) => {
                    const translationValue = fixed[translationKey];
                    const translationsParentPath = getTranslationParentPath({ analysisDiffs, translationKey, locale });

                    result[translationsParentPath][locale].fixed[translationKey] = translationValue;
                });
        });

    return result;
}

function getTranslationParentPath({ analysisDiffs, translationKey, locale }) {
    return Object.keys(analysisDiffs)
        .find((translationsParentPath) =>
            typeof analysisDiffs[translationsParentPath][locale].fixed[translationKey] !== 'undefined',
        ); // eslint-disable-line function-paren-newline
}
