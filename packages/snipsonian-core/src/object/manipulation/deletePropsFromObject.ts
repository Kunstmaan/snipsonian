export default function deletePropsFromObject(obj: object): void {
    Object.keys(obj)
        .forEach((propName) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete obj[propName]; // eslint-disable-line no-param-reassign
        });
}
