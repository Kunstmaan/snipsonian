/* global window */

import queryString from 'query-string';

export const getParsedUrlParams = () =>
    queryString.parse(window.location.search);

export const setUrlParams = (parsedUrlParams) => {
    window.location.search = queryString.stringify(parsedUrlParams);
};