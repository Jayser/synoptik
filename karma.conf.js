var path = require('path');
var webpackConfig = require('./webpack.config');
var webpack = require('karma-webpack');

webpackConfig.module.loaders = [{
    test: /\.js$/,
    include: /test/,
    loader: 'babel'
}];
webpackConfig.module.postLoaders = [{
    test: /\.js$/,
    include: /test/,
    loader: 'istanbul-instrumenter'
}];

webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
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
        browsers: ['PhantomJS'],
        preprocessors: {
            'tests/**/*.spec.js': ['webpack']
        },
        reporters: [ 'spec', 'coverage' ],
        coverageReporter: {
            dir: 'build/reports/coverage',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.txt' }
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: { noInfo: true }
    })
};