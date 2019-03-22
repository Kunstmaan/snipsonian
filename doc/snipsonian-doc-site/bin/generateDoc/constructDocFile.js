const fs = require('fs');
const gitUserName = require('git-user-name');

const writeFile = require('../../src/node/writeFile');

module.exports = function constructDocFile(snippet) {
    return writeFile({
        filePath: snippet.docPath,
        data: getContentString(snippet),
        options: 'utf8',
        fs
    });
};

function getContentString(snippet) {
    return (
`import ${snippet.name} from './${snippet.name}';
import {snippet, name, desc, authors, signature, since, param, JS_DOC_TYPE} from '../_docRef';

@name('${snippet.name}')
@desc('${snippet.description}')
${getParamsString(snippet)}
@authors('${gitUserName()}')
@since('<$SINCE$>')
@signature('${snippet.signature.replace(/'/g, '\\\'')}')
@snippet(${snippet.name})
class ${snippet.name}Doc {
}

export default ${snippet.name}Doc;
`);
}


function getParamsString(snippet) {
    const paramsArray = snippet.params.map((param) =>
`@param({
    name: '${param.name}',
    type: JS_DOC_TYPE.${param.type.toUpperCase()},
    desc: '${param.desc}',
    isOptional: ${!param.required}
})`);

    return paramsArray.join('\n');
}
