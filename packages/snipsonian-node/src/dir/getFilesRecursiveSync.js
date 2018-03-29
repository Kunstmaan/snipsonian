const fs = require('fs');
const path = require('path');
const isDirectorySync = require('./isDirectorySync');

function getFilesRecursiveSync({sourcePath}) {
    return fs.readdirSync(sourcePath)
        .reduce(
            (filesAccumulator, itemName) => {
                const itemPath = path.resolve(sourcePath, itemName);

                if (isDirectorySync({inputPath: itemPath})) {
                    filesAccumulator.push(
                        ...getFilesRecursiveSync({sourcePath: itemPath})
                    );
                } else {
                    filesAccumulator.push({
                        name: itemName,
                        path: itemPath
                    });
                }

                return filesAccumulator;
            },
            []
        );
}

module.exports = getFilesRecursiveSync;
