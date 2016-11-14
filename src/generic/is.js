const is = {
    undefined: (val) => typeof val === 'undefined',
    null: (val) => val === null,
    set: (val) => !is.undefined(val) && !is.null(val)
};

export default is;