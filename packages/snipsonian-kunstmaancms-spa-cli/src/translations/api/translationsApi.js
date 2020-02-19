const axios = require('axios');
// TODO re-use from snipsonian
const appendUrlParam = require('../utils/appendUrlParam');

const REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
};
const DEFAULT_TIMEOUT_IN_MILLIS = 120000;
const RESPONSE_TYPE_JSON = 'json';
const HEADER_NAME = {
    API_KEY: 'X-KUMA-API-KEY',
    CACHE_CONTROL: 'Cache-Control',
};

module.exports = {
    getTranslations,
    addTranslations,
    deprecateTranslations,
    disableTranslations,
    enableTranslations,
};

function getTranslations({
    baseUrl,
    domain,
    locale,
}) {
    return executeApiCall({
        baseUrl,
        resourceUrl: `/api/public/translations/${domain}?locale=${locale}`,
        headers: {
            [HEADER_NAME.CACHE_CONTROL]: 'max-age=0, no-store',
        },
    });
}

/**
 * Force=true will overwrite existing translations, otherwise will be skipped.
 */
function addTranslations({
    baseUrl,
    domain,
    locale,
    apiKey,
    translations = [],
    force = false,
}) {
    // console.log(`[DEBUG] To be added translations:\n${JSON.stringify(translations)}`);

    return assertEachTranslationHasRequiredProps({
        translations,
        requiredPropNames: ['keyword', 'text'],
    })
        .then(() => executeApiCall({
            method: REQUEST_METHOD.POST,
            baseUrl,
            resourceUrl: `/api/translations/${domain}`,
            queryParams: {
                force,
            },
            apiKey,
            body: addLocaleToEachTranslationEntry({ locale, translations }),
        }));
}

/**
 * Deprecated translations are still returned in the get call,
 * but have a deprecationDate that can be used in the disable call.
 */
function deprecateTranslations({
    baseUrl,
    domain,
    apiKey,
    translations = [],
}) {
    // console.log(`[DEBUG] To be deprecated translations:\n${JSON.stringify(translations)}`);

    return assertEachTranslationHasRequiredProps({
        translations,
        requiredPropNames: ['keyword'],
    })
        .then(() => executeApiCall({
            method: REQUEST_METHOD.PUT,
            baseUrl,
            resourceUrl: `/api/translations/deprecate/${domain}`,
            apiKey,
            body: translations,
        }));
}

/**
 * To disable the translations that are deprecated and have a deprecationDate that is older/lower than the input date.
 */
function disableTranslations({
    baseUrl,
    domain,
    apiKey,
    maxDeprecationDate,
}) {
    return executeApiCall({
        method: REQUEST_METHOD.PUT,
        baseUrl,
        resourceUrl: `/api/translations/disable/${domain}`,
        apiKey,
        body: {
            date: maxDeprecationDate,
        },
    });
}

/**
 * This call enables both deprecated as disabled translations.
 */
function enableTranslations({
    baseUrl,
    domain,
    apiKey,
    translations = [],
}) {
    // console.log(`[DEBUG] To be enabled translations:\n${JSON.stringify(translations)}`);

    return assertEachTranslationHasRequiredProps({
        translations,
        requiredPropNames: ['keyword'],
    })
        .then(() => executeApiCall({
            method: REQUEST_METHOD.PUT,
            baseUrl,
            resourceUrl: `/api/translations/enable/${domain}`,
            apiKey,
            body: translations,
        }));
}

function executeApiCall({
    method = REQUEST_METHOD.GET,
    baseUrl,
    resourceUrl,
    queryParams = {},
    body,
    apiKey,
    headers = {},
    responseType = RESPONSE_TYPE_JSON,
    timeout = DEFAULT_TIMEOUT_IN_MILLIS,
}) {
    const request = {
        method,
        url: appendQueryParamsIfAny(`${baseUrl}${resourceUrl}`, queryParams),
        responseType,
        timeout,
        headers,
    };

    if (body) {
        request.data = body;
    }

    if (apiKey) {
        request.headers[HEADER_NAME.API_KEY] = apiKey;
    }

    return axios(request);
}

function appendQueryParamsIfAny(url, queryParams = {}) {
    return Object.keys(queryParams)
        .reduce(
            (urlAccumulator, paramName) => appendUrlParam({
                url: urlAccumulator,
                paramName,
                paramValue: queryParams[paramName],
            }),
            url,
        );
}

function assertEachTranslationHasRequiredProps({ translations = [], requiredPropNames = [] }) {
    const isInvalid = translations
        .some((translation) =>
            requiredPropNames.some((requiredPropName) => typeof translation[requiredPropName] === 'undefined'),
        ); // eslint-disable-line function-paren-newline

    if (isInvalid) {
        const requiredNames = requiredPropNames.join(', ');

        // eslint-disable-next-line max-len
        return Promise.reject(new Error(`At least one of the input translations does not contain all required properties: ${requiredNames}`));
    }

    return Promise.resolve();
}

/**
 * If all goes well, returns an array containing following objects:
 * {
 *     "keyword": "string",
 *     "text": "string",
 *     "locale": "string"
 * }
 */
function addLocaleToEachTranslationEntry({ locale, translations = [] }) {
    return translations
        .map((translation) => ({
            ...translation,
            locale,
        }));
}
