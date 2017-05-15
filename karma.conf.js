module.exports = function configureKarma(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // How long will Karma wait for a message from a browser before disconnecting from it (in ms)
        browserNoActivityTimeout: 10000,
        // browserNoActivityTimeout: 600000, //enable when debugging

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['systemjs', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [],

        systemjs: {
            // Path to your SystemJS configuration file
            configFile: 'systemJs.config.js',

            // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries.
            serveFiles: [
                'src/**/!(*.spec).js'
            ]

            // SystemJS configuration specifically for tests, added after your config file.
            // Good for adding test libraries and mock modules
            // config: {
            //     paths: {
            //         'angular-mocks': 'bower_components/angular-mocks/angular-mocks.js'
            //     }
            // }
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['babel']
        },

        babelPreprocessor: {
            options: {
                sourceMap: 'inline',
                retainLines: true
            }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
