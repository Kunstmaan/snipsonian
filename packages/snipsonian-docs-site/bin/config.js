const path = require('path');

const SNIPPET_PACKAGES_DIR = path.resolve(__dirname, '../../');
const SNIPPET_PACKAGE_NAMES_TO_EXCLUDE = [
    'snipsonian-doc-site',
    'snipsonian-docs-site'
];

module.exports = {
    SNIPPET_PACKAGES_DIR,
    SNIPPET_PACKAGE_NAMES_TO_EXCLUDE
};
