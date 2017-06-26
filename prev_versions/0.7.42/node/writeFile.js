const fs = require('fs');

module.exports = function writeFile({filePath, data, options = {}, fileSystem = fs}) {
    return new Promise((resolve, reject) => {
        fileSystem.writeFile(filePath, data, options, (err) => {
            if (err) return reject(err);
            return resolve();
        });
    });
};
