import assert from '../../assert';
import isSet from '../../is/isSet';
import isArray from '../../is/isArray';
import { TDecorator } from '../index';

export interface IAddPropOptions {
    addIfValueUnset?: boolean;
}

export default function addProp(
    propName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propValue: any,
    { addIfValueUnset = true }: IAddPropOptions = {},
): TDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function decorate(target: any) {
        assert(propName, isSet, 'Required input argument \'propName\' is missing.');

        if (isArray(target)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return target.map((entity: any) => enrichWithProp({
                target: entity,
                propName,
                propValue,
                options: { addIfValueUnset },
            }));
        }

        return enrichWithProp({
            target,
            propName,
            propValue,
            options: { addIfValueUnset },
        });
    };
}

function enrichWithProp({
    target,
    propName,
    propValue,
    options = {},
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any;
    propName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propValue: any;
    options?: IAddPropOptions;
}): any { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (options.addIfValueUnset || isSet(propValue)) {
        // eslint-disable-next-line no-param-reassign
        target[propName] = propValue;
    }

    return target;
}
