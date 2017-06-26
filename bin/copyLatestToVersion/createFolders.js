const path = require('path');
const fs = require('fs');
const dedupeArray = require('./dedupeArray');
const convertSrcPathToDestPath = require('./convertSrcPathToDestPath');

module.exports = function createFolders(data) {
    return new Promise((resolve) => {
        console.log(' 📁\tCreating the folders in the destination...');
        const onlyFolders = data.map((pathName) => path.dirname(pathName));
        const dedupedFolders = dedupeArray(onlyFolders);
        const newFolderPaths = dedupedFolders.map(convertSrcPathToDestPath);
        newFolderPaths.forEach((folder) => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
        });
        return resolve(data);
    });
};