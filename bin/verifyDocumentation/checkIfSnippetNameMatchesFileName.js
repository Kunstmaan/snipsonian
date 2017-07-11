const fs = require('fs');
const path = require('path');

const readFile = require('../../src/node/readFile.js');

const createResultObject = require('./helpers/createResultObject');

const NAME_ATTRIBUTE = require('../helpers/regexs').NAME_ATTRIBUTE;
const ERR_MISSING_NAME = require('./helpers/errors').ERR_MISSING_NAME;
const ERR_WRONG_NAME = require('./helpers/errors').ERR_WRONG_NAME;

module.exports = function checkIfSnippetNameMatchesFileName({splitFilePaths, finalResults}) {
    console.log(' 📖\tChecking if snippet name matches file name...');
    const promises = [];
    splitFilePaths.docPaths.forEach((doc) => {
        promises.push(readFile({filePath: doc, options: 'utf8', fs})
            .then((contents) => readSnippetDocName({contents, doc, finalResults})));
    });

    return Promise.all(promises).then((result) => ({splitFilePaths, finalResults: result[result.length - 1]}));
};

function readSnippetDocName({contents, doc, finalResults}) {
    return new Promise((resolve) => {
        const match = contents.match(NAME_ATTRIBUTE);
        if (!match) {
            finalResults.push(createResultObject({
                type: ERR_MISSING_NAME,
                file: doc,
                expected: path.basename(doc, '.doc.js')
            }));
        } else if (match[1] !== path.basename(doc, '.doc.js')) {
            finalResults.push(createResultObject({
                errorOrWarning: 'warning',
                type: ERR_WRONG_NAME,
                file: doc,
                current: match[1],
                expected: path.basename(doc, '.doc.js')
            }));
        }
        resolve(finalResults);
    });
}