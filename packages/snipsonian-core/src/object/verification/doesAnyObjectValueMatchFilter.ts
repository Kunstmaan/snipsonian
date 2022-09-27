import isString from '../../is/isString';
import isSetString from '../../string/isSetString';
import { TAnyObject } from '../../typings/object';
import getObjectKeyVals from '../keyVals/getObjectKeyVals';
import escapeSpecialCharsForRegex from '../../regex/escapeSpecialCharsForRegex';

export default function doesAnyObjectValueMatchFilter(
    obj: TAnyObject,
    filterValue: string,
    options: { fieldsToIgnore?: string[] } = {},
): boolean {
    if (!isSetString(filterValue)) {
        /* no filter set, so object matches */
        return true;
    }

    const filterRegex = new RegExp(escapeSpecialCharsForRegex(filterValue), 'i');
    const { fieldsToIgnore } = options;

    return getObjectKeyVals(obj)
        .filter(({ key }) => !fieldsToIgnore || fieldsToIgnore.indexOf(key) === -1)
        .some(({ value = '' }) => {
            const fieldValue = isString(value)
                ? value
                : value.toString();

            return fieldValue.search(filterRegex) > -1;
        });
}
