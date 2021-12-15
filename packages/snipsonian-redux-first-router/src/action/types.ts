import { Meta, Query as RfrQuery } from 'redux-first-router';
import { IAction } from '@snipsonian/redux/src/action/types';

export interface ILocationAction<
    Payload extends object,
    Query extends RfrQuery = RfrQuery,
    ActionType = string,
> extends IAction<Payload, ActionType> {
    type: ActionType;
    meta?: Meta & { query?: Query };
    payload: Payload & { disableScrollToTop?: boolean };
}
