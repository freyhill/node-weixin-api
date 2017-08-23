var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('../webpack.config.dev');

var app = express();
var compiler = webpack(config);

var webpackDevMiddleware = require("webpack-dev-middleware");

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, //false将打印编译信息（建议true，false会打印很多信息）
  publicPath: config.output.publicPath //绑定middleware
}));

var webpackHotMiddleware = require('webpack-hot-middleware');
app.use(webpackHotMiddleware(compiler));
 
//app.use('/public',express.static(path.resolve(__dirname, '../public')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../index.html')); //
});

app.listen(3100, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3100');
});

