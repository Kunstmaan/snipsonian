const readFile = require('../../src/node/readFile');
const writeFile = require('../../src/node/writeFile');
const config = require('./config');

module.exports = function changeSinceValue(data) {
    console.log(' 🔄\tReplacing the <$SINCE$> placeholder with the new version number');
    return new Promise((resolve, reject) => {
        const promiseArr = [];

        data.forEach((file) => readFile({filePath: file, options: 'utf8'})
            .then((fileContents) => {
                if (fileContents.includes('<$SINCE$>')) {
                    const updatedFileContents = fileContents.replace('<$SINCE$>', config.NEW_VERSION);
                    promiseArr.push(writeFile({filePath: file, data: updatedFileContents}));
                }
            })
        );

        Promise.all(promiseArr)
            .then(() => resolve(data))
            .catch((e) => reject(e));
    });
};