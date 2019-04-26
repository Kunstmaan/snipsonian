import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import replace from 'gulp-replace';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import notifier from 'node-notifier';
import livingcss from 'gulp-livingcss';
import browserSync from 'browser-sync';
import webpack from 'webpack';

import stylelintPlugin from '../../node_modules/stylelint';
import reporter from 'postcss-reporter';
import postcss from 'gulp-postcss';
import scssSyntax from 'postcss-scss';

import webpackConfig from './docs/config/webpack.config';

const examplesScssSrc = './docs/content/example-styles/*.scss';
const regexExampleOnly = /(?:[\s\S]*\/\* example start \*\/\n)([\s\S]*)(?:[.$]*\n\/\* example end \*\/[\s\S]*)/g;
const regexTwoLines = /\n\n\n/g;

function stylelint() {
    return gulp.src(['./src/**/*.scss'])
        .pipe(postcss([
            stylelintPlugin(),
            reporter({
                clearReportedMessages: true,
            }),
        ], {
            syntax: scssSyntax,
        }));
}

// copy example SCSS,
// removing imports and hidden styles,
// for SCSS in the markup
function processScssExamples() {
    const processedScssDir = './docs/content/example-styles/processed/';
    return gulp.src([examplesScssSrc])
        .pipe(replace(regexExampleOnly, '$1'))
        .pipe(gulp.dest(processedScssDir));
}

// compile example SCSS into CSS,
// removing imports and hidden styles,
// for CSS in the markup
function processCssExamples() {
    const processedCssDir = './docs/content/example-styles/processed/';
    return gulp.src([examplesScssSrc])
        .pipe(sass({
            'outputStyle': 'expanded'
        }).on('error', sassErrorHandler))
        .pipe(replace(regexExampleOnly, '$1'))
        .pipe(replace(regexTwoLines, ''))
        .pipe(gulp.dest(processedCssDir));
}

// concatenate example SCSS,
// for the main stylesheet
function concatCssExamples() {
    return gulp.src([examplesScssSrc])
        .pipe(sass({}).on('error', sassErrorHandler))
        .pipe(concat('examples.css'))
        .pipe(gulp.dest('./docs/dist/css/'));
}

function sassErrorHandler(error) {
    console.log(`Sass Error:\n${error.messageFormatted}`);
    notifier.notify({
        title: 'Sass',
        message: `Error in ${error.relativePath} at L${error.line}:C${error.column}`,
    });
    this.emit('end');
}

// generate static docs with Livingcss
function generateDocs() {
    return gulp.src('./docs/content/*.css')
        .pipe(livingcss('./docs/dist', {
            template: './docs/dev/template/template.hbs',
            loadcss: false,
            preprocess: function(context, template, Handlebars) {
                context.globalStylesheets = ['css/examples.css'];
                context.title = 'Snipsonian';
                context.suffix = 'SCSS';

                return livingcss.utils.readFileGlobs('./docs/dev/template/partials/*.hbs', (data, file) => {
                    // make the name of the partial the name of the file
                    const partialName = path.basename(file, path.extname(file));
                    Handlebars.registerPartial(partialName, data);

                    Handlebars.registerHelper('xif', (v1, operator, v2, options) => {
                        switch (operator) {
                            case '==':
                                return (v1 == v2) ? options.fn(this) : options.inverse(this);
                            case '===':
                                return (v1 === v2) ? options.fn(this) : options.inverse(this);
                            case '!=':
                                return (v1 != v2) ? options.fn(this) : options.inverse(this);
                            case '!==':
                                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
                            case '<':
                                return (v1 < v2) ? options.fn(this) : options.inverse(this);
                            case '<=':
                                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                            case '>':
                                return (v1 > v2) ? options.fn(this) : options.inverse(this);
                            case '>=':
                                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                            case '&&':
                                return (v1 && v2) ? options.fn(this) : options.inverse(this);
                            case '||':
                                return (v1 || v2) ? options.fn(this) : options.inverse(this);
                            default:
                                return options.inverse(this);
                        }
                    });
                });
            },
            sortOrder: [
                ['index', 'utility', 'layout']
            ],
            tags: {
                cssExample: function() {
                    const fileName = this.tag.description || this.block.name;
                    try {
                        const cssFile = fs.readFileSync(`docs/content/example-styles/processed/${fileName}.css`, 'utf8');
                        const scssFile = fs.readFileSync(`docs/content/example-styles/processed/${fileName}.scss`, 'utf8');

                        this.block.cssExample = {
                            css: cssFile.toString(),
                            scss: scssFile.toString(),
                        };
                    } catch (err) {
                        console.error(err);
                        console.error('-- Make sure you pass the example-styles filename, without extension!');
                    }
                },
            },
        }))
        .pipe(gulp.dest('./docs/dist'));
}

function scssDocs() {
    return gulp.src('./docs/dev/assets/scss/*.scss')
        .pipe(sass({
            'outputStyle': 'compressed'
        }).on('error', sassErrorHandler))
        .pipe(gulp.dest('./docs/dist/css'));
}

function devServer(cb) {
    browserSync
        .create('server')
        .init({
            ui: false,
            ghostMode: false,
            files: [
                './docs/dist/*.html',
                './docs/dist/css/*.css',
                './docs/dist/js/*.js',
            ],
            open: false,
            reloadOnRestart: true,
            server: {
                baseDir: './docs/dist',
            },
            notify: true,
        }, cb);
}

function buildOnChange(cb) {
    gulp.watch(['./src/**/*.scss', examplesScssSrc], processExamples);
    gulp.watch('./docs/dev/assets/scss/**/*.scss', scssDocs);
    gulp.watch('./docs/dev/assets/js/**/!(*.spec).js', bundleLocal);
    gulp.watch([
        './docs/content/**/*.{css,md}',
        '!./docs/content/example-styles/processed/**',
        './docs/dev/template/**/*.hbs'
    ], generateDocs);
    cb();
}

function testOnChange(cb) {
    gulp.watch('./src/**/*.scss', stylelint);
    gulp.watch('./docs/dev/assets/scss/**/*.scss', stylelint);
    cb();
}

function createBundleTask({
    config = undefined,
    watch = false,
    logStats = false,
}) {
    const compiler = webpack(config);

    return function bundle(done) {
        if (watch) {
            compiler.watch({}, handleWebpackResult);
        } else {
            compiler.run(handleWebpackResult);
        }

        function handleWebpackResult(err, stats) {
            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                    console.error(err.details);
                }
                return;
            }

            const info = stats.toJson();

            if (stats.hasErrors()) {
                console.error(info.errors);
            }

            if (stats.hasWarnings()) {
                console.warn(info.warnings);
            }

            if (logStats) {
                console.log(stats.toString());
            }
            done();
        }
    };
}

const bundleLocal = createBundleTask({
    config: webpackConfig(true),
});

const bundleOptimized = createBundleTask({
    config: webpackConfig(false, true),
    logStats: true,
});


const processExamples = gulp.series(
    processScssExamples,
    processCssExamples,
    concatCssExamples,
);

const build = gulp.series(
    processExamples,
    scssDocs,
    generateDocs,
    bundleOptimized,
);

const dev = gulp.series(
    processExamples,
    scssDocs,
    generateDocs,
    bundleLocal,
    devServer,
    stylelint,
    buildOnChange,
    testOnChange,
);

export { build, dev }
