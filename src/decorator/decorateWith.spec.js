import {decorate} from './decorateWith';
import addProp from './addProp';
import collapsable from './collapsable';

describe('decorate(target).with(...decorators)', () => {
    it('executes each decorator by passing the target as input and returns the target', () => {
        const target = {
            someVar: 'some val'
        };

        const actual = decorate(target).with(
            addProp('otherVar', 12098),
            collapsable({initialIsCollapsed: true})
        );

        expect(actual.someVar).toEqual('some val');
        expect(actual.otherVar).toEqual(12098);
        expect(actual.isCollapsed).toEqual(true);

        expect(actual).toBe(target);
    });
});