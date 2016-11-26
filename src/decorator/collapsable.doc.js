import collapsable from './collapsable';
import {decorate, snippet, desc, param, returns, examples, authors, JS_DOC_TYPE} from '../_docRef';

class collapsableDoc {}
decorate(collapsableDoc).with(
    snippet(collapsable),
    desc('Decorator that makes the target collapsable by adding a isCollapsed boolean variable ' +
        'and a toggleCollapse to togle the isCollapsed value.'),
    param({
        type: JS_DOC_TYPE.BOOLEAN,
        desc: 'Optional. Initial value of isCollapsed. Default false.',
        name: 'initialIsCollapsed',
        isOptional: true
    }),
    returns({
        type: JS_DOC_TYPE.FUNCTION,
        desc: 'Function that will do the decoration of the target input.'
    }),
    examples(
        () => {
            const firstBlock = {
                title: '1st title'
            };

            const secondBlock = {
                title: '2nd title'
            };

            collapsable()(firstBlock);  // initially not collapsed (default)
            collapsable(true)(secondBlock);  // initially collapsed

            console.log(firstBlock.isCollapsed);
            // => false

            console.log(secondBlock.isCollapsed);
            // => true

            firstBlock.toggleCollapse();
            // isCollapsed => true

            secondBlock.toggleCollapse();
            // isCollapsed => false
        }
    ),
    authors('Ben')
);

export default collapsableDoc;