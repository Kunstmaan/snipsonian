/* eslint-disable global-require */
/**
 * Create pages from this file
 *
 *
 */

const analytics = require('./documentation/snipsonian-analytics/docs.json');
const api = require('./documentation/snipsonian-api/docs.json');
const axios = require('./documentation/snipsonian-axios/docs.json');
const browser = require('./documentation/snipsonian-browser/docs.json');
const core = require('./documentation/snipsonian-core/docs.json');
const dvlp = require('./documentation/snipsonian-dvlp/docs.json');
const node = require('./documentation/snipsonian-node/docs.json');
const observableState = require('./documentation/snipsonian-observable-state/docs.json');
const react = require('./documentation/snipsonian-react/docs.json');
const reactObservableState = require('./documentation/snipsonian-react-observable-state/docs.json');
const redux = require('./documentation/snipsonian-redux/docs.json');
const reduxFeatures = require('./documentation/snipsonian-redux-features/docs.json');
const reduxFirstRouter = require('./documentation/snipsonian-redux-first-router/docs.json');
// const scss = require('./documentation/snipsonian-scss/docs.json');


exports.createPages = ({ actions }) => {
    const { createPage } = actions;

    const documentation = {
        analytics,
        api,
        axios,
        browser,
        core,
        node,
        dvlp,
        observableState,
        react,
        reactObservableState,
        redux,
        reduxFeatures,
        reduxFirstRouter,
        // scss,
    };

    const navigation = Object.keys(documentation).map((key) => {
        const packageDoc = documentation[key];
        return {
            title: key,
            to: packageDoc.slug,
        };
    });

    createPage({
        path: '/',
        component: require.resolve('./src/templates/MainTemplate/index.tsx'),
        context: {
            navigation,
            packageDocumentation: null,
            home: {
                title: 'Snipsonian',
                text: 'Documentation for the snipsonian package',
            },
        },
    });

    Object.keys(documentation).forEach((key) => {
        const packageDoc = documentation[key];

        createPage({
            path: packageDoc.slug,
            component: require.resolve('./src/templates/MainTemplate/index.tsx'),
            context: {
                navigation,
                packageDocumentation: packageDoc,
            },
        });

        /* Creates a page for each file */
        // function createPagesFromDoc(doc) {
        //     if (doc.type === 'file') {
        //         createPage({
        //             path: doc.slug,
        //             component: require.resolve('./src/components/templates/MainTemplate/index.tsx'),
        //             context: {
        //                 documentation,
        //             },
        //         });
        //     } else if (doc.type === 'folder') {
        //         doc.children.forEach((child) => createPagesFromDoc(child));
        //     }
        // }

        // createPagesFromDoc(packageDoc);
    });
};
