import {getParsedUrlParams} from './_doc/util/url';
import {is} from './index';

const PREV_VERSIONS = [
    '0.1.0'
];

const LATEST_VERSION = 'latest';

let currentVersion = getInitialVersion();

export const getCurrentVersion = () =>
    currentVersion;

export const setCurrentVersion = (version) => {
    currentVersion = version;
};

export const getVersions = () => {
    const versions = cloneArray(PREV_VERSIONS);
    versions.unshift(LATEST_VERSION);
    return versions;
};

function cloneArray(arr) {
    return arr.slice(0);
}

function getInitialVersion() {
    const parsedUrlParams = getParsedUrlParams();

    if (is.set(parsedUrlParams.v)) {
        return parsedUrlParams.v;
    }

    return getDefaultVersion();
}

function getDefaultVersion() {
    return LATEST_VERSION;
}