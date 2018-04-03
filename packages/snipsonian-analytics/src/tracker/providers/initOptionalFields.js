import decorate from '../../../../snipsonian-core/src/decorate';
import addProp from '../../../../snipsonian-core/src/decorate/decorators/addProp';

export default function initOptionalFields(nameValueObj) {
    return decorate({})
        .with(...toAddPropDecorators(nameValueObj));
}

function toAddPropDecorators(nameValueObj) {
    return Object.keys(nameValueObj)
        .map((name) => addPropIfValueSet(name, nameValueObj[name]));
}

function addPropIfValueSet(propName, propValue) {
    return addProp(propName, propValue, { addIfValueUnset: false });
}
