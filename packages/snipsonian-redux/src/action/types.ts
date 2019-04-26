import { AnyAction } from 'redux';

export interface IAction<P, Type = string> extends AnyAction {
    type: Type;
    payload: P;
}
