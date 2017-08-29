const decorate = (target) => ({
    with: (...decorators) => {
        decorators.forEach((decorator) => decorator(target));
        return target;
    }
});

export default decorate;