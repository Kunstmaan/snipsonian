import {is} from './is';

describe('is:', () => {
    describe('is.undefined()', () => {
        it('returns true if input undefined', () => {
            expect(is.undefined()).toEqual(true);
            expect(is.undefined(undefined)).toEqual(true);

            let varWithoutValue;
            expect(is.undefined(varWithoutValue)).toEqual(true);
        });

        it('returns false if input defined', () => {
            expect(is.undefined('')).toEqual(false);
            expect(is.undefined(0)).toEqual(false);
            expect(is.undefined([])).toEqual(false);
            expect(is.undefined({})).toEqual(false);
            expect(is.undefined(null)).toEqual(false);
            expect(is.undefined(() => {})).toEqual(false);
        });
    });

    describe('is.null()', () => {
        it('returns true if input null', () => {
            expect(is.null(null)).toEqual(true);

            const nullVar = null;
            expect(is.null(nullVar)).toEqual(true);
        });

        it('returns false if input not null', () => {
            expect(is.null('')).toEqual(false);
            expect(is.null(0)).toEqual(false);
            expect(is.null([])).toEqual(false);
            expect(is.null({})).toEqual(false);

            expect(is.null(undefined)).toEqual(false);
        });
    });

    describe('is.set()', () => {
        it('returns true if input defined and not null', () => {
            expect(is.set('')).toEqual(true);
            expect(is.set(0)).toEqual(true);
            expect(is.set([])).toEqual(true);
            expect(is.set({})).toEqual(true);

            const obj = {
                dummyVar: 'dummyVal'
            };
            expect(is.set(obj.dummyVar)).toEqual(true);
        });

        it('returns false if input undefined or null', () => {
            expect(is.set()).toEqual(false);
            expect(is.set(null)).toEqual(false);

            const obj = {};
            expect(is.set(obj.dummyVar)).toEqual(false);
        });
    });

    describe('is.function()', () => {
        it('returns only true if input is a function', () => {
            expect(is.function(() => {})).toEqual(true);
            expect(is.function(sum)).toEqual(true);

            expect(is.function()).toEqual(false);
            expect(is.function('')).toEqual(false);
            expect(is.function(0)).toEqual(false);
            expect(is.function([])).toEqual(false);
            expect(is.function({})).toEqual(false);
        });

        function sum(a, b) {
            return a + b;
        }
    });

    describe('is.boolean()', () => {
        it('returns only true if input is a boolean', () => {
            const dummyBool = false;

            expect(is.boolean(true)).toEqual(true);
            expect(is.boolean(false)).toEqual(true);
            expect(is.boolean(dummyBool)).toEqual(true);

            expect(is.boolean()).toEqual(false);
            expect(is.boolean('')).toEqual(false);
            expect(is.boolean(0)).toEqual(false);
            expect(is.boolean([])).toEqual(false);
            expect(is.boolean({})).toEqual(false);
            expect(is.boolean(() => {})).toEqual(false);
        });
    });

    describe('is.number()', () => {
        it('returns only true if input is a number', () => {
            const dummyNumb = 123;

            expect(is.number(0)).toEqual(true);
            expect(is.number(-1)).toEqual(true);
            expect(is.number(450.06)).toEqual(true);
            expect(is.number(dummyNumb)).toEqual(true);

            expect(is.number()).toEqual(false);
            expect(is.number('')).toEqual(false);
            expect(is.number([])).toEqual(false);
            expect(is.number({})).toEqual(false);
            expect(is.number(() => {})).toEqual(false);
        });
    });

    describe('is.string()', () => {
        it('returns only true if input is a string', () => {
            const dummyStr = 'abc';

            expect(is.string('')).toEqual(true);
            expect(is.string(dummyStr)).toEqual(true);
            expect(is.string(`${dummyStr}_xyz`)).toEqual(true);

            expect(is.string()).toEqual(false);
            expect(is.string(0)).toEqual(false);
            expect(is.string([])).toEqual(false);
            expect(is.string({})).toEqual(false);
            expect(is.string(() => {})).toEqual(false);
        });
    });

    describe('is.array()', () => {
        it('returns only true if input is an array', () => {
            const dummyArr = [7, 'b', {}];

            expect(is.array([])).toEqual(true);
            expect(is.array(dummyArr)).toEqual(true);

            expect(is.array()).toEqual(false);
            expect(is.array('')).toEqual(false);
            expect(is.array(0)).toEqual(false);
            expect(is.array({})).toEqual(false);
            expect(is.array(() => {})).toEqual(false);
        });
    });

    describe('is.object()', () => {
        it('returns only true if input is an object', () => {
            const dummyObj = {someVar: 'some value'};

            expect(is.object(dummyObj)).toEqual(true);
            expect(is.object({})).toEqual(true);

            expect(is.object([])).toEqual(true); // an array is also an object
            expect(is.object(null)).toEqual(true); // null is also an object for JS

            expect(is.object()).toEqual(false);
            expect(is.object('')).toEqual(false);
            expect(is.object(0)).toEqual(false);
            expect(is.object(() => {})).toEqual(false);
        });
    });

    describe('is.objectPure()', () => {
        it('returns only true if input is an object but not an array', () => {
            const dummyObj = {someVar: 'some value'};

            expect(is.objectPure(dummyObj)).toEqual(true);
            expect(is.objectPure({})).toEqual(true);

            expect(is.objectPure([])).toEqual(false); // !!!
            expect(is.objectPure(null)).toEqual(false); // !!!

            expect(is.objectPure()).toEqual(false);
            expect(is.objectPure('')).toEqual(false);
            expect(is.objectPure(0)).toEqual(false);
            expect(is.objectPure(() => {})).toEqual(false);
        });
    });

    describe('is.builder()', () => {
        it('returns only true if input is a builder (has a build method)', () => {
            const dummyBuilderObj = {
                build: () => {}
            };
            expect(is.builder(dummyBuilderObj)).toEqual(true);

            class DummyBuilderClass {
                build() {
                    return this.prop;
                }
            }
            expect(is.builder(DummyBuilderClass)).toEqual(false);
            expect(is.builder(new DummyBuilderClass())).toEqual(true);

            expect(is.builder()).toEqual(false);
            expect(is.builder('')).toEqual(false);
            expect(is.builder(0)).toEqual(false);
            expect(is.builder([])).toEqual(false);
            expect(is.builder({})).toEqual(false);
            expect(is.builder(() => {})).toEqual(false);
        });
    });
});