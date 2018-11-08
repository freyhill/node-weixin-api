# node微信公众号开发

## 概览


 key |value
---|---
项目名称 | node微信公众号开发
项目描述|使用node编写接口，前后端分离获取签名数据
开发者 | leinov
发布日期|2018-11-07

## 安装&使用

##### 下载
```
git clone git@github.com:leinov/node-weixin-api.git

npm install
```
##### 开发

* 在微信后台配置域名白名单
* 在```server/weixin/wx.js```里添加自己的```appid``` ```secret```
* 在```src/index/index.js```里```wxShare```里添加自己的分享内容
* ```npm run dev ```
* 打开微信开发者工具调试
* ```npm run build```
* 将域名配置时下载的txt文件放到dist文件夹下
* 上传到服务器
* ```pm2 start www.js```启动服务
* 在微信里打开连接分享给好友测试




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
具体见代码

## 参考
* [微信公众号开发文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842)
