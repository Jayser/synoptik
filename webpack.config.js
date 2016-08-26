'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: './build',
        filename: 'js/[name].js'
    },
    devtool: "eval",
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel'
            },
            {
                test: /\.scss/,
                include: /src/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap", "sass?sourceMap")
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['build'], {root: __dirname}),
        new CopyWebPackPlugin([{from: 'src/index.html'}]),
        new ExtractTextPlugin("css/main.css")
    ],
    devServer: {
        port: 3001,
        hot: true
    },
    eslint: {
        emitErrors: true,
        reporter: function (results) {
            return results.map(function (result) {
                return result.messages.map(function (msg) {
                    return (
                        ' ' + msg.message + '(' + msg.ruleId + ')' +
                        ' @ line ' + msg.line + ' column ' + msg.column +
                        ' - ' +
                        (msg.fatal ? 'fatal, ' : '') +
                        'severity: ' + msg.severity
                    );
                }).join('\n');
            }).join('\n');
        }
    }
};