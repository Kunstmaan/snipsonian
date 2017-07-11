const chalk = require('chalk');

module.exports = function printResults({data, result}) {
    const messages = {};
    result.forEach((res) => {
        if (!messages[res.type]) {
            messages[res.type] = {
                paths: [{
                    file: {path: res.file, fixed: res.fixed},
                    errorOrWarning: res.errorOrWarning
                }]
            };

            switch (res.type) {
                case 'missingName':
                    messages.missingName.title = chalk.red.bold.underline('No @name atribute was found in the' +
                ' folowing file(s):');
                    break;
                case 'wrongName':
                    messages.wrongName.title = chalk.yellow.bold.underline('The value in the @name attribute is not' +
                ' the same as the file name:');
                    break;
                case 'missingDoc':
                    messages.missingDoc.title = chalk.red.bold.underline('No doc file was found for this/these' +
                ' snippet(s):');
                    break;
                default:
                    break;
            }
        } else {
            messages[res.type].paths.push({
                file: {path: res.file, fixed: res.fixed},
                errorOrWarning: res.errorOrWarning
            });
        }
    });

    Object.keys(messages).forEach((message) => {
        console.log(messages[message].title);

        messages[message].paths.forEach((path) => {
            console.log(`\t${path.file.path} ${path.file.fixed ? chalk.green(' -- fixed') : ''}`);
        });
    });
};