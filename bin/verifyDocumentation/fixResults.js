const inquirer = require('inquirer');
const fs = require('fs');
const readFile = require('../../src/node/readFile');
const writeFile = require('../../src/node/writeFile');

module.exports = function fixResults({data, result}) {
    console.log(' 🔨\tFixing errors...');
    return new Promise((resolve) => {
        const q = [];
        result.forEach((res, i) => {
            if (res.type === 'wrongName') {
                q.push({
                    type: 'list',
                    name: `${i} - wrongName`,
                    message: `The snippet name in ${res.file} is incorrect.`,
                    choices: [
                        {
                            name: `Keep current: ${res.current}`,
                            value: {res, input: res.current, index: i},
                            short: res.current
                        },
                        {
                            name: `Change to expected: ${res.expected}`,
                            value: {res, input: res.expected, index: i},
                            short: res.expected
                        }
                    ],
                    default: 1
                });
            }
        });

        const promises = [];

        inquirer.prompt(q).then((answers) => {
            Object.keys(answers).forEach((answerName) => {
                if (answerName.includes('wrongName')) {
                    const theAnswer = answers[answerName];
                    if (theAnswer.input.includes(theAnswer.res.expected)) {
                        promises.push(
                            readFile({filePath: theAnswer.res.file, options: 'utf8', fs})
                                .then((content) => {
                                    /* eslint-disable no-param-reassign */
                                    result[theAnswer.index].fixed = true;
                                    /* eslint-enable no-param-reassign */
                                    writeFile({
                                        filePath: theAnswer.res.file,
                                        options: 'utf8',
                                        data: content.replace(/@name\('(.*)'\)/, `@name('${theAnswer.res.expected}')`),
                                        fs
                                    });
                                })
                        );
                    }
                }
            });

            Promise.all(promises).then(() => {
                resolve({data, result});
            });
        });
    });
};