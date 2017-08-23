var path = require('path');
var express = require('express');
var app = express();
 
var oneYear = 60 * 1000 * 60 * 24 * 30;

app.use(express.static(path.resolve(__dirname, '../public'), { maxAge: oneYear }));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,'../index.html'));
});
console.log(path.resolve(__dirname,'../'));

app.listen(3200, function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3200');
  
});
    border-bottom:  none !important;
    border-top:  none !important;
    border-right:  none !important;
    border-left:  3px solid #e4e4e4 !important;
    background:  #f4f4f4;