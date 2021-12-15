import { Dispatch } from 'redux';
import isSet from '@snipsonian/core/src/is/isSet';
import { IAction } from '@snipsonian/redux/src/action/types';
import { IOnActionTypeRegex } from '@snipsonian/redux/src/middleware/journey/types';
import { registerJourney } from '@snipsonian/redux/src/middleware/journey/journeyManager';
import {
    AsyncOperation,
    AsyncStatus,
    IActionType2AsyncEntitiesToFetchMap,
    IAsyncEntityKey2FetchApiConfigMap,
    IAsyncEntityToFetch,
    IEntityKeyOperation,
    IFetchAsyncEntityApiConfig,
} from './types';
import { updateAsyncEntitiesChain } from './actions';
import { getAsyncEntity } from './selectors';
import { shouldResetEntityDataOnTrigger } from './entityUtils';

export default function registerJourneyToFetchAsyncEntitiesOnAction<State, Action = IAction<object>>({
    onActionTypeRegex,
    actionType2AsyncEntitiesToFetchMap,
    asyncEntityKey2ApiConfigMap,
}: {
    onActionTypeRegex: IOnActionTypeRegex;
    actionType2AsyncEntitiesToFetchMap: IActionType2AsyncEntitiesToFetchMap<State, Action>;
    asyncEntityKey2ApiConfigMap: IAsyncEntityKey2FetchApiConfigMap<State>;
}): void {
    registerJourney<State, IAction<object>>({
        onActionTypeRegex,
        filter({ getState, action, dispatch }) {
            const asyncEntitiesFetchCandidates = actionType2AsyncEntitiesToFetchMap[action.type];
            if (asyncEntitiesFetchCandidates) {
                const state = getState();

                const asyncEntitiesToFetch = asyncEntitiesFetchCandidates
                    .filter(
                        (asyncEntityToFetch) =>
                            shouldEntityBeFetched<State, Action>({
                                asyncEntityToFetch,
                                state,
                                action: action as unknown as Action,
                            })
                            && isSet(asyncEntityKey2ApiConfigMap[asyncEntityToFetch.entityKey]),
                    );

                if (asyncEntitiesToFetch && asyncEntitiesToFetch.length > 0) {
                    updateAsyncEntitiesChain(dispatch)
                        .trigger(
                            ...filterEntityKeysToTriggerFetch<State, Action>(asyncEntitiesToFetch, true),
                        )
                        .triggerWithoutDataReset(
                            ...filterEntityKeysToTriggerFetch<State, Action>(asyncEntitiesToFetch, false),
                        )
                        .dispatch();

                    // trigger the call(s) in parallel without waiting for the result(s)
                    Promise.all(
                        asyncEntitiesToFetch.map((asyncEntityToFetch) => fetchAsyncEntity({
                            asyncEntityToFetch,
                            apiConfig: asyncEntityKey2ApiConfigMap[asyncEntityToFetch.entityKey],
                            state,
                            action: action as unknown as Action,
                            dispatch,
                        })),
                    );
                }
            }

            /* propagate the incoming action */
            return action;
        },
    });
}

function shouldEntityBeFetched<State, Action>({
    asyncEntityToFetch,
    state,
    action,
}: {
    asyncEntityToFetch: IAsyncEntityToFetch<State, Action, object, object>;
    state: State;
    action: Action;
}): boolean {
    const { entityKey: asyncEntityKey, refreshMode, shouldFetch } = asyncEntityToFetch;
    const existingFetchOperation = getAsyncEntity(state, asyncEntityKey).fetch;

    if (shouldFetch && !shouldFetch({ state })) {
        return false;
    }

    if (!existingFetchOperation) {
        return false;
    }

    const alreadyFetched = existingFetchOperation.status === AsyncStatus.Success;

    if (!alreadyFetched) {
        return true;
    }

    if (!isSet(refreshMode)) {
        return true;
    }

    if (refreshMode === 'always') {
        return true;
    }

    if (refreshMode === 'never') {
        return false;
    }

    return refreshMode({ state, action });
}

function filterEntityKeysToTriggerFetch<State, Action = IAction<object>>(
    asyncEntitiesToFetch: IAsyncEntityToFetch<State, Action, object, object>[],
    expectedResetDataOnTrigger = true,
): IEntityKeyOperation[] {
    return asyncEntitiesToFetch
        .filter((toFetch) => shouldResetEntityDataOnTrigger<State, Action>(toFetch) === expectedResetDataOnTrigger)
        .map((toFetch) => ({
            key: toFetch.entityKey,
            operation: AsyncOperation.fetch,
        }));
}

function fetchAsyncEntity<State, Action>({
    asyncEntityToFetch,
    apiConfig,
    state,
    action,
    dispatch,
}: {
    asyncEntityToFetch: IAsyncEntityToFetch<State, Action, object, object>;
    apiConfig: IFetchAsyncEntityApiConfig<State, object, object>;
    state: State;
    action: Action;
    dispatch: Dispatch<IAction<object>>;
}): Promise<void> {
    // eslint-disable-next-line no-nested-ternary
    const apiInput = isSet(apiConfig.apiInputSelector)
        ? apiConfig.apiInputSelector({ state })
        : isSet(asyncEntityToFetch.apiInputSelector)
            ? asyncEntityToFetch.apiInputSelector({ state, action })
            : null;

    return apiConfig.api(apiInput)
        .then((dataResult) => {
            updateAsyncEntitiesChain(dispatch)
                .succeeded({
                    key: asyncEntityToFetch.entityKey,
                    operation: AsyncOperation.fetch,
                    data: isSet(asyncEntityToFetch.mapDataResult) ?
                        asyncEntityToFetch.mapDataResult({ dataResult, state }) : dataResult,
                })
                .dispatch();
        })
        .catch((error) => {
            updateAsyncEntitiesChain(dispatch)
                .failed({
                    key: asyncEntityToFetch.entityKey,
                    operation: AsyncOperation.fetch,
                    error,
                })
                .dispatch();
        });
}
