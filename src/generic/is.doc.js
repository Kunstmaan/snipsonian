import {is} from './is';
import {decorate, snippet, desc, param, returns, examples, parts, authors, JS_DOC_TYPE} from '../_docRef';

class set {}
decorate(set).with(
    snippet(is.set),
    desc('Determines if the input is defined and not null.'),
    param({
        type: JS_DOC_TYPE.ANY,
        desc: 'The input to be checked.',
        name: 'val'
    }),
    returns({
        type: JS_DOC_TYPE.BOOLEAN,
        desc: 'True if input is defined and not null, false otherwise.'
    }),
    examples(
        () => {
            if (is.set(param)) {
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