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
        // {
        //     resolve: 'gatsby-source-filesystem',
        //     options: {
        //         name: 'docs',
        //         path: `${__dirname}/docs/`,
        //     },
        // },
        'gatsby-transformer-json',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
