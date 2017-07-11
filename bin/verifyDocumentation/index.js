const chalk = require('chalk');

const config = require('../copyLatestToVersion/config');

const walkthroughDir = require('../copyLatestToVersion/walkThroughDir');
const filterOutSpec = require('../copyLatestToVersion/filterOutSpec');
const splitFilesInSnippetAndDoc = require('./splitFilesInSnippetAndDoc');
const checkIfAllSnippetsHaveDocFiles = require('./checkIfAllSnippetsHaveDocFiles');
const checkIfSnippetNameMatchesFileName = require('./checkIfSnippetNameMatchesFileName');
const printResults = require('./printResults');
const fixResult = require('./fixResults');
const argv = require('yargs')
    .alias('f', 'fix')
    .describe('f', 'Determines if errors may be fixed')
    .boolean('f')
    .help('help')
    .alias('h', 'help')
    .argv;

const theResult = [];

walkthroughDir(config.SOURCE_DIR)
    .then(filterOutSpec)
    .then(splitFilesInSnippetAndDoc)
    .then((data) => checkIfAllSnippetsHaveDocFiles(data, theResult))
    .then(checkIfSnippetNameMatchesFileName)
    .then(({data, result}) => {
        if (argv.fix) {
            return fixResult({data, result});
        }
        return ({data, result});
    })
    .then(printResults)
    .then(() => console.log(chalk.green('Done')))
    .catch((e) => console.error(e));