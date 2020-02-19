const diffTranslations = require('./diffTranslations');
const logStyles = require('../utils/logStyles');

const MESSAGES = {
    diffsDetected: (translationPath) => (`\n${translationPath}:\n`),
    unnecessary: (locale) => logStyles.emphasis(`=> Some ${locale} keys are unnecessary:\n`),
    missing: (masterLocale, locale) => logStyles.emphasis(`=> Some ${masterLocale} keys are missing in ${locale}:\n`),
    prefix: '    - ',
};

module.exports = analyseTranslations;

function analyseTranslations({
    locales = [],
    masterLocale,
    translationsFoldersGlob,
    translationFileExtension,
    missingKeyPlaceholder,
}) {
    return new Promise((resolve, reject) => {
        try {
            const diffs = diffTranslations({
                locales,
                masterLocale,
                translationsFoldersGlob,
                translationFileExtension,
                missingKeyPlaceholder,
            });

            // console.log('\n[DEBUG] Diffs:', JSON.stringify(diffs));

            resolve(createAnalysis({ masterLocale, diffs }));
        } catch (e) {
            reject(e);
        }
    });
}

function createAnalysis({ masterLocale, diffs }) {
    let areDiffsDetected = false;
    let errors = '';

    Object.keys(diffs)
        .forEach((translationsParentPath) => {
            const diffPerPath = diffs[translationsParentPath];

            if (areDiffsDetectedForAnyLocale(diffPerPath)) {
                areDiffsDetected = true;

                errors += MESSAGES.diffsDetected(translationsParentPath);

                Object.keys(diffPerPath)
                    .forEach((locale) => {
                        const diff = diffPerPath[locale];

                        if (diff.areDiffsDetected) {
                            if (diff.missing.length > 0) {
                                errors += MESSAGES.missing(masterLocale, locale);
                                errors += listItems(MESSAGES.prefix, diff.missing);
                            }

                            if (diff.unnecessary.length > 0) {
                                errors += MESSAGES.unnecessary(locale);
                                errors += listItems(MESSAGES.prefix, diff.unnecessary);
                            }
                        }
                    });
            }
        });

    return {
        areDiffsDetected,
        errors,
        data: diffs,
    };
}

function areDiffsDetectedForAnyLocale(diffPerPath) {
    return Object.keys(diffPerPath)
        .some((locale) => diffPerPath[locale].areDiffsDetected);
}

function listItems(prefix, items) {
    return items.reduce(
        (total, item) => `${total}${prefix}${item}\n`,
        '',
    );
}
