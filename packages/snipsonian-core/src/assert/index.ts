import isFunction from '../is/isFunction';
import replacePlaceholders from '../string/replacePlaceholders';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TValidator = (val: any) => boolean;

export default function assert(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    val: any,
    validator: TValidator,
    errorMessage: string = 'Assertion error for value \'{val}\'.',
): void {
    assertValidValidator(validator);

    if (!validator(val)) {
        throw new Error(replacePlaceholders({ msg: errorMessage, placeholders: { val } }));
    }
}

function assertValidValidator(validator: TValidator): void {
    if (!isFunction(validator)) {
        throw new Error('Please provide a validator function.');
    }
}
