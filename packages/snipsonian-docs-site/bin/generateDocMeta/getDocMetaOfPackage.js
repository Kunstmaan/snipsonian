const path = require('path');
const getFilesRecursiveSync = require('../../../snipsonian-node/src/dir/getFilesRecursiveSync');

function getDocMetaOfPackage({packageInfo, snippetsSubDir}) {
    const fileInfos = getFilesRecursiveSync({
        sourcePath: path.resolve(packageInfo.path, snippetsSubDir)
    });

    return {
        name: packageInfo.name,
        files: fileInfos
    };
}

module.exports = getDocMetaOfPackage;
