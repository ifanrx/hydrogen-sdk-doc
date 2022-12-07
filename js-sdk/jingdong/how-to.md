{% import "../macro/sdk-init.md" as sdkInit %}

# 京东小程序接入指南

## 引入 SDK 并初始化

a. [下载最新版 SDK 到本地](../download-sdk.md)

b. 将下载解压后得到的 SDK js 文件放在小程序项目目录中

<pre>
<code class="lang-js">
// app.js
import './sdk-v{{ book.latestVersionJingdong }}.js'

App({
  onLaunch() {
    ...
  }
})
</code>
</pre>

### 初始化 SDK

{{ sdkInit.renderIntoPlatform('jingdong') }}

在[知晓云后台 - 我的应用](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v{{ book.latestVersionJingdong }}')
     let clientID = '[[client_id]]'
     jd.BaaS.init(clientID)
  }
})
</code>
</pre>

### 完成服务器域名配置

在[这里](/newbies/jingdong.md#小程序第三方授权以及服务器域名配置)可查看详细的配置方法。


## 使用 SDK

通过 `jd.BaaS.init(clientID)` 成功初始化 SDK 后，即可使用 SDK 完成数据操作，内容操作等功能了。如下，在控制台创建一张表（参考[控制台操作-数据表](../dashboard/schema.md) 一节），获取其 tableName ，并插入一条数据。

```js
let tableName = 'product'
let Product = new jd.BaaS.TableObject(tableName)
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
