import {
    createAction,
    createSuccessAction,
    createFailAction,
    createCancelAction,
    createResetAction,
} from './createAction';
import { IAction } from './types';

export interface ICreateTypeActionsConfig<TP, SP, FP, CP, RP> {
    type: string;
    onTrigger?: (payload: TP) => void;
    onSucceeded?: (payload: SP) => void;
    onFailed?: (payload: FP) => void;
    onCancel?: (payload: CP) => void;
    onReset?: (payload: RP) => void;
}

interface ITypeActions<TP, SP, FP, CP, RP> {
    type: string;
    trigger: (payload: TP) => IAction<TP>;
    succeeded: (payload: SP) => IAction<SP>;
    failed: (payload: FP) => IAction<FP>;
    cancel: (payload: CP) => IAction<CP>;
    reset: (payload: RP) => IAction<RP>;
}

export function createTypeActions<
    TP extends object = object,
    SP extends object = object,
    FP extends object = object,
    CP extends object = object,
    RP extends object = object,
>({
    type,
    onTrigger,
    onSucceeded,
    onFailed,
    onCancel,
    onReset,
}: ICreateTypeActionsConfig<TP, SP, FP, CP, RP>): ITypeActions<TP, SP, FP, CP, RP> {
    return {
        type,
        trigger: (payload: TP) => {
            if (onTrigger) {
                onTrigger(payload);
            }
            return createAction(type, payload);
        },
        succeeded: (payload: SP) => {
            if (onSucceeded) {
                onSucceeded(payload);
            }
            return createSuccessAction(type, payload);
        },
        failed: (payload: FP) => {
            if (onFailed) {
                onFailed(payload);
            }
            return createFailAction(type, payload);
        },
        cancel: (payload: CP) => {
            if (onCancel) {
                onCancel(payload);
            }
            return createCancelAction(type, payload);
        },
        reset: (payload: RP) => {
            if (onReset) {
                onReset(payload);
            }
            return createResetAction(type, payload);
        },
    };
}
