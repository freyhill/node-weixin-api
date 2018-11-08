# 驾多多官网

## 项目介绍


 key |value
---|---
项目名称 | node微信公众号开发
项目描述|使用node编写接口，前后端分离获取签名数据
开发者 | leinov
发布日期|2018-11-07
## 安装使用

```
// clone
git clone git@gitee.com:quxueche2016/saas_www.git

// 安装依赖包
npm install

// 开发
npm run dev

// 编译打包
npm run build

// 启动生产页面
npm start
```

## 项目架构
#### 技术使用
* [webpack-react-multi-page](https://github.com/leinov/webpack-react-multi-page)
* ```webpack```
* ```es6```
* ```node ```
* ```git```

#### 目录结构
```
|-- node-weixin-api //项目
    |-- dist //编译生产目录
        |-- index
            |-- images/
            |-- style.css
            |-- bundle.js
        |-- index.html
    |-- node_modules
    |-- server // node文件
    |-- src //开发目录
        |-- index
            |-- images/
            |-- js/
                |-- a.js
                |-- b.js
            |-- saas/
                |-- index.sass
            |-- index.js //页面业务js入口文件
        |-- template.html // webpack html-webpack-plugin 插件生成html模板
        |-- style.sass //公共sass
    |-- package.json
    |-- .gitignore
    |-- webpack.config.js //webpack配置文件
    |-- www.js //生产启动程序
```
