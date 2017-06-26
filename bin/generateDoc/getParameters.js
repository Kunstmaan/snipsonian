const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = function getParameters(snippet) {
    const updatedSnippet = snippet;
    console.log(chalk.bold('Looking for the Parameters...'));
    const q = [];
    return new Promise((resolve, reject) => {
        let params = updatedSnippet.signature.replace('({', '');
        params = params.replace('})', '');
        params = params.split(', ');
        params.forEach((param) => {
            const paramNameOnly = param.split(' = ')[0];
            const paramDefault = param.split(' = ')[1];
            let paramTypeGuess = 'String';
            if (paramDefault) {
                if (paramDefault === 'true' || paramDefault === 'false') {
                    paramTypeGuess = 'Boolean';
                } else if (!isNaN(paramDefault)) {
                    paramTypeGuess = 'Number';
                } else if (paramDefault.includes('[') && paramDefault.includes(']')) {
                    paramTypeGuess = 'Array';
                } else if (paramDefault.includes('{') && paramDefault.includes('}')) {
                    paramTypeGuess = 'Object';
                }
            }
            q.push({
                type: 'confirm',
                name: `${paramNameOnly}-required`,
                message: `Is ${chalk.bold.underline(paramNameOnly)} a required parameter?`,
                default: false,
                when: () => !param.includes('=')
            }, {
                type: 'list',
                name: `${paramNameOnly}-type`,
                message: `What is the type of ${chalk.bold.underline(paramNameOnly)}?`,
                choices: ['Array', 'Boolean', 'Class', 'Function', 'Number', 'Object', 'String', 'Promise', 'Any'],
                default: paramTypeGuess
            }, {
                type: 'input',
                name: `${paramNameOnly}-desc`,
                message: `Provide a short description for ${chalk.bold.underline(paramNameOnly)}.`,
                default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            });
        });

        inquirer.prompt(q)
            .then((answers) => {
                updatedSnippet.params = updatedSnippet.params || [];
                params.forEach((param) => {
                    const paramNameOnly = param.split(' = ')[0];
                    updatedSnippet.params.push({
                        name: paramNameOnly,
                        required: answers[`${paramNameOnly}-required`] || false,
                        type: answers[`${paramNameOnly}-type`],
                        desc: answers[`${paramNameOnly}-desc`]
                    });
                });
                resolve(updatedSnippet);
            })
            .catch(reject);
    });
};