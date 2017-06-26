import {is} from './is';
import replacePlaceholders from '../string/replacePlaceholders';

export const assert = (val, validator, errorMessage = 'Assertion error for value \'{val}\'.') => {
    assertValidValidator(validator);

    if (!validator(val)) {
        throw new Error(
            replacePlaceholders({msg: errorMessage, placeholders: {val}})
        );
    }
};

export default assert;

function assertValidValidator(validator) {
    if (!is.function(validator)) {
        throw new Error('Please provide a validator function.');
    }
}