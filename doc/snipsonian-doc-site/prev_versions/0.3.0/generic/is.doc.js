import {is} from './is';
import {decorate, snippet, name, desc, param, returns, examples, parts, authors, JS_DOC_TYPE} from '../_docRef';

class undefinedDoc {}
decorate(undefinedDoc).with(
    snippet(is.undefined),
    desc('Determines if the input is undefined.')
);

class nullDoc {}
decorate(nullDoc).with(
    snippet(is.null),
    desc('Determines if the input is null.')
);

class setDoc {}
decorate(setDoc).with(
    snippet(is.set),
    desc('Determines if the input is defined and not null.')
);

class functionDoc {}
decorate(functionDoc).with(
    snippet(is.function),
    desc('Determines if the input is a function.')
);

class booleanDoc {}
decorate(booleanDoc).with(
    snippet(is.boolean),
    desc('Determines if the input is a boolean.')
);

class numberDoc {}
decorate(numberDoc).with(
    snippet(is.number),
    desc('Determines if the input is a number.')
);

class stringDoc {}
decorate(stringDoc).with(
    snippet(is.string),
    desc('Determines if the input is a string.')
);

class objectDoc {}
decorate(objectDoc).with(
    snippet(is.object),
    desc('Determines if the input is an object.')
);

class arrayDoc {}
decorate(arrayDoc).with(
    snippet(is.array),
    desc('Determines if the input is an array.')
);

class builderDoc {}
decorate(builderDoc).with(
    snippet(is.builder),
    desc('Determines if the input has a build() method.'),
    param({
        type: JS_DOC_TYPE.ANY,
        desc: 'The input to be checked.',
        name: 'val'
    }),
    returns({
        type: JS_DOC_TYPE.BOOLEAN,
        desc: 'True if input is defined and has a build function, false otherwise.'
    }),
    examples(
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
);

class isDoc {}
decorate(isDoc).with(
    snippet(is),
    name('is'),
    desc('Offers convenient is.xxx(val) functions that all return true ' +
        'if their input val is as requested, false otherwise.'),
    examples(
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
    ),
    parts(
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
    ),
    authors('Ben')
);

export default isDoc;