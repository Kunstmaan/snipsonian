const fs = require('fs');

function isDirectorySync({ inputPath }: { inputPath: string }): boolean {
    return fs.lstatSync(inputPath).isDirectory();
}

module.exports = isDirectorySync;
