const dummy = ({foo = true, bar = {}, boo}) => {
    if (foo) {
        return `${bar} ${boo} baz`;
    }
    return boo;
};

export default dummy;