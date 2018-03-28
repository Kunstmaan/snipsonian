const path = require('path');
const packageJson = require('../package.json');

const VERSION = packageJson.version;

const PACKAGES_DIR = path.resolve(__dirname, '../../');
const PACKAGE_NAMES_TO_EXCLUDE = [
    'snipsonian-doc-site',
    'snipsonian-docs-site'
];

const SNIPPETS_SUB_DIR = 'src';

const VERSIONS_DIR = path.resolve(__dirname, '../versions');

module.exports = {
    VERSION,
    PACKAGES_DIR,
    PACKAGE_NAMES_TO_EXCLUDE,
    SNIPPETS_SUB_DIR,
    VERSIONS_DIR
};
