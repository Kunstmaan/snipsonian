const fs = require('fs');
const path = require('path');

const config = require('./config');

module.exports = function getPreviousVersionPagePath() {
    return new Promise((resolve, reject) => {
        fs.readdir(config.PAGES_PATH, (err, content) => {
            if (err) reject(err);
            const theFile = content[content.length - 2];
            resolve({name: path.basename(theFile, '.jsx'), path: path.resolve(config.PAGES_PATH, theFile)});
        });
    });
}