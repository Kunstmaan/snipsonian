import {getRegisteredGroups} from '../../src/_doc/documentJs';

export const getLang = (state) =>
    state.user.lang;

export const getVersion = (state) =>
    state.user.version;

export const getDocGroupsForCurrentVersion = (state) => {
    const version = getVersion(state);

    // TODO other versions
    return (version === 'latest') ? getRegisteredGroups() : [];
};
