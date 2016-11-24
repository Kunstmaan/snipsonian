import collapsable from './collapsable';

describe('collapsable()', () => {
    it('enriches the input entity to be collapsible', () => {
        const someBlock = {
            title: 'Block that will be collapsable',
            parts: []
        };
        expect(someBlock.isCollapsed).not.toBeDefined();
        expect(someBlock.toggleCollapse).not.toBeDefined();

        collapsable(someBlock);

        expect(someBlock.isCollapsed).toBeDefined();
        expect(someBlock.toggleCollapse).toBeDefined();
    });

    it('sets the enriched isCollapsed boolean by default to false', () => {
        expect(collapsable({}).isCollapsed).toEqual(false);
    });

    it('initial isCollapsed value can be set', () => {
        expect(collapsable({}, true).isCollapsed).toEqual(true);
        expect(collapsable({}, false).isCollapsed).toEqual(false);
    });

    it('the enriched toggleCollapse() function toggles the isCollapsed value', () => {
        const actual = collapsable({
            someVar: 'some value'
        }, false);

        expect(actual.isCollapsed).toEqual(false);

        actual.toggleCollapse();

        expect(actual.isCollapsed).toEqual(true);

        actual.toggleCollapse();

        expect(actual.isCollapsed).toEqual(false);
    });

    it('enriches each entry if the input is an array', () => {
        const firstEntity = {};
        const secondEntity = {};

        const actual = collapsable([firstEntity, secondEntity], true);

        expect(actual.length).toEqual(2);

        expect(firstEntity.isCollapsed).toEqual(true);
        expect(secondEntity.isCollapsed).toEqual(true);

        secondEntity.toggleCollapse();

        expect(firstEntity.isCollapsed).toEqual(true);
        expect(secondEntity.isCollapsed).toEqual(false);
    });
});