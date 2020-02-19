const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');
const flatten = require('flat');
const chalk = require('chalk');
const chokidar = require('chokidar');
const readYamlFile = require('../utils/readYamlFile');
const getTranslationFilePathsForLocale = require('../utils/getTranslationFilePathsForLocale');

module.exports = generateTranslationJsonFiles;

function generateTranslationJsonFiles({
    isWatchMode = false,
    translationsFoldersGlob,
    translationFileExtension,
    targetPath,
}) {
    fs.ensureDirSync(targetPath);

    const translationsFilesGlob = `${translationsFoldersGlob}/*${translationFileExtension}`;

    const config = {
        isWatchMode,
        translationsFoldersGlob,
        translationFileExtension,
        translationsFilesGlob,
        targetPath,
    };

    if (isWatchMode) {
        chokidar
            .watch(translationsFilesGlob, { ignoreInitial: true })
            .on('all', () => generateTranslationJsonFilesSingleRun(config));
    } else {
        generateTranslationJsonFilesSingleRun(config);
    }
}

function generateTranslationJsonFilesSingleRun(config) {
    getAllOccurringLocales(config)
        .then((locales) => {
            locales.forEach((locale) => {
                const translations = getAllLocalTranslationsOfLocale(locale, config);
                fs
                    .writeFile(`${config.targetPath}/${locale}.json`, JSON.stringify(translations, undefined, 2))
                    .then(() => {
                        console.log(chalk.green(`Succesfully generated translations for ${locale}`));
                    })
                    .catch(onError);
            });
        })
        .catch(onError);

    function onError(err) {
        console.log(chalk.red(`Generating translations failed with: ${err.message}`));
        if (!config.isWatchMode) {
            process.exit(1);
        }
    }
}

function getAllOccurringLocales(config) {
    return new Promise((resolve, reject) => {
        glob(config.translationsFilesGlob, (err, files) => {
            if (err) {
                reject(err);
                return;
            }

            const fileNames = files.map((filePath) =>
                path.basename(filePath, config.translationFileExtension));
            const uniqueNames = [...new Set(fileNames)];
            resolve(uniqueNames);
        });
    });
}

function getAllLocalTranslationsOfLocale(locale, config) {
    const filePaths = getTranslationFilePathsForLocale(locale, config);

    let translations = {};
    filePaths.forEach((translationPath) => {
        const retrievedTranslations = readYamlFile({ filePath: translationPath });
        translations = Object.assign(translations, retrievedTranslations);
    });

    const translationsObj = flatten(translations);
    return Object.keys(translationsObj).map((keyword) => ({
        keyword,
        text: translationsObj[keyword],
    }));
}
