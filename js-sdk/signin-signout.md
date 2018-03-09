# 登入登出

## 登入

SDK 提供了快速登录小程序的接口，省去使用微信登录接口时获取 code, session_key 等辅助操作。

### 登录并请求用户授权
`wx.BaaS.login()`

该方法会进行登录并在成功登录后弹框询问是否授权获取用户信息。

**返回字段说明**
当用户拒绝授权时：

| 参数     | 类型                             | 说明 |
| :------ | :------------------------------- | :-- |
| id      | String (**v1.2.0 后改为 Number**) | 用户在用户表中的 ID |
| openid  | String                           | 用户唯一标识，由微信生成 |
| unionid | String                           | 用户在开放平台的唯一标识符，由微信生成 |

> **danger**
> SDK 1.2.0 版本修改了返回 id 字段的类型，由 String 类型改为 Number 类型，与获取用户信息返回的 id 类型保持一致

当用户允许授权时，在上面返回参数的基础上，加上以下几个参数：

| 参数       | 类型   | 说明 |
| :-------- | :----- | :-- |
| avatarUrl | String | 用户头像 |
| city      | String | 用户所在城市 |
| country   | String | 用户所在国家 |
| gender    | Number | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| language  | String | 用户的语言，简体中文为 zh_CN |
| nickName  | String | 用户昵称 |
| province  | String | 用户所在省份 |


**请求示例**

```js
// 微信用户登录小程序
wx.BaaS.login().then(res => {
  // 用户允许授权，res 包含用户完整信息，详见下方描述
}, res => {
  // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
  // *Tips*：如果你的业务需要用户必须授权才可进行，由于微信的限制，10 分钟内不可再次弹出授权窗口，此时可以调用 [`wx.openSetting`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/setting.html) 要求用户提供授权
})
```

<span class="attention">注：</span>在 1.1.4 版本之前，login reject 行为是：用户拒绝授权，返回用户基本信息。但如果是网络断开、请求超时等情况，将直接抛出异常，这对业务逻辑的实现带来了一定的不便。因此，我们对用户拒绝授权回调做了调整，在原本的行为基础上，增加其他异常返回的 Error 对象，你可以通过以下方法做判断。（1.1.4 版本、1.1.5 版本存在直接返回 Error 对象的问题，请升级到 1.1.6 以上版本。）

```js
wx.BaaS.login().then(res => {
  console.log(res)
}, res => {
  if (res instanceof Error) {
    if (res.code === 600) {
      console.log('网络已断开')
    } else if (err.code === 601) {
      console.log('请求超时')
    }
  } else {
    console.log('用户拒绝授权')
    console.log('用户基本信息', res)
  }
}
```

**返回示例**

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

也可以通过 `wx.BaaS.storage.get(<key>)` 获取相对应信息（uid, openid, unionid)。


### 静默登录

> **danger**
> 该操作适用于 SDK version >= v1.1.0

`wx.BaaS.login(false)`

该方法分离出用户信息授权请求，只进行登录操作获取用户基础信息，因此不会弹出授权框。

**请求示例**

```js
wx.BaaS.login(false).then(res => {

}, err => {

})
```

**返回示例**

```js
{
  id: "36395395",
  openid: "xxx",
  unionid: "xxx"
}
```

也可以通过 `wx.BaaS.storage.get(<key>)` 获取相对应信息（uid, openid, unionid)。


> **info**
> 当 appID、ClientID 配置有误时，登录会抛出异常：“认证失败，请检查 AppID、ClientID 配置”，需要进行检查和重新配置后重试。

### 自动登录

对 wx.BaaS 的方法进行调用时，默认会执行登录操作，在 SDK 1.1.0 以下版本，会进行登录并弹出确认授权模态框，而在 SDK 1.10 及以上版本改为只进行静默登录，不要求用户授权。


## 登出

清理客户端存储的用户授权信息。

通过 `wx.BaaS.logout()` 函数完成登出功能。

**请求示例**

```js
// 登出 BaaS
wx.BaaS.logout().then(res => {
  // success
}, err => {
  // err
})
```

> **info**
> SDK 1.2.0 版本取消了在调用 logout 接口时对是否已登录状态进行检查，因此，开发者可以多次调用登出接口