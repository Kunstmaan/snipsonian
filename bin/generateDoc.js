const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const clear = require('clear');
const os = require('os');
const writeFile = require('../src/node/writeFile');

const snippet = {};

clear();
getSnippetPath()
    .then(confirmSnippetName)
    .then(getSnippetDescription)
    .then(readFunction)
    .then(generateDocFile)
    .then(() => console.log(chalk.green.bold('The End. snippet:', JSON.stringify(snippet, null, 2))))
    .catch((e) => console.error(chalk.red.bold(e)));

function getSnippetPath() {
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
            snippet.path = answers.snippetPath;
            snippet.group = path.dirname(snippet.path).split('/').pop();
            snippet.ext = path.extname(snippet.path);
            snippet.name = path.basename(snippet.path, snippet.ext);
            snippet.filename = path.basename(snippet.path);
            snippet.docPath = path.resolve(path.dirname(snippet.path), `${snippet.name}.doc${snippet.ext}`);

            if (fs.existsSync(snippet.docPath)) reject('There is already a .doc file for this snippet.');
            resolve();
        });
    });
}

function confirmSnippetName() {
    return new Promise((resolve) => {
        const q = [
            {
                type: 'input',
                name: 'alternateSnippetName',
                message: 'What should the snippet name be?',
                default: `${snippet.name}`
            }
        ];

        inquirer.prompt(q).then((answers) => {
            snippet.name = answers.alternateSnippetName;
            resolve();
        });
    });
}

function getSnippetDescription() {
    return new Promise((resolve) => {
        const q = [
            {
                type: 'input',
                name: 'snippetDescription',
                message: 'Please provide a short description for your snippet: ',
                default: 'Vestibulum id ligula porta felis euismod semper.'
            }
        ];

        inquirer.prompt(q).then((answers) => {
            snippet.description = answers.snippetDescription;
            resolve();
        });
    });
}

function readFunction() {
    console.log(chalk.bold('Reading the snippet file to get the parameters'));
    return new Promise((resolve, reject) => {
        readFilePromise(snippet.path, 'utf8')
            .then((content) => {
                if (content.includes(`function ${snippet.name}`)) {
                    snippet.signature = content.match(new RegExp(`(function ${snippet.name}\()(.*?)(\))`))[1] || '';
                } else if (content.includes(`const ${snippet.name} = (`)) {
                    snippet.signature = content.match(new RegExp(`(const ${snippet.name} = \()(.*?)(\) => {)`))[1] || '';
                }
                resolve();
            });
    });
}

function generateDocFile() {
    const content = `
import {${snippet.name}} from './${snippet.name}';
import {snippet, name, desc, authors, signature, since} from '../_docRef';

@name('${snippet.name}')
@desc('${snippet.description}')
@authors('${os.userInfo().username}')
@since('<$SINCE$>')
@signature('${snippet.signature.replace(/'/g, '\\\'')}')
@snippet(${snippet.name})
class ${snippet.name}Doc {
}

export default ${snippet.name}Doc;
`;
    return writeFile({filePath: snippet.docPath, data: content, options: 'utf8', fs});
}

function readFilePromise(filePath, options = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, options, (err, fileContent) => {
            if (err) return reject(err);
            return resolve(fileContent);
        });
    });
}