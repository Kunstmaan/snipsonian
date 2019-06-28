import isSetString from '@snipsonian/core/src/string/isSetString';
import deletePropsFromObject from '@snipsonian/core/src/object/deletePropsFromObject';
import { STATE_STORAGE_TYPE } from './config/storageType';
import { IAction } from './action/types';
import { toSuccessType } from './action/actionTypeGenerator';
import { createAction } from './action/createAction';
import { createTypeActions } from './action/createTypeActions';
import { createActionHandler } from './reducer/createActionHandler';
import { getRegisteredReducers, registerReducer } from './reducer/reducerManager';
import { createActionHandlersForType } from './reducer/createActionHandlersForType';
import { clearRegisteredJourneys, registerJourney } from './middleware/journey/journeyManager';
import createJourneyMiddleware from './middleware/journey/createJourneyMiddleware';
import createReduxStore from './store/createReduxStore';
import getReduxIntegrationTester from './test/getReduxIntegrationTester';

const dummyActionTypes = {
    DUMMY_UPDATE: 'DUMMY_UPDATE',
    INCREASE_COUNT: 'INCREASE_COUNT',
    RESET_ALL: 'RESET_ALL',
};

const dummyUpdateActions = createTypeActions<IDummyUpdateTriggerPayload, IDummyUpdateSuccessPayload>({
    type: dummyActionTypes.DUMMY_UPDATE,
});

const increaseCountAction = (): IAction<{}> => createAction<{}>(dummyActionTypes.INCREASE_COUNT, {});

const resetAllAction = (): IAction<{}> => createAction<{}>(dummyActionTypes.RESET_ALL, {});

interface IDummyUpdateTriggerPayload {
    newValue: string;
}

interface IDummyUpdateSuccessPayload {
    newValue: string;
}

interface IDummyAppState {
    dummyReducerKey: IDummyReducerState;
}

interface IDummyReducerState {
    someField: string;
    someFlag: boolean;
    count: number;
}

const initialState = {
    someField: '',
    someFlag: false,
    count: 0,
};

// TODO add clearRegisteredReducers in snipsonian (for test purposes)
deletePropsFromObject(getRegisteredReducers());

registerReducer<IDummyReducerState>({
    key: 'dummyReducerKey',
    initialState: {
        ...initialState,
    },
    actionHandlers: {
        ...createActionHandlersForType<IDummyReducerState>(dummyActionTypes.DUMMY_UPDATE)
            .onTrigger<IDummyUpdateTriggerPayload>(({ oldState, payload }) => ({
                ...oldState,
                someField: `trying to update to ${payload.newValue}`,
                someFlag: true,
            }))
            .onSuccess<IDummyUpdateSuccessPayload>(({ oldState, payload }) => ({
                ...oldState,
                someField: payload.newValue || 'DEFAULT_UPDATE_SUCCESS_VALUE',
                someFlag: false,
            }))
            .onReset(({ oldState }) => ({
                ...oldState,
                someField: '',
                someFlag: false,
            }))
            .create(),
        [dummyActionTypes.INCREASE_COUNT]: createActionHandler(({ oldState }) => ({
            ...oldState,
            count: oldState.count + 1,
        })),
        // TODO use the actionToResetState in snipsonian so that we don't need this
        [dummyActionTypes.RESET_ALL]: createActionHandler(({ oldState }) => ({
            ...oldState,
            ...initialState,
        })),
    },
});

clearRegisteredJourneys();

registerJourney<IDummyAppState, IAction<IDummyUpdateTriggerPayload>>({
    onActionType: dummyActionTypes.DUMMY_UPDATE,
    filter({ action, dispatch }) {
        if (!isSetString(action.payload.newValue)) {
            return false; // action should be rejected
        }

        dispatch(increaseCountAction());

        return {
            ...action,
            payload: {
                ...action.payload,
                newValue: `${action.payload.newValue}_ENHANCED`,
            },
        };
    },
    process({ dispatch }) {
        dispatch(increaseCountAction());
    },
});

registerJourney<IDummyAppState, IAction<IDummyUpdateSuccessPayload>>({
    onActionType: toSuccessType(dummyActionTypes.DUMMY_UPDATE),
    async process({ dispatch }) {
        await 4;

        dispatch(increaseCountAction());
    },
});

const dummyStore = createReduxStore<IDummyAppState>({
    stateStorageType: STATE_STORAGE_TYPE.NO_STORAGE,
    middlewares: [
        createJourneyMiddleware(),
    ],
});

const { given, when, then } = getReduxIntegrationTester<IDummyAppState>({
    store: dummyStore,
    actionToDispatchOnGivenStart: resetAllAction(),
});

describe('Redux snippets integration tests:', () => {
    describe('Journeys:', () => {
        it('when a filter hook returns false, the action is rejected (= not propagated) ' +
            '+ process hook is not executed', () => {
            given(({ getState }) => {
                expect(getState().dummyReducerKey.someField).toEqual('');
                expect(getState().dummyReducerKey.count).toEqual(0);
            });

            when(({ triggerAction }) => {
                triggerAction(dummyUpdateActions.trigger({ newValue: '' })); // newValue is not set
            });

            then(({ getState }) => {
                expect(getState().dummyReducerKey.someField).toEqual('');
                expect(getState().dummyReducerKey.count).toEqual(0);
            });
        });

        it('when inside a filter hook a dispatch is called, the input action will get triggered', () => {
            given(({ getState }) => {
                expect(getState().dummyReducerKey.count).toEqual(0);
            });

            when(({ triggerAction }) => {
                triggerAction(dummyUpdateActions.trigger({ newValue: '123' }));
            });

            then(({ getState }) => {
                expect(getState().dummyReducerKey.count).toEqual(2);
            });
        });

        it('when a filter hook returns the - possibly enhanced - incoming action, that action gets propagated ' +
            '(to the next middleware or to the reducer(s) when at the end of the middleware pipeline) + the process ' +
            'hook gets executed', () => {
            given(() => {});

            when(({ triggerAction }) => {
                triggerAction(dummyUpdateActions.trigger({ newValue: 'orig' }));
            });

            then(({ getState }) => {
                expect(getState().dummyReducerKey.someField).toEqual('trying to update to orig_ENHANCED');
                expect(getState().dummyReducerKey.count).toEqual(2);
            });
        });

        it('the process hook supports promises', async () => {
            given(({ getState }) => {
                expect(getState().dummyReducerKey.someField).toEqual('');
                expect(getState().dummyReducerKey.count).toEqual(0);
            });

            await when(({ triggerAction }) => {
                triggerAction(dummyUpdateActions.succeeded({ newValue: '456' }));
            });

            then(({ getState }) => {
                expect(getState().dummyReducerKey.someField).toEqual('456');
                expect(getState().dummyReducerKey.count).toEqual(1);
            });
        });
    });
});
