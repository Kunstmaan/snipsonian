const chalk = require('chalk');
const fs = require('fs');

const readFile = require('../../src/node/readFile');

module.exports = function readFunctionSignature(snippet) {
    console.log(chalk.bold('Reading the snippet file to get the signature...'));
    const updatedSnippet = snippet;
    return new Promise((resolve) => {
        readFile({filePath: updatedSnippet.path, options: 'utf8', fs})
            .then((content) => {
                if (content.includes(`function ${updatedSnippet.name}`)) {
                    updatedSnippet.signature = content.match(new RegExp(`function ${updatedSnippet.name}((.*)) {`))[1] || '';
                } else if (content.includes(`const ${updatedSnippet.name} = (`)) {
                    updatedSnippet.signature = content.match(new RegExp(`const ${updatedSnippet.name} = ((.*)) =>`))[1] || '';
                }
                resolve(updatedSnippet);
            });
    });
};