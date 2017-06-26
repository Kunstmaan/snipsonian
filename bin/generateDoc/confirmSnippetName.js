const inquirer = require('inquirer');

module.exports = function confirmSnippetName(snippet) {
    const updatedSnippet = snippet;
    return new Promise((resolve) => {
        const q = [
            {
                type: 'input',
                name: 'alternateSnippetName',
                message: 'What should the snippet name be?',
                default: `${updatedSnippet.name}`
            }
        ];

        inquirer.prompt(q).then((answers) => {
            updatedSnippet.name = answers.alternateSnippetName;
            resolve(updatedSnippet);
        });
    });
};