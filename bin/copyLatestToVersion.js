const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const walk = require('./helpers/walk');

const DOC_TREE_GENERATOR_SRC = '../docTreeGenerator';
const DOC_TREE_GENERATOR_DEST = '../../docTreeGenerator';
const SOURCE_DIR = path.resolve(__dirname, '../src');
const NEW_VERSION = packageJson.version;
const DEST_DIR = path.resolve(__dirname, '../prev_versions', NEW_VERSION);

walkThroughdir(SOURCE_DIR)
    .then(filterOutSpec)
    .then(createFolders)
    .then(copyFilesToNewLocation)
    .then(editDocRef)
    .then(createPage)
    .then(showFinishedMessage)
    .catch((e) => {
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

function copyFilesToNewLocation(data) {
    return new Promise((resolve, reject) => {
        console.log(' 📄 📄\tCopying the files to their new location...');
        const promiseArr = [];
        data.forEach((file) => {
            promiseArr.push(new Promise((res, rej) => {
                const newFilePath = convertSrcPathToDestPath(file);
                readFilePromise(file)
                    .then((content) => writeFilePromise(newFilePath, content))
                    .then(res)
                    .catch(rej);
            }));
        });
        Promise.all(promiseArr)
            .then(resolve)
            .catch((e) => {
                reject(e);
            });
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

function editDocRef() {
    console.log(' ✏️\tEditing the _docRef file...');
    return new Promise((resolve, reject) => {
        readFilePromise(path.resolve(DEST_DIR, '_docRef.js'), 'utf8')
            .then((docRef) => {
                const updatedDocRef = docRef.replace(new RegExp(DOC_TREE_GENERATOR_SRC, 'g'), DOC_TREE_GENERATOR_DEST);
                return writeFilePromise(path.resolve(DEST_DIR, '_docRef.js'), updatedDocRef);
            })
            .then(resolve)
            .catch(reject);
    });
}

function createPage() {
    console.log(' ✍️\tCreating page...');
    return new Promise((resolve, reject) => {
        readFilePromise(path.resolve(__dirname, '../pages/doc/0.1.0.js'), 'utf8')
            .then((page) => {
                const updatedPage = page.replace(new RegExp('0.1.0', 'g'), NEW_VERSION);
                return writeFilePromise(path.resolve(__dirname, `../pages/doc/${NEW_VERSION}.js`), updatedPage);
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

function writeFilePromise(newFilePath, fileContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile(newFilePath, fileContent, (err) => {
            if (err) return reject(err);
            return resolve();
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