export const SWITCH_LANG = 'SWITCH_LANG';
export const SWITCH_VERSION = 'SWITCH_VERSION';

export function switchLang(newLang) {
    return {
        type: SWITCH_LANG,
        payload: {
            newLang
        }
    };
}

export function switchVersion(newVersion) {
    return {
        type: SWITCH_VERSION,
        payload: {
            newVersion
        }
    };
}