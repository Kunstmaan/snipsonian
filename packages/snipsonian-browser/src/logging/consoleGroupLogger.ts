import { IGroupLogger } from '@snipsonian/core/src/typings/logging';

const isGroupingSupported = !!console.group;

const consoleGroupLogger: IGroupLogger = {
    startLog(groupTitle: string) {
        // eslint-disable-next-line no-unused-expressions
        isGroupingSupported
            ? console.groupCollapsed(groupTitle)
            : console.log(groupTitle);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(message: any, ...optionalParams: any[]) {
        console.log(message, optionalParams);
    },
    endLog() {
        if (isGroupingSupported) {
            console.groupEnd();
        }
    },
};

export default consoleGroupLogger;
