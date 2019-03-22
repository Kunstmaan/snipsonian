const inquirer = require('inquirer');
const fs = require('fs');
const readFile = require('../../src/node/readFile');
const writeFile = require('../../src/node/writeFile');

const NAME_ATTRIBUTE = require('../helpers/regexs').NAME_ATTRIBUTE;
const SIGNAGURE_ATTRIBUTE = require('../helpers/regexs').SIGNATURE_ATTRIBUTE;

module.exports = function fixResults({splitFilePaths, finalResults}) {
    console.log(' 🔨\tFixing errors...');
    const updatedResult = finalResults;
    return new Promise((resolve) => {
        const q = [];
        finalResults.forEach((res, i) => {
            if (res.type.includes('wrong')) {
                q.push(createWrongQuestion(i, res));
            } else if (res.type.includes('missing') && !res.type.includes('missingDoc') && res.expected !== '') {
                q.push(createMissingQuestion(i, res));
            }
        });

        const promises = [];

        inquirer.prompt(q).then((answers) => {
            Object.keys(answers).forEach((answerName) => {
                const theAnswer = answers[answerName];
                if (answerName.includes('wrongName')) {
                    if (theAnswer.input.includes(theAnswer.res.expected)) {
                        promises.push(
                            readFile({filePath: theAnswer.res.file, options: 'utf8', fs})
                                .then((content) => {
                                    updatedResult[theAnswer.index].fixed = true;
                                    writeFile({
                                        filePath: theAnswer.res.file,
                                        options: 'utf8',
                                        data: content.replace(NAME_ATTRIBUTE, `@name('${theAnswer.res.expected}')`),
                                        fs
                                    });
                                })
                        );
                    }
                } else if (answerName.includes('wrongSignature')) {
                    if (theAnswer.input.includes(theAnswer.res.expected)) {
                        promises.push(
                            readFile({filePath: theAnswer.res.file, options: 'utf8', fs})
                                .then((content) => {
                                    updatedResult[theAnswer.index].fixed = true;
                                    writeFile({
                                        filePath: theAnswer.res.file,
                                        options: 'utf8',
                                        data: content.replace(SIGNAGURE_ATTRIBUTE, `@signature('${theAnswer.res.expected}')`),
                                        fs
                                    });
                                })
                        );
                    }
                } else if (answerName.includes('missingName')) {
                    promises.push(
                        readFile({filePath: theAnswer.res.file, options: 'utf8', fs})
                            .then((content) => {
                                updatedResult[theAnswer.index].fixed = true;
                                writeFile({
                                    filePath: theAnswer.res.file,
                                    options: 'utf8',
                                    data: content.replace('@snippet', `@name('${theAnswer.input}')\n@snippet`),
                                    fs
                                });
                            })
                    );
                } else if (answerName.includes('missingSignature')) {
                    promises.push(
                        readFile({filePath: theAnswer.res.file, options: 'utf8', fs})
                            .then((content) => {
                                updatedResult[theAnswer.index].fixed = true;
                                writeFile({
                                    filePath: theAnswer.res.file,
                                    options: 'utf8',
                                    data: content.replace('@snippet', `@signature('${theAnswer.input}')\n@snippet`),
                                    fs
                                });
                            })
                    );
                }
            });

            Promise.all(promises).then(() => {
                resolve({splitFilePaths, finalResults: updatedResult});
            });
        });
    });
};

function createWrongQuestion(i, res) {
    return {
        type: 'list',
        name: `${i} - ${res.type}`,
        message: `The file ${res.file} has a wrong value for the ${res.type.replace('wrong', '')} attribute.`,
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
    };
}

function createMissingQuestion(i, res) {
    return {
        type: 'input',
        name: `${i} - ${res.type}`,
        message: `The file ${res.file} is missing the ${res.type.replace('missing', '')} attribute. Fill with: `,
        default: res.expected,
        filter: (answer) => ({
            res,
            input: answer,
            index: i
        })
    };
}