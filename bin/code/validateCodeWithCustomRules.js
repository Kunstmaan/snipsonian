/**
 * Script that does some code inspection, in addition to the eslint rules, to prevent some dev mistakes
 * that are not easily debuggable.
 * e.g.
 *   - checks that React is imported properly using "import * as React"
 *     (as "import React from 'react'" leads to issues in the transpiled code)
 *
 * p.s. Would be even better that we do these checks in a custom-developed eslint plugin.
 */

const { replaceInFileSync } = require('replace-in-file');

const args = process.argv.slice(2);
const isFixMode = args[0]
    ? args[0].toLowerCase() === 'fix'
    : false;

validateCodeWithCustomRules();

function validateCodeWithCustomRules() {
    console.log('Start validating the source code with some custom rules');
    console.log(`isFixMode = ${isFixMode.toString()}`);

    const allValid = areReactImportsValid();

    if (allValid) {
        console.log('Script done. Custom validation was OK.');
    } else {
        console.error('Custom validation NOT OK !!!');
        throw new Error('Custom validation not ok');
    }
}

function areReactImportsValid() {
    const replaceOptions = {
        files: [
            'packages/*/src/**/*.ts',
            'packages/*/src/**/*.tsx',
        ],
        from: [
            new RegExp('import React from \'react\'', 'g'),
        ],
        to: [
            (match) => match.replace('import React', 'import * as React'),
        ],
        countMatches: true,
        dry: !isFixMode,
    };

    const replaceResults = replaceInFileSync(replaceOptions);

    const filesWithMatches = replaceResults
        .filter(({ numMatches }) => numMatches > 0)
        .map(({ file }) => file);

    if (filesWithMatches.length === 0) {
        console.log('React imports: OK');
        return true;
    }

    console.error('React imports: ERROR');
    console.log('When importing React, you have to use "import * as React" '
        + 'as "import React" results in issues with the transpiled code!');
    console.log(`Files ${isFixMode ? 'fixed' : 'found'} with wrong imports:\n  - ${filesWithMatches.join('\n  - ')}`);

    return false;
}
