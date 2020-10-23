{% import "./macro/sdk-init.md" as sdkInit %}

# 知晓云 JS SDK

## 简介

知晓云 JS SDK 是方便开发者结合知晓云产品，进行小程序开发的工具包，通过该 SDK，你可以在小程序中操作存储在知晓云中的数据表、内容库、媒体文件，及方便地调用微信登录，微信支付，发送模板消息等功能。在使用知晓云 JS SDK 前，需要先完成小程序、知晓云的注册以及相关信息的绑定与授权，请选择以下一种平台类型，查看详细的新手入门指南。

* [微信小程序](/newbies/wechat.md)
* [Web](/newbies/web.md)
* [支付宝小程序](/newbies/alipay.md)
* [QQ 小程序](/newbies/qq.md)
* [百度小程序](/newbies/baidu.md)
* [字节跳动（头条、抖音等）小程序](/newbies/bytedance.md)

以下以微信小程序平台为例，介绍引入 SDK 并初始化的方法，快速上手使用 SDK 进行开发。

## 引入 SDK 并初始化

{% tabs sdkplugin="小程序插件版", sdkfile="js 文件版", npm="npm 包" %}
{% content "sdkplugin" %}

使用知晓云 SDK 小程序插件，相对于引入 SDK js 文件方式，省去了下载 SDK 文件和配置服务器域名操作，同时可以更加方便的切换不同版本的 SDK。

### 添加知晓云 SDK 小程序插件

在[小程序的管理后台](https://mp.weixin.qq.com/)【设置】-【第三方服务】-【插件管理】中添加插件，根据知晓云 SDK 小程序插件的 AppID 「**wxc6b86e382a1e3294**」搜索到我们的插件，添加后等待审核，审核通过即可使用。

### 在项目配置中声明使用知晓云 SDK 小程序插件

> **info**
> 插件版 sdk 1.5.1 以上需小程序基础库 2.1.0 及以上。

在项目的配置文件 `app.json` 中对插件进行引入声明：


<pre>
<code class="lang-js">
"plugins": {
  "sdkPlugin": {
    "version": "{{ book.latestVersionWechatPlugin }}",
    "provider": "wxc6b86e382a1e3294"
  }
}
</code>
</pre>

目前知晓云 SDK 小程序插件提供如下版本：

| 插件版 SDK 版本 | 对应 js 文件版 SDK 版本 |
| :------------ | :----- |
| 0.1.0         | v1.2.0 |
| 1.3.0 及之后   | 与文件版的版本号同步 |

### 初始化 SDK

{{ sdkInit.renderIntoPlatform('wechat') }}

在[知晓云后台 - 我的应用](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

```js
//app.js
App({
  onLaunch: function() {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login, wx.getUserInfo, wx.requestPayment)

    let clientID = '[[client_id]]'  // 应用名称: [[app_name]]
    wx.BaaS.init(clientID)
  }
})
```

{% content "sdkfile" %}

### 下载并导入 SDK

a. [下载最新版 SDK 到本地](../download-sdk.md)

b. 将下载解压后得到的 SDK js 文件放在小程序项目目录中

<pre>
<code class="lang-js">
// app.js
import './sdk-v{{ book.latestVersionWechat }}'

App({
  onLaunch() {
    ...
  }
})
</code>
</pre>

### 初始化 SDK

{{ sdkInit.renderIntoPlatform('wechat') }}

在[知晓云后台 - 我的应用](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v{{ book.latestVersionWechat }}')
     let clientID = '[[client_id]]'
     wx.BaaS.init(clientID)
  }
})
</code>
</pre>

### 完成服务器域名配置

在[这里](/newbies/README.md#小程序第三方授权以及服务器域名配置)可查看详细的配置方法。


{% content "npm" %}

### 从 npm 上安装并使用 SDK 包
a. 安装
```sh
npm install minapp-sdk  // npm
yarn add minapp-sdk  // yarn
```
b. [构建 npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

c. 引入
```js
// app.js

App({
  onLaunch() {
    // require SDK
    require('minapp-sdk')
  }
})
```

### 初始化 SDK

{{ sdkInit.renderIntoPlatform('wechat') }}

在[知晓云后台 - 我的应用](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:
```js
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('minapp-sdk')
    let clientID = '[[client_id]]'
    wx.BaaS.init(clientID)
  }
})
```

### 完成服务器域名配置

在[这里](/newbies/README.md#小程序第三方授权以及服务器域名配置)可查看详细的配置方法。

{% endtabs %}


## 使用 SDK

通过 `wx.BaaS.init(clientID)` 成功初始化 SDK 后，即可使用 SDK 完成数据操作，内容操作等功能了。如下，在控制台创建一张表（参考[控制台操作-数据表](../dashboard/schema.md) 一节），获取其 tableName ，并插入一条数据。

```js
let tableName = 'product'
let Product = new wx.BaaS.TableObject(tableName)
let product = Product.create()

let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}

product.set(apple).save().then(res => {
  console.log('成功插入数据：', res)
}, err => {
  // err
})
```

此外我们还提供了在各个平台中使用知晓云的更详细的 SDK 接入指南，请移步以下章节查看

* [微信小程序接入指南](./wechat/README.md)
* [web 版接入指南](./web/README.md)
* [支付宝小程序接入指南](./alipay/README.md)
* [QQ 接入指南](./qq/README.md)
* [百度小程序接入指南](./baidu/README.md)
* [字节跳动（头条、抖音等）小程序接入指南](./bytedance/README.md)

## 迁移指南

* [2.x -> 3.x 迁移指南](./migrate-from-v2.md)
* [1.x -> 2.x 迁移指南](./migrate-from-v1.md)

## 通用注册登录

[登入登出](./auth.md)

更多内容，可查看以下功能模块介绍：

* [用户](./user.md)
* [数据表](./schema/README.md)
* [内容库](./content/README.md)
* [文件](./file/README.md)
* [支付](./payment/README.md)
