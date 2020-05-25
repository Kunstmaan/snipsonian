import { IGetState, ISetState, IObservableStateStore, IObservableStateStoreConfig } from '../store/types';

/** ========== Same interfaces as the one redux uses : BEGIN  ========== */

/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-explicit-any */

export interface Action<T = any> {
    type: T;
}

export interface AnyAction extends Action {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any;
}

export interface Dispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T;
}

export interface Middleware<
    State = any,
    D extends Dispatch = Dispatch> {
    (api: MiddlewareAPI<D, State>): (
        next: Dispatch<AnyAction>
    ) => (action: any) => any;
}

export interface MiddlewareAPI<D extends Dispatch = Dispatch, State = any> {
    dispatch: D;
    getState(): State;
}

/* eslint-enable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-explicit-any */

/** ========== Same interfaces as the one redux uses : END  ========== */

export interface IPayloadAction<Type, Payload> extends Action<Type> {
    payload: Payload;
}

export interface IObservableStateAction<Type, Payload, State, ExtraProcessInput, StateChangeNotificationKey>
    extends IPayloadAction<Type, Payload> {

    filter?: TFilterHook<State, this>;
    process?: TProcessHook<State, this, ExtraProcessInput, StateChangeNotificationKey>;
}

export type TProcessHook<State, IncomingAction, ExtraProcessInput, StateChangeNotificationKey> = (
    input: {
        action: IncomingAction;
        getState: IGetState<State>;
        setState: ISetState<State, StateChangeNotificationKey>;
        dispatch: Dispatch<Action>;
    } & ExtraProcessInput
) => void | Promise<void>;

export type TFilterHook<State, IncomingAction> = (
    input: {
        action: IncomingAction;
        getState: IGetState<State>;
    }
) => TFilterHookResult<IncomingAction>;

/**
 * return
 * - 'false' if the action should be stopped/rejected (= not propagated/processed)
 * - the incoming action 'as is' if that action should be propagated/processed
 * - the altered/enhanced incoming-action (e.g. extra payload params) if the incoming action should not
 *   be propagated 'as is'
 *   p.s. returning an action with another type is not supported
 */
export type TFilterHookResult<IncomingAction> = IncomingAction | false;

export interface IActionableObservableStateStore<State, StateChangeNotificationKey>
    extends IObservableStateStore<State, StateChangeNotificationKey> {

    dispatch: Dispatch<Action>;
}

export interface IActionableObservableStateStoreConfig<
    State, ExtraProcessInput> extends IObservableStateStoreConfig<State> {
    middlewares: Middleware[];
    observableStateActionExtraProcessInput?: ExtraProcessInput;
}
