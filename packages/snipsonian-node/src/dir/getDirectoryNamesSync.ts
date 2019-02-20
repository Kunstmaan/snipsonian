const fs = require('fs');
const path = require('path');
const isDirectorySync = require('./isDirectorySync');

function getDirectoryNamesSync({ sourcePath } : { sourcePath: string}): string[] {
    return fs.readdirSync(sourcePath)
        .filter((name: string) => isDirectorySync({
            inputPath: path.resolve(sourcePath, name),
        }));
}

module.exports = getDirectoryNamesSync;
