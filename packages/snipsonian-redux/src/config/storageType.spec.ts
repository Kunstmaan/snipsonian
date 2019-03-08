import STORAGE_TYPE from '../../../snipsonian-browser/src/storage/storageType';
import { STATE_STORAGE_TYPE, REDUCER_STORAGE_TYPE } from './storageType';

describe('storageType:', () => {
    describe('STATE_STORAGE_TYPE:', () => {
        it('some of the values have to be identical to the browser STORAGE_TYPE', () => {
            expect(STATE_STORAGE_TYPE.LOCAL).toEqual(STORAGE_TYPE.localStorage);
            expect(STATE_STORAGE_TYPE.SESSION).toEqual(STORAGE_TYPE.sessionStorage);
        });
    });

    describe('REDUCER_STORAGE_TYPE:', () => {
        it('some of the values have to be identical to the STATE_STORAGE_TYPE', () => {
            expect(REDUCER_STORAGE_TYPE.LOCAL).toEqual(STATE_STORAGE_TYPE.LOCAL);
            expect(REDUCER_STORAGE_TYPE.SESSION).toEqual(STATE_STORAGE_TYPE.SESSION);
            expect(REDUCER_STORAGE_TYPE.NO_STORAGE).toEqual(STATE_STORAGE_TYPE.NO_STORAGE);
            expect(REDUCER_STORAGE_TYPE.CUSTOM).toEqual(STATE_STORAGE_TYPE.CUSTOM);
        });
    });
});
