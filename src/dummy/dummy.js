const dummy = ({foo = true, bar = {}, boo}) => {
    if (foo) {
        return bar + boo;
    }
    return boo;
};

export default dummy;

/* This is a test */