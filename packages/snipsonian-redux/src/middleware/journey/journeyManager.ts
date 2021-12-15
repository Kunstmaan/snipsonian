import isSet from '@snipsonian/core/src/is/isSet';
import assert from '@snipsonian/core/src/assert';
import { IJourneyConfig, TRegisteredJourney } from './types';
import { IAction } from '../../action/types';

let registeredJourneys: TRegisteredJourney[] = [];

export function registerJourney<State, Action extends IAction<object>, ExtraProcessInput extends object = object>(
    journey: IJourneyConfig<State, Action, ExtraProcessInput>,
): void {
    validateJourney<State, Action, ExtraProcessInput>(journey);

    registeredJourneys.push(journey as unknown as TRegisteredJourney);
}

export function getRegisteredJourneys(): TRegisteredJourney[] {
    if (process.env.NODE_ENV === 'development') {
        console.log('# Registered journeys:', registeredJourneys.length);
    }
    return registeredJourneys;
}

function validateJourney<State, Action extends IAction<object>, ExtraProcessInput extends object = object>(
    journey: IJourneyConfig<State, Action, ExtraProcessInput>,
): void {
    assert(
        journey,
        () => isSet(journey.onActionType) || isSet(journey.onActionTypeRegex),
        'Either configure "onActionType" or "onActionTypeRegex"',
    );
}

/** Mainly for test purposes */
export function clearRegisteredJourneys(): void {
    registeredJourneys = [];
}
