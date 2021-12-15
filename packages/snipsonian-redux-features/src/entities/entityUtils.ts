import { IAsyncEntityToFetch } from './types';

export function shouldResetEntityDataOnTrigger<State, Action>({
    resetDataOnTrigger = true, // default true
}: IAsyncEntityToFetch<State, Action, object, object>): boolean {
    return resetDataOnTrigger;
}
