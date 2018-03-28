const path = require('path');
const getFilesRecursiveSync = require('../../../snipsonian-node/src/dir/getFilesRecursiveSync');

function getDocMetaOfPackage({packageInfo, snippetsSubDir}) {
    const files = getFilesRecursiveSync({
        sourcePath: path.resolve(packageInfo.path, snippetsSubDir)
    });

    return {
        name: packageInfo.name,
        files
    };
}

module.exports = getDocMetaOfPackage;
