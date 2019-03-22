import getUrlPartBetween from './getUrlPartBetween';

import {decorate, snippet, name, desc, param, examples, authors, JS_DOC_TYPE} from '../_docRef';

class getUrlPartBetweenDoc {}
decorate(getUrlPartBetweenDoc).with(
    snippet(getUrlPartBetween),
    name('getUrlPartBetween'),
    desc('Returns the part from the current url pathname between the strings specified.'),
    param({
        name: 'firstPart',
        type: JS_DOC_TYPE.STRING,
        description: 'The string before the part you are looking for'
    }),
    param({
        name: 'secondPart',
        type: JS_DOC_TYPE.STRING,
        desc: 'The string after the part you are looking for. Defaults to "/"',
        isOptional: true
    }),
    param({
        name: 'url',
        type: JS_DOC_TYPE.STRING,
        desc: 'The url out of which you want to get the part. Defaults to "window.location.pathname',
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