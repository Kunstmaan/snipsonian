import { IAction } from '../action/types';
import { TActionHandler } from './createReducer';

export type ICreateNewState<ReducerState, Payload = {}> = (input: {oldState: ReducerState, payload: Payload}) => ReducerState;

export function createActionHandler<ReducerState, Payload = {}>(
    handleAction: ICreateNewState<ReducerState, Payload>,
): TActionHandler<ReducerState, Payload> {
    return function actionHandler({ state, action }: {state: ReducerState, action: IAction<Payload>}) {
        return handleAction({ oldState: state, payload: action.payload });
    };
}
