# 错误上报 (SDK >= 1.10.0)

> **info**
> 阅读本小节前请确保你已经知道如何[初始化知晓云 SDK](/newbies/README.md)

通过 wx.BaaS.ErrorTracker 对象，开发者可以对小程序运行中产生的错误进行上报分析，并在知晓云控制台观察特定错误影响的范围和设备数量，以便快速定位代码中的 bug，及时修复。

## 配置 ErrorTracker

初始化 ErrorTracker 的方式很简单，只需要在 app.js 中，调用 `wx.BaaS.ErrorTracker.init()` 即可，
然后在 onError 生命周期中添加 `wx.BaaS.ErrorTracker.track(res)`, 这样页面产生错误时，就可以自动上报了。

{% tabs pluginConf="插件版", fileConf="文件版" %}

{% content "pluginConf" %}

## 配置 ErrorTracker -- 插件版

编辑 `app.js`

```js
App({
 onLaunch: function() {
   wx.BaaS = requirePlugin('sdkPlugin')
   wx.BaaS.wxExtend(wx.login,
    wx.getUserInfo,
    wx.requestPayment)
   wx.BaaS.init('你的 client id')
 
   wx.BaaS.ErrorTracker.init()  // 初始化 ErrorTracker
 },
 onError: function(res) {
   // 当小程序产生错误时，会进行上报
   wx.BaaS.ErrorTracker.track(res)
 }
})
```

{% content "fileConf" %}

## 配置 request 合法域名
![](/images/dashboard/add-request-bugout-domain.png)

## 配置 ErrorTracker -- 文件版

编辑 `app.js`

```js
App({
 onLaunch: function() {
   require('./sdk-v<version>')
   wx.BaaS.init('你的 client id')
 
   let usePlugins = true // 若开发者没有使用小程序插件，可以将其设置为 false，这样即可支持其他页面自动捕获错误
 
   wx.BaaS.ErrorTracker.init({usePlugins})  // 初始化 ErrorTracker
 },
 onError: function(res) {
   // 当小程序产生错误时，会进行上报
   wx.BaaS.ErrorTracker.track(res)
 }
})
```
{% endtabs %}

## 更细粒度的上报错误

有时候我们需要更细粒度的上报错误信息，这时可以在 promise 的 catch 回调或者 try-catch 块中进行上报操作。

**示例代码**

```js
Page({
 verifySMSCode() {
   wx.BaaS.verifySmsCode({phone: '132888888', code: 123456}).then(res => {
      // success
   }).catch(err => {
     // 收集手机验证码错误的事件
     wx.BaaS.ErrorTracker.track(err)
   })
 }
})
```
**示例代码**

```js
Page({
 onButtonClick() {
   try {
     abc() // abc 函数不存在
   } catch (err) {
     wx.BaaS.ErrorTracker.track(err)
   }
 }
})
```

## API REFERENCE

### `wx.BaaS.ErrorTracker.init(opts)`
 
 初始化 ErrorTacker，注意这里必须先调用 `wx.BaaS.init('你的 client id')`。
 
 **参数说明**
 
 | 参数名   | 类型   | 说明     |
 |----------|--------|----------|
 | opts.usePlugins | boolean | 小程序是否使用了插件，在插件版 SDK 中，将强制重置此参数为 `true` |
 
 
### `wx.BaaS.ErrorTracker.track(err)`
 
 **参数说明**
  
  | 参数名   | 类型   | 说明     |
  |----------|--------|----------|
  | err | string / Error 对象实例 | 需要上报的 bug 内容 |