import {assert} from './assert';
import {decorate, snippet, name, desc, param, examples, authors, JS_DOC_TYPE} from '../_docRef';

class assertDoc {}
decorate(assertDoc).with(
    snippet(assert),
    name('assert'),
    desc('To easily assert a certain value. Will throw an error if the value is not valid ' +
        'according to the input validator.'),
    param({
        name: 'val',
        type: JS_DOC_TYPE.ANY,
        desc: 'The value to be asserted/verified.'
    }),
    param({
        name: 'validator',
        type: JS_DOC_TYPE.FUNCTION,
        desc: 'Validates if the input is valid or not.'
    }),
    param({
        name: 'errorMessage',
        type: JS_DOC_TYPE.STRING,
        desc: 'The error message to throw if \'val\' is not valid. If omitted, a generic error message will be thrown.',
        isOptional: true
    }),
    examples(
        `
            const someUser = {
                age: 17
            };

            const isAnAdult = (person) => person.age >= 18;

            assert(someUser, isAnAdult, 'Sorry. You should be 18 years old.');
            // => throws Error with message 'Sorry. You should be 18 years old.'
        `
    ),
    authors('Ben')
);

export default assertDoc;