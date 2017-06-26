import {assert} from './assert';
import {snippet, name, desc, param, examples, authors, JS_DOC_TYPE} from '../_docRef';

@name('assert')
@desc('To easily assert a certain value. Will throw an error if the value is not valid ' +
    'according to the input validator.')
@param({
    name: 'val',
    type: JS_DOC_TYPE.ANY,
    desc: 'The value to be asserted/verified.'
})
@param({
    name: 'validator',
    type: JS_DOC_TYPE.FUNCTION,
    desc: 'Validates if the input is valid or not.'
})
@param({
    name: 'errorMessage',
    type: JS_DOC_TYPE.STRING,
    desc: 'The error message to throw if \'val\' is not valid. If omitted, a generic error message ' +
    'will be thrown. If it contains {val} it will be replaced with the input val param.',
    isOptional: true
})
@examples(
    `
        const someUser = {
            age: 17
        };

        const isAnAdult = (person) => person.age >= 18;

        assert(someUser, isAnAdult, 'Sorry. You should be 18 years old.');
        // => throws Error with message 'Sorry. You should be 18 years old.'
    `
)
@authors('Ben')
@snippet(assert)
class assertDoc {
}

export default assertDoc;