# 开始

## 1、在小程序项目引入 SDK

在小程序根目录的 `app.js` 内引入 SDK

```
// app.js
App({
  onLaunch: function () {
    // import BaaS SDK
    require('./sdk-v1.0.0');
  }
})

```

引入 SDK 后，就能在小程序页面内使用 SDK 完成功能开发了。

## 2、初始化（客户端认证）

```
// clientID 在 BaaS 后台获取
wx.BaaS.init(clientID);
```

## 3、使用 SDK 完成相关功能

> 举一个使用 SDK 获取 BaaS 富文本内容的例子

```
// 获取 BaaS 富文本内容
let contentID = 1;
wx.BaaS.getContent(contentID).then((res) => {
  // success
}, (err) => {
  // err
});
```
