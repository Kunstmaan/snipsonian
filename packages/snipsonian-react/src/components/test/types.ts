import { ReactElement, ReactNode } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RenderResult, FireFunction, FireObject, waitFor } from '@testing-library/react';

export interface IComponentWrapperProps {
    children: ReactNode;
}

export interface IComponentTester<GivenProps, ExtraThenProps> {
    given: (callback: TGivenCallback<GivenProps>) => void;
    when: (callback: TWhenCallback) => void;
    then: (callback: TThenCallback<ExtraThenProps> | TThenCallbackAsync<ExtraThenProps>) => void;
}

export type TGivenCallback<GivenProps> = (props: GivenProps) => void;
export type TWhenCallback = (props: IWhenProps) => void;
export type TThenCallback<ExtraThenProps> = (props: TThenProps<ExtraThenProps>) => void;
export type TThenCallbackAsync<ExtraThenProps> = (props: TThenProps<ExtraThenProps>) => Promise<void>;

interface IWhenProps {
    render: (
        component: ReactElement,
    ) => void;
}

interface ITestingLibrary {
    fireEvent: FireFunction & FireObject;
    waitFor: typeof waitFor;
}

type TThenProps<ExtraThenProps> = RenderResult & ITestingLibrary & ExtraThenProps;
