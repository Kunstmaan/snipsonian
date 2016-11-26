export const decorate = (entiryToDecorate) => ({
    with: (...decorators) => {
        decorators.forEach((decorator) => decorator(entiryToDecorate));
    }
});