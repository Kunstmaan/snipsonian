const fs = require('fs');
const path = require('path');
const isDirectorySync = require('./isDirectorySync');

function getDirectoriesSync({sourcePath}) {
    return fs.readdirSync(sourcePath)
        .filter((name) => isDirectorySync({
            inputPath: path.resolve(sourcePath, name)
        }));
}

module.exports = getDirectoriesSync;
