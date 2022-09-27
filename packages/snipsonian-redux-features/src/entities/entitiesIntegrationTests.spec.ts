import deletePropsFromObject from '@snipsonian/core/src/object/deletePropsFromObject';
import { ITraceableApiErrorBase } from '@snipsonian/core/src/typings/apiErrors';
import { STATE_STORAGE_TYPE } from '@snipsonian/redux/src/config/storageType';
import { IAction } from '@snipsonian/redux/src/action/types';
import { createAction } from '@snipsonian/redux/src/action/createAction';
import { createActionHandler } from '@snipsonian/redux/src/reducer/createActionHandler';
import { registerReducer, getRegisteredReducers } from '@snipsonian/redux/src/reducer/reducerManager';
import createJourneyMiddleware from '@snipsonian/redux/src/middleware/journey/createJourneyMiddleware';
import { clearRegisteredJourneys } from '@snipsonian/redux/src/middleware/journey/journeyManager';
import createReduxStore from '@snipsonian/redux/src/store/createReduxStore';
import getReduxIntegrationTester from '@snipsonian/redux/src/testing/getReduxIntegrationTester';
import { AsyncOperation, AsyncStatus, IAsyncEntity, IBaseEntitiesReducerState } from './types';
import { getAsyncEntityInitialState, initReducerBuildingBlocks } from './reducerBuildingBlocks';
import { updateAsyncEntitiesChain, updateEntitiesGeneric } from './actions';
import registerJourneyToFetchAsyncEntitiesOnAction from './registerJourneyToFetchAsyncEntitiesOnAction';

const testActionTypes = {
    RESET_ALL: 'RESET_ALL',
    WILL_TRIGGER_API_FETCH: 'WILL_TRIGGER_API_FETCH',
};

enum testAsyncEntityKeys {
    testBooks = 'testBooks',
    testFlags = 'testFlags',
    testAmount = 'testAmount',
}

interface ITestAppState {
    testEntitiesKey: ITestEntitiesReducerState;
}

interface ITestEntitiesReducerState extends IBaseEntitiesReducerState {
    testBooks: IAsyncEntity<ITestBook[]>; // array
    testFlags: IAsyncEntity<ITestFlags>; // object
    testAmount: IAsyncEntity<number>; // object
}

interface ITestBook {
    title: string;
    nrOfPages: number;
}

interface ITestFlags {
    [key: string]: boolean;
}

const entitiesInitialState: ITestEntitiesReducerState = {
    testBooks: getAsyncEntityInitialState({ type: 'array' }),
    testFlags: getAsyncEntityInitialState({ type: 'object' }),
    testAmount: getAsyncEntityInitialState({ data: 0, type: 'other' }),
};

const resetAllAction = (): IAction<object> =>
    createAction<object>(testActionTypes.RESET_ALL, {});
const willTriggerApiFetchAction = (): IAction<object> =>
    createAction<object>(testActionTypes.WILL_TRIGGER_API_FETCH, {});

const { key, initialState, actionHandlers } = initReducerBuildingBlocks<ITestEntitiesReducerState>({
    reducerKey: 'testEntitiesKey',
    initialState: entitiesInitialState,
    customActionHandlers: {
        [testActionTypes.RESET_ALL]: createActionHandler<ITestEntitiesReducerState>(() => ({
            ...entitiesInitialState,
        })),
    },
});

// TODO add clearRegisteredReducers in snipsonian (for test purposes)
deletePropsFromObject(getRegisteredReducers());

registerReducer<ITestEntitiesReducerState>({
    key,
    initialState,
    actionHandlers,
});

clearRegisteredJourneys();

const testApi = {
    fetchTestBooks: () => Promise.resolve([{
        title: 'Fetched title 1',
        nrOfPages: 456,
    }, {
        title: 'Fetched title 2',
        nrOfPages: 9510,
    }]),
    fetchTestAmount: (payload: { inputNumber: number }) => Promise.resolve(payload.inputNumber * 60),
};

registerJourneyToFetchAsyncEntitiesOnAction<ITestAppState>({
    onActionTypeRegex: {
        pattern: '^WILL_TRIGGER.+',
    },
    actionType2AsyncEntitiesToFetchMap: {
        [testActionTypes.WILL_TRIGGER_API_FETCH]: [{
            entityKey: testAsyncEntityKeys.testBooks,
        }, {
            entityKey: testAsyncEntityKeys.testAmount,
            apiInputSelector: () => ({ inputNumber: 2 }),
            refreshMode: 'never',
            resetDataOnTrigger: false,
        }],
    },
    asyncEntityKey2ApiConfigMap: {
        [testAsyncEntityKeys.testBooks]: {
            api: testApi.fetchTestBooks,
        },
        [testAsyncEntityKeys.testAmount]: {
            api: testApi.fetchTestAmount,
            // should take precedence over the apiInputSelector producing the value 2
            apiInputSelector: () => ({ inputNumber: 11 }),
        },
    },
});

