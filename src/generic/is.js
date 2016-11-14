const is = {
    undefined: (val) => typeof val === 'undefined',
    null: (val) => val === null,
    set: (val) => !is.undefined(val) && !is.null(val),
    function: (func) => typeof func === 'function',
    boolean: (bool) => typeof bool === 'boolean',
    number: (nr) => typeof nr === 'number',
    string: (str) => typeof str === 'string',
    object: (obj) => typeof obj === 'object',
    array: (arr) => Array.isArray(arr),
    builder: (bldr) => is.set(bldr) && is.function(bldr.build)
};

export default is;