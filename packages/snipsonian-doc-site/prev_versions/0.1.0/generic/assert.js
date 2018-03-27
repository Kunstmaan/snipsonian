import {is} from './is';

export const assert = (val, validator, errorMessage) => {
    assertValidValidator(validator);

    if (!validator(val)) {
        throw new Error(errorMessage || `Assertion error for value '${val}'.`);
    }
};

export default assert;

function assertValidValidator(validator) {
    if (!is.function(validator)) {
        throw new Error('Please provide a validator function.');
    }
}