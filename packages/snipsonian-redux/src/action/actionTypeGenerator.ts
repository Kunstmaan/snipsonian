export const ACTION_TYPE_SUFFIX = {
    SUCCEEDED: '_SUCCEEDED',
    FAILED: '_FAILED',
    CANCELLED: '_CANCELLED',
    RESET: '_RESET',
};

export function toSuccessType(baseType: string): string {
    return `${baseType}${ACTION_TYPE_SUFFIX.SUCCEEDED}`;
}

export function toFailType(baseType: string): string {
    return `${baseType}${ACTION_TYPE_SUFFIX.FAILED}`;
}

export function toCancelType(baseType: string): string {
    return `${baseType}${ACTION_TYPE_SUFFIX.CANCELLED}`;
}

export function toResetType(baseType: string): string {
    return `${baseType}${ACTION_TYPE_SUFFIX.RESET}`;
}
