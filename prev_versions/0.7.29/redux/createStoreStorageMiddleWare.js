function createStoreStorageMiddleWare({storage, storeStorageKey}) {
    const createMiddleware = () =>
        (store) => (next) => (action) => {
            const r = next(action);
            saveStore(store);
            return r;
        };

    const getStore = () =>
        readStore();

    const destroyStore = () => {
        removeStore();
    };

    return {
        createMiddleware,
        getStore,
        destroyStore
    };

    function saveStore(store) {
        storage.save({
            key: storeStorageKey,
            value: store.getState()
        });
    }

    function readStore() {
        return storage.read({
            key: storeStorageKey,
            defaultValue: {}
        });
    }

    function removeStore() {
        storage.remove({
            key: storeStorageKey
        });
    }
}

export default createStoreStorageMiddleWare;
