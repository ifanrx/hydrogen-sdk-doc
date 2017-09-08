# 登入

### 登录并请求用户信息授权
`wx.BaaS.login()`

该方法会进行用户登录并在成功登录后弹框询问是否授权获取用户信息

##### 请求示例
```
// 微信用户登录小程序
wx.BaaS.login().then(() => {
  // 登录成功，用户接收或拒绝授权都会进入到这
}, (err) => {

})
```

##### 请求返回

调用 `wx.BaaS.login()` 方法后, 会弹出微信授权框，用户可选择允许或拒绝授权。
- 当用户拒绝授权时，仅可通过 `wx.BaaS.storage.get('uid')` 获取当前登录用户的 `UID`
- 当用户允许授权时，可通过上述方法获取 `UID`，并且可以通过 `wx.BaaS.storage.get('userinfo')` 获取用户信息

`userinfo` 存储的数据包括：

```
{
  "nickName": "hip hop man",
  "gender": 1,
  "language": "en",
  "city": "Guangzhou",
  "province": "Guangdong",
  "country": "China",
  "avatarUrl": "xxxxxx",
  "id": "36395395",
  "openid": "oXUfx0HKez4qLqgX-XSwLCpiBYS4",
  "unionid": "xxxxxx"
}
```

### 静默登录

<p style='color:red'>* sdk version >= v1.1.0b1</p>

`wx.BaaS.login(false)`

该方法分离出用户信息授权请求，只进行登录操作，因此登录后不会弹出授权框，因此，仅可通过 `wx.BaaS.storage.get('uid')` 方法获取当前登录用户的 `UID`