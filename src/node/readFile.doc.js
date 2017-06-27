import readFile from './readFile';
import {snippet, name, desc, authors, signature, since, param, JS_DOC_TYPE} from '../_docRef';

@name('readFile')
@desc('Wraps fs.readFile in a Promise')
@param({
    name: 'filePath',
    type: JS_DOC_TYPE.STRING,
    desc: 'The path of the file to read',
    isOptional: false
})
@param({
    name: 'options',
    type: JS_DOC_TYPE.OBJECT,
    desc: 'Options to pass to fs.readFile',
    isOptional: true
})
@authors('Thomas Seberechts')
@since('0.8.1')
@signature('({filePath, options = {})')
@snippet(readFile)
class readFileDoc {
}

export default readFileDoc;
