const path = require('path');

const config = require('./config');

module.exports = function convertSrcPathToDestPath(srcPath) {
    return path.resolve(config.DEST_DIR, srcPath.split('src/')[1] || '');
}