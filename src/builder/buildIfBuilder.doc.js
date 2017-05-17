import buildIfBuilder from './buildIfBuilder';
import {decorate, snippet, name, desc, param, returns, examples, authors, JS_DOC_TYPE} from '../_docRef';

class buildIfBuilderDoc {}
decorate(buildIfBuilderDoc).with(
    snippet(buildIfBuilder),
    name('buildIfBuilder'),
    desc('If the input entity is a builder, it returns the return value of its build function. ' +
        'Otherwise the input is returned. Will also try to build each item if the input is an array.'),
    param({
        type: JS_DOC_TYPE.ANY,
        desc: 'A builder, or an array of builders.',
        name: 'entity'
    }),
    returns({
        type: JS_DOC_TYPE.ANY,
        desc: 'Either the result of calling the build function of the input entity, or the entity itself.' +
        'In case of an input array: an array of either the build results or either the input entities themselves.'
    }),
    examples(
        `
            const someBuilder = {
                build: () => 'some result of build function'
            };

            const result = buildIfBuilder(someBuilder);

            console.log(result);
            // => 'some result of build function'
        `
    ),
    authors('Ben')
);

export default buildIfBuilderDoc;
