import decorate, { TDecorator } from '@snipsonian/core/src/decorate';
import addProp from '@snipsonian/core/src/decorate/decorators/addProp';

export default function initOptionalFields(nameValueObj: object): object {
    return decorate({})
        .with(...toAddPropDecorators(nameValueObj));
}

function toAddPropDecorators(nameValueObj: object): TDecorator[] {
    return Object.keys(nameValueObj)
        .map((name) => addPropIfValueSet(name, nameValueObj[name]));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addPropIfValueSet(propName: string, propValue: any): TDecorator {
    return addProp(propName, propValue, { addIfValueUnset: false });
}
