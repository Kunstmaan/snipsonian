import collapsable, { ICollapsable } from './collapsable';
import isFunction from '../../is/isFunction';

describe('collapsable()', () => {
    it('follows the decorator pattern : returns a decorate function that in turn expects the target as input', () => {
        const actual = collapsable();

        expect(isFunction(actual)).toEqual(true);
    });

    it('enriches the input entity (= target) to be collapsible', () => {
        const someBlock = {
            title: 'Block that will be collapsable',
        };
        expect(someBlock['isCollapsed']).not.toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation
        expect(someBlock['toggleCollapse']).not.toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation

        collapsable()(someBlock);

        expect(someBlock['isCollapsed']).toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation
        expect(someBlock['toggleCollapse']).toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation
    });

    it('sets the enriched isCollapsed boolean by default to false', () => {
        expect(collapsable()({}).isCollapsed).toEqual(false);
    });

    it('initial isCollapsed value can be set', () => {
        expect(collapsable({ initialIsCollapsed: true })({}).isCollapsed).toEqual(true);
        expect(collapsable({ initialIsCollapsed: false })({}).isCollapsed).toEqual(false);
    });

    it('the enriched toggleCollapse() function toggles the isCollapsed value', () => {
        const actual = collapsable({ initialIsCollapsed: false })({
            someVar: 'some value',
        });

        expect(actual.isCollapsed).toEqual(false);

        actual.toggleCollapse();

        expect(actual.isCollapsed).toEqual(true);

        actual.toggleCollapse();

        expect(actual.isCollapsed).toEqual(false);
    });

    it('enriches each entry if the input is an array', () => {
        const firstEntity = {};
        const secondEntity = {};

        const actual = collapsable({ initialIsCollapsed: true })([firstEntity, secondEntity]);

        expect(actual.length).toEqual(2);

        expect((firstEntity as ICollapsable).isCollapsed).toEqual(true);
        expect((secondEntity as ICollapsable).isCollapsed).toEqual(true);

        (secondEntity as ICollapsable).toggleCollapse();

        expect((firstEntity as ICollapsable).isCollapsed).toEqual(true);
        expect((secondEntity as ICollapsable).isCollapsed).toEqual(false);
    });
});
