const fs = require('fs');
const path = require('path');
const readFile = require('../../src/node/readFile');

const createResultObject = require('./helpers/createResultObject');

const SIGNATURE_ATTRIBUTE = require('../helpers/regexs').SIGNATURE_ATTRIBUTE;
const SIGNATURE_FUNCTION = require('../helpers/regexs').SIGNATURE_FUNCTION;
const SIGNATURE_CONST = require('../helpers/regexs').SIGNATURE_CONST;

const ERR_MISSING_SIGNATURE = require('./helpers/errors').ERR_MISSING_SIGNATURE;
const ERR_WRONG_SIGNATURE = require('./helpers/errors').ERR_WRONG_SIGNATURE;

module.exports = function checkIfSnippetSignatureIsStillCorrect({splitFilePaths, finalResults}) {
    console.log(' 📖\tChecking if snippet signature is still correct...');
    const updatedResults = finalResults;
    return new Promise((resolve) => {
        const docPromises = [];
        splitFilePaths.docPaths.forEach((docPath) => {
            docPromises.push(
                readFile({filePath: docPath, options: 'utf8', fs})
                    .then((content) => {
                        const match = content.match(SIGNATURE_ATTRIBUTE);
                        const snippetName = path.basename(docPath, '.doc.js');
                        if (!match) {
                            return getSignature(docPath, snippetName)
                                .then((sigInSnippet) => {
                                    updatedResults.push(createResultObject({
                                        errorOrWarning: 'warning',
                                        type: ERR_MISSING_SIGNATURE,
                                        file: docPath,
                                        expected: sigInSnippet
                                    }));
                                });
                        }
                        const signature = match[1];
                        return getSignature(docPath, snippetName)
                            .then((sigInSnippet) => {
                                if (sigInSnippet !== signature) {
                                    updatedResults.push(createResultObject({
                                        errorOrWarning: 'warning',
                                        type: ERR_WRONG_SIGNATURE,
                                        file: docPath,
                                        current: signature,
                                        expected: sigInSnippet
                                    }));
                                }
                            });
                    })
            );
        });

        Promise.all(docPromises).then(() => {
            resolve({splitFilePaths, finalResults: updatedResults});
        });
    });
};

function getSignature(docPath, snippetName) {
    return readFile({filePath: docPath.replace('.doc.js', '.js'), options: 'utf8', fs})
        .then((cont) => {
            if (cont.includes(`function ${snippetName}`)) {
                const match = cont.match(SIGNATURE_FUNCTION(snippetName));
                if (match) return match[1];
                return '';
            }
            const match = cont.match(SIGNATURE_CONST(snippetName));
            if (match) return match[1];
            return '';
        });
}