import webpack from 'webpack'
import path from 'path'
import colors from 'colors'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const extractSass = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: process.env.NODE_ENV === "development"
})

const webpack_configs = webpack({
  entry: {
    index: path.join(__dirname, '../public/bundle/index'),
  },
  output: {
      path: path.join(__dirname, '../public/webpackBale'),
      filename: 'js/[name].js'
  },
  module: {
      rules: [
          {
              test: /\.css$/,
              loader: "style-loader!css-loader!resolve-url-loader"
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.scss$/,
            use: extractSass.extract({
              use: [{
                loader: 'css-loader',
              }, {
                loader: 'sass-loader',
              }],
                // use style-loader in development
              fallback: 'style-loader',
            }),
          },
          {
              test: /\.jsx$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              options: {
                  plugins: ['transform-runtime'],
                  presets: ['es2015', 'react']
              }
          },
          {
              test: /\.png|jpg$/,
              loader: 'url-loader'
          }
      ]
  },
  plugins: [
    extractSass,
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
  ]
})

webpack_configs.watch({ // watch options:
    aggregateTimeout: 400, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    if(err){
        console.warn(colors.red(err))
    }
})

export default webpack_configs
