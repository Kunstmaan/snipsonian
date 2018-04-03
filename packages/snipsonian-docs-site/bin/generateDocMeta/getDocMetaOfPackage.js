const path = require('path');
const getFilesRecursiveSync = require('../../../snipsonian-node/src/dir/getFilesRecursiveSync');
// TODO re-use this snippet
// const getPartBetween = require('../../../snipsonian-core/src/string/getPartBetween');

/**
 * Gathers the documentation for the input package.
 * Returns an object of the following format:
 * {
 *   name: 'package name',
 *   desc: '', //optional
 *   dirs: [
 *     {
 *       name: 'dir name',
 *       path: 'parent/structure/dir name',
 *       desc: '', //optional
 *       snippets: [
 *         {
 *           name: 'snippet name',
 *           desc: '', //optional
 *           signature: '',
 *           codeUrl: '', //relative url
 *           example: '' //optional
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

module.exports = getDocMetaOfPackage;

function getDocMetaOfPackage({ packageInfo, snippetsSubDir }) {
    const fileInfos = getFilesRecursiveSync({
        sourcePath: path.resolve(packageInfo.path, snippetsSubDir),
    })
        .filter(isNotSpecFile);

    // TODO example files

    return {
        name: packageInfo.name,
        dirs: getDirectoriesAndTheirSnippets({ fileInfos }),
    };
}

function isNotSpecFile(fileInfo) {
    return !fileInfo.name.endsWith('.spec.js');
}

function getDirectoriesAndTheirSnippets({ fileInfos }) {
    return groupFilesPerDirAndName({ fileInfos });
}

function groupFilesPerDirAndName({ fileInfos }) {
    return fileInfos
        .reduce(
            (dirsAccumulator, fileInfo) => {
                if (!isExampleFile({ fileInfo })) {
                    const dirPath = getDirPath({ fileInfo });
                    const snippetDir = getOrAddSnippetDir({ dirsAccumulator, dirPath });

                    snippetDir.snippets.push({
                        name: removeFileExtension({ fileName: fileInfo.name }),
                    });
                }

                return dirsAccumulator;
            },
            [],
        );

    function getOrAddSnippetDir({ dirsAccumulator, dirPath }) {
        let snippetDir = dirsAccumulator.find((dir) => dir.path === dirPath);
        if (!snippetDir) {
            snippetDir = {
                name: getLastPart({ separator: '/', input: dirPath }),
                path: dirPath,
                snippets: [],
            };

            dirsAccumulator.push(snippetDir);
        }

        return snippetDir;
    }
}

function isExampleFile({ fileInfo }) {
    return fileInfo.name.endsWith('.example.js');
}

function getDirPath({ fileInfo }) {
    return getPartBetween({
        firstPart: '/src/',
        secondPart: `/${fileInfo.name}`,
        input: fileInfo.path,
    });
}

function removeFileExtension({ fileName }) {
    return fileName.split('.')[0];
}

function getPartBetween({ firstPart, secondPart, input }) {
    try {
        return getPartAfter({ separator: firstPart, input }).split(secondPart)[0];
    } catch (e) {
        return undefined;
    }
}

function getPartAfter({ separator, input }) {
    return input.substr(input.indexOf(separator) + separator.length);
}

function getLastPart({ separator, input }) {
    return input.split(separator).pop();
}
