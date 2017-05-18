import getUrlPartBetween from './getUrlPartBetween';

import {decorate, snippet, name, desc, paramObject, paramObjectPart, examples, authors, JS_DOC_TYPE} from '../_docRef';

class getUrlPartBetweenDoc {
}
decorate(getUrlPartBetweenDoc).with(
    snippet(getUrlPartBetween),
    name('getUrlPartBetween'),
    desc('Returns the part from the current url pathname between the strings specified.'),
    paramObject({}),
    paramObjectPart(0, {
        type: JS_DOC_TYPE.STRING,
        name: 'firstPart',
        desc: 'The part that comes before the string you are looking for'
    }),
    paramObjectPart(0, {
        type: JS_DOC_TYPE.STRING,
        name: 'secondPart',
        desc: 'The part after the string you are looking for',
        defaultValue: '/',
        isOptional: true
    }),
    paramObjectPart(0, {
        type: JS_DOC_TYPE.STRING,
        name: 'url',
        desc: 'The url out of which you want to get the part.',
        defaultValue: 'window.location.pathname',
        isOptional: true
    }),
    examples(
        `
            const urlPartImLookingFor = getUrlPartBetween({firstPart: 'doc/'});
            const urlPartImLookingFor2 = getUrlPartBetween({firstPart: 'doc/', secondPart: '/'});
        `
    ),
    authors('Thomas')
);

export default getUrlPartBetweenDoc;