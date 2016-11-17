import getNameIfDefined from './getNameIfDefined';
import {is} from '../../index';

export const getSnippetLocation = (group, snippet, part) =>
    getLocation(
        getNameIfDefined(group),
        getNameIfDefined(snippet),
        getNameIfDefined(part)
    );

function getLocation(...locationParts) {
    let location = '';

    locationParts.forEach((locationPart) => {
        if (is.set(locationPart)) {
            location += `/${locationPart}`;
        }
    });

    return location;
}