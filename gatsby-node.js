exports.modifyWebpackConfig = function(config /*, stage*/) {
    config.removeLoader('md');
    config.loader('md', {
        test: /\.md$/,
        loader: 'babel-loader!reactdown/webpack'
    });

    return config;
}