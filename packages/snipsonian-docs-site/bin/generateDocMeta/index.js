const chalk = require('chalk');
const config = require('../config');
const getSnippetPackageInfos = require('./getSnippetPackageInfos');

const packageInfos = getSnippetPackageInfos({
    sourcePath: config.SNIPPET_PACKAGES_DIR,
    packageNamesToExclude: config.SNIPPET_PACKAGE_NAMES_TO_EXCLUDE
});

console.log(chalk.green('Found snippet packages:'));

packageInfos.forEach((packageInfo) => console.log(packageInfo));
