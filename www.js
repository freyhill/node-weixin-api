/* eslint-env node */

/**
 * @file: 线上启动程序
 * @author: leinov
 * @date: 2018-10-10
 */

var express = require("express");
var app = express();
var http = require("http");
var getConfigData = require("./server/weixin/wx.js");
var port = "3001";

//在浏览器中打开 下面执行
//const opn = require("opn");

//启动压缩
var compression = require("compression");
app.use(compression());

//静态页面路径
app.use(express.static("./dist"));
app.set("port", port);

//启动server
var server = http.createServer(app);
server.listen(port);

//获取微信配置数据接口
app.get("/configdata", function(req, res){ //获取配置
	let href = req.query.href;
	getConfigData(href).then((data)=>{
		res.send(JSON.stringify(data));
	});
});

//接口测试
app.get("/test", function(req, res){ //获取配置
	res.send(JSON.stringify({code:0,msg:"成功"}));
});
server.on("listening", onListening);

function onListening() {
	console.log(`server port ${port} listening and open browser with http://localhost:${port}....` );
	//opn(`http://localhost:${port}`,"chrome");
}
