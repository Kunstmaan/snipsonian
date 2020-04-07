import { PureComponent, ReactChild } from 'react';

interface IHideAfterDelayProps {
    enabled: boolean;
    hideDelay?: number;
    children: ReactChild;
    onHide?: () => void;
}

const DEFAULT_AUTO_HIDE_DURATION = 10000;

export default class HideAfterDelay extends PureComponent<IHideAfterDelayProps> {
    public render() {
        const { children } = this.props;
        return children;
    }

    public componentDidMount() {
        const { enabled } = this.props;
        if (enabled) {
            this.setAutoHideTimeout(this.props);
        }
    }

    // eslint-disable-next-line camelcase
    public UNSAFE_componentWillReceiveProps(nextProps: IHideAfterDelayProps) {
        this.clearTimeout();
        if (nextProps.enabled) {
            this.setAutoHideTimeout(nextProps);
        }
    }

    public componentWillUnmount() {
        this.clearTimeout();
    }

    private hideTimeout: number;

    private setAutoHideTimeout(props: IHideAfterDelayProps) {
        this.hideTimeout = window.setTimeout(
            props.onHide,
            props.hideDelay || DEFAULT_AUTO_HIDE_DURATION,
        );
    }

    private clearTimeout() {
        if (this.hideTimeout) {
            window.clearTimeout(this.hideTimeout);
        }
    }
}
