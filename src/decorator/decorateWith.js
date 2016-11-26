export const decorate = (target) => ({
    with: (...decorators) => {
        decorators.forEach((decorator) => decorator(target));
    }
});