import mergeObjectPropsDeeply from '@snipsonian/core/src/merge/mergeObjectPropsDeeply';
import localStorage from '@snipsonian/browser/src/storage/localStorage';
import sessionStorage from '@snipsonian/browser/src/storage/sessionStorage';

export interface IStateStorageConfig<State> {
    local?: IBrowserStorageConfig<State>;
    session?: IBrowserStorageConfig<State>;
    custom?: ICustomStorageConfig<State>;
}

interface IBaseStorageConfig<State> {
    getStatePartToSave: (state: State) => Partial<State>;
}

export interface IBrowserStorageConfig<State> extends IBaseStorageConfig<State> {
    browserStorageKey: string;
}

export interface ICustomStorageConfig<State> extends IBaseStorageConfig<State> {
    readFromStorage: () => Partial<State>;
    saveToStorage: (state: Partial<State>) => void;
}

export function determineInitialState<State>({
    initialState,
    stateStorageConfig,
}: {
    initialState: State;
    stateStorageConfig: IStateStorageConfig<State>;
}): State {
    if (!stateStorageConfig) {
        return initialState;
    }

    const { local, session, custom } = stateStorageConfig;
    let combinedStorageState = initialState as unknown as object;

    if (local && localStorage.isSupported) {
        combinedStorageState = mergeObjectPropsDeeply(
            combinedStorageState,
            localStorage.read({
                key: local.browserStorageKey,
                defaultValue: {},
            }) as object,
        );
    }

    if (session && sessionStorage.isSupported) {
        combinedStorageState = mergeObjectPropsDeeply(
            combinedStorageState,
            sessionStorage.read({
                key: session.browserStorageKey,
                defaultValue: {},
            }) as object,
        );
    }

    if (custom) {
        combinedStorageState = mergeObjectPropsDeeply(
            combinedStorageState,
            custom.readFromStorage(),
        );
    }

    return combinedStorageState as unknown as State;
}

export function saveStateToStorage<State>({
    state,
    stateStorageConfig,
}: {
    state: State;
    stateStorageConfig: IStateStorageConfig<State>;
}): void {
    if (!stateStorageConfig) {
        return;
    }

    const { local, session, custom } = stateStorageConfig;
    if (local && localStorage.isSupported) {
        localStorage.save({
            key: local.browserStorageKey,
            value: local.getStatePartToSave(state),
        });
    }
    if (session && sessionStorage.isSupported) {
        sessionStorage.save({
            key: session.browserStorageKey,
            value: session.getStatePartToSave(state),
        });
    }
    if (custom) {
        custom.saveToStorage(custom.getStatePartToSave(state));
    }
}
