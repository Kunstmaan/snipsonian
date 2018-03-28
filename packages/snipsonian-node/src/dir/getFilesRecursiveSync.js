const fs = require('fs');
const path = require('path');
const isDirectorySync = require('./isDirectorySync');

function getFilesRecursiveSync({sourcePath}) {
    return fs.readdirSync(sourcePath)
        .reduce(
            (filesAccumulator, item) => {
                const itemPath = path.resolve(sourcePath, item);

                if (isDirectorySync({inputPath: itemPath})) {
                    filesAccumulator.push(
                        ...getFilesRecursiveSync({sourcePath: itemPath})
                    );
                } else {
                    filesAccumulator.push(itemPath);
                }

                return filesAccumulator;
            },
            []
        );
}

module.exports = getFilesRecursiveSync;
