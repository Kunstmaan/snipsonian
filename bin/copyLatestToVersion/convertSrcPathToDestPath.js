module.exports = function convertSrcPathToDestPath(srcPath) {
    return path.resolve(DEST_DIR, srcPath.split('src/')[1] || '');
}