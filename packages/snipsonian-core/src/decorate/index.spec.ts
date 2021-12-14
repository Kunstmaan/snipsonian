import decorate from './index';
import addProp from './decorators/addProp';
import collapsable from './decorators/collapsable';

describe('decorate(target).with(...decorators)', () => {
    it('executes each decorator by passing the target as input and returns the target', () => {
        const target = {
            someVar: 'some val',
        };

        const actual = decorate(target).with(
            addProp('otherVar', 12098),
            collapsable({ initialIsCollapsed: true }),
        );

        expect(actual.someVar).toEqual('some val');
        expect(actual['otherVar']).toEqual(12098); // eslint-disable-line @typescript-eslint/dot-notation
        expect(actual['isCollapsed']).toEqual(true); // eslint-disable-line @typescript-eslint/dot-notation

        expect(actual).toBe(target);
    });
});
