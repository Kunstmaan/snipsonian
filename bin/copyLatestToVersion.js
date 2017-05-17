const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');

const walk = require('./helpers/walk');

const SOURCE_DIR = path.resolve(__dirname, '../src');
const DEST_DIR = path.resolve(__dirname, '../prev_versions', packageJson.version);

walkThroughdir(SOURCE_DIR)
    .then(filterOutSpec)
    .then(createFolders)
    .then(copyFilesToNewLocation)
    .then(showFinishedMessage)
    .catch((e) => {
        throw e;
    });

function walkThroughdir(dir) {
    return new Promise((resolve, reject) => {
        console.log('\t🚶\tWalking through the source directory to get full paths for all files...');
        walk(dir, (err, data) => {
            if (err) return reject(err);
            return resolve(data);
        });
    });
}

function filterOutSpec(data) {
    return new Promise((resolve) => {
        console.log('\t🔍\tFiltering out the spec files...');
        resolve(data.filter((d) => !d.includes('.spec.')));
    });
}

function copyFilesToNewLocation(data) {
    return new Promise((resolve, reject) => {
        console.log('\t📄 📄\tCopying the files to their new location...');
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
            .then(resolve())
            .catch((e) => {
                reject(e);
            });
    });
}

function createFolders(data) {
    return new Promise((resolve) => {
        console.log('\t📁\tCreating the folders in the destination...');
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

function readFilePromise(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, fileContent) => {
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

function showFinishedMessage(){
    console.log(`\t🎉\tSuccess! You can find your files in '${DEST_DIR}'`);
}