const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = function getParameters(snippet) {
    console.log(chalk.bold('Looking for the Parameters...'));
    return new Promise((resolve, reject) => {
        const updatedSnippet = snippet;
        const paramsArray = getParamsArray(updatedSnippet.signature);
        const q = paramsArray.map(constructParamQuestion);

        inquirer.prompt(q)
            .then((answers) => {
                updatedSnippet.params = updatedSnippet.params || [];
                paramsArray.forEach((param) => {
                    const paramNameOnly = getParamName(param);
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

function getParamsArray(signature) {
    let params = signature.replace(/^(\({|\()/, '');
    params = params.replace(/(}\)|\))$/, '');
    return params.split(', ');
}

function constructParamQuestion(param) {
    const paramNameOnly = getParamName(param);
    const paramDefault = getParamDefault(param);

    return [{
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
        default: guessVariableType(paramDefault)
    }, {
        type: 'input',
        name: `${paramNameOnly}-desc`,
        message: `Provide a short description for ${chalk.bold.underline(paramNameOnly)}.`,
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }];
}

function getParamName(param) {
    return param.split(' = ')[0];
}

function getParamDefault(param) {
    return param.split(' = ')[1];
}

function guessVariableType(variable) {
    if (variable) {
        if (variable === 'true' || variable === 'false') {
            return 'Boolean';
        }
        if (!isNaN(variable)) {
            return 'Number';
        }
        if (variable.includes('[') && variable.includes(']')) {
            return 'Array';
        }
        if (variable.includes('{') && variable.includes('}')) {
            return 'Object';
        }
    }
    return 'String';
}