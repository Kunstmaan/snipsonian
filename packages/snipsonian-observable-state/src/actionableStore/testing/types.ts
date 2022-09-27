import { IBaseIntegrationTester } from '@snipsonian/core/src/typings/testing';
import { IRestHandlerMock } from '@snipsonian/axios/src/testing/mockRestServer';
import { Action } from '../types';

/* eslint-disable @typescript-eslint/no-explicit-any */

type TCallback<CallbackProps> = (callbackProps: CallbackProps) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IStateIntegrationTester<State> extends IBaseIntegrationTester {
    given: (props: IGivenProps, callback?: TCallback<IGivenCallbackProps<State>>) => void;
    when: <ResultData = any>(
        actionOrToBeExecuted: TActionOrToBeExecuted<ResultData>
    ) => Promise<ResultData>;
    then: (callback?: TCallback<IThenCallbackProps<State>>) => void;
}

interface IGivenProps {
    keepState?: boolean; // default false - pass true if you want to keep the resulting state of the previous test
    restHandlerMocks?: IRestHandlerMock[];
}

interface IGivenCallbackProps<State> {
    setupActions: (...actionsToSetup: Action[]) => void;
    setupState: (stateUpdater: (draftState: State) => void) => void;
    getState: () => State;
}

/* either an action that will be dispatched, or a state trigger that will be executed */
export type TActionOrToBeExecuted<ResultData = any> = Action | TToBeExecuted<ResultData>;

type TToBeExecuted<ResultData> = () => Promise<ResultData>;

interface IThenCallbackProps<State> {
    getState: () => State;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
