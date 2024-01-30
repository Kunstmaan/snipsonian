import isUndefined from './isUndefined';

/* true if the code is running in a browser, false if not (when e.g. running in node) */
export const IS_BROWSER = !isNodejs();

function isNodejs() {
    if (typeof process !== 'undefined') {
        return !isUndefined(process?.versions?.node);
    }
    return false;
}
