const flatten = require('flat');
const getTranslationFilePathsForLocale = require('../utils/getTranslationFilePathsForLocale');
const readYamlFile = require('../utils/readYamlFile');
const getParentPathOfFile = require('../utils/getParentPathOfFile');
const diffObjectKeys = require('../utils/diffObjectKeys');

module.exports = diffTranslations;

function diffTranslations({
    locales = [],
    masterLocale,
    translationsFoldersGlob,
    translationFileExtension,
    missingKeyPlaceholder = '-',
}) {
    const existingTranslationData = readTranslationYmlFilesGroupedPerLocale({
        locales,
        translationsFoldersGlob,
        translationFileExtension,
    });

    // console.log(`\n[DEBUG] existingTranslationData: ${JSON.stringify(existingTranslationData)}`);

    return diffTranslationsBetweenMasterAndOtherLocales({
        existingTranslationData,
        locales,
        masterLocale,
        missingKeyPlaceholder,
    });
}

/**
 * Returns an object of the following format:
 * {
 *   "nl_BE": {
 *     "./src/views/appShell/translations": {
 *       "app_shell.header.nav.button": "Menu",
 *       ...
 *     },
 *     ...
 *   },
 *   ...
 * }
 */
function readTranslationYmlFilesGroupedPerLocale({
    locales,
    translationsFoldersGlob,
    translationFileExtension,
}) {
    return locales
        .reduce(
            (localeTranslationsAccumulator, locale) => ({
                ...localeTranslationsAccumulator,
                [locale]: readTranslationFilesForLocale({
                    locale,
                    translationsFoldersGlob,
                    translationFileExtension,
                }),
            }),
            {},
        );
}

function readTranslationFilesForLocale({
    locale,
    translationsFoldersGlob,
    translationFileExtension,
}) {
    const translationInfos = getTranslationFilePathsForLocale(
        locale,
        { translationsFoldersGlob, translationFileExtension },
    )
        .reduce(
            (filesAccumulator, filePath) => {
                const yamlContent = readYamlFile({ filePath });
                const translations = yamlContent
                    ? flatten(yamlContent)
                    : {};
                return {
                    ...filesAccumulator,
                    [getParentPathOfFile(filePath)]: translations,
                };
            },
            {},
        );
    return translationInfos;
}

/**
 * Returns an object of the following format:
 * {
 *   "./src/views/appShell/translations": {
 *     "fr_BE": {
 *       "missing": [...],
 *       "unnecessary": [...],
 *       "fixed": {...},
 *       "areDiffsDetected": true/false,
 *     },
 *     ...
 *   },
 *   ...
 * }
 */
function diffTranslationsBetweenMasterAndOtherLocales({
    existingTranslationData,
    locales,
    masterLocale,
    missingKeyPlaceholder,
}) {
    // the masterLocale is also compared to itself so that the resulting fixed can be used
    // for overwriting the masterLocale translation files with sorted keys

    return Object.keys(existingTranslationData[masterLocale])
        .reduce(
            (diffsAccumulator, translationsParentPath) => ({
                ...diffsAccumulator,
                [translationsParentPath]: diffSingleTranslationFile({
                    existingTranslationData,
                    translationsParentPath,
                    localesToCompare: locales,
                    masterLocale,
                    missingKeyPlaceholder,
                }),
            }),
            {},
        );
}

function diffSingleTranslationFile({
    existingTranslationData,
    translationsParentPath,
    localesToCompare,
    masterLocale,
    missingKeyPlaceholder,
}) {
    return localesToCompare.reduce(
        (diffAccumulator, localeToCompare) => ({
            ...diffAccumulator,
            [localeToCompare]: diffObjectKeys({
                master: existingTranslationData[masterLocale][translationsParentPath],
                slave: existingTranslationData[localeToCompare][translationsParentPath],
                missingKeyPlaceholder,
            }),
        }),
        {},
    );
}
