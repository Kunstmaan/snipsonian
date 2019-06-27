export const TRACEABLE_API_ERROR_ID_PREFIX = 'TRACEABLE-API-ERROR-';

let lastErrorNumber = 0;

export default function generateTraceableApiErrorId(): string {
    lastErrorNumber += 1;
    return `${TRACEABLE_API_ERROR_ID_PREFIX}${lastErrorNumber}`;
}
