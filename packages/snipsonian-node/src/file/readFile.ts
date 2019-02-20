const fs = require('fs');

function readFile({
    filePath,
    options = {},
}: {
    filePath: string,
    options?: object,
}) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, options, (err: Error, fileContent: string) => {
            if (err) return reject(err);
            return resolve(fileContent);
        });
    });
}

module.exports = readFile;
