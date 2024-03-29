import isFunction from '@snipsonian/core/src/is/isFunction';
import { AnyAction, IObservableStateAction } from './types';

export default function isObservableStateAction<
    Type = string,
    Payload = object,
    State = object,
    ExtraProcessInput = object,
    // eslint-disable-next-line max-len
    StateChangeNotificationKey = string>(action: AnyAction): action is IObservableStateAction<Type, Payload, State, ExtraProcessInput, StateChangeNotificationKey> {
    if (!action) {
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/dot-notation
    return isFunction(action['filter']) || isFunction(action['process']);
}
