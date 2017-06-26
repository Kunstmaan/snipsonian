const dummy = ({foo = true, bar = 'baz', boo}) => {
    if (foo) {
        return bar + boo;
    }
    return boo;
};

export default dummy;