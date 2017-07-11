const readFile = require('../../src/node/readFile.js');
const fs = require('fs');
const path = require('path');

module.exports = function checkIfSnippetNameMatchesFileName({data, result}) {
    console.log(' 📖\tChecking if snippet name matches file name');
    return new Promise((resolve) => {
        const promises = [];
        data.docs.forEach((doc) => {
            promises.push(readFile({filePath: doc, options: 'utf8', fs})
                .then((contents) => readSnippetDocName({contents, doc, result})));
        });

        Promise.all(promises).then(() => {
            resolve({data, result});
        });
    });
};

function readSnippetDocName({contents, doc, result}) {
    return new Promise((res) => {
        const regX = /@name\('(.*)'\)/;
        const match = contents.match(regX);
        if (!match) {
            result.push({
                errorOrWarning: 'error',
                type: 'missingName',
                file: doc
            });
        } else if (match[1] !== path.basename(doc, '.doc.js')) {
            result.push({
                errorOrWarning: 'warning',
                type: 'wrongName',
                file: doc,
                current: match[1],
                expected: path.basename(doc, '.doc.js')
            });
        }

        res({contents, doc, result});
    });
}