import { IActionHandlers } from './createReducer';
import { createActionHandler, ICreateNewState } from './createActionHandler';
import { toSuccessType, toFailType, toCancelType, toResetType } from '../action/actionTypeGenerator';

/* eslint-disable @typescript-eslint/indent */
interface IActionHandlerChain<ReducerState> {
    onTrigger: <TP>(handleAction: ICreateNewState<ReducerState, TP>, overrideTriggerType?: string | string[]) =>
        IActionHandlerChain<ReducerState>;
    onSuccess: <SP>(handleAction: ICreateNewState<ReducerState, SP>, overrideSuccessType?: string) =>
        IActionHandlerChain<ReducerState>;
    onFail: <FP>(handleAction: ICreateNewState<ReducerState, FP>, overrideFailType?: string) =>
        IActionHandlerChain<ReducerState>;
    onCancel: <CP>(handleAction: ICreateNewState<ReducerState, CP>, overrideCancelType?: string) =>
        IActionHandlerChain<ReducerState>;
    onReset: <RP>(handleAction: ICreateNewState<ReducerState, RP>, overrideResetType?: string) =>
        IActionHandlerChain<ReducerState>;
    create: () => IActionHandlers<ReducerState>;
}
/* eslint-enable @typescript-eslint/indent */

export function createActionHandlersForType<ReducerState>(actionType: string): IActionHandlerChain<ReducerState> {
    const handlers: IActionHandlers<ReducerState> = {};

    const chain = {
        onTrigger: <TriggerPayload>(
            handleAction: ICreateNewState<ReducerState, TriggerPayload>,
            overrideTriggerType?: string | string[],
        ) => {
            const triggerType = overrideTriggerType || actionType;
            if (Array.isArray(triggerType)) {
                triggerType.forEach((item) => {
                    if (verifyNoHandlerYetForActionType(item)) {
                        addActionHandler<TriggerPayload>(item, handleAction);
                    }
                });
            } else if (verifyNoHandlerYetForActionType(triggerType)) {
                addActionHandler<TriggerPayload>(triggerType, handleAction);
            }
            return chain;
        },

        onSuccess: <SuccessPayload>(
            handleAction: ICreateNewState<ReducerState, SuccessPayload>,
            overrideSuccessType?: string,
        ) => {
            const successType = overrideSuccessType || toSuccessType(actionType);
            if (verifyNoHandlerYetForActionType(successType)) {
                addActionHandler<SuccessPayload>(successType, handleAction);
            }
            return chain;
        },

        onFail: <FailPayload>(
            handleAction: ICreateNewState<ReducerState, FailPayload>,
            overrideFailType?: string,
        ) => {
            const failType = overrideFailType || toFailType(actionType);
            if (verifyNoHandlerYetForActionType(failType)) {
                addActionHandler<FailPayload>(failType, handleAction);
            }
            return chain;
        },

        onCancel: <CancelPayload>(
            handleAction: ICreateNewState<ReducerState, CancelPayload>,
            overrideCancelType?: string,
        ) => {
            const cancelType = overrideCancelType || toCancelType(actionType);
            if (verifyNoHandlerYetForActionType(cancelType)) {
                addActionHandler<CancelPayload>(cancelType, handleAction);
            }
            return chain;
        },

        onReset: <ResetPayload>(
            handleAction: ICreateNewState<ReducerState, ResetPayload>,
            overrideResetType?: string,
        ) => {
            const resetType = overrideResetType || toResetType(actionType);
            if (verifyNoHandlerYetForActionType(resetType)) {
                addActionHandler<ResetPayload>(resetType, handleAction);
            }
            return chain;
        },

        create: () => handlers,
    };

    return chain;

    function verifyNoHandlerYetForActionType(actionTypeToCheck: string): boolean {
        if (!handlers[actionTypeToCheck]) {
            return true;
        }

        console.log(`REDUCER WARNING: this reducer already has a handler for type ${actionTypeToCheck}`);

        return false;
    }

    function addActionHandler<Payload>(
        actualActionType: string,
        handleAction: ICreateNewState<ReducerState, Payload>,
    ): void {
        handlers[actualActionType] =
            createActionHandler<ReducerState>(handleAction as unknown as ICreateNewState<ReducerState, object>);
    }
}
