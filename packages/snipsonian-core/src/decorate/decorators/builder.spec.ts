import builder, { IBuilder } from './builder';
import isFunction from '../../is/isFunction';

describe('builder()', () => {
    it('follows the decorator pattern : returns a decorate function that in turn expects the target as input', () => {
        const actual = builder();

        expect(isFunction(actual)).toEqual(true);
    });

    it('enriches the input entity (= target) to become a builder (has a build method etc.)', () => {
        class SomeClass {}
        expect(SomeClass['build']).not.toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation
        expect(SomeClass['with']).not.toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation

        builder()(SomeClass);

        expect(SomeClass['build']).toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation
        expect(SomeClass['with']).toBeDefined(); // eslint-disable-line @typescript-eslint/dot-notation
    });

    it(
        'uses by default _builder for the name of the temporary buildState object ' +
        '+ it is by default an empty object',
        () => {
            const actual = builder()({});

            /* eslint no-underscore-dangle: "off" */
            expect(actual._builder).toEqual({});
        },
    );

    it('the initialBuildParams and the buildStateName can be specified', () => {
        const initialBuildParams = {
            someParam: 'some val',
            otherParam: [1, 2, 3],
        };
        const buildStateName = 'customState';

        const actual = builder({ initialBuildParams, buildStateName })({});

        expect(actual.customState).toEqual({
            someParam: 'some val',
            otherParam: [1, 2, 3],
        });
    });

    it(
        'the enriched with() function sets a property, with the input key as name and val as its value, on the ' +
        'buildState object and returns the builder (so allowing a fluent api)',
        () => {
            const dummyBuilder = builder({ initialBuildParams: {}, buildStateName: 'myBuilderState' })({});
            expect(dummyBuilder.build).toBeDefined();

            const actual = dummyBuilder.with('type', 4);

            expect(actual.build).toBeDefined();
            expect(actual.myBuilderState).toEqual({
                type: 4,
            });

            const actual2 = dummyBuilder.with('subType', '27');

            expect(actual2.myBuilderState).toEqual({
                type: 4,
                subType: '27',
            });
        },
    );

    it('the enriched build() function returns the (modified) buildState object', () => {
        const initialBuildParams = {
            message: 'some message',
        };
        const dummyBuilder = builder({ initialBuildParams })({
            someVar: 'this var is not returned by the build method',
        })
            .with('uniqueId', 123704)
            .with('title', 'Some title');

        const actual = dummyBuilder.build();

        expect(actual).toEqual({
            uniqueId: 123704,
            title: 'Some title',
            message: 'some message',
        });
    });

    it('enriches each entry if the input is an array', () => {
        const firstEntity = {};
        const secondEntity = {};

        const actual = builder()([firstEntity, secondEntity]);

        expect(actual.length).toEqual(2);

        expect((firstEntity as IBuilder).build).toBeDefined();
        expect((secondEntity as IBuilder).build).toBeDefined();
    });
});
