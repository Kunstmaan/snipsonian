const fs = require('fs');
const path = require('path');
const del = require('del');
const semver = require('semver');

const packageJson = require('../package.json');
const walk = require('./helpers/walk');
const writeFile = require('../src/node/writeFile');

const DOC_TREE_GENERATOR_SRC = '../docTreeGenerator';
const DOC_TREE_GENERATOR_DEST = '../../docTreeGenerator';
const PAGES_PATH = path.resolve(__dirname, '../pages/doc');
const SOURCE_DIR = path.resolve(__dirname, '../src');
const NEW_VERSION = packageJson.version;
const PREV_VERSION_PATH = path.resolve(__dirname, '../prev_versions');
const DEST_DIR = path.resolve(PREV_VERSION_PATH, NEW_VERSION);

walkThroughdir(SOURCE_DIR)
    .then(filterOutSpec)
    .then(changeSinceValue)
    .then(createFolders)
    .then(copyFilesToNewLocation)
    .then(removePreviousPatchVersion)
    .then(editDocRef)
    .then(createPage)
    .then(showFinishedMessage)
    .catch((e) => {
        console.error(e);
        throw e;
    });

function walkThroughdir(dir) {
    return new Promise((resolve, reject) => {
        console.log(' 🚶\tWalking through the source directory to get full paths for all files...');
        walk(dir, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

function filterOutSpec(data) {
    return new Promise((resolve) => {
        console.log(' 🔍\tFiltering out the spec files...');
        resolve(data.filter((d) => !d.includes('.spec.')));
    });
}

function changeSinceValue(data) {
    console.log(' 🔄\tReplacing the <$SINCE$> placeholder with the new version number');
    return new Promise((resolve, reject) => {
        const promiseArr = [];

        data.forEach((file) => readFilePromise(file, 'utf8')
            .then((fileContents) => {
                if (fileContents.includes('<$SINCE$>')) {
                    const updatedFileContents = fileContents.replace('<$SINCE$>', NEW_VERSION);
                    promiseArr.push(writeFile({filePath: file, data: updatedFileContents, fs}));
                }
            })
        );

        Promise.all(promiseArr)
            .then(() => resolve(data))
            .catch((e) => reject(e));
    });
}

function createFolders(data) {
    return new Promise((resolve) => {
        console.log(' 📁\tCreating the folders in the destination...');
        const onlyFolders = data.map((pathName) => path.dirname(pathName));
        const dedupedFolders = dedupeArray(onlyFolders);
        const newFolderPaths = dedupedFolders.map(convertSrcPathToDestPath);
        newFolderPaths.forEach((folder) => {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder);
            }
        });
        return resolve(data);
    });
}

function copyFilesToNewLocation(data) {
    return new Promise((resolve, reject) => {
        console.log(' 📄 📄\tCopying the files to their new location...');
        const promiseArr = [];
        data.forEach((file) => {
            if (path.basename(file) === '.eslintrc') return;
            promiseArr.push(new Promise((res, rej) => {
                const newFilePath = convertSrcPathToDestPath(file);
                return readFilePromise(file)
                    .then((content) => writeFile({filePath: newFilePath, data: content, fs}))
                    .then(res)
                    .catch(rej);
            }));
        });
        Promise.all(promiseArr)
            .then(resolve)
            .catch(reject);
    });
}

function removePreviousPatchVersion() {
    console.log(' 🗑️\tRemoving previous patch versions ...');
    return new Promise((resolve) => {
        const splitVersion = NEW_VERSION.split('.');
        splitVersion.pop();
        fs.readdir(PREV_VERSION_PATH, (err, folders) => {
            folders.forEach((folder) => {
                if (semver.satisfies(folder, `${splitVersion.join('.')}.x <${NEW_VERSION}`)) {
                    del.sync(path.resolve(PREV_VERSION_PATH, folder));
                    del.sync(path.resolve(PAGES_PATH, `${folder}.jsx`));
                }
            });
            resolve();
        });
    });
}

function editDocRef() {
    console.log(' ✏️\tEditing the _docRef file...');
    return new Promise((resolve, reject) => {
        const docRefPath = path.resolve(DEST_DIR, '_docRef.js');
        readFilePromise(docRefPath, 'utf8')
            .then((docRef) => {
                const updatedDocRef = docRef.replace(new RegExp(DOC_TREE_GENERATOR_SRC, 'g'), DOC_TREE_GENERATOR_DEST);
                return writeFile({filePath: docRefPath, data: updatedDocRef, fs});
            })
            .then(resolve)
            .catch(reject);
    });
}

function createPage() {
    console.log(' ✍️\tCreating page...');
    return new Promise((resolve, reject) => {
        let previousVersionPageVersion;
        getPreviousVersionPagePath()
            .then((prevVersionPage) => {
                previousVersionPageVersion = prevVersionPage.name;
                return readFilePromise(prevVersionPage.path, 'utf8');
            })
            .then((page) => {
                const updatedPage = page.replace(new RegExp(previousVersionPageVersion, 'g'), NEW_VERSION);
                const updatedPagePath = path.resolve(__dirname, `../pages/doc/${NEW_VERSION}.jsx`);
                return writeFile({filePath: updatedPagePath, data: updatedPage, fs});
            })
            .then(resolve)
            .catch(reject);
    });
}

function readFilePromise(filePath, options = {}) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, options, (err, fileContent) => {
            if (err) return reject(err);
            return resolve(fileContent);
        });
    });
}

function dedupeArray(arrArg) {
    return arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
}

function convertSrcPathToDestPath(srcPath) {
    return path.resolve(DEST_DIR, srcPath.split('src/')[1] || '');
}

function showFinishedMessage() {
    console.log(` 🎉\tSuccess! You can find your files in '${DEST_DIR}'`);
}

function getPreviousVersionPagePath() {
    return new Promise((resolve, reject) => {
        fs.readdir(PAGES_PATH, (err, content) => {
            if (err) reject(err);
            const theFile = content[content.length - 2];
            resolve({name: path.basename(theFile, '.jsx'), path: path.resolve(PAGES_PATH, theFile)});
        });
    });
}