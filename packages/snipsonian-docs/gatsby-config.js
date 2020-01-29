module.exports = {
    siteMetadata: {
        title: 'Snipsonian docs',
        description: 'Snipsonian Documentation',
        author: 'Kunstmaan',
    },
    plugins: [
        'gatsby-plugin-postcss',
        'gatsby-plugin-typescript',
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sharp',
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
        {
            resolve: 'gatsby-plugin-purgecss',
            options: {
                printRejected: true, // Print removed selectors and processed file names
                // develop: true, // Enable while using `gatsby develop`
                tailwind: true, // Enable tailwindcss support
                // whitelist: ['whitelist'], // Don't remove this selector
                // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
                // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
            },
        },
    ],
};
