module.exports = function checkIfAllSNippetsHaveDocFiles(data, result) {
    console.log(' 🔦\tChecking if all snippets have a doc file...');
    return new Promise((resolve) => {
        const snippetsWithoutDoc = data.snippets.filter((snippet) => {
            const snippetDocFileName = snippet.replace(/\.js$/, '.doc.js');

            return data.docs.indexOf(snippetDocFileName) !== -1;
        });

        if (snippetsWithoutDoc.length > 0) {
            snippetsWithoutDoc.forEach((snippet) => {
                result.push({
                    errorOrWarning: 'error',
                    type: 'missingDoc',
                    file: snippet
                });
            });
        }

        resolve({data, result});
    });
};