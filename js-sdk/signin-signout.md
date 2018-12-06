# 登入登出

## 登入

SDK 提供了快速登录小程序的接口，省去使用微信登录接口时获取 code, session_key 等辅助操作。

> **danger**
> 从 2018 年 4 月 30 日开始，在小程序的体验版和开发版调用 wx.getUserInfo 接口，将默认调用失败。为应对微信的调整，我们在 SDK v1.4.0 中增加了对新的登录流程的支持，因此也推荐你使用新的 SDK 接口来完成登录和获取用户信息功能。关于最佳的登录实践，可参考 [微信登录能力优化](https://mp.weixin.qq.com/s?__biz=MjM5NDAxMDg4MA==&mid=2650959412&idx=1&sn=9a140ac9622845b4c362ab686a877197)

{% tabs first="SDK 1.4.0 及以上版本", second="SDK 1.4.0 以下版本" %}

{% content "first" %}

小程序建议的登录流程是，通过 `wx.login(false)` 获取用户 openID, 这时无需弹框授权，开发者拿到 openID 可以建立自身的帐号 ID。当必须要获得用户的头像昵称等信息时，才让用户点击 button（open-type="getUserInfo" ），弹框授权。

### 登录

`wx.BaaS.login(false)`

该方法会进行简单的登录，不需要用户授权，即不会弹出授权框。

**返回字段说明**

| 参数     | 类型   | 说明 |
| :------ | :----- | :-- |
| id      | Integer | 用户在用户表中的 ID |
| openid  | String | 用户唯一标识，由微信生成 |
| unionid | String | 用户在开放平台的唯一标识符，由微信生成 |
| session_expires_at | Integer | 指示当前登录态的过期时间，由知晓云维护。该值为一个 unix 时间戳 (SDK >= 1.11.0) |

**请求示例**

```js
// 微信用户登录小程序
wx.BaaS.login(false).then(res => {
  // 登录成功
}, err => {
  // 登录失败
})
```

**登录成功返回示例**

```json
{
  "id": 61736923,
  "openid": "ofo380BgVHDSf3gz0QK1DYPGnLxx",
  "unionid": "",
  "session_expires_at" : 1546588122840
}
```

**登录失败返回示例**

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

### 请求用户授权

开发者需要提供按钮的方式，令用户触发授权操作

```html
<button open-type="getUserInfo" bindgetuserinfo="userInfoHandler">用户授权</button>
```

用户点击该按钮时，会返回获取到的用户信息，其中包括加密的敏感信息，开发者需在回调中调用 `wx.BaaS.handleUserInfo` 方法，以获得解密后的全部用户信息。

**请求示例**

```js
Page({
  // ...
  userInfoHandler(data) {
    wx.BaaS.handleUserInfo(data).then(res => {
        // res 包含用户完整信息，详见下方描述
      }, res => {
        // **res 有两种情况**：用户拒绝授权，res 包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 Error 对象（详情见下方注解）
    })
  },
  // ...
})
```

**用户同意授权返回示例**
then 回调中的 res 对象示例：

```json
{
  "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4QEMnT5dggfh4xpSuOWZicyNagricjH4jzKRI5ZFEiaBPzicp8wcQo23IEJjt8vkuAQ6rYVkYF61FVA/132",
  "city": "Huizhou",
  "country": "China",
  "gender": 1,
  "id": 61736923,
  "language": "zh_CN",
  "nickName": "Larry。",
  "openid": "ofo380BgVHDSf3gz0QK1DYPGnLxx",
  "province": "Guangdong",
  "unionid": "",
  "session_expires_at" : 1546588122840
}
```

**用户拒绝授权示例**
 catch 回调中的 res 对象示例：

```json
{
  "id": 61736923,
  "openid": "ofo380BgVHDSf3gz0QK1DYPGnLxx",
  "unionid": "",
  "session_expires_at" : 1546588122840
}
```

**其他错误**
catch 回调中的 res 对象示例：
 
res 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


**`wx.BaaS.handleUserInfo` 返回字段说明**

当用户拒绝授权时：

| 参数     | 类型   | 说明 |
| :------ | :----- | :-- |
| id      | Number | 用户在用户表中的 ID |
| openid  | String | 用户唯一标识，由微信生成 |
| unionid | String | 用户在开放平台的唯一标识符，由微信生成 |
| expires_at | Integer | 指示当前登录态的过期时间，由知晓云维护。该值为一个 unix 时间戳 (SDK >= 1.11.0) |

当用户允许授权时，在上面返回参数的基础上，加上以下几个参数：

| 参数       | 类型   | 说明 |
| :-------- | :----- | :-- |
| avatarUrl | String | 用户头像 |
| city      | String | 用户所在城市 |
| country   | String | 用户所在国家 |
| gender    | Number | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |
| language  | String | 用户的语言，简体中文为 zh_CN |
| nickName  | String | 用户昵称 (这里的 nickName 由微信登录接口直接返回，注意与 MyUser.get 方法返回的 nickname 字段拼写上的不同) |
| province  | String | 用户所在省份 |

> **info**
> `wx.BaaS.handleUserInfo` 默认会检查用户是否已登录，若未登录，该接口默认会先执行登录操作

#### 获取 storage 中缓存的 userInfo 信息

开发者在确保用户已经同意授权的情况下，也可以调用 `wx.BaaS.login()` 来获取当前用户信息，该 API 会优先返回前一次 `wx.BaaS.handleUserInfo` 操作缓存的 userInfo 信息，若缓存不存在或者失效，则会调用 `wx.getUserInfo()` 来尝试获取用户信息。

{% content "second" %}

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
| nickName  | String | 用户昵称 (这里的 nickName 由微信登录接口直接返回，注意与 MyUser.get 方法返回的 nickname 字段拼写上的不同) |
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
})
```

**返回示例**

当用户允许授权时:

```json
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

当用户拒绝授权时:

```json
{
  "id": "36395395",
  "openid": "xxx",
  "unionid": "xxx"
}
```

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

```json
{
  "id": "36395395",
  "openid": "xxx",
  "unionid": "xxx"
}
```

> **info**
> 当 appID、ClientID 配置有误时，登录会抛出异常：“认证失败，请检查 AppID、ClientID 配置”，需要进行检查和重新配置后重试。

### 自动登录

对 wx.BaaS 的方法进行调用时，默认会执行登录操作，在 SDK 1.1.0 以下版本，会进行登录并弹出确认授权模态框，而在 SDK 1.10 及以上版本改为只进行静默登录，不要求用户授权。

{% endtabs %}


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