/* global document */

import getNameIfDefined from './getNameIfDefined';
import {is} from '../../index';

export const getSnippetNavId = (group, snippet, part) =>
    getNavId('snippet',
        getNameIfDefined(group),
        getNameIfDefined(snippet),
        getNameIfDefined(part)
    );

export const scrollToSnippet = (group, snippet, part) => {
    const navId = getSnippetNavId(group, snippet, part);
    scrollTo(navId);
};

function getNavId(type, ...levelNames) {
    let navId = `nav_${type}`;

    levelNames.forEach((levelName) => {
        if (is.set(levelName)) {
            navId += `_${levelName}`;
        }
    });

    return navId;
}

function scrollTo(navId) {
    const elementToScrollTo = document.getElementById(navId);
    if (elementToScrollTo) {
        elementToScrollTo.scrollIntoView();
    }
}