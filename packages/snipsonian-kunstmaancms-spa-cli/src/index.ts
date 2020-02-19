const disableDeprecated = require('./translations/disableDeprecated');
const generateTranslationJsonFiles = require('./translations/local/generateTranslationJsonFiles');
const interceptGetTranslationsCallToReturnLocalTranslations =
    require('./translations/local/interceptGetTranslationsCallToReturnLocalTranslations');
const prepareSync = require('./translations/prepareSync');
const sync = require('./translations/sync');
const logStyles = require('./translations/utils/logStyles');

module.exports = {
    disableDeprecated,
    generateTranslationJsonFiles,
    interceptGetTranslationsCallToReturnLocalTranslations,
    prepareSync,
    sync,
    logStyles,
};
