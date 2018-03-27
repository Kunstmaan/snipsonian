const inquirer = require('inquirer');

module.exports = function getSnippetDescription(snippet) {
    const updatedSnippet = snippet;
    return new Promise((resolve) => {
        const q = [
            {
                type: 'input',
                name: 'snippetDescription',
                message: 'Please provide a short description for your snippet: ',
                default: 'Vestibulum id ligula porta felis euismod semper.'
            }
        ];

        inquirer.prompt(q).then((answers) => {
            updatedSnippet.description = answers.snippetDescription;
            resolve(updatedSnippet);
        });
    });
};