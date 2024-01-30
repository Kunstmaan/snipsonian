import * as React from 'react';

enum VisibilityState {
    NOT_STARTED = 'NOT_STARTED',
    STARTED = 'STARTED',
    MIN_DURATION_FINISHED = 'MIN_DURATION_FINISHED',
    STOPPED = 'STOPPED',
}

interface IComponentState {
    visibilityState: VisibilityState;
}

export interface IShowAfterDelayProps {
    children?: React.ReactNode;
    enabled: boolean;
    delayBeforeShow: number;
    minDurationToShow: number;
    showDuringDelayComponent?: React.ReactNode;
}

export default class ShowAfterDelay extends React.PureComponent<IShowAfterDelayProps, IComponentState> {
    private delayBeforeShowTimeout: number;
    private minDurationTimeout: number;

    public constructor(props: IShowAfterDelayProps) {
        super(props);

        this.state = {
            // eslint-disable-next-line no-nested-ternary
            visibilityState: shouldBeStartedImmediately(props)
                ? VisibilityState.STARTED
                : willNeverBeStarted(props)
                    ? VisibilityState.STOPPED
                    : VisibilityState.NOT_STARTED,
        };
    }

    public componentDidMount() {
        const { delayBeforeShow, minDurationToShow } = this.props;
        const { visibilityState } = this.state;

        if (visibilityState === VisibilityState.STARTED) {
            this.initMinDurationTimeout(minDurationToShow);
        } else if (visibilityState === VisibilityState.NOT_STARTED) {
            this.initDelayBeforeShowTimeout(delayBeforeShow);
        }
    }

    // eslint-disable-next-line camelcase
    public UNSAFE_componentWillReceiveProps(nextProps: IShowAfterDelayProps) {
        if (nextProps.enabled) {
            const { enabled } = this.props;
            if (!enabled) {
                this.initDelayBeforeShowTimeout(nextProps.delayBeforeShow);
            }
        } else {
            this.clearDelayTimeout();

            const { visibilityState } = this.state;

            if (visibilityState === VisibilityState.MIN_DURATION_FINISHED
                || visibilityState === VisibilityState.NOT_STARTED) {
                this.setState({
                    visibilityState: VisibilityState.STOPPED,
                });
            }
        }
    }

    public componentWillUnmount() {
        this.clearDelayTimeout();
        this.clearDurationTimeout();
    }

    public render() {
        const { children, showDuringDelayComponent } = this.props;
        if (this.isNotStartedYet()) {
            return null;
        }

        if (this.isRunning()) {
            return showDuringDelayComponent || null;
        }

        // Not running anymore
        return children || null;
    }

    protected isNotStartedYet() {
        const { visibilityState } = this.state;
        return visibilityState === VisibilityState.NOT_STARTED;
    }

    protected isRunning() {
        const { visibilityState } = this.state;
        return [VisibilityState.STARTED, VisibilityState.MIN_DURATION_FINISHED]
            .indexOf(visibilityState) > -1;
    }

    private initDelayBeforeShowTimeout(delayBeforeShow: number) {
        this.delayBeforeShowTimeout = window.setTimeout(
            () => this.onDelayBeforeShowTimeout(),
            delayBeforeShow,
        );
    }

    private onDelayBeforeShowTimeout() {
        this.setState({
            visibilityState: VisibilityState.STARTED,
        });

        const { minDurationToShow } = this.props;

        this.initMinDurationTimeout(minDurationToShow);
    }

    private initMinDurationTimeout(minDurationToShow: number) {
        this.minDurationTimeout = window.setTimeout(
            () => this.onMinDurationTimeout(),
            minDurationToShow,
        );
    }

    private onMinDurationTimeout() {
        const { enabled } = this.props;
        this.setState({
            visibilityState: enabled ? VisibilityState.MIN_DURATION_FINISHED : VisibilityState.STOPPED,
        });
    }

    private clearDelayTimeout() {
        if (this.delayBeforeShowTimeout) {
            clearTimeout(this.delayBeforeShowTimeout);
        }
    }

    private clearDurationTimeout() {
        if (this.minDurationTimeout) {
            clearTimeout(this.minDurationTimeout);
        }
    }
}

function shouldBeStartedImmediately(props: IShowAfterDelayProps) {
    return props.enabled && (props.delayBeforeShow === 0) && props.minDurationToShow > 0;
}

function willNeverBeStarted(props: IShowAfterDelayProps) {
    return !props.enabled || (props.delayBeforeShow === 0 && props.minDurationToShow === 0);
}
