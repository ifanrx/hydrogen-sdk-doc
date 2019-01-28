# 登入登出

## 登入

SDK 提供了快速登录小程序的接口，省去使用微信登录接口时获取 code, session_key 等辅助操作。

> **danger**
> 从 2018 年 4 月 30 日开始，在小程序的体验版和开发版调用 wx.getUserInfo 接口，将默认调用失败。为应对微信的调整，我们在 SDK v1.4.0 中增加了对新的登录流程的支持，因此也推荐你使用新的 SDK 接口来完成登录和获取用户信息功能。关于最佳的登录实践，可参考 [微信登录能力优化](https://mp.weixin.qq.com/s?__biz=MjM5NDAxMDg4MA==&mid=2650959412&idx=1&sn=9a140ac9622845b4c362ab686a877197)

小程序建议的登录流程是，通过 `wx.BaaS.auth.loginWithWechat()` 获取用户 openID, 这时无需弹框授权，开发者拿到 openID 可以建立自身的帐号 ID。当必须要获得用户的头像昵称等信息时，才让用户点击 button（open-type="getUserInfo" ），弹框授权。

## 静默登录

`wx.BaaS.auth.loginWithWechat()`

该方法会进行简单的登录，不需要用户授权，即不会弹出授权框。

**请求示例**

```js
// 微信用户登录小程序
wx.BaaS.auth.loginWithWechat().then(user => {
  // 登录成功
}, err => {
  // 登录失败
})
```

**登录成功返回示例**
then 回调中的 user 对象为 currentUser 对象，请参考[currentUser 小节](../account.md) ：

**登录失败返回示例**

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 设置用户名和邮箱

用户通过微信登录后，可以设置邮箱、用户名、密码，以便下次可以通过用户名或者邮箱登录。

详情请参考 [更新用户名](../account.md) 和 [更新邮箱](../account.md) 

## 请求用户授权

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
    wx.BaaS.auth.handleUserInfo(data).then(user => {
        // ruser 包含用户完整信息，详见下方描述
      }, err => {
        // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
    })
  },
  // ...
})
```

**用户同意授权返回示例**
then 回调中的 user 对象为 currentUser 对象，请参考[currentUser 小节](../account.md) ：


**用户拒绝授权示例**
 catch 回调中的 HError 对象示例：

```json
{
  "id": 61736923,
  "openid": "ofo380BgVHDSf3gz0QK1DYPGnLxx",
  "unionid": "",
  "code": 603,
  "message": "unauthorized"
}
```

**其他错误**
catch 回调中的 res 对象示例：
 
res 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


> **info**
> `wx.BaaS.auth.handleUserInfo` 默认会检查用户是否已登录，若未登录，该接口默认会先执行登录操作

## 关联微信小程序

`wx.BaaS.auth.linkWechat()`

```javascript
// 必须在用户通过 login API 登录后才能进行绑定 
wx.BaaS.auth.login({username: 'ifanrx', password: '111111'}).then(res => {
  return wx.BaaS.auth.getCurrentUser()
}).then(user =>{
  // user 为 currentUser 对象
  return user.linkWechat()
}).then(res=>{
  // success 
  // 用户可以通过微信授权登录同一个账户了
})
```

## <span style="color: #f04134;">`已废弃`</span>  登入登出（SDK < 2.0.0）

> **info**
> 目前 SDK 2.x 版本暂时兼容 1.x 版本的登录 API，开发者可以在不变动代码的情况下进行 SDK 版本升级，但**强烈建议**开发者根据的[指导](../migrate-from-v1.md)对代码进行调整。


### 登录(旧)

小程序建议的登录流程是，通过 `wx.login(false)` 获取用户 openID, 这时无需弹框授权，开发者拿到 openID 可以建立自身的帐号 ID。当必须要获得用户的头像昵称等信息时，才让用户点击 button（open-type="getUserInfo" ），弹框授权。


`wx.BaaS.login(false)`

该方法会进行简单的登录，不需要用户授权，即不会弹出授权框。

> **info**
> wx.BaaS.login(true) 或 wx.BaaS.login() 用于弹窗授权，由于微信规则更改，已被废弃。

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

### 请求用户授权（旧）

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
| session_expires_at | Integer | 指示当前登录态的过期时间，由知晓云维护。该值为一个 unix 时间戳 (SDK >= 1.11.0) |

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
