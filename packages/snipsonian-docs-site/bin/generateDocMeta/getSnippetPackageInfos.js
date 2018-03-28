const path = require('path');
const getDirectoriesSync = require('../../../snipsonian-node/src/dir/getDirectoriesSync');

module.exports = getSnippetPackageInfos;

function getSnippetPackageInfos({sourcePath, packageNamesToExclude}) {
    return getAllPackageNames({sourcePath})
        .filter((packageName) => shouldPackageNameBeIncluded({packageName, packageNamesToExclude}))
        .sort()
        .map((packageName) => toPackageInfo({packageName, sourcePath}));
}

function getAllPackageNames({sourcePath}) {
    return getDirectoriesSync({
        sourcePath
    });
}

function shouldPackageNameBeIncluded({packageName, packageNamesToExclude}) {
    return !packageNamesToExclude.includes(packageName);
}

function toPackageInfo({packageName, sourcePath}) {
    return {
        name: packageName,
        path: path.resolve(sourcePath, packageName)
    };
}
