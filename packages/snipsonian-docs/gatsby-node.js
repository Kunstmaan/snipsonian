/* eslint-disable global-require */
/**
 * Create pages from this file
 *
 *
 */

const fs = require('fs');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    const packageNames = fs.readdirSync('./documentation');
    const fullDocumentationPerPackage = packageNames.reduce(
        (doc, packageName) => {
            const versionFilenames = fs.readdirSync(`./documentation/${packageName}`);

            // eslint-disable-next-line no-param-reassign
            doc[packageName] = versionFilenames.reduce(
                (acc, filename) => {
                    const versionDocumentation =
                        JSON.parse(fs.readFileSync(`./documentation/${packageName}/${filename}`));
                    acc[versionDocumentation.version] = versionDocumentation;
                    return acc;
                },
                {},
            );
            return doc;
        },
        {},
    );

    const navigation = Object.keys(fullDocumentationPerPackage).map((packageName) => {
        const packageDoc = fullDocumentationPerPackage[packageName];
        const firstVersionDocumentation = packageDoc[Object.keys(packageDoc).sort().pop()];
        return {
            title: packageName.replace('snipsonian-', ''),
            to: firstVersionDocumentation.slug,
        };
    });

    createPage({
        path: '/',
        component: require.resolve('./src/templates/MainTemplate/index.tsx'),
        context: {
            navigation,
            home: {
                title: 'Snipsonian',
                text: 'Documentation for the snipsonian package',
            },
        },
    });

    Object.keys(fullDocumentationPerPackage).forEach((packageName) => {
        const packageDoc = fullDocumentationPerPackage[packageName];

        const versionNavigation = Object.keys(packageDoc)
            .reduce(
                (acc, version) => {
                    const versionDoc = packageDoc[version];
                    const navItem = {
                        title: version,
                        to: versionDoc.slug,
                    };
                    acc.push(navItem);
                    return acc;
                },
                [],
            );

        Object.keys(packageDoc).forEach((version) => {
            const versionDoc = packageDoc[version];
            createPage({
                path: versionDoc.slug,
                component: require.resolve('./src/templates/MainTemplate/index.tsx'),
                context: {
                    navigation,
                    packageDocumentation: versionDoc,
                    versionNavigation,
                },
            });
        });
    });
};
