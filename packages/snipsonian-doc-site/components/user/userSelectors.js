import {getRegisteredGroups} from '../../docTreeGenerator/documentJs';
import prevVersionsList from '../../config/prevVersionsList.json';

export const getLang = (state) =>
    state.user.lang;

export const getVersion = (state) => {
    if (versionStillExists(state.user.version)) {
        return state.user.version;
    }

    const version = getVersionWithoutPatchNumber(state.user.version);

    const filteredVersions = prevVersionsList.filter((prevVersion) => prevVersion.includes(version));
    return filteredVersions[filteredVersions.length - 1];
};

export const getDocGroupsForCurrentVersion = (state) => {
    const version = getVersion(state);

    // TODO other versions
    return (version === 'latest') ? getRegisteredGroups() : [];
};

function versionStillExists(version) {
    return prevVersionsList.indexOf(version) !== -1;
}

function getVersionWithoutPatchNumber(version) {
    const v = version.split('.');
    v.pop();
    return `${v.join('.')}.`;
}