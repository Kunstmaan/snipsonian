import isFunction from '../is/isFunction';
import replacePlaceholders from '../string/replacePlaceholders';

export default function assert(val, validator, errorMessage = 'Assertion error for value \'{val}\'.') {
    assertValidValidator(validator);

    if (!validator(val)) {
        throw new Error(
            replacePlaceholders({msg: errorMessage, placeholders: {val}})
        );
    }
}

function assertValidValidator(validator) {
    if (!isFunction(validator)) {
        throw new Error('Please provide a validator function.');
    }
}
