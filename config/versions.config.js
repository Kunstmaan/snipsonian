export const PREV_VERSIONS = [
    '0.1.0'
];

export const LATEST_VERSION = 'latest';

export const getVersions = () => {
    const versions = cloneArray(PREV_VERSIONS);
    versions.unshift(LATEST_VERSION);
    return versions;
};

function cloneArray(arr) {
    return arr.slice(0);
}