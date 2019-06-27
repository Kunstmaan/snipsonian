import React from 'react';
import classNames from 'classnames';
import ShowAfterDelay from '../ShowAfterDelay';

export interface IGenericLoaderProps {
    show: boolean;
    componentToShowWhileLoading: React.ReactNode;
    showImmediately?: boolean;
    baseClass?: string;
    useFullScreen?: boolean;
    transparentBackground?: boolean;
    positionFixed?: boolean;
    timeoutBeforeShowInMillis?: number;
    timeoutMinDurationInMillis?: number;
    children?: React.ReactNode;
}

export default function GenericLoader(props: IGenericLoaderProps) {
    const {
        show,
        componentToShowWhileLoading,
        showImmediately = false,
        baseClass = 'Loader',
        useFullScreen = false,
        transparentBackground = false,
        positionFixed = false,
        timeoutBeforeShowInMillis = 0,
        timeoutMinDurationInMillis = 500,
        children,
    } = props;

    const loaderClass = classNames(baseClass, {
        [`${baseClass}--full-screen`]: useFullScreen,
        [`${baseClass}--transparent-background`]: transparentBackground,
        [`${baseClass}--fixed`]: positionFixed,
    });

    const duringDelayComponent = (
        <>
            <div className={loaderClass}>
                <div className="content">
                    {componentToShowWhileLoading}
                    {/* <span>l o a d i n g !!!!!</span> */}
                </div>
            </div>
            {children}
        </>
    );

    return (
        <ShowAfterDelay
            enabled={show}
            delayBeforeShow={showImmediately ? 0 : timeoutBeforeShowInMillis}
            minDurationToShow={timeoutMinDurationInMillis}
            showDuringDelayComponent={duringDelayComponent}
        >
            {children}
        </ShowAfterDelay>
    );
}
