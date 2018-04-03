export default function decorate(target) {
    return {
        with: (...decorators) => {
            decorators.forEach((decorator) => decorator(target));
            return target;
        },
    };
}
