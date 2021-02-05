{% macro userInfoAlert() %}
> **info**
> 由于 SDK 维护用户登录状态的需要，在用户授权时，并不会将开发者传入的 data 参数直接传给后端，
> 而是会再调一次 wx.getUserInfo （由于开发者这之前已经进行了用户授权，所以这里能正常拿到授权的结果，
> 请忽略微信开发者工具的提示）拿到 data，再传给后端。之前版本的 SDK 会导致用户信息的 country，province，city 字段始终为英文。
> 从 **2.0.9** 起，country，province，city 所用的语言，将以用户传入的 data.detail.userInfo.language 为准。
> 如果开发者需要更新之前已经授权用户的信息，请在用户授权时将 syncUserProfile 设置为 'overwrite'。
{% endmacro %}

# 登入登出

## 登入

SDK 提供了快速登录小程序的接口，省去使用微信登录接口时获取 code, session_key 等辅助操作。

> **danger**
> 从 2018 年 4 月 30 日开始，在小程序的体验版和开发版调用 wx.getUserInfo 接口，将默认调用失败。为应对微信的调整，我们在 SDK v1.4.0 中增加了对新的登录流程的支持，因此也推荐你使用新的 SDK 接口来完成登录和获取用户信息功能。关于最佳的登录实践，可参考 [微信登录能力优化](https://mp.weixin.qq.com/s?__biz=MjM5NDAxMDg4MA==&mid=2650959412&idx=1&sn=9a140ac9622845b4c362ab686a877197)

小程序建议的登录流程是，通过 `wx.BaaS.auth.loginWithWechat()` 获取用户 openID, 这时无需弹框授权，开发者拿到 openID 可以建立自身的帐号 ID。当必须要获得用户的头像昵称等信息时，才让用户点击 button（open-type="getUserInfo" ），弹框授权。

## 静默登录

`wx.BaaS.auth.loginWithWechat(null, { createUser })`

该方法会进行简单的登录，不需要用户授权，即不会弹出授权框。

> **danger**
> 从 1.x 升级的请阅读 [1.x --> 2.x 迁移指南](/js-sdk/migrate-from-v1.md)。

**参数说明**

| 参数            | 类型    | 说明         |
| :-------------- | :------ | :----------- |
| createUser      | Boolean | 是否创建用户，默认为 `true`，可选 |
| withUnionID     | Boolean | （SDK version >= 3.8.0）是否使用 [unionid 登录](/js-sdk/wechat/unionid-login.md)，默认为 `false`，可选 |


`createUser` 参数决定了一个新的微信用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见 [多平台用户统一登录](#多平台用户统一登录) 说明

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

`wx.BaaS.auth.loginWithWechat(data, {createUser, syncUserProfile})`

**参数说明**

| 参数            | 类型    | 说明         |
| :-------------- | :------ | :----------- |
| data            | object | bindgetuserinfo 事件回调返回的参数 |
| createUser | Boolean | 是否创建用户，默认为 true |
| syncUserProfile | String | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 `overwrite`、`setnx`、`false`，默认值为`setnx` |
| withUnionID     | Boolean | （SDK version >= 3.8.0）是否使用 [unionid 登录](/js-sdk/wechat/unionid-login.md)，默认为 `false`，可选 |

`createUser` 参数决定了一个新的微信用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见 [多平台用户统一登录](#多平台用户统一登录) 说明

{% include "/js-sdk/frag/_sync_user_profile_param.md" %}

{{ userInfoAlert() }}

```html
<button open-type="getUserInfo" bindgetuserinfo="userInfoHandler">用户授权</button>
```

用户点击该按钮时，会返回获取到的用户信息，其中包括加密的敏感信息，开发者需在回调中调用 `wx.BaaS.loginWithWechat` 方法，以获得解密后的全部用户信息。

**请求示例**

```js
Page({
  // ...
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data).then(user => {
        // user 包含用户完整信息，详见下方描述
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
> `wx.BaaS.auth.loginWithWechat` 默认会检查用户是否已登录，若未登录，该接口默认会先执行登录操作

## 用户一键授权手机号登录

开发者需要提供按钮的方式，令用户触发授权手机号操作，即可通过加密后的手机号，结合 `wx.login()` 获取到的 `code` 进行知晓云微信小程序登录。登录成功后用户表的 `phone_verified` 字段会更新为 `true` ，省掉了验证手机号的过程。

`wx.BaaS.auth.loginWithWechat(data, {code, createUser})`

**参数说明**

| 参数            | 类型    | 说明         |
| :-------------- | :------ | :----------- |
| data            | object | bindgetphonenumber 事件回调返回的参数 |
| code            | string | 调用 wx.login() 获取的临时登录凭证  |
| createUser | Boolean | 是否创建用户，默认为 true |

`code`参数说明：由于在回调中调用 `wx.login()` 登录，可能会刷新登录态，此时服务器使用 `code` 换取的 `sessionKey` 不是加密时使用的 `sessionKey`， 导致解密失败。因此要求开发者提前进行 `wx.login()`。

`createUser` 参数决定了一个新的微信用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会为该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见 [多平台用户统一登录](#多平台用户统一登录) 说明。

```html
<button open-type="getPhoneNumber" bindgetphonenumber="phoneNumberHandler" catchtap="wxLogin">用户授权手机号登录</button>
```

用户点击该按钮时，会触发 `wxLogin()`获取到临时登录凭证 `code`，同时弹出授权手机号面板；点击授权面板会触发 `phoneNumberHandler()` 方法，返回获取到的用户加密手机号信息；开发者需在回调中调用 `wx.BaaS.auth.loginWithWechat` 方法，以使用加密的手机号，结合 `wx.login()` 获取到的 `code` 进行知晓云微信小程序登录。

**请求示例**

```js
Page({
  // ...
  wxLogin () {
    wx.login({
        success: (res) => {
            // 获取临时登录凭证 code
        }
    })
  },
  phoneNumberHandler(data) {
    wx.BaaS.auth.loginWithWechat(data,{
        // 通过 wx.login() 获取的临时登录凭证 code
        code: '071Jwd000ACg4L1A1Z300nzYGz1JwLxx'
    }).then(user => {
        // user 包含用户完整信息，详见下方描述
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

## 关联微信小程序

通过此方法可将通用注册登录用户（在已登录状态下）关联微信小程序账号。

`UserRecord.linkWechat(data, {syncUserProfile})`

**参数说明**

| 参数    | 类型    | 说明         |
| :------| :------ | :----------- |
| data            | object | bindgetuserinfo 事件回调返回的参数 |
| syncUserProfile | String | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 `overwrite`、`setnx`、`false`，默认值为`setnx` |
| withUnionID     | Boolean | （SDK version >= 3.8.0）是否使用 [unionid 登录](/js-sdk/wechat/unionid-login.md) 并关联，默认为 `false`，可选 |

{% include "/js-sdk/frag/_sync_user_profile_param.md" %}

{{ userInfoAlert() }}


**请求示例**

1. 不获取用户信息:

  ```javascript
  // 必须在用户通过 login API 登录后才能进行绑定
  wx.BaaS.auth.login({username: 'ifanrx', password: '111111'}).then(user =>{
    // user 为 currentUser 对象
    return user.linkWechat()
  }).then(res=>{
    // success
    // 用户可以通过微信授权登录同一个账户了
  })
  ```

2. 获取用户信息:

  ```html
  <button open-type="getUserInfo" bindgetuserinfo="userInfoHandler">用户授权</button>
  ```

  ```js
  Page({
    // ...
    userInfoHandler(data) {
      // 必须在用户通过 login API 登录后才能进行绑定
      wx.BaaS.auth.login({username: 'ifanrx', password: '111111'}).then(user =>{
        // user 为 currentUser 对象
        user.linkWechat(data).then(res=>{
          // 关联成功
          console.log(res.statusCode)
        })
      })
    },
    // ...
  })
  ```

**返回示例**
```JSON
{
  "statusCode": 200,
  "data": {
    "message": "User associated.",
    "openid": "ofo380BgVHDSf3gxxx",
    "status": "ok",
    "unionid": "oUsert59Z0TZ666",
    "user_id": 22051668672912
  }
}
```

## 多平台用户统一登录

假设开发者现在同时支持微信小程序和 web 端登录，需要微信小程序新用户关联到已经注册好的用户账户，才能登录成功。
可以通过 `loginWithWechat` 的参数 `createUser` 设置为 `false`，此时，服务端会判断该用户是否已经有账户记录，
如果没有，则返回 404 状态码。开发者可根据此状态码，跳转到需要填写用户名密码页面，进行已有账户的关联或新的账户的创建，
完成后，调用 `linkWechat` 方法完成当前微信小程序用户与账户的绑定。下一次用户再次登录时，则会直接登录成功。

**示例代码**

静默登录时检查

```javascript
// 设置 createUser 参数为 false，避免直接创建一个账户
wx.BaaS.auth.loginWithWechat(null, {createUser: false}).then(user => {
    // 已经有用户记录，不是第一次登录，进入正常业务流程。
  }, err => {
    // 登录失败，没有账户记录。
    // 这时候可以让用户先通过 wx.auth.register() 注册一个账户，或者 wx.auth.login() 登录一个已有账户，再使用 linkWechat 进行绑定，这里以登录账户为例
    if (err.code === 404) {
      wx.BaaS.auth.login({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
        user.linkWechat().then(res => {
          console.log(res.statusCode)
          // 关联成功，下次可以通过 wx.BaaS.auth.loginWithWechat 登录了
        })
      })
    }
})
```

请求用户授权后检查

```html
<button open-type="getUserInfo" bindgetuserinfo="userInfoHandler">用户授权</button>
```

```js
Page({
  // ...
  userInfoHandler(data) {
    wx.BaaS.auth.loginWithWechat(data, {createUser: false}).then(user => {
      // 已经有用户记录，不是第一次登录，进入正常业务流程。
    }, err => {
      // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid、unionid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
      // 这时候可以让用户先通过 wx.auth.register() 注册一个账户，或者 wx.auth.login() 登录一个已有账户，再使用 linkWechat 进行绑定，这里以登录账户为例
      if (err.code === 404) {
        wx.BaaS.auth.login({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
          user.linkWechat(data.detail).then(res => {
            console.log(res.statusCode)
            // 关联成功，下次可以通过 wx.BaaS.auth.loginWithWechat 登录了
          })
        })
      }
    })
  },
  // ...
})
```

若已经提前申请了用户授权，也可以在 wx.getUserInfo() 的 success 回调中进行关联账户
```javascript
wx.getUserInfo({
  success(res) {
    wx.BaaS.auth.getCurrentUser().then(user => {
      user.linkWechat(res)
    })
  }
})
```

## <span style="color: #f04134;">`已废弃`</span>  登入登出（SDK < 2.0.0）

> **info**
> 目前 SDK 2.x 版本暂时兼容 1.x 版本的登录 API，开发者可以在不变动代码的情况下进行 SDK 版本升级，但**强烈建议**开发者根据[指导](../migrate-from-v1.md)对代码进行调整。


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
| session_expires_at | Integer | 指示当前登录态的过期时间，由知晓云维护。该值为一个 unix 时间戳  |

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
| session_expires_at | Integer | 指示当前登录态的过期时间，由知晓云维护。该值为一个 unix 时间戳  |

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


