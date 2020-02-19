const url = require('url');

/**
 * Intended for the local development server.
 * Intercepts all server requests for translations
 * & responds with the local translation files.
 */

module.exports = interceptGetTranslationsCallToReturnLocalTranslations;

function interceptGetTranslationsCallToReturnLocalTranslations(
    app,
    {
        getTranslationsCallUrl = '/api/public/translations',
        localeQueryParamName = 'locale',
        defaultLocale = 'nl_BE',
        getLocalTranslationFilePath = (locale) => `/translations/${locale}.json`,
    } = {},
) {
    app.get(getTranslationsCallUrl, (req, res) => {
        const locale = getLocaleQueryParam(req.url, localeQueryParamName) || defaultLocale;
        res.redirect(getLocalTranslationFilePath(locale));
    });
}

function getLocaleQueryParam(requestUrl, localeQueryParamName) {
    const parsedUrl = url.parse(requestUrl, true);
    return parsedUrl.query[localeQueryParamName];
}
