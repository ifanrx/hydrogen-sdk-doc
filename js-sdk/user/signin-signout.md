# 登入登出

## 登入

### 自动登录

使用 wx.BaaS 的方法进行接口调用时，会进行登录操作，在 SDK 1.1.0 以下版本，会进行登录并弹出确认授权模态框，而在 SDK 1.10 及以上版本改为只进行静默登录，不要求用户授权。


### 登录并请求用户授权
`wx.BaaS.login()`

该方法会进行登录并在成功登录后弹框询问是否授权获取用户信息

**请求示例**

```js
// 微信用户登录小程序
wx.BaaS.login().then((res) => {
  // 用户允许授权，res 包含用户完整信息，详见下方描述
}, (res) => {
  // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
  // *Tips*：如果你的业务需要用户必须授权才可进行，由于微信的限制，10 分钟内不可再次弹出授权窗口，此时可以调用 [`wx.openSetting`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html) 要求用户提供授权
})
```

**请求返回**

当用户允许授权时:

```js
{
  "nickName": "hip hop man",
  "gender": 1,
  "language": "en",
  "city": "Guangzhou",
  "province": "Guangdong",
  "country": "China",
  "avatarUrl": "xxxxxx",
  "id": "36395395",
  "openid": "xxxxx",
  "unionid": "xxxxxx"
}
```

也可以通过 `wx.BaaS.storage.get('userinfo')` 获取相对应信息, 该方法的具体使用请参照 “获取用户信息” 说明。

当用户拒绝授权时:

```js
{
  id: "36395395",
  openid: "xxx",
  unionid: "xxx"
}
```

也可以通过 `wx.BaaS.storage.get(<key>)` 获取相对应信息（uid, openid, unionid)


### 静默登录

> **danger**
> sdk version >= v1.1.0

`wx.BaaS.login(false)`

该方法分离出用户信息授权请求，只进行登录操作获取用户基础信息，因此不会弹出授权框。

**请求示例**

```js
wx.BaaS.login(false).then((res) => {

}, (err) => {

})
```

**请求返回**

```js
{
  id: "36395395",
  openid: "xxx",
  unionid: "xxx"
}
```

也可以通过 `wx.BaaS.storage.get(<key>)` 获取相对应信息（uid, openid, unionid)


> **info**
> 当 appID、ClientID 配置有误时，登录会抛出异常：“认证失败，请检查 AppID、ClientID 配置”，需要进行检查和重新配置后重试。


## 登出

清理客户端存储的用户授权信息

通过 `wx.BaaS.logout()` 函数完成登出功能：

```js
// 登出 BaaS
wx.BaaS.logout().then((res) => {
  // success
}, (err) => {
  // err
});
```