const testStore = createReduxStore<ITestAppState>({
    stateStorageType: STATE_STORAGE_TYPE.NO_STORAGE,
    middlewares: [
        createJourneyMiddleware(),
    ],
});

const { given, when, then } = getReduxIntegrationTester<ITestAppState>({
    store: testStore,
    actionToDispatchOnGivenStart: resetAllAction(),
});

describe('Entities integration tests:', () => {
    const DUMMY_ERROR: ITraceableApiErrorBase<object> = {
        status: 400,
        traceableId: '258',
        wasCancelled: false,
        response: {
            type: 101010,
            title: 'some error message',
        },
        originatingRequest: {},
    };

    const testBooksInitial: IAsyncEntity<ITestBook[]> = {
        data: null,
        fetch: {
            status: AsyncStatus.Initial,
            error: null,
        },
    };
    const testFlagsInitial: IAsyncEntity<ITestFlags> = {
        data: null,
        fetch: {
            status: AsyncStatus.Initial,
            error: null,
        },
    };
    const testAmountInitial: IAsyncEntity<number> = {
        data: 0,
        fetch: {
            status: AsyncStatus.Initial,
            error: null,
        },
    };

    describe('reducer:', () => {
        describe('updateAsyncEntities (chain):', () => {
            it('trigger > resets data to initial state + sets status to "Busy" + clears error (1 entity)', () => {
                given(({ getState }) => {
                    expect(getState().testEntitiesKey.testBooks).toEqual(testBooksInitial);
                    expect(getState().testEntitiesKey.testFlags).toEqual(testFlagsInitial);
                    expect(getState().testEntitiesKey.testAmount).toEqual(testAmountInitial);
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .trigger({
                                key: testAsyncEntityKeys.testBooks,
                                operation: AsyncOperation.fetch,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedBooks: {
                            data: null,
                            fetch: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        },
                    });
                });
            });

            it('trigger (multiple entities)', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testBooks: {
                                    data: [{ title: 'xxx', nrOfPages: 456 }],
                                    fetch: {
                                        status: AsyncStatus.Success,
                                        error: DUMMY_ERROR,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .trigger({
                                key: testAsyncEntityKeys.testBooks,
                                operation: AsyncOperation.fetch,
                            }, {
                                key: testAsyncEntityKeys.testFlags,
                                operation: AsyncOperation.fetch,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedBooks: {
                            data: null,
                            fetch: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        },
                        expectedFlags: {
                            data: null,
                            fetch: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        },
                    });
                });
            });

            it('triggerWithoutDataReset > same as trigger but data remains unchanged (1 or more entities)', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testBooks: {
                                    data: [{ title: 'xxx', nrOfPages: 456 }],
                                    fetch: {
                                        status: AsyncStatus.Success,
                                        error: DUMMY_ERROR,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .triggerWithoutDataReset({
                                key: testAsyncEntityKeys.testBooks,
                                operation: AsyncOperation.fetch,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedBooks: {
                            data: [{ title: 'xxx', nrOfPages: 456 }],
                            fetch: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        },
                    });
                });
            });

            it('succeeded > sets the data + sets status to "Success" (1 or more entities) + clears error', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testAmount: {
                                    data: 5,
                                    fetch: {
                                        status: AsyncStatus.Busy,
                                        error: DUMMY_ERROR,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .succeeded({
                                key: testAsyncEntityKeys.testAmount,
                                operation: AsyncOperation.fetch,
                                data: 999,
                            }, {
                                key: testAsyncEntityKeys.testFlags,
                                operation: AsyncOperation.fetch,
                                data: { isActive: true },
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedAmount: {
                            data: 999,
                            fetch: {
                                status: AsyncStatus.Success,
                                error: null,
                            },
                        },
                        expectedFlags: {
                            data: { isActive: true },
                            fetch: {
                                status: AsyncStatus.Success,
                                error: null,
                            },
                        },
                    });
                });
            });

            it('failed > sets the error + sets status to "Error" (1 or more entities)', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testAmount: {
                                    data: 5,
                                    fetch: {
                                        status: AsyncStatus.Busy,
                                        error: null,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .failed({
                                key: testAsyncEntityKeys.testAmount,
                                operation: AsyncOperation.fetch,
                                error: DUMMY_ERROR,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedAmount: {
                            data: 5,
                            fetch: {
                                status: AsyncStatus.Error,
                                error: DUMMY_ERROR,
                            },
                        },
                    });
                });
            });

            it('cancel > sets the status to "Initial" (1 or more entities)', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testAmount: {
                                    data: 5,
                                    fetch: {
                                        status: AsyncStatus.Busy,
                                        error: DUMMY_ERROR,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .cancel({
                                key: testAsyncEntityKeys.testAmount,
                                operation: AsyncOperation.fetch,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedAmount: {
                            data: 5,
                            fetch: {
                                status: AsyncStatus.Initial,
                                error: DUMMY_ERROR,
                            },
                        },
                    });
                });
            });

            it('reset > resets to initial state (1 or more entities)', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testAmount: {
                                    data: 0,
                                    fetch: {
                                        status: AsyncStatus.Error,
                                        error: DUMMY_ERROR,
                                    },
                                },
                                testBooks: {
                                    data: [{ title: 'Why?', nrOfPages: 1 }],
                                    fetch: {
                                        status: AsyncStatus.Busy,
                                        error: null,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .reset({
                                key: testAsyncEntityKeys.testAmount,
                                operation: AsyncOperation.fetch,
                            }, {
                                key: testAsyncEntityKeys.testBooks,
                                operation: AsyncOperation.fetch,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {});
                });
            });

            it('everything can be combined (by chaining)', () => {
                given(({ initialiseState }) => {
                    initialiseState(
                        updateEntitiesGeneric<ITestEntitiesReducerState>({
                            updateReducerState: ({ oldState }) => ({
                                ...oldState,
                                testAmount: {
                                    data: 0,
                                    fetch: {
                                        status: AsyncStatus.Busy,
                                        error: null,
                                    },
                                },
                                testBooks: {
                                    data: [],
                                    fetch: {
                                        status: AsyncStatus.Error,
                                        error: DUMMY_ERROR,
                                    },
                                },
                            }),
                        }),
                    );
                });

                when(({ triggerAction }) => {
                    triggerAction(
                        updateAsyncEntitiesChain(testStore.dispatch)
                            .reset({
                                key: testAsyncEntityKeys.testBooks,
                                operation: AsyncOperation.fetch,
                            })
                            .trigger({
                                key: testAsyncEntityKeys.testFlags,
                                operation: AsyncOperation.fetch,
                            })
                            .succeeded({
                                key: testAsyncEntityKeys.testAmount,
                                operation: AsyncOperation.fetch,
                                data: 777,
                            })
                            .getAction(),
                    );
                });

                then(({ getState }) => {
                    verifyState(getState(), {
                        expectedAmount: {
                            data: 777,
                            fetch: {
                                status: AsyncStatus.Success,
                                error: null,
                            },
                        },
                        expectedBooks: testBooksInitial,
                        expectedFlags: {
                            data: null,
                            fetch: {
                                status: AsyncStatus.Busy,
                                error: null,
                            },
                        },
                    });
                });
            });
        });
    });

    describe('journey(s):', () => {
        it('can fetch async entities automatically if so configured on an action type', async () => {
            given(({ getState }) => {
                verifyState(getState(), {});
            });

            await when(({ triggerAction }) => {
                triggerAction(willTriggerApiFetchAction());
            });

            then(({ getState }) => {
                verifyState(getState(), {
                    expectedBooks: {
                        data: [{
                            title: 'Fetched title 1',
                            nrOfPages: 456,
                        }, {
                            title: 'Fetched title 2',
                            nrOfPages: 9510,
                        }],
                        fetch: {
                            status: AsyncStatus.Success,
                            error: null,
                        },
                    },
                    expectedAmount: {
                        data: 660, // 11 * 60
                        fetch: {
                            status: AsyncStatus.Success,
                            error: null,
                        },
                    },
                });
            });
        });
    });

    function verifyState(state: ITestAppState, {
        expectedBooks = testBooksInitial,
        expectedFlags = testFlagsInitial,
        expectedAmount = testAmountInitial,
    }: {
        expectedBooks?: IAsyncEntity<ITestBook[]>;
        expectedFlags?: IAsyncEntity<ITestFlags>;
        expectedAmount?: IAsyncEntity<number>;
    }): void {
        expect(state.testEntitiesKey).toEqual({
            testBooks: expectedBooks,
            testFlags: expectedFlags,
            testAmount: expectedAmount,
        });
    }
});
