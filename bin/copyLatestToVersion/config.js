const path = require('path');
const packageJson = require('../../package.json');

module.exports = {
    DOC_TREE_GENERATOR_SRC: '../docTreeGenerator',
    DOC_TREE_GENERATOR_DEST: '../../docTreeGenerator',
    PAGES_PATH: path.resolve(__dirname, '../pages/doc'),
    SOURCE_DIR: path.resolve(__dirname, '../src'),
    NEW_VERSION: packageJson.version,
    PREV_VERSION_PATH: path.resolve(__dirname, '../prev_versions'),
    DEST_DIR: path.resolve(this.PREV_VERSION_PATH, this.NEW_VERSION)
};