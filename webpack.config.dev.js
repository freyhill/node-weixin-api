var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [

        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        // 需要编译的js对应上面的devjs
        './src/index.js'
    ],
    output: {

        //path: path.join(__dirname, 'public/dist'),
        filename: 'boundle.js',
        publicPath: '/dist/js/'
    },
    module: {

        loaders: [{
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/ //哪些文件下的需要用到babel
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/,
                loaders: ['url?limit=8192&name=images/[name].[ext]'],
            }
        ]
    } ,
    resolve:{
        alias: {
            css: path.resolve(__dirname, 'public/static/css/'),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};
