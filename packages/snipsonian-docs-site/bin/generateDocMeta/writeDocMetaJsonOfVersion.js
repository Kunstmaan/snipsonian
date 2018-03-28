const path = require('path');
const writeFile = require('../../../snipsonian-node/src/file/writeFile');

const ENCODING = 'utf8';

function writeDocMetaJsonOfVersion({
    targetDir,
    version,
    packageDocMetas
}) {
    const docMeta = {
        version,
        packages: packageDocMetas
    };

    return writeFile({
        filePath: path.resolve(targetDir, `${version}.json`),
        data: JSON.stringify(docMeta),
        options: ENCODING
    });
}

module.exports = writeDocMetaJsonOfVersion;
