const path = require('path');
const webpack = require('webpack');
const args = process.argv.slice(2);
const https = args[2] === '--https' && args[3] === 'true';

module.exports = {
    devtool: 'eval',
    entry: {
        index: [
            './js/index.js' // index/nav js
        ],        
        audio: [
            './features/audio.js'
        ],
        video: [
            './features/video.js'
        ],
        share: [
            './features/share.js'
        ],
        chat: [
            './features/chat.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, '/static'),
        publicPath: '/static',
        hashDigestLength: 5,
        // filename: `zoom-meeting-${buildVersion}-[name]-[chunkhash].min.js`,
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'url-loader?limit=500000'
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'url-loader?limit=50000'
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        'babel-polyfill': 'babel-polyfill',
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_',
            var: '_'
        }
    },
    context: __dirname,
    target: 'web',
    devServer: {
        https,
        cert: './localhost.crt',
        key: './localhost.key',
        host: '0.0.0.0',
        port: 9999,
        hot: true,
        overlay: true,
        historyApiFallback: false,
        watchContentBase: true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': https ? 'https://0.0.0.0:9999' : 'http://0.0.0.0:9999'
        }
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.BABEL_ENV': JSON.stringify('development'),
        })
    ],
};