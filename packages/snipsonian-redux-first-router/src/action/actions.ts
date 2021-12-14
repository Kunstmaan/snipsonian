import { ActionMetaLocation, Query as RfrQuery } from 'redux-first-router';
import { ILocationAction } from './types';

export function createLocationAction<Payload extends object, Query extends RfrQuery = {}, ActionType = string>({
    type,
    payload = ({} as Payload),
    query = ({} as Query),
}: {
    type: ActionType;
    payload?: Payload;
    query?: Query;
}): ILocationAction<Payload, Query, ActionType> {
    return {
        type,
        payload,
        meta: {
            location: {} as ActionMetaLocation,
            query,
        },
    };
}
