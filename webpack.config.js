'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEVELOP = NODE_ENV === 'development';
const PORT = process.env.PORT || 8080;

module.exports = {
    port: PORT,
    context: path.join(__dirname, 'src'),
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:' + PORT,
            'webpack/hot/dev-server',
            './js/main.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: "http://localhost:" + PORT + '/',
        filename: 'js/[name].js?[hash]'
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
                loader: "handlebars"
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
                loader: "url?limit=10000&mimetype=application/font-woff&name=./fonts/[name].[ext]?[hash]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file?name=./fonts/[name].[ext]?[hash]"
            }
        ]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['build'], { root: __dirname }),
        new ExtractTextPlugin("./css/[name].css?[contenthash]", { allChunks: true, disable: IS_DEVELOP }),
        new HtmlWebpackPlugin({
            title: 'Synoptik',
            template: 'index.html'
        })
    ],
/*    devServer: {
        port: 3001,
        hot: true
    },*/
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