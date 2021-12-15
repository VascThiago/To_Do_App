const webpack = require('webpack')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ExtractTextPlugin = require('mini-css-extract-plugin')
 
module.exports = {
    mode: 'development', // 'production' // | 'development' | 'none'
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        static: './public',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            modules: __dirname + '/node_modules'
        }
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
        })
    ],
    module: {
        rules: [
        {
            test: /.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                /* options: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-object-rest-spread']
                } */
            }],
            exclude: /node_modules/,
 
        }, {
            test: /\.css$/i,
            use: [ExtractTextPlugin.loader, "css-loader"],
            /* use: [
                {
                    loader: ExtractTextPlugin.loader
                },
                "css-loader"
            ], */
        }, {
            test: /\.woff|.woff2|.ttf|.eot|.svg*.*$/,
            use: 'file-loader'
        }]
    }
}