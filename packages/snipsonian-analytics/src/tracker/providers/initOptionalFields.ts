import decorate from '@snipsonian/core/src/decorate';
import addProp from '@snipsonian/core/src/decorate/decorators/addProp';

export default function initOptionalFields(nameValueObj: object) {
    return decorate({})
        .with(...toAddPropDecorators(nameValueObj));
}

function toAddPropDecorators(nameValueObj: object) {
    return Object.keys(nameValueObj)
        .map((name) => addPropIfValueSet(name, nameValueObj[name]));
}

function addPropIfValueSet(propName: string, propValue: any) {
    return addProp(propName, propValue, { addIfValueUnset: false });
}
