const fs = require('fs');
const path = require('path');
const convertSrcPathToDestPath = require('./convertSrcPathToDestPath');
const readFile = require('../../src/node/readFile');
const writeFile = require('../../src/node/writeFile');

module.exports = function copyFilesToNewLocation(data) {
    return new Promise((resolve, reject) => {
        console.log(' 📄 📄\tCopying the files to their new location...');
        const promiseArr = [];
        data.forEach((file) => {
            if (path.basename(file) === '.eslintrc') return;
            promiseArr.push(new Promise((res, rej) => {
                const newFilePath = convertSrcPathToDestPath(file);
                return readFile({filePath: file, options: 'utf8', fs})
                    .then((content) => writeFile({filePath: newFilePath, data: content, fs}))
                    .then(res)
                    .catch(rej);
            }));
        });
        Promise.all(promiseArr)
            .then(resolve)
            .catch(reject);
    });
}