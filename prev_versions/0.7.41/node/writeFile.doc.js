import writeFile from './writeFile';
import {snippet, name, desc, paramObject, returns, paramObjectField, examples, authors, JS_DOC_TYPE} from '../_docRef';

@name('writeFile')
@desc('Creates a promise to write a file with fs')
@paramObject(
    paramObjectField({
        name: 'filePath',
        type: JS_DOC_TYPE.STRING,
        desc: 'The path where to write the file'
    }),
    paramObjectField({
        name: 'data',
        type: JS_DOC_TYPE.STRING,
        desc: 'The contents of the data'
    }),
    paramObjectField({
        name: 'fs',
        type: JS_DOC_TYPE.FUNCTION,
        desc: 'The node fs module'
    }),
    paramObjectField({
        type: JS_DOC_TYPE.OBJECT,
        name: 'options',
        defaultValue: '{}',
        isOptional: true,
        desc: 'Options that are passed to fs when writing the file'
    })
)
@returns({
    type: JS_DOC_TYPE.PROMISE,
    desc: 'Gets resolved when the file has been written to the disk'
})
@authors('Thomas')
@examples(`
    const thePromise = writeFilePromise({
        filePath: '/path/to/somewhere',
        data: 'Lorem Ipsum Dolor Sit Amet',
        fs
    });
        
    thePromise.then(doSomething)
`)
@snippet(writeFile)
class writeFilePromiseDoc {
}

export default writeFilePromiseDoc;