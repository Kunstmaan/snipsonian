import replacePlaceholders from './replacePlaceholders';
import {
    snippet,
    desc,
    name,
    paramObject,
    paramObjectField,
    returns,
    examples,
    authors,
    JS_DOC_TYPE
} from '../_docRef';

@name('replacePlaceHolders')
@desc('Replaces placeholders of the format {key} with the appropriate values.')
@paramObject(
    paramObjectField({
        type: JS_DOC_TYPE.STRING,
        desc: 'The message containing the {placeholders}.',
        name: 'msg'
    }),
    paramObjectField({
        type: JS_DOC_TYPE.OBJECT,
        desc: 'Object containing for each placeholder a \'key: value\' pair',
        name: 'placeholders',
        isOptional: true
    })
)
@returns({
    type: JS_DOC_TYPE.STRING,
    desc: 'The input msg where the placeholders have been replaced.'
})
@examples(
    `
            const msg = 'Hello {firstName} {lastName}!';
        
            replacePlaceholders({
                msg: ,
                placeholders: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            });
            // => 'Hello John Doe!'
        `
)
@authors('Ben')
@snippet(replacePlaceholders)
class replacePlaceholdersDoc {
}

export default replacePlaceholdersDoc;
