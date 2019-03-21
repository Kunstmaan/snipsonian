import addProp from './addProp';
import {snippet, name, desc, param, returns, canThrow, examples, authors, JS_DOC_TYPE} from '../_docRef';

@name('addProp')
@desc('Decorator to add a property to a target (or array of targets).')
@param({
    type: JS_DOC_TYPE.STRING,
    desc: 'The name of the property to add/set.',
    name: 'propName'
})
@param({
    type: JS_DOC_TYPE.ANY,
    desc: 'Optional. The value to use. Default undefined.',
    name: 'propValue',
    isOptional: true
})
@returns({
    type: JS_DOC_TYPE.FUNCTION,
    desc: 'Function that will do the decoration of the target input. This input can be a single target, ' +
    'or an array of targets (in which case all targets will get the extra property).'
})
@canThrow({
    error: 'Required input argument \'propName\' is missing.',
    when: 'No input parameters.'
})
@examples(
    `
        const someTicket = {
            title: 'Important bug'
        };

        addProp('priority', 1)(someTicket);

        console.log(someTicket.priority);
        // => 1
    `
)
@authors('Ben')
@snippet(addProp)
class addPropDoc {
}

export default addPropDoc;