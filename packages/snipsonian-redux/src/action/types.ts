import { AnyAction } from 'redux';

export interface IAction<Payload, ActionType = string> extends AnyAction {
    type: ActionType;
    payload: Payload;
}
