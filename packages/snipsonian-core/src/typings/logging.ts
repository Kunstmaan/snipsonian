export interface IGroupLogger {
    startLog: (groupTitle: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log: (message: any, ...optionalParams: any[]) => void;
    endLog: () => void;
}
