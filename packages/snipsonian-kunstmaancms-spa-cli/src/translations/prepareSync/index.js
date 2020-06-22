const analyseTranslations = require('./analyseTranslations');
const writeFixedTranslations = require('./writeFixedTranslations');
const logStyles = require('../utils/logStyles');

const MESSAGES = {
    start: 'Analysing all translation keys of the different languages ...\n',
    diffError: logStyles.error('[ERROR] The translation keys of the different languages do not match.\n'),
    fixing: logStyles.status('\nFixing the translation files & persisting them...\n'),
    fixError: logStyles.emphasis('[ERROR] Something went wrong while writing the fixed translation files.\n'),
    fixDone: logStyles.emphasis('Check & commit the changes before syncing with the server.\n'),
    success: logStyles.success('[SUCCESS] The translation keys all match and can be synced.\n'),
    verifySuccess:
        logStyles.success('[SUCCESS] The local .yml translation files are in sync between all the locales.\n'),
    verifyError: '[ERROR] The local .yml translation files are not in sync between all the locales.\n',
    reOrdering:
        'Re-ordering/re-writing the local .yml translation files even though the different languages matched.\n',
};

module.exports = prepareTranslationsSync;

function prepareTranslationsSync({
    locales,
    masterLocale,
    translationsFoldersGlob,
    translationFileExtension,
    missingKeyPlaceholder,
    verifyOnly = false,
    /**
     * If true, then even if there are no differences found between the locale files (or if there is only 1 locale)
     * then the script will rewrite the yaml file(s) and thereby ordering the translation alphabetically etc.
     * Has no effect if 'verifyOnly' is true.
     */
    optimizeEvenIfNoDiffs = false,
}) {
    console.log(MESSAGES.start);

    return analyseTranslations({
        locales,
        masterLocale,
        translationsFoldersGlob,
        translationFileExtension,
        missingKeyPlaceholder,
    }).then((analysis) => {
        let shouldWriteFixedTranslations = false;

        if (analysis.areDiffsDetected) {
            if (verifyOnly) {
                console.log(MESSAGES.diffError + analysis.errors);
                throw new Error(MESSAGES.verifyError);
            }

            shouldWriteFixedTranslations = true;
            console.log(MESSAGES.diffError + analysis.errors + MESSAGES.fixing);
        } else if (verifyOnly) {
            console.log(MESSAGES.verifySuccess);
        } else if (optimizeEvenIfNoDiffs) {
            console.log(MESSAGES.reOrdering);
            shouldWriteFixedTranslations = true;
        } else {
            console.log(MESSAGES.success);
        }

        if (shouldWriteFixedTranslations) {
            writeFixedTranslations({
                diffs: analysis.data,
                translationFileExtension,
            }).then(() => {
                console.log(MESSAGES.fixDone);
            }).catch((error) => {
                console.log(MESSAGES.fixError);
                console.log(error);
            });
        }
    });
}
