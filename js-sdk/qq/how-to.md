# QQ 小程序接入指南

## 引入 SDK 并初始化

### 下载并导入 SDK

a. [下载最新版 SDK 到本地](../download-sdk.md)

b. 将下载解压后得到的 SDK js 文件放在小程序项目目录中

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // require SDK
    require('./sdk-v{{ book.latestVersionWechat }}')
  }
})
</code>
</pre>

### 初始化 SDK

```javascript
qq.BaaS.init(clientID, {autoLogin, logLevel})
```

**参数说明**

| 参数          | 类型    | 必填 | 说明         |
| :------------ | :------| ---- | :----------- |
| clientID      | String |   Y   | 知晓云管理后台获取到的 ClientID |
| autoLogin     | Boolean |   N   | 请求知晓云接口时，是否自动静默登录，默认为 false |
| logLevel      | String |   N   | 日志输出级别，共支持 debug、info、warn、error 4 个级别，默认为 error|

> **info**
> 关于 autoLogin 参数，具体请参考[多平台用户统一登录](./signin-signout.md#多平台用户统一登录)

通过初始化 SDK ，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 SDK 提供的全部功能。

在[知晓云后台 - 我的应用](https://cloud.minapp.com/admin/profile/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v{{ book.latestVersionWechat }}')
     let clientID = '知晓云管理后台获取到的 ClientID'
     qq.BaaS.init(clientID)
  }
})
</code>
</pre>

<!-- 暂不显示 -->
<!-- ### 完成服务器域名配置 -->
<!--  -->
<!-- 在[这里](/newbies/README.md#小程序第三方授权以及服务器域名配置)可查看详细的配置方法。 -->


## 使用 SDK

成功初始化 SDK 后，即可使用 SDK 完成数据操作，内容操作等功能了。如下，在控制台创建一张表（参考[控制台操作-数据表](../dashboard/schema.md) 一节），获取其 tableID ，并插入一条数据。

```js
let tableID = 10
let Product = new qq.BaaS.TableObject(tableID)
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

更多内容，可查看以下功能模块介绍：

* [数据表](../schema/README.md)
* [内容库](../content/README.md)
* [模板消息](./template-message.md)
