## 下载并导入 SDK

a. [下载最新版 SDK 到本地](../download-sdk.md)

b. 将下载解压后得到的 SDK js 文件放在 WEB 项目目录中

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // require SDK
    require('./sdk-v{{ book.latestVersion }}')
  }
})
</code>
</pre>

## 初始化 SDK

通过初始化 SDK ，知晓云服务可以验证当前的小程序是否是有效合法的，只有通过验证的小程序才能使用 SDK 提供的全部功能。

在[知晓云后台 - 我的应用](https://cloud.minapp.com/admin/profile/)页面获取要接入知晓云服务的小程序 ClientID, 按照如下方式进行 SDK 初始化:

<pre>
<code class="lang-js">
// app.js

App({
  onLaunch() {
    // 引入 SDK
    require('./sdk-v{{ book.latestVersion }}')
     let clientID = '知晓云管理后台获取到的 ClientID'
     wx.BaaS.init(clientID)
  }
})
</code>
</pre>

## 添加安全域名


