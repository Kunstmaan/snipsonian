import { ACTION_TYPE_SUFFIX } from './actionTypeGenerator';

const ACTION_TYPE_REGEX = {
    SUCCEEDED: new RegExp(`.*${ACTION_TYPE_SUFFIX.SUCCEEDED}$`),
};

export function isSuccessType(actionType: string): boolean {
    return actionType.match(ACTION_TYPE_REGEX.SUCCEEDED) !== null;
}
