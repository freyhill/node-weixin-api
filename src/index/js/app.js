/**
 * @project: node微信开发
 * @author: leinov
 * @date: 2018-11-08
 */

import React, { Component } from "react";

export default class App extends Component {

	componentDidMount() {

	}

	render() {

		return (
			<div className="node-weixin pd20">
				<h5 className="center pd20 title">node微信公众号开发</h5>
				<ul className="font28 pd40">
					<li>1. 克隆项目<a className="" href="https://github.com/leinov/node-weixin-api">node-weixin-api</a></li>
					<li>2. npm install</li>
					<li>3. 在微信后台配置域名白名单</li>
					<li>4. 添加自己的appid secret</li>
					<li>5. npm run build 打包</li>
					<li>6. 将域名配置时下载的txt文件放到dist文件夹下</li>
					<li>7. 上传到服务器</li>
					<li>8. 在微信里分享测试</li>
				</ul>
				<div className="pd40">详细参考githu代码：<a className="" href="https://github.com/leinov/node-weixin-api">node-weixin-api</a></div>
			</div>
		);
	}
}
