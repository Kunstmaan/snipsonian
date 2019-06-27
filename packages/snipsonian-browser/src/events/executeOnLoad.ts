interface IExecuteAfterPageLoadConfig {
    toBeExecuted: () => void;
}

export default function executeOnLoad(config: IExecuteAfterPageLoadConfig): void {
    window.addEventListener('load', config.toBeExecuted);
}
