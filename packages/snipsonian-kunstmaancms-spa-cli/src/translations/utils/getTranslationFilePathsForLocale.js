const glob = require('glob');

module.exports = getTranslationFilePathsForLocale;

function getTranslationFilePathsForLocale(locale, { translationsFoldersGlob, translationFileExtension }) {
    const pattern = `${translationsFoldersGlob}/${locale}${translationFileExtension}`;
    return glob.sync(pattern);
}
