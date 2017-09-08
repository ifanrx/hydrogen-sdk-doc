# 登入

### 登录并请求用户信息授权
`wx.BaaS.login()`

该方法会进行登录并在成功登录后弹框询问是否授权获取用户信息

##### 请求示例
```
// 微信用户登录小程序
wx.BaaS.login().then((res) => {
  // 用户允许授权
}, (res) => {
  // 用户拒绝授权
})
```

##### 请求返回

- 当用户允许授权时
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
  "openid": "xxxxx",
  "unionid": "xxxxxx"
}
```

也可以通过 `wx.BaaS.storage.get('userinfo)` 获取相对应信息

- 当用户拒绝授权时
```
{
  id: "36395395",
  openid: "xxx",
  unionid: "xxx"
}
```
也可以通过 `wx.BaaS.storage.get()` 获取相对应信息（uid, openid, unionid)


### 静默登录

<p style='color:red'>* sdk version >= v1.1.0b1</p>

`wx.BaaS.silentLogin()`

该方法分离出用户信息授权请求，只进行登录操作，因此登录后不会弹出授权框。

##### 请求示例
```
wx.BaaS.silentLogin().then((res) => {

}, (err) => {

})
```

##### 请求返回

```
{
  id: "36395395",
  openid: "xxx",
  unionid: "xxx"
}
```

也可以通过 `wx.BaaS.storage.get()` 获取相对应信息（uid, openid, unionid)