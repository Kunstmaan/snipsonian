/**
 * Does a deep clone of the input object, and thus returning a new object.
 * It only clones data/json properties, as in string, number, boolean, object, array properties.
 * So if the input object contains e.g. a function, the cloned object would not contain that property.
 */
import isObjectPure from '../is/isObjectPure';

export default function cloneObjectDataProps(obj: object): object {
    if (!isObjectPure(obj)) {
        return null;
    }

    return JSON.parse(
        JSON.stringify(obj),
    );
}
