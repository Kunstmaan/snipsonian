import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'jest-dom/extend-expect';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    render,
    RenderResult,
    cleanup,
    fireEvent,
    waitFor,
} from '@testing-library/react';
import {
    IComponentTester,
    TGivenCallback,
    TWhenCallback,
    TThenCallback,
    IComponentWrapperProps,
} from './types';

export default function getComponentTester<GivenProps extends object, ExtraThenProps extends object = object>({
    givenProps = ({} as GivenProps),
    extraThenProps = ({} as ExtraThenProps),
    onGivenStart,
    ComponentWrapper,
}: {
    givenProps?: GivenProps;
    extraThenProps?: ExtraThenProps;
    onGivenStart?: () => void;
    ComponentWrapper: React.ComponentType<IComponentWrapperProps>;
}) {
    let renderResult: RenderResult;

    const componentTester: IComponentTester<GivenProps, ExtraThenProps> = {
        given(callback: TGivenCallback<GivenProps>) {
            if (onGivenStart) {
                onGivenStart();
            }
            callback({
                ...givenProps,
            });
        },

        when(callback: TWhenCallback) {
            callback({
                render: (component: React.ReactElement) => {
                    if (ComponentWrapper) {
                        renderResult = render(
                            (
                                <ComponentWrapper>
                                    {component}
                                </ComponentWrapper>
                            ),
                        );
                    } else {
                        renderResult = render(component);
                    }
                },
            });
        },

        then(callback: TThenCallback<ExtraThenProps>) {
            try {
                callback({
                    ...renderResult,
                    fireEvent,
                    waitFor,
                    ...extraThenProps,
                });
            } finally {
                cleanup();
            }
        },
    };

    return componentTester;
}
