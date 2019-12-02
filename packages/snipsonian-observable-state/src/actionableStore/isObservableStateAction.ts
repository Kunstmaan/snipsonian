import isFunction from '@snipsonian/core/src/is/isFunction';
import { AnyAction, IObservableStateAction } from './types';

export default function isObservableStateAction<
    Type = string,
    Payload = {},
    State = {},
    ExtraProcessInput = {},
    // eslint-disable-next-line max-len
    StateChangeNotificationKey = string>(action: AnyAction): action is IObservableStateAction<Type, Payload, State, ExtraProcessInput, StateChangeNotificationKey> {
    if (!action) {
        return false;
    }

    // eslint-disable-next-line dot-notation
    return isFunction(action['filter']) || isFunction(action['process']);
}
