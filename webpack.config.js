const path = require('path');
const webpack = require('webpack');
const environment = process.env.NODE_ENV || 'development';

const plugins = {
  development: [],
  production: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    })
  ]
};

module.exports = {
    entry: {
        index: "./src/js/index.js",
        styles: "./src/js/styles/main.scss"
    },
    output: {
        path: path.resolve(__dirname, './src/app/public/js'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /.scss?$/,
                use: [
                  { loader: 'style-loader'},
                  { loader: 'css-loader'},
                  { loader: 'sass-loader'}
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
        modules: [
            'node_modules',
            path.resolve(__dirname, './node_modules')
        ]
    },
    plugins: plugins[environment],
    watch: environment === 'development'
};
