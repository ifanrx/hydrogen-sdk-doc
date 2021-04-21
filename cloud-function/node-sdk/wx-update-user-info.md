# 微信更新用户信息

> **info**
> SDK >= 3.17.0

<!-- 分隔两个 info -->

> **danger**
> 从 2021 年 4 月 28 日后发布的小程序新版本，无法通过 wx.getUserInfo 与 `<button open-type="getUserInfo"/>` 获取加密的用户个人信息，而需要通过新增的 getUserProfile 接口获取。请参考 [小程序登录、用户信息相关接口调整说明](https://developers.weixin.qq.com/community/develop/doc/000cacfa20ce88df04cb468bc52801?blockType=1)。
> 
> 为应对微信的调整，云函数 SDK v3.17.0 中将会提供新的更新用户信息方法 `BaaS.wechat.updateUserInfo()`。

小程序建议的登录流程是，可通过 `wx.BaaS.auth.loginWithWechat()` 获取用户 openID，这时无需弹框授权，开发者拿到 openID 可以建立自身的帐号 ID。当必须要获得用户的头像昵称等信息时，调用 `wx.getUserProfile` 接口，并将返回结果通过调用云函数 `BaaS.wechat.updateUserInfo()` 方法更新用户信息。

`BaaS.wechat.updateUserInfo(userID, data, {syncUserProfile})`

**参数说明**

| 参数          | 类型    | 必填 | 说明                                                         |
| :------------ | :------ | :--- | :----------------------------------------------------------- |
| userID            | Number | 是 | 用户 ID |
| data            | Object | 是 | wx.getUserProfile 事件回调返回的参数 |
| syncUserProfile | Boolean | 否 | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 `overwrite`、`setnx`、`false`，默认值为`setnx`|

**请求示例**

```javascript
// 云函数部分
// 函数名：update_wechat_user_info
BaaS.useVersion("v3.17.0");
exports.main = async function updateUserInfo(event, callback) {
  const res = await BaaS.wechat.updateUserInfo(event.data.userID, event.data.data, {
    syncUserProfile: event.data.syncUserProfile
  });
  return res
}
```

```javascript
// 微信小程序调用部分
wx.getUserProfile({
  //...
  success: function(data) {
    app.BaaS.auth.getCurrentUser().then(user => {
      wx.BaaS.invoke("update_wechat_user_info", {
        userID: user.id,
        data: data,
        syncUserProfile: 'setnx'
      }).then((res) => {
        console.log(res);
      });
    })
  },
});
```

**返回示例**

```javascript
 {
  "id": 1,
  "openid": "xxx",
  "nickname": "zss",
  "gender": 2,
  "language": "zh_CN",
  "city": "Guangzhou",
  "province": "Guangdong",
  "country": "CN",
  "avatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPQ3VnlyLeIQR27iaSA0UbrvN4xzxp8xcJqM4730pcrXYXJrib6Wzpsjqz2STXGiapsK8liaqqQjI4eQ/0"
  "_provider": {
    "wechat": {
      "openid": "xxx",
      "nickname": "zss",
      "gender": 2,
      "language": "zh_CN",
      "city": "Guangzhou",
      "province": "Guangdong",
      "country": "CN",
      "avatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epPQ3VnlyLeIQR27iaSA0UbrvN4xzxp8xcJqM4730pcrXYXJrib6Wzpsjqz2STXGiapsK8liaqqQjI4eQ/0"
    }
  }
}
```
