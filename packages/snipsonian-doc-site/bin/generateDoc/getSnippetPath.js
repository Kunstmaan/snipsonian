const chalk = require('chalk');
const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

module.exports = function getSnippetPath(snippet) {
    const updatedSnippet = snippet;
    console.log(chalk.bold(`Hello there! Ready to generate some documentation?
Well let's get started then!`));

    return new Promise((resolve, reject) => {
        const q = [
            {
                type: 'input',
                name: 'snippetPath',
                message: 'First, we\'ll need the full path for the snippet you want to document: ',
                filter: (input) => new Promise((res) => res(path.resolve(input))),
                validate: (input) => {
                    let errorMessage = '';
                    const isValid = fs.existsSync(input) && fs.lstatSync(input).isFile();

                    if (!isValid) {
                        if (!fs.existsSync(input)) {
                            errorMessage = `${chalk.red('That file does not exist!')}`;
                        } else {
                            errorMessage = `${chalk.red('That\'s not a file!')}`;
                        }
                    }

                    return new Promise((res, rej) => (isValid ? res(true) : rej(errorMessage)));
                },
                default: '/home/projects/snipsonian/src/dummy/dummy.js'
            }
        ];
        inquirer.prompt(q).then((answers) => {
            updatedSnippet.path = answers.snippetPath;
            updatedSnippet.group = path.dirname(updatedSnippet.path).split('/').pop();
            updatedSnippet.ext = path.extname(updatedSnippet.path);
            updatedSnippet.name = path.basename(updatedSnippet.path, updatedSnippet.ext);
            updatedSnippet.filename = path.basename(updatedSnippet.path);
            updatedSnippet.docPath = path.resolve(path.dirname(updatedSnippet.path), `${updatedSnippet.name}.doc${updatedSnippet.ext}`);

            if (fs.existsSync(updatedSnippet.docPath)) reject('There is already a .doc file for this snippet.');
            resolve(updatedSnippet);
        });
    });
};