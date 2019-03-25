export type TDecorator = (target: any) => any;

export default function decorate(target: any) {
    return {
        with: (...decorators: TDecorator[]) => {
            decorators.forEach((decorator) => decorator(target));
            return target;
        },
    };
}
