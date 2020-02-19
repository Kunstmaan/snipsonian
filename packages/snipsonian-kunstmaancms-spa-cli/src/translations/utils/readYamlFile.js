const fs = require('fs-extra');
const yaml = require('js-yaml');

const FILE_ENCODING = 'utf8';

module.exports = readYamlFile;

function readYamlFile({ filePath }) {
    return yaml.safeLoad(fs.readFileSync(filePath, FILE_ENCODING));
}
