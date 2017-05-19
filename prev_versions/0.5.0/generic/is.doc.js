import {is} from './is';
import {snippet, name, desc, param, returns, examples, parts, authors, JS_DOC_TYPE} from '../_docRef';

@desc('Determines if the input is undefined.')
@snippet(is.undefined)
class undefinedDoc {
}

@desc('Determines if the input is null.')
@snippet(is.null)
class nullDoc {
}

@desc('Determines if the input is defined and not null.')
@snippet(is.set)
class setDoc {
}

@desc('Determines if the input is a function.')
@snippet(is.function)
class functionDoc {
}

@desc('Determines if the input is a boolean.')
@snippet(is.boolean)
class booleanDoc {
}

@desc('Determines if the input is a number.')
@snippet(is.number)
class numberDoc {
}

@desc('Determines if the input is a string.')
@snippet(is.string)
class stringDoc {
}

@desc('Determines if the input is an object.')
@snippet(is.object)
class objectDoc {
}

@desc('Determines if the input is an array.')
@snippet(is.array)
class arrayDoc {
}

@desc('Determines if the input has a build() method.')
@param({
    type: JS_DOC_TYPE.ANY,
    desc: 'The input to be checked.',
    name: 'val'
})
@returns({
    type: JS_DOC_TYPE.BOOLEAN,
    desc: 'True if input is defined and has a build function, false otherwise.'
})
@examples(
    `
        class DummyBuilder {
            constructor() {
                this.parts = ['A', 'B', 'C'];
            }

            build() {
                return this.parts.join('-');
            }
        }

        const dummyObj = new DummyBuilder();

        if (is.builder(dummyObj)) {
            return dummyObj.build();
        }

        return dummyObj;
    `
)
@snippet(is.builder)
class builderDoc {
}

@name('is')
@desc('Offers convenient is.xxx(val) functions that all return true ' +
    'if their input val is as requested, false otherwise.')
@examples(
    `
        const someVar = 'some value';
        is.undefined(someVar);  // => false
        is.null(someVar); // => false
        is.set(someVar); // => true
        is.function(someVar); // => false
        is.boolean(someVar); // => false
        is.number(someVar); // => false
        is.string(someVar); // => true
        is.object(someVar); // => false
        is.array(someVar); // => false
        is.builder(someVar); // => false
    `
)
@parts(
    undefinedDoc,
    nullDoc,
    setDoc,
    functionDoc,
    booleanDoc,
    numberDoc,
    stringDoc,
    objectDoc,
    arrayDoc,
    builderDoc
)
@authors('Ben')
@snippet(is)
class isDoc {
}

export default isDoc;