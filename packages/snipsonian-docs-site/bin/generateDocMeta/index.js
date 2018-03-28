const chalk = require('chalk');
const config = require('../config');
const getPackageInfos = require('./getPackageInfos');
const getDocMetaOfPackage = require('./getDocMetaOfPackage');
const writeDocMetaJsonOfVersion = require('./writeDocMetaJsonOfVersion');

console.log(chalk.green('===== Generating document meta ====='));

const packageInfos = getPackageInfos({
    sourcePath: config.PACKAGES_DIR,
    packageNamesToExclude: config.PACKAGE_NAMES_TO_EXCLUDE
});

const packageDocMetas = packageInfos
    .map((packageInfo) => getDocMetaOfPackage({
        packageInfo,
        snippetsSubDir: config.SNIPPETS_SUB_DIR
    }));

// TODO don't include full paths in the json so that they do not get committed as they can be different per machine

writeDocMetaJsonOfVersion({
    targetDir: config.VERSIONS_DIR,
    version: 'latest', // TODO
    packageDocMetas
})
    .then((writtenFilePath) => {
        console.log(chalk.green(`Created documentation meta file: ${writtenFilePath}`));
        console.log(chalk.green('Done!'));
        console.log(chalk.green('(brought to you by Kunstmaan Development)'));
    });
