const chalk = require('chalk');

const config = require('../copyLatestToVersion/config');

const walkthroughDir = require('../common/walkThroughDir');
const filterOutSpec = require('../common/filterOutSpec');
const splitFilesInSnippetAndDoc = require('./splitFilesInSnippetAndDoc');
const checkIfAllSnippetsHaveDocFiles = require('./checkIfAllSnippetsHaveDocFiles');
const checkIfSnippetNameMatchesFileName = require('./checkIfSnippetNameMatchesFileName');
const checkIfSnippetSignatureIsStillCorrect = require('./checkIfSnippetSignatureIsStillCorrect');
const printResults = require('./printResults');
const fixResult = require('./fixResults');
const argv = require('yargs')
    .alias('f', 'fix')
    .describe('f', 'Determines if errors may be fixed')
    .boolean('f')
    .help('help')
    .alias('h', 'help')
    .argv;


walkthroughDir(config.SOURCE_DIR)
    .then(filterOutSpec)
    .then(splitFilesInSnippetAndDoc)
    .then(checkIfAllSnippetsHaveDocFiles)
    .then(checkIfSnippetNameMatchesFileName)
    .then(checkIfSnippetSignatureIsStillCorrect)
    .then(({splitFilePaths, finalResults}) => {
        if (argv.fix) {
            return fixResult({splitFilePaths, finalResults});
        }
        return ({splitFilePaths, finalResults});
    })
    .then(printResults)
    .then(() => console.log(chalk.green('Done')))
    .catch((e) => console.error(e));