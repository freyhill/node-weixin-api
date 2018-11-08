/**
 * @project: node微信开发
 * @author: leinov
 * @date: 2018-11-08
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./js/App";
import "./index.scss";
import wxShare from "../component/wxconfig.js";
wxShare({
	title: "微信分享标题", // 分享标题
	desc:"微信分享描述", // 分享描述
	link: location.href, // 分享链接
	imgUrl:"https://qiniu.web-resource.goxueche.com/jiaddwxicon.png" , // 分享图标
});
ReactDOM.render(<App />, document.getElementById("root"));
