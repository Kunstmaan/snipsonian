function getStateStorageMiddlewareFactory({storage, stateStorageKey}) {
    const createMiddleware = () =>
        (store) => (next) => (action) => {
            const r = next(action);
            saveState(store.getState());
            return r;
        };

    const getState = () =>
        readState();

    const destroyState = () => {
        removeState();
    };

    return {
        createMiddleware,
        getState,
        destroyState
    };

    function saveState(state) {
        storage.save({
            key: stateStorageKey,
            value: state
        });
    }

    function readState() {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {}
        });
    }

    function removeState() {
        storage.remove({
            key: stateStorageKey
        });
    }
}

export default getStateStorageMiddlewareFactory;
