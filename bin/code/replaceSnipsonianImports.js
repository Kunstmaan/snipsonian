const { replaceInFile } = require('replace-in-file');

const args = process.argv.slice(2);
const targetFolder = args[0];

if (!targetFolder || targetFolder.length === 0) {
    throw new Error('Please provide a "targetFolder" as input, e.g. "es" or "cjs"');
}

replaceSnipsonianSrcImports({
    targetFolder,
});

async function replaceSnipsonianSrcImports({ targetFolder }) {
    console.error(`Replacing snipsonian-src-imports with ${targetFolder}-imports ...`);

    const replaceOptions = {
        files: [
            `packages/*/${targetFolder}/**/*.js`,
            `packages/*/${targetFolder}/**/*.d.ts`,
        ],
        from: /@snipsonian\/[a-zA-Z\-]*\/src\//g,
        to: (match) => match.replace('/src/', `/${targetFolder}/`),
    };

    try {
        const replaceResults = await replaceInFile(replaceOptions)
        console.log('Modified files:', replaceResults
            .filter((replaceResult) => replaceResult.hasChanged)
            .map((replaceResult) => replaceResult.file)
            .join(', '));
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
