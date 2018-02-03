# 登入登出

### 登入

#### 自动登录

> 注：sdk 1.1.0 以下版本为自动授权登录

使用 wx.BaaS 的方法进行接口调用时，会自动进行静默登录，获取用户基本信息。


#### 登录并请求用户信息授权
`wx.BaaS.login()`

该方法会进行登录并在成功登录后弹框询问是否授权获取用户信息

##### 请求示例

```
// 微信用户登录小程序
wx.BaaS.login().then((res) => {
  // 用户允许授权，res 包含用户完整信息，详见下方描述
}, (res) => {
  // 用户拒绝授权，res 包含基本用户信息：id、openid、unionid
  // *Tips*：如果你的业务需要用户必须授权才可进行，由于微信的限制，10 分钟内不可再次弹出授权窗口，此时可以调用 [`wx.openSetting`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html) 要求用户提供授权
})
```

注：在 1.1.4 版本中，我们对用户拒绝授权回调做了调整，此时用户拒绝授权会返回一个 Error 对象，你可以通过以下方法做判断

```
wx.BaaS.login().then((res) => {
  console.log(res)
}, (err) => {
  if (err.code === 603) {
    console.log('用户拒绝授权')
  } else if (err.code === 600) {
    console.log('网络已断开')
  } else if (err.code === 601) {
    console.log('请求超时')
  }
}
```

由于以上变动对先前接口影响较大，我们在 1.1.6 版本中，又令用户拒绝授权后，返回用户基本信息，你可以通过以下方法做判断

```
wx.BaaS.login().then((res) => {
  console.log(res)
}, (res) => {
  if (!(res instanceof Error)) {
    console.log('用户拒绝授权')
    console.log('用户基本信息', res)
  }
}
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

也可以通过 `wx.BaaS.storage.get('userinfo')` 获取相对应信息, 该方法的具体使用请参照 “获取用户信息” 说明。

- 当用户拒绝授权时

```
{
  id: "36395395",
  openid: "xxx",
  unionid: "xxx"
}
```

也可以通过 `wx.BaaS.storage.get(<key>)` 获取相对应信息（uid, openid, unionid)


#### 静默登录，不弹出授权窗口，仅获取用户基础信息

<p style='color:red'>* sdk version >= v1.1.0</p>

`wx.BaaS.login(false)`

该方法分离出用户信息授权请求，只进行登录操作，因此不会弹出授权框。

##### 请求示例

```
wx.BaaS.login(false).then((res) => {

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

也可以通过 `wx.BaaS.storage.get(<key>)` 获取相对应信息（uid, openid, unionid)


##### 错误说明

当 appID、ClientID 配置有误时，登录会抛出异常：“认证失败，请检查 AppID、ClientID 配置”，需要进行检查和重新配置后重试。


### 登出

清理客户端存储的用户授权信息

通过 `wx.BaaS.logout()` 函数完成登出功能：

```
// 登出 BaaS
wx.BaaS.logout().then((res) => {
  // success
}, (err) => {
  // err
});
```
