# node微信公众号开发

## 概览

| key |value|
|---|---|
项目名称 | node微信公众号开发
项目描述|使用node编写接口，前后端分离获取签名数据
开发者 | leinov
发布日期|2018-11-07
仓库 | [github地址](https://github.com/leinov/node-weixin-api)

## 安装&使用

##### 下载

```
git clone git@github.com:leinov/node-weixin-api.git

npm install
```

##### 开发

* 在微信公众号后台配置域名白名单
* 在```server/weixin/wx.js```里添加自己的```appid``` ```secret```
* 在```src/index/index.js```里```wxShare```里添加自己的分享内容
* ```npm run dev ```
* 打开微信开发者工具调试
* ```npm run build```
* 将域名配置时下载的txt文件放到dist文件夹下
* 上传到服务器
* ```pm2 start www.js```启动服务
* 在微信里打开连接分享给好友测试
* 扩展：修改/src/component/wxconfig.js中的jsApiList数组，添加想要使用的微信api



## 架构

#### 技术使用

* [webpack-react-multi-page 多页面架构](https://github.com/leinov/webpack-react-multi-page)
* ```webpack4```
* ```react16```
* ```es6```
* ```node ```
* ```js-sdk```
* ```git```


#### 目录结构&功能介绍

```
|-- node-weixin-api //项目
    |-- dist //编译生产目录
        |-- index
            |-- index.css
            |-- index.js
        |-- index.html
        |-- xxx.txt // 微信域名绑定识别文件
    |-- node_modules
    |-- server // node文件
        |-- sign.js //公众号文档提供签名算法
        |-- wx.js //获取签名数据文件
    |-- src //开发目录
        |-- index
            |-- images/
            |-- js/
                |-- app.js
                |-- b.js
            |-- index.scss
            |-- index.js //页面js入口文件
        |-- template.html // webpack html-webpack-plugin 插件生成html模板
        |-- style.sass //公共sass
    |-- webpackConfig //webpack配置
    |-- package.json
    |-- .gitignore
    |-- webpack.config.js //webpack配置文件
    |-- www.js //生产启动程序
```

## WIKI

我们在微信网页开发的时候需要通过后端返回的微信签名数据加以前端的配置才能使用微信提供的分享，图像，音频等api接口。这里我们就用前后端分离的思想，拿分享到朋友圈为例，使用node来完成这一过程
##### 下图没有使用js-sdk开发的页面在微信里分享样式

![image](http://www.h5cool.com/wx2.jpg)

接下来我们一步步来实现

### 步骤一：绑定域名

先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。

在添加域名时需要下载一个txt文件放到服务器web可访问的根目录 比如http://www.leinov.com/xxx.txt 可访问的静态根目录，比如node的静态文件设置的是public文件，就放public下

备注：登录后可在“开发者中心”查看对应的接口权限，看是否有分享朋友圈等权限

### 步骤二： 引入微信JS文件

在需要调用JS接口的页面引入如下JS文件，（支持https）：http://res.wx.qq.com/open/js/jweixin-1.4.0.js  也可以直接下载到本地目录引入

### 步骤三：通过config接口注入权限验证配置（第六步详解）

所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用,目前Android微信客户端不支持pushState的H5新特性，所以使用pushState来实现web

```
wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表
});

```

我们使用微信的所有接口都需要有在[引入wx js-sdk](http://res.wx.qq.com/open/js/jweixin-1.4.0.js)和配置config的前提下
下面我们主要讲解如何通过node来获取微信签名的config的数据。

### 步骤四：生成签名config数据

步骤三所需要的数据需要通过签名算来生成，下面是生成签名数据的步骤

* 1,通过公众号的appid和secret获取access_token
* 2.根据access_token获取ticket票据
* 3.根据[微信提供node生成签名算法](http://demo.open.weixin.qq.com/jssdk)（需要ticket，url参数来返回config数据


这里要强调是secret一定要写在后端，决不能暴露在前端，这也是为什么需要用接口返回数据的原因。

##### 获取签名config数据完整代码 server/wx.js

```
/*********************************************************************************
 * @file: 返回微信开发需要的config数据
 * @desc:
 * 		1,通过appid和secret获取access_token
 *  	2.根据access_token获取ticket
 *  	3.根据ticket和url(访问的页面地址由接口传过来 )通过sgin加密返回前度需要用到的config数据
 * @ahthor: leinov
 * @usedate:2018-11-07
**********************************************************************************/

const request = require("request");
const Base64 = require("js-base64").Base64;
const sign = require("./sign.js"); //微信提供在开发文档可以找到下载到本地
const base={
	appid:"****",//公众号appid
	secret:"****", // 公众号secret （重要不要暴露在前端）
	wxapi:"https://api.weixin.qq.com/cgi-bin"
};
/**
 * 根据appid,secret获取access_token
 */
function  getAccessToken(){
	return new Promise((resolve, reject)=>{
		request.get(`${base.wxapi}/token?grant_type=client_credential&appid=${base.appid}&secret=${base.secret}`, function (error, response, body) {
			if(error!==null){
				reject("获取access_token失败 检查getAccessToken函数");
			}
			resolve(JSON.parse(body));
		});
	});
}

/**
 * 根据access_token获取api_ticket
 *
 * @param  {String} access_token
 * @return {Promise}
 */
function getTicket(access_token){
	return new Promise((resolve,reject)=>{
		request.get(`${base.wxapi}/ticket/getticket?access_token=${access_token}&type=jsapi`, function (error, response, body) {
			if(error!==null){
				reject("获取api_ticket失败 检查getTicket函数");
			}
			resolve(JSON.parse(body));
		});
	});
}

/**
 * 根据api_ticket和url通过加密返回所有config数据
 *
 * @param  {String} href
 * @return {Object} configdata
 */
async function getConfigData(href){
	let configData;
	try{
		const accessTokenData = await getAccessToken();
		const ticketData = await getTicket(accessTokenData.access_token);
		const decodeHref = Base64.decode(href);
		configData = sign(ticketData.ticket,decodeHref);
		configData.appid = base.appid;
	}catch(err){
		//打印错误日志
		console.log(err);
		configData = {};
	}
	return configData;
}

module.exports = getConfigData;
```

这里使用到了```request```来请求微信接口，sign.js是微信提供的node签名算法，自己可以下载，通过微信接口请求以及node签名算法就可以获取到如下签名数据。

```
  timestamp: ,  // 生成签名的时间戳
  nonceStr: '', // 生成签名的随机串
  signature: '',// 签名
```

### 第五步：编写接口返回config数据

上面wx.js已经获得数据， 接下来我们用node编写接口返回数据。注意下面的```href```，href是前端传回的用来生成签名的，而且这个网页地址的域名一定是在设置里加入白名单了的。

```
var express = require("express");
var app = express();
var getConfigData = require("./server/wx.js");
var port = "3000";

//获取微信配置数据接口
app.get("/wxconfigdata", function(req, res){ //获取配置
	let href = req.query.href;//get获取前端传来的base64网页地址
	getConfigData(href).then((data)=>{
		res.send(JSON.stringify(data));
	});
});

var server = http.createServer(app);
server.listen(port);
server.on("listening", onListening);
```

这样就启动了一个3000端口的服务
我们通过访问 "http://localhost:3000/wxconfigdata" 就可以拿到数据，但这个数据是不正确的，因为locahost跟在设置里的白名单域名不匹配，所以在开发时我们要放到测试服务器里测试。

### 步骤六：前端请求获取签名数据

```
/*********************************************************************************
 * @file: src/wxconfig.js 通过接口获取微信config数据
 * @ahthor: leinov
 * @usedate:2018-11-07
**********************************************************************************/

import { Base64 } from "js-base64";
const axios = require("axios");

/**
 * 页面调用微信分享方法
 *
 * @param  {Object} obj      分享的标题，描述，图片等
 * @param  {type} callback
 * @return {type}
 */
function wxShare(obj,callback){
	const href = Base64.encode(location.href);
	//base64当前页面地址传给后端生成签名
	axios.get(`${location.origin}/wxconfigdata?href=${href}`).then((res)=>{
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appid, // 必填，公众号的唯一标识
			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.signature,// 必填，签名，见附录1
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见文档
		});
		shareConfig(obj,callback);
	}).catch((err)=>{
		shareConfig({},callback);
	});
}

function shareConfig(obj,callback){
	wx.ready(function(){
		//分享到朋友圈
		wx.onMenuShareTimeline({
			title:  obj.timelinetitle ? obj.timelinetitle : obj.title , // 分享标题
			link: obj.link, // 分享链接
			imgUrl: obj.imgUrl ? obj.imgUrl :"" , // 分享图标
			success: function () {
				if (typeof callback === "function"){
					callback();
				}
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});

		// 分享给微信好友
		wx.onMenuShareAppMessage({
			title: obj.title, // 分享标题
			desc: obj.desc, // 分享描述
			link: obj.link, // 分享链接
			imgUrl: obj.imgUrl ? obj.imgUrl:"",
			success: function () {
				if (typeof callback === "function"){
					callback();
				}
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});
	});
}

export default wxShare;
```

### 步骤七：页面使用

假设我们使用的是react 在react 打包入口js文件里调用配置即可

```
import wxShare from "../component/wxconfig.js";
wxShare({
	title: "驾多多-小程序时代的驾校管理系统", // 分享标题
	desc:"驾多多驾校管理系统。帮助驾校在互联网时代，零门槛使用小程序工具，提升招生量、提升服务能力、降低运营成本，是为驾校提供人、财、物及业务办理的综合管理系统。", // 分享描述
	link: location.href, // 分享链接
	imgUrl:"https://***/jiaddwxicon.png" , // 分享图标
});
```

##### 在配置正确的情况下就可以实现配置分享标题描述和图片了，并且微信提供的可用接口都可以实现。

![image](http://www.h5cool.com/wx1.jpg)

## tips

* 在微信开发者工具中调试
* appid和secret一定要正确
* 域名一定是备案的
* 绑定域名需要的放在服务器上的txt位置一定要正确

## 参考

* [微信公众号开发文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842)
