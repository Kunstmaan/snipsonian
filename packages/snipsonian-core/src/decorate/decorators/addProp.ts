import assert from '../../assert';
import isSet from '../../is/isSet';
import isArray from '../../is/isArray';
import { TDecorator } from '../index';

export interface IAddPropOptions {
    addIfValueUnset?: boolean;
}

export default function addProp(
    propName: string,
    propValue: any,
    { addIfValueUnset = true }: IAddPropOptions = {},
): TDecorator {
    return function decorate(target: any) {
        assert(propName, isSet, 'Required input argument \'propName\' is missing.');

        if (isArray(target)) {
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
    target: any;
    propName: string;
    propValue: any,
    options?: IAddPropOptions;
}) {
    if (options.addIfValueUnset || isSet(propValue)) {
        target[propName] = propValue;
    }

    return target;
}
