var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        './src/index.js'
    ],
    output: {

        path: path.join(__dirname, 'public/dist/js'),
        filename: 'boundle.js',
        //publicPath: '/dist/'
    },
    module: {

        loaders: [{
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/  
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
            img: path.resolve(__dirname, 'public/static/img/'),
        }
    },

    plugins: [
   
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoEmitOnErrorsPlugin(),
         new webpack.optimize.UglifyJsPlugin({
                 compress: {
                   warnings: false
               }
           }),
           new webpack.DefinePlugin({
               'process.env': {
                   'DEBUG': true,
                   'NODE_ENV': JSON.stringify('production')
               }
           })
       ]
    };

