import { IActionJourneyHooks, IActionType2JourneyHooksMaps } from '../types';
import { IAction } from '../../../action/types';

const NO_ACTION_JOURNEY_HOOKS: IActionJourneyHooks = {
    filterHooks: [],
    processHooks: [],
};

export default function getJourneyHooksThatMatchAction(
    action: IAction<object>,
    actionType2JourneyHooksMaps: IActionType2JourneyHooksMaps,
): IActionJourneyHooks {
    const hooksThatMatchActionType = getHooksThatMatchActionType(action, actionType2JourneyHooksMaps);
    const hooksThatMatchingActionTypeRegex = getHooksThatMatchActionTypeRegex(action, actionType2JourneyHooksMaps);

    return {
        filterHooks: hooksThatMatchingActionTypeRegex.filterHooks.concat(hooksThatMatchActionType.filterHooks),
        processHooks: hooksThatMatchingActionTypeRegex.processHooks.concat(hooksThatMatchActionType.processHooks),
    };
}

function getHooksThatMatchActionType(
    action: IAction<object>,
    { actionType2HooksMap }: IActionType2JourneyHooksMaps,
): IActionJourneyHooks {
    return actionType2HooksMap[action.type] || NO_ACTION_JOURNEY_HOOKS;
}

function getHooksThatMatchActionTypeRegex(
    action: IAction<object>,
    { actionTypeRegex2HooksList }: IActionType2JourneyHooksMaps,
): IActionJourneyHooks {
    return actionTypeRegex2HooksList
        .filter((regexMapping) => regexMapping.actionTypeRegex.test(action.type))
        .reduce(
            (accumulator, journeyHooks) => {
                if (journeyHooks.filterHooks && journeyHooks.filterHooks.length > 0) {
                    accumulator.filterHooks.push(...journeyHooks.filterHooks);
                }
                if (journeyHooks.processHooks && journeyHooks.processHooks.length > 0) {
                    accumulator.processHooks.push(...journeyHooks.processHooks);
                }
                return accumulator;
            },
            {
                filterHooks: [],
                processHooks: [],
            } as IActionJourneyHooks,
        );
}
