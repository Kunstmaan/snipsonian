const fs = require('fs');
const path = require('path');

const config = require('./config');

const readFile = require('../../.tmp/readFile');
const writeFile = require('../../src/node/writeFile');

module.exports = function editDocRef() {
    console.log(' ✏️\tEditing the _docRef file...');
    return new Promise((resolve, reject) => {
        const docRefPath = path.resolve(config.DEST_DIR, '_docRef.js');
        readFile({filePath: docRefPath, options: 'utf8', fs})
            .then((docRef) => {
                const updatedDocRef = docRef
                    .replace(new RegExp(config.DOC_TREE_GENERATOR_SRC, 'g'), config.DOC_TREE_GENERATOR_DEST);
                return writeFile({filePath: docRefPath, data: updatedDocRef, fs});
            })
            .then(resolve)
            .catch(reject);
    });
};