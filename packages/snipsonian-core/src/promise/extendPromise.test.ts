import extendPromise from './extendPromise';
import isPromise from '../is/isPromise';

describe('extendPromise()', () => {
    it('extends a given promise with the isPending and isResolved status functions', async () => {
        const { testPromise, resolveTestPromise } = getTestPromise();
        expect(isPromise(testPromise)).toBe(true);

        const actual = extendPromise(testPromise);

        expect(isPromise(actual)).toEqual(true);
        expect(actual.isPending()).toEqual(true);
        expect(actual.isResolved()).toEqual(false);
        expect(actual.isRejected()).toEqual(false);

        resolveTestPromise();

        await actual;

        expect(actual.isPending()).toEqual(false);
        expect(actual.isResolved()).toEqual(true);
        expect(actual.isRejected()).toEqual(false);
    });

    it('extends a given promise with the isRejected status function', async () => {
        const { testPromise, rejectTestPromise } = getTestPromise();

        const actual = extendPromise(testPromise);

        expect(actual.isPending()).toEqual(true);
        expect(actual.isResolved()).toEqual(false);
        expect(actual.isRejected()).toEqual(false);

        rejectTestPromise();

        try {
            await actual;
        } catch (error) {
            expect(actual.isPending()).toEqual(false);
            expect(actual.isResolved()).toEqual(false);
            expect(actual.isRejected()).toEqual(true);
        }
    });
});

function getTestPromise() {
    let resolveTestPromise: () => void = null;
    let rejectTestPromise: () => void = null;

    const testPromise = new Promise<void>((resolve, reject) => {
        resolveTestPromise = () => {
            resolve();
        };

        rejectTestPromise = () => {
            reject();
        };
    });

    return {
        testPromise,
        resolveTestPromise,
        rejectTestPromise,
    };
}
