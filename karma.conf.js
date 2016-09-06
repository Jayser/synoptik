const path = require('path');
const webpack = require('karma-webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        files: [
            './tests/**/*.spec.js'
        ],
        plugins: [
            webpack,
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-spec-reporter'
        ],
        preprocessors: {
            'tests/**/*.spec.js': ['webpack']
        },
        reporters: ['progress', 'coverage'],
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /\.spec\.js$/,
                        include: /tests/,
                        exclude: /(bower_components|node_modules)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.js?$/,
                        include: /tests/,
                        exclude: /(node_modules|bower_components|tests)/,
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve(__dirname, './src'),
                        exclude: /(bower_components|node_modules|tests)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        },
        coverageReporter: {
            //dir: 'build/reports/coverage',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
            ]
        },
        webpackMiddleware: { noInfo: true }
    });
};
