var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    devtool: 'cheap-module-eval-source-map',//打包构建信息
    entry: [

        'eventsource-polyfill',//for IE
        'webpack-hot-middleware/client',//webpack服务连接到浏览器接收更新
        
        './src/index.js'
    ],
    output: {
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
            css: path.resolve(__dirname, 'public/static/css/'), //css目录别名
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};
