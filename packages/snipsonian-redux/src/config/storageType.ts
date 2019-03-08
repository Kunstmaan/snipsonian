export enum STATE_STORAGE_TYPE {
    LOCAL = 'localStorage', // should equal STORAGE_TYPE.localStorage
    SESSION = 'sessionStorage', // should equal STORAGE_TYPE.sessionStorage
    NO_STORAGE = 'NO_STORAGE',
    CUSTOM = 'CUSTOM',
}

export enum REDUCER_STORAGE_TYPE {
    LOCAL = 'localStorage', // should equal STATE_STORAGE_TYPE.LOCAL
    SESSION = 'sessionStorage', // should equal STATE_STORAGE_TYPE.SESSION
    NO_STORAGE = 'NO_STORAGE', // should equal STATE_STORAGE_TYPE.NO_STORAGE
    INHERIT = 'INHERIT',
    CUSTOM = 'CUSTOM', // should equal STATE_STORAGE_TYPE.CUSTOM
}
