import buildIfBuilder from './buildIfBuilder';

describe('buildIfBuilder()', () => {
    class SomeBuilder {
        private someProp: string;
        public constructor() {
            this.someProp = 'a_b_c';
        }

        public build(): string {
            return this.someProp;
        }
    }

    it('returns the result of the build function if the input is a builder', () => {
        const builder = new SomeBuilder();

        expect(buildIfBuilder(builder)).toEqual('a_b_c');
    });

    it('just returns the input if the input is not a builder', () => {
        const noBuilder = {
            someProp: 'x_y_z',
        };

        expect(buildIfBuilder(noBuilder)).toEqual(noBuilder);
    });

    it('returns an array of the build() results of each entry if the input is an array of (potential) builders', () => {
        const builder = new SomeBuilder();
        const noBuilder = 'Will just be returned AS IS';
        const otherBuilder = {
            build: () => 'builded!',
        };

        const actual = buildIfBuilder([
            builder,
            noBuilder,
            otherBuilder,
        ]);

        expect(actual).toEqual([
            'a_b_c',
            'Will just be returned AS IS',
            'builded!',
        ]);
    });
});
