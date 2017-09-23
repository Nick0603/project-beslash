import path from 'path'
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var colors = require('colors');
// var extractCSS = new ExtractTextPlugin('css/[name].css');

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css"
    , disable: process.env.NODE_ENV === "development"
});

var webpack_configs = webpack({
    entry: {
        // index: './../public/bundle/index'
        index: path.join(__dirname, './../public/bundle/index')
    },
    output: {
        // path: __dirname + '/public/webpackBale',
        path: path.join(__dirname, '/../public/webpackBale'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!resolve-url-loader"
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['stage-3', 'react']
                }
            },
            {
                test: /\.png|jpg$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        extractSass
        // , new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
});

webpack_configs.watch({ // watch options:
    aggregateTimeout: 400, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    if(err){
        console.warn(colors.red(err));
    }
});

module.exports = webpack_configs;