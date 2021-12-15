export type TReportLevel = 'critical' | 'error' | 'warning' | 'info' | 'debug';

export interface IReportOptions {
    level?: TReportLevel;
    extra?: object;
}

export interface IErrorReporter<UserContext, ExtraContext = object> {
    reportException: (error: Error, options?: IReportOptions) => void;
    reportMessage: (message: string, options?: IReportOptions) => void;
    reportCriticalMessage: (message: string, extra?: object) => void;
    reportErrorMessage: (message: string, extra?: object) => void;
    reportWarningMessage: (message: string, extra?: object) => void;
    reportInfoMessage: (message: string, extra?: object) => void;
    reportDebugMessage: (message: string, extra?: object) => void;
    setUserContext: (context: UserContext) => void;
    appendExtraContext: (extraContext: ExtraContext) => void;
    removeUserContext: () => void;
}
