const chalk = require('chalk');
const clear = require('clear');

const getSnippetPath = require('./getSnippetPath');
const getSnippetDescription = require('./getSnippetDescription');
const readFunctionSignature = require('./readFunctionSignature');
const getParameters = require('./getParameters');
const constructDocFile = require('./constructDocFile');

const snippet = {};

clear();
getSnippetPath(snippet)
    .then(getSnippetDescription)
    .then(readFunctionSignature)
    .then(getParameters)
    .then(constructDocFile)
    .then(() => console.log(chalk.green.bold('The End.')))
    .catch((e) => console.error(chalk.red.bold(e)));