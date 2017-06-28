const chalk = require('chalk');

const config = require('../copyLatestToVersion/config');

const walkthroughDir = require('../copyLatestToVersion/walkThroughDir');
const filterOutSpec = require('../copyLatestToVersion/filterOutSpec');
const splitFilesInSnippetAndDoc = require('./splitFilesInSnippetAndDoc');
const checkIfAllSnippetsHaveDocFiles = require('./checkIfAllSnippetsHaveDocFiles');
const printResults = require('./printResults');

const result = {
    warnings: [],
    errors: []
};

walkthroughDir(config.SOURCE_DIR)
    .then(filterOutSpec)
    .then(splitFilesInSnippetAndDoc)
    .then((data) => checkIfAllSnippetsHaveDocFiles(data, result))
    .then(printResults)
    .then(() => console.log(chalk.green('Done')))
    .catch((e) => console.error(e));