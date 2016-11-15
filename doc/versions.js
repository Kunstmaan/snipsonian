export const VERSIONS = [
    '0.2.0',
    '0.1.0'
];

const getDefaultVersion = () =>
    VERSIONS[0];

let currentVersion = getDefaultVersion();

export const setCurrentVersion = (version) => {
    currentVersion = version;
};

export const getCurrentVersion = () =>
    currentVersion;