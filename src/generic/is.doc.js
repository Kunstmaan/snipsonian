import {is} from './is';
import {decorate, snippet, desc, params, returns, examples, parts, authors, prop} from '../_docRef';

class set {}
decorate(set).with(
    snippet(is.set),
    desc('Determines if the input is defined and not null.'),
    params(
        prop.any('The input to be checked.').name('val')
    ),
    returns(prop.bool('True if input is defined and not null, false otherwise.')),
    examples(
        () => {
            if (is.set(prop)) {
                // do something
            } else {
                // do something else
            }
        }
    )
);

class isDoc {}
decorate(isDoc).with(
    snippet(is),
    desc('Offers convenient is.xxx(val) functions that all return true ' +
        'if their input val is as requested, false otherwise.'),
    parts(
        set
    ),
    authors('Ben')
);

export default isDoc;