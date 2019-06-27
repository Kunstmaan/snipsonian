/* eslint-disable max-len */
/**
 * Inspired by:
 * - https://codewithstyle.info/advanced-functional-programming-in-typescript-maybe-monad/
 * - https://medium.com/@yyankowski/maybe-monad-in-javascript-to-save-us-from-the-hell-of-the-null-guard-clauses-bc9f9a1f291b
 */
/* eslint-enable max-len */

import isNull from '../is/isNull';
import isUndefined from '../is/isUndefined';

export class Maybe<Value> {
    private readonly value: Value | null | undefined;

    private constructor(value: Value | null | undefined) {
        this.value = value;
    }

    public static of<Value>(value: Value | null | undefined): Maybe<Value> {
        return new Maybe(value);
    }

    public static nothing<Value>(): Maybe<Value> {
        return new Maybe<Value>(null);
    }

    public isNothing(): boolean {
        return isNull(this.value) || isUndefined(this.value);
    }

    public map<ResultValue>(mapper: (prevValue: Value) => ResultValue): Maybe<ResultValue> {
        return this.isNothing()
            ? Maybe.nothing()
            : Maybe.of(mapper(this.value));
    }

    /**
     * Use - instead of 'map' - if the mapper function returns a Maybe.
     * (The 'map' function would otherwise result in a Maybe of a Maybe)
     */
    public flatMap<ResultValue>(mapper: (prevValue: Value) => Maybe<ResultValue>): Maybe<ResultValue> {
        return this.isNothing()
            ? Maybe.nothing()
            : mapper(this.value);
    }

    public getOrElse(elseValue: Value): Value {
        return this.isNothing()
            ? elseValue
            : this.value;
    }

    public getOrNull(): Value | null {
        return this.getOrElse(null);
    }

    public getOrEmptyArray(): Value | [] {
        return this.getOrElse([] as unknown as Value);
    }

    public getOrEmptyObject(): Value | {} {
        return this.getOrElse({} as unknown as Value);
    }
}
