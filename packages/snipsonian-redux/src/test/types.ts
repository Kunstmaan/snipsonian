import { IAction } from '../action/types';

export interface IReduxIntegrationTester<State, ExtraGivenProps> {
    given: (callback: TGivenCallback<State, ExtraGivenProps>, options?: IGivenOptions) => void;
    when: (callback: TWhenCallback) => Promise<IWhenResult<State>>;
    then: (callback: TThenCallback<State>) => void;
}

export interface IWhenResult<State> {
    state: State;
    resolveAllPromises: () => Promise<void>;
}

export interface IGivenOptions {
    keepState?: boolean;
}
export type TGivenCallback<State, ExtraGivenProps> = (props: IGivenProps<State> & ExtraGivenProps) => void;
export type TWhenCallback = (props: IWhenProps) => void;
export type TThenCallback<State> = (props: IThenProps<State>) => void;

interface IGivenProps<State> {
    initialiseState: (...setupActions: IAction<{}>[]) => void;
    getState: () => State;
}

interface IWhenProps {
    triggerAction: (
        action: IAction<{}>,
        options?: ITestOptions,
    ) => void;
}

interface IThenProps<State> {
    getState: () => State;
}

export interface ITestOptions {
    immediatelyResolve?: boolean;
}
