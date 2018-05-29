import conditionalCatch from '../../../snipsonian-core/src/error/conditionalCatch';

export default function getStateStorageMiddlewareFactory({
    storage,
    stateStorageKey,
    shouldCatchErrors = false,
    onError,
    reducerKeyToTransformReducerStateMap,
}) {
    const createMiddleware = () =>
        (store) => (next) => (action) => {
            const r = next(action);
            conditionalCatch({
                shouldCatchErrors,
                actionToExecute: () => saveState(store.getState()),
                onError,
            });
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
        destroyState,
    };

    function saveState(state) {
        storage.save({
            key: stateStorageKey,
            value: getStateToStore(state),
        });
    }

    function readState() {
        return storage.read({
            key: stateStorageKey,
            defaultValue: {},
        });
    }

    function removeState() {
        storage.remove({
            key: stateStorageKey,
        });
    }

    function getStateToStore(state) {
        return Object.keys(state)
            .reduce(
                (stateAccumulator, reducerKey) => {
                    let transformReducerStateForStorage = reducerKeyToTransformReducerStateMap[reducerKey];
                    if (!transformReducerStateForStorage) {
                        transformReducerStateForStorage = (reducerState) => reducerState;
                    }

                    return Object.assign(stateAccumulator, {
                        [reducerKey]: transformReducerStateForStorage(state[reducerKey]),
                    });
                },
                {},
            );
    }
}
