const path = require('path');

module.exports = getParentPathOfFile;

function getParentPathOfFile(filePath) {
    return path.dirname(filePath);
}
