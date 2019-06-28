import {
    IActionType2JourneyHooksMaps, IActionTypeRegex2JourneyHooks, IOnActionTypeRegex, TFilterHook, TProcessHook,
    TRegisteredJourney,
} from '../types';
import isOnActionTypeArray from './isOnActionTypeArray';

export default function getActionType2JourneyHooksMaps(
    journeys: TRegisteredJourney[],
): IActionType2JourneyHooksMaps {
    const journeyHooksMaps: IActionType2JourneyHooksMaps = {
        actionType2HooksMap: {},
        actionTypeRegex2HooksList: [],
    };

    journeys.forEach((journey) => {
        if (journey.onActionType) {
            if (isOnActionTypeArray(journey.onActionType)) {
                journey.onActionType.forEach((singleActionType) => {
                    addActionType2HookMapping(singleActionType, journey);
                });
            } else {
                addActionType2HookMapping(journey.onActionType, journey);
            }
        } else if (journey.onActionTypeRegex) {
            addActionTypeRegex2HookMapping(journey.onActionTypeRegex, journey);
        }
    });

    return journeyHooksMaps;

    function addActionType2HookMapping(actionType: string, journey: TRegisteredJourney): void {
        if (!journeyHooksMaps.actionType2HooksMap[actionType]) {
            journeyHooksMaps.actionType2HooksMap[actionType] = {
                filterHooks: [],
                processHooks: [],
            };
        }

        if (journey.filter) {
            journeyHooksMaps.actionType2HooksMap[actionType]
                .filterHooks
                .push(
                    journey.filter as TFilterHook<{}, {}>,
                );
        }
        if (journey.process) {
            journeyHooksMaps.actionType2HooksMap[actionType]
                .processHooks
                .push(
                    journey.process as TProcessHook<{}, {}, {}>,
                );
        }
    }

    function addActionTypeRegex2HookMapping(actionTypeRegex: IOnActionTypeRegex, journey: TRegisteredJourney): void {
        const regexMapping: IActionTypeRegex2JourneyHooks = {
            actionTypeRegex: new RegExp(actionTypeRegex.pattern, actionTypeRegex.flags),
            filterHooks: [],
            processHooks: [],
        };

        if (journey.filter) {
            regexMapping.filterHooks
                .push(
                    journey.filter as TFilterHook<{}, {}>,
                );
        }
        if (journey.process) {
            regexMapping.processHooks
                .push(
                    journey.process as TProcessHook<{}, {}, {}>,
                );
        }

        journeyHooksMaps.actionTypeRegex2HooksList.push(regexMapping);
    }
}
