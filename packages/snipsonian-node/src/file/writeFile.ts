const fs = require('fs');

module.exports = function writeFile({
    filePath,
    data,
    options = {},
}: {
    filePath: string,
    data: string,
    options?: object,
}) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, options, (err: Error) => {
            if (err) return reject(err);
            return resolve(filePath);
        });
    });
};
