const replace = require('replace-in-file');

replaceSnipsonianSrcImportsToEsImports();

async function replaceSnipsonianSrcImportsToEsImports() {
    console.error('Replacing snipsonian-src-imports with es-imports ...');

    const replaceOptions = {
        files: [
            'packages/*/es/**/*.js',
            'packages/*/cjs/**/*.js'
        ],
        from: /'@snipsonian\/[a-zA-Z\-]*\/src\//g,
        to: (match) => match.replace('/src/', '/es/'),
    };

    try {
        const changes = await replace(replaceOptions)
        console.log('Modified files:', changes.join(', '));
    } catch (error) {
        console.error('Error occurred:', error);
    }
}
