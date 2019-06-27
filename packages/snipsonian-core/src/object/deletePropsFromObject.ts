export default function deletePropsFromObject(obj: object): void {
    Object.keys(obj)
        .forEach((propName) => {
            // @ts-ignore
            delete obj[propName]; // eslint-disable-line no-param-reassign
        });
}
