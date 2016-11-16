import is from './is';
import {snippet, prop} from '../_doc/document';

const isSet = snippet(is.set)
    .desc('Determines if the input is defined and not null.')
    .params(
        prop().any()
            .name('val')
            .desc('The input to be checked.')
    )
    .return(
        prop().bool()
            .desc('True if input is defined and not null, false otherwise.')
    )
    .examples(
        () => {
            const obj = {
                someField: 'some value'
            };
            return is.set(obj.someField);
        }
    );

snippet(is)
    .tab('generic')
    .name('is')
    .desc('Offers convenient is.xxx(val) functions that all return true ' +
        'if their input val is as requested, false otherwise.')
    .subDocs(
        isSet
    )
    .add();

// TODO tab >> group

// TODO wordt te complex >> beter hier ineens (html) component maken vanuit js
// TODO al beter indien geen propBuilder, of alles gewoon met object/properties?