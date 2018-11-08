/*********************************************************************************
 * @file: 通过接口获取微信config数据
 * @desc:
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
	//base64当前页面地址传给后端生成config数据
	axios.get(`${location.origin}/configdata?href=${href}`).then((res)=>{
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: res.data.appid, // 必填，公众号的唯一标识
			timestamp: res.data.timestamp, // 必填，生成签名的时间戳
			nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
			signature: res.data.signature,// 必填，签名，见附录1
			jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
			type: obj.link ? obj.link : "", // 分享类型,music、video或link，不填默认为link
			dataUrl: obj.dataUrl ? obj.dataUrl :"", // 如果type是music或video，则要提供数据链接，默认为空
			success: function () {
				if (typeof callback === "function"){
					callback();
				}
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});

		// 分享到微博
		wx.onMenuShareWeibo({
			title: obj.title,
			desc: obj.desc,
			link: obj.link,
			imgUrl: obj.imgUrl ? obj.imgUrl:"",
			success: function () {
				// 用户确认分享后执行的回调函数
			},
			cancel: function () {
				// 用户取消分享后执行的回调函数
			}
		});
	});
}

export default wxShare;
