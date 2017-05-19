import getUrlPartBetween from './getUrlPartBetween';

import {snippet, name, desc, paramObject, returns, paramObjectField, examples, authors, JS_DOC_TYPE} from '../_docRef';

@name('getUrlPartBetween')
@desc('Returns the part from the current url pathname between the strings specified.')
@paramObject(
    paramObjectField({
        type: JS_DOC_TYPE.STRING,
        name: 'firstPart',
        desc: 'The part that comes before the string you are looking for'
    }),
    paramObjectField({
        type: JS_DOC_TYPE.STRING,
        name: 'secondPart',
        desc: 'The part after the string you are looking for',
        defaultValue: '/',
        isOptional: true
    }),
    paramObjectField({
        type: JS_DOC_TYPE.STRING,
        name: 'url',
        desc: 'The url out of which you want to get the part.',
        defaultValue: 'window.location.pathname',
        isOptional: true
    })
)
@returns({
    type: JS_DOC_TYPE.STRING,
    desc: 'The part of the string found between the two given parts'
})
@examples(
    `
            const urlPartImLookingFor = getUrlPartBetween({firstPart: 'doc/'});
            const urlPartImLookingFor2 = getUrlPartBetween({firstPart: 'doc/', secondPart: '/'});
        `
)
@authors('Thomas')
@snippet(getUrlPartBetween)
class getUrlPartBetweenDoc {
}

export default getUrlPartBetweenDoc;