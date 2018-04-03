const path = require('path');
const getDirectoryNamesSync = require('../../../snipsonian-node/src/dir/getDirectoryNamesSync');

module.exports = getPackageInfos;

function getPackageInfos({ sourcePath, packageNamesToExclude }) {
    return getAllPackageNames({ sourcePath })
        .filter((packageName) => shouldPackageNameBeIncluded({ packageName, packageNamesToExclude }))
        .sort()
        .map((packageName) => toPackageInfo({ packageName, sourcePath }));
}

function getAllPackageNames({ sourcePath }) {
    return getDirectoryNamesSync({
        sourcePath,
    });
}

function shouldPackageNameBeIncluded({ packageName, packageNamesToExclude }) {
    return !packageNamesToExclude.includes(packageName);
}

function toPackageInfo({ packageName, sourcePath }) {
    return {
        name: packageName,
        path: path.resolve(sourcePath, packageName),
    };
}
