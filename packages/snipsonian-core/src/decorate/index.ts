// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TDecorator = (target: any) => any;

interface IDecorateTargetWith<Target> {
    with: (...decorators: TDecorator[]) => Target;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function decorate<Target = any>(
    target: Target,
): IDecorateTargetWith<Target> {
    return {
        with: (...decorators: TDecorator[]) => {
            decorators.forEach((decorator) => decorator(target));
            return target;
        },
    };
}
