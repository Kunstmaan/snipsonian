import {is} from './is';
import {snippetBuilder, prop} from '../_docRef';

const isSet = snippetBuilder(is.set)
    .desc('Determines if the input is defined and not null.')
    .params(
        prop.any('The input to be checked.').name('val')
    )
    .return(
        prop.bool('True if input is defined and not null, false otherwise.')
    )
    .examples(
        () => {
            if (is.set(prop)) {
                // do something
            } else {
                // do something else
            }
        }
    );

export default snippetBuilder(is)
    .name('is')
    .desc('Offers convenient is.xxx(val) functions that all return true ' +
        'if their input val is as requested, false otherwise.')
    .parts(
        isSet
    );

// TODO wordt te complex >> beter hier ineens (html) component maken vanuit js