import {is} from './is';
import {snippet, prop} from '../_doc/documentJs';

const isSet = snippet(is.set)
    .desc('Determines if the input is defined and not null.')
    .params(
        prop.any('The input to be checked.').name('val')
    )
    .return(
        prop.bool('True if input is defined and not null, false otherwise.')
    )
    .examples(
        () => {
            const obj = {
                someField: 'some value'
            };
            return is.set(obj.someField);
        }
    );

export default snippet(is)
    .name('is')
    .desc('Offers convenient is.xxx(val) functions that all return true ' +
        'if their input val is as requested, false otherwise.')
    .parts(
        isSet
    );

// TODO wordt te complex >> beter hier ineens (html) component maken vanuit js