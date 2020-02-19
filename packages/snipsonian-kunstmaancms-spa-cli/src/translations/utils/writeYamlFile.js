const yaml = require('js-yaml');
const fs = require('fs');

const FILE_ENCODING = 'utf8';

module.exports = writeYamlFile;

function writeYamlFile({ filePath, content, sortKeys = false }) {
    const options = {
        sortKeys,
    };

    const data = yaml.safeDump(content, options);

    return writeFile({
        filePath,
        data,
        options: FILE_ENCODING,
    });
}

function writeFile({ filePath, data, options = {} }) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, options, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve(filePath);
        });
    });
}
