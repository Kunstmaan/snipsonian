function getStateStorageByReducerMiddlewareFactory({storageToReducerKeysConfigs, stateStorageKey}) {
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
        storageToReducerKeysConfigs
            .forEach((config) => {
                const reducerKeysToStore = config.reducerKeys;
                const statePart = extractReducerStateParts(state, reducerKeysToStore);
                saveStatePart(config.storage, statePart);
            });
    }

    function extractReducerStateParts(state, reducerKeysToStore) {
        const initialValue = {};

        return reducerKeysToStore.reduce(
            (accumulator, reducerKey) =>
                Object.assign(accumulator, {
                    [reducerKey]: state[reducerKey]
                })
            ,
            initialValue
        );
    }

    function saveStatePart(storage, statePart) {
        storage.save({
            key: stateStorageKey,
            value: statePart
        });
    }

    function readState() {
        const initialValue = {};

        return storageToReducerKeysConfigs
            .map((config) => config.storage)
            .reduce(
                (accumulator, storage) =>
                    Object.assign(accumulator, readStatePart(storage))
                ,
                initialValue
            );
    }

    function readStatePart(storage) {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {}
        });
    }

    function removeState() {
        storageToReducerKeysConfigs
            .map((config) => config.storage)
            .forEach(removeStatePart);
    }

    function removeStatePart(storage) {
        storage.remove({
            key: stateStorageKey
        });
    }
}

export default getStateStorageByReducerMiddlewareFactory;
