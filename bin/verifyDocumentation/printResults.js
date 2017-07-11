const chalk = require('chalk');

const errors = require('./helpers/errors');

module.exports = function printResults({finalResults}) {
    const messages = {};
    finalResults.forEach((res) => {
        if (!messages[res.type]) {
            messages[res.type] = {
                paths: [{
                    file: {path: res.file, fixed: res.fixed, expected: res.expected, current: res.current},
                    errorOrWarning: res.errorOrWarning
                }]
            };

            switch (res.type) {
                case errors.ERR_MISSING_NAME:
                    messages.missingName.title = createTitle('No @name attribute was found in the' +
                        ' folowing file(s):', res.errorOrWarning);
                    break;
                case errors.ERR_WRONG_NAME:
                    messages.wrongName.title = createTitle('The value in the @name attribute is not' +
                        ' the same as the file name:', res.errorOrWarning);
                    break;
                case errors.ERR_MISSING_DOC:
                    messages.missingDoc.title = createTitle('No doc file was found for this/these' +
                        ' snippet(s):', res.errorOrWarning);
                    break;
                case errors.ERR_MISSING_SIGNATURE:
                    messages.missingSignature.title = createTitle('No @signature attribute was' +
                        ' found in the following file(s)', res.errorOrWarning);
                    break;
                case errors.ERR_WRONG_SIGNATURE:
                    messages.wrongSignature.title = createTitle('The value of the @signature' +
                        ' attribute does not match the snippet signature', res.errorOrWarning);
                    break;
                default:
                    break;
            }
        } else {
            messages[res.type].paths.push({
                file: {path: res.file, fixed: res.fixed, expected: res.expected, current: res.current},
                errorOrWarning: res.errorOrWarning
            });
        }
    });

    Object.keys(messages).forEach((message) => {
        console.log(messages[message].title);

        messages[message].paths.forEach((path) => {
            console.log(`\t${path.file.path} ${path.file.fixed ? chalk.green(' -- fixed') : path.file.expected ? `
            ${chalk.green(`Expected:    ${path.file.expected}`)}
            ${chalk.red(`Found:       ${path.file.current}`)}` : ''}`);
        });
    });
};

function createTitle(msg, type) {
    if (type === 'warning') {
        return chalk.yellow.bold.underline(`\n${msg}`);
    }
    return chalk.red.bold.underline(`\n${msg}`);
}
