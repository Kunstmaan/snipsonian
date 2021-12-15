import { Dispatch } from 'redux';
import { IAction } from '../../action/types';

export type TOnActionType = string | string[];

export interface IOnActionTypeRegex {
    pattern: string;
    flags?: string;
}

/**
 * return
 * - 'false' if the action should be stopped/rejected (= not propagated to the next middleware/reducers)
 * - the incoming action 'as is' if that action should be propagated to the next middleware/reducers
 * - the altered/enhanced incoming-action (e.g. extra payload params) if the incoming action should not
 *   be propagated 'as is'
 *   p.s. returning an action with another type is not supported (it's possible that the wrong journeys
 *   would pick up that returned action)
 */
export type TFilterHookResult = IAction<object> | false;

export type TFilterHook<State, IncomingAction> = (
    input: {
        getState: () => State;
        action: IncomingAction;
        dispatch: Dispatch<IAction<object>>; // dispatched action should be different than incoming action
    }
) => TFilterHookResult;

export type TProcessHook<State, IncomingAction, ExtraProcessInput> = (
    input: {
        getState: () => State;
        action: IncomingAction;
        dispatch: Dispatch<IAction<object>>; // dispatched action should be different than incoming action
    } & ExtraProcessInput
) => void | Promise<void>;

export interface IJourneyConfig
<State, IncomingAction extends IAction<object>, ExtraProcessInput extends object = object> {
    onActionType?: TOnActionType;
    onActionTypeRegex?: IOnActionTypeRegex;

    /* pre-reducer > e.g. not dispatching the incoming action will cause it NOT to reach the reducers */
    filter?: TFilterHook<State, IncomingAction>;

    /* post-reducer > processing an action AFTER it reached the reducers */
    process?: TProcessHook<State, IncomingAction, ExtraProcessInput>;
}

export type TRegisteredJourney = IJourneyConfig<object, IAction<object>>;

export interface IActionJourneyHooks<State = object, IncomingAction = IAction<object>, ExtraProcessInput = object> {
    filterHooks: TFilterHook<State, IncomingAction>[];
    processHooks: TProcessHook<State, IncomingAction, ExtraProcessInput>[];
}

export interface IActionType2JourneyHooksMap<State = object, IncomingAction = IAction<object>> {
    [actionType: string]: IActionJourneyHooks<State, IncomingAction>;
}

export interface IActionTypeRegex2JourneyHooks<State = object, IncomingAction = IAction<object>>
    extends IActionJourneyHooks<State, IncomingAction> {
    actionTypeRegex: RegExp;
}

export interface IActionType2JourneyHooksMaps<State = object, IncomingAction = IAction<object>> {
    actionType2HooksMap: IActionType2JourneyHooksMap<State, IncomingAction>;
    actionTypeRegex2HooksList: IActionTypeRegex2JourneyHooks<State, IncomingAction>[];
}
