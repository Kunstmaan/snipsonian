const path = require('path');

const packageJson = require('../../package.json');

const DOC_TREE_GENERATOR_SRC = '../docTreeGenerator';
const DOC_TREE_GENERATOR_DEST = '../../docTreeGenerator';
const PAGES_PATH = path.resolve(__dirname, '../../pages/doc');
const SOURCE_DIR = path.resolve(__dirname, '../../src');
const NEW_VERSION = packageJson.version;
const PREV_VERSION_PATH = path.resolve(__dirname, '../../prev_versions');
const DEST_DIR = path.resolve(PREV_VERSION_PATH, NEW_VERSION);

module.exports = {
    DOC_TREE_GENERATOR_SRC,
    DOC_TREE_GENERATOR_DEST,
    PAGES_PATH,
    SOURCE_DIR,
    NEW_VERSION,
    PREV_VERSION_PATH,
    DEST_DIR
};