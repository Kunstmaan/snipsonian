const fs = require('fs');

function isDirectorySync({inputPath}) {
    return fs.lstatSync(inputPath).isDirectory();
}

module.exports = isDirectorySync;
