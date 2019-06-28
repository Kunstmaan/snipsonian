import isArray from '@snipsonian/core/src/is/isArray';
import { TOnActionType } from '../types';

export default function isOnActionTypeArray(onActionType: TOnActionType): onActionType is string[] {
    return !!onActionType && isArray(onActionType);
}
