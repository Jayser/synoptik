var open = require("open");
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(5000, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    open("http://localhost:5000/build/index.html");
    console.log('Listening at localhost:5000');
});