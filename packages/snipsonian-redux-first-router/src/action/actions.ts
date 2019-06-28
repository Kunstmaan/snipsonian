import { ActionMetaLocation, Query as RfrQuery } from 'redux-first-router';
import { ILocationAction } from './types';

export function createLocationAction<Payload extends object, Query extends RfrQuery = {}, ActionType = string>({
    type,
    payload = ({} as Payload), // eslint-disable-line @typescript-eslint/no-object-literal-type-assertion
    query = ({} as Query), // eslint-disable-line @typescript-eslint/no-object-literal-type-assertion
}: {
    type: ActionType;
    payload?: Payload;
    query?: Query;
}): ILocationAction<Payload, Query, ActionType> {
    return {
        type,
        payload,
        meta: {
            // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
            location: {} as ActionMetaLocation,
            query,
        },
    };
}
