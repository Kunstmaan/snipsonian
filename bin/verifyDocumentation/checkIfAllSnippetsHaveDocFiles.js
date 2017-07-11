const createResultObject = require('./helpers/createResultObject');
const ERR_MISSING_DOC = require('./helpers/errors').ERR_MISSING_DOC;

module.exports = function checkIfAllSnippetsHaveDocFiles(splitFilePaths) {
    console.log(' 🔦\tChecking if all snippets have a doc file...');
    const finalResults = [];
    const snippetsWithoutDoc = splitFilePaths.snippetPaths.filter((snippet) => {
        const snippetDocFileName = snippet.replace(/\.js$/, '.doc.js');

        return splitFilePaths.docPaths.indexOf(snippetDocFileName) !== -1;
    });

    if (snippetsWithoutDoc.length > 0) {
        snippetsWithoutDoc.forEach((snippet) => {
            finalResults.push(createResultObject({
                type: ERR_MISSING_DOC,
                file: snippet
            }));
        });
    }

    return {splitFilePaths, finalResults};
};
