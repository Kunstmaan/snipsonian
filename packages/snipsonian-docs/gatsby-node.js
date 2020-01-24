/* eslint-disable global-require */
/**
 * Create pages from this file
 *
 *
 */

const fs = require('fs');

exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    const fullDocumentation = getFullDocumentationPerPackagePerVersion({ path: './documentation' });
    const navigation = createNavigationData({ fullDocumentation });

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

    Object.keys(fullDocumentation).forEach((packageName) => {
        const packageDocumentation = fullDocumentation[packageName];
        const versionNavigation = createVersionNavigationData({ packageDocumentation });

        Object.keys(packageDocumentation).forEach((version) => {
            const versionDocumentation = packageDocumentation[version];
            createPage({
                path: versionDocumentation.slug,
                component: require.resolve('./src/templates/MainTemplate/index.tsx'),
                context: {
                    navigation,
                    packageVersionDocumentation: versionDocumentation,
                    versionNavigation,
                },
            });
        });
    });
};

function getFullDocumentationPerPackagePerVersion({ path }) {
    const packageNames = fs.readdirSync(path);
    return packageNames.reduce(
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
}

function createNavigationData({ fullDocumentation }) {
    return Object.keys(fullDocumentation)
        .map((packageName) => {
            const packageDoc = fullDocumentation[packageName];
            const firstVersionDocumentation = packageDoc[Object.keys(packageDoc).sort().pop()];
            return {
                title: packageName.replace('snipsonian-', ''),
                to: firstVersionDocumentation.slug,
            };
        });
}

function createVersionNavigationData({ packageDocumentation }) {
    return Object.keys(packageDocumentation)
        .reduce(
            (acc, version) => {
                const versionDoc = packageDocumentation[version];
                const navItem = {
                    title: version,
                    to: versionDoc.slug,
                };
                acc.push(navItem);
                return acc;
            },
            [],
        );
}
