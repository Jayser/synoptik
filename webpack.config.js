'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const  NODE_ENV = process.env.NODE_ENV || 'develop';

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './js/main.js',
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: '/build/',
        filename: 'js/[name].js'
    },
    devtool: "eval",
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                include: /src/,
                loader: 'eslint'
            }
        ],
        loaders: [
            {
                test: /\.hbs$/,
                include: /src/,
                loader: "handlebars-loader"
            },
            {
                test: /\.js$/,
                include: /src/,
                loader: 'babel'
            },
            {
                test: /\.scss/,
                include: /src/,
                loader: ExtractTextPlugin.extract("style", ["css?sourceMap", "sass?sourceMap"])
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file?name=./fonts/[name].[ext]"
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['build'], {root: __dirname}),
        new CopyWebPackPlugin([{from: './index.html'}]),
        new ExtractTextPlugin("./css/main.css", { allChunks: true })
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