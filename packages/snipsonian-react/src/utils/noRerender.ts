/**
 * Constants to be returned by for example redux selectors if they have to return e.g. an empty list or object,
 * otherwise re-creating a new [] or {} - each time the selector gets called - would result in unnecessary re-renders.
 */

interface INoRerender {
    EMPTY_LIST: [];
    EMPTY_OBJECT: {};
}

export const NO_RERENDER: INoRerender = {
    EMPTY_LIST: [],
    EMPTY_OBJECT: {},
};
