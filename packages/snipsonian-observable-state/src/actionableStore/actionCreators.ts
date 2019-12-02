import { IPayloadAction, IObservableStateAction } from './types';

export function createAction<Type, Payload>(
    action: IPayloadAction<Type, Payload>,
): IPayloadAction<Type, Payload> {
    return action;
}

export function createObservableStateAction<Type, Payload, State, ExtraProcessInput, StateChangeNotificationKey>(
    action: IObservableStateAction<Type, Payload, State, ExtraProcessInput, StateChangeNotificationKey>,
): IObservableStateAction<Type, Payload, State, ExtraProcessInput, StateChangeNotificationKey> {
    return action;
}
