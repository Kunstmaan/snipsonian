/* global window */

import {STORAGE_KEY} from '../redux.config';

const createMiddleware = () =>
    (store) => (next) => (action) => {
        const r = next(action);
        saveStore(store);
        return r;
    };

const getStore = () =>
    readStore();

const destroyStore = () => {
    if (isLocalStorageSupported()) {
        window.localStorage.removeItem(STORAGE_KEY);
    }
};

export default {
    createMiddleware,
    getStore,
    destroyStore
};

function saveStore(store) {
    if (isLocalStorageSupported()) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
    }
}

function readStore() {
    if (!isLocalStorageSupported()) {
        return undefined;
    }
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
}

function isLocalStorageSupported() {
    return (typeof window !== 'undefined') && window.localStorage;
}