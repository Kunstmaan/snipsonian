import { IAction } from '../action/types';

export type TReducer<ReducerState> = (state: ReducerState, action: IAction<object>) => ReducerState;

export type TActionHandler<ReducerState, ActionPayload = object> =
    (props: { state: ReducerState; action: IAction<ActionPayload> }) => ReducerState;

export interface IActionHandlers<ReducerState> {
    [actionType: string]: TActionHandler<ReducerState>;
}

export interface ICreateReducerConfig<ReducerState> {
    initialState?: ReducerState;
    actionHandlers?: IActionHandlers<ReducerState>;
}

export default function createReducer<ReducerState = object>({
    initialState = ({} as ReducerState),
    actionHandlers = {},
}: ICreateReducerConfig<ReducerState>): TReducer<ReducerState> {
    return function reducer(state = initialState, action) {
        if (!action.type || !action.payload) {
            return state;
        }

        const actionHandler = actionHandlers[action.type];

        return actionHandler ? actionHandler({ state, action }) : state;
    };
}
