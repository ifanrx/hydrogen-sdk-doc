# 登入登出

## 登入

SDK 提供了快速登录小程序的接口，省去使用 QQ 登录接口时获取 code, session_key 等辅助操作。

建议的登录流程是，通过 `qq.BaaS.auth.loginWithQQ()` 获取用户 openID, 这时无需弹框授权，开发者拿到 openID 可以建立自身的帐号 ID。当必须要获得用户的头像昵称等信息时，才让用户点击 button（open-type="getUserInfo" ），弹框授权。

## 静默登录

`qq.BaaS.auth.loginWithQQ(null, { createUser })`

该方法会进行简单的登录，不需要用户授权，即不会弹出授权框。

**参数说明**

| 参数            | 类型    | 说明         |
| :-------------- | :------ | :----------- |
| createUser      | Boolean | 是否创建用户，默认为 `true`，可选 |


`createUser` 参数决定了一个新的 QQ 用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见 [多平台用户统一登录](#多平台用户统一登录) 说明

**请求示例**

```js
// QQ 用户登录小程序
qq.BaaS.auth.loginWithQQ().then(user => {
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

用户通过 QQ 登录后，可以设置邮箱、用户名、密码，以便下次可以通过用户名或者邮箱登录。

详情请参考 [更新用户名](../account.md) 和 [更新邮箱](../account.md)

## 请求用户授权

开发者需要提供按钮的方式，令用户触发授权操作

`qq.BaaS.auth.loginWithQQ(data, {createUser, syncUserProfile})`

**参数说明**

| 参数            | 类型    | 说明         |
| :-------------- | :------ | :----------- |
| data            | object | bindgetuserinfo 事件回调返回的参数 |
| createUser | Boolean | 是否创建用户，默认为 true |
| syncUserProfile | String | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 `overwrite`、`setnx`、`false`，默认值为`setnx` |

`createUser` 参数决定了一个新的 QQ 用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见 [多平台用户统一登录](#多平台用户统一登录) 说明

{% include "/js-sdk/frag/_sync_user_profile_param.md" %}


```html
<button open-type="getUserInfo" bindgetuserinfo="userInfoHandler">用户授权</button>
```

用户点击该按钮时，会返回获取到的用户信息，其中包括加密的敏感信息，开发者需在回调中调用 `qq.BaaS.loginWithQQ` 方法，以获得解密后的全部用户信息。

**请求示例**

```js
Page({
  // ...
  userInfoHandler(data) {
    qq.BaaS.auth.loginWithQQ(data).then(user => {
        // user 包含用户完整信息，详见下方描述
      }, err => {
        // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
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
  "code": 603,
  "message": "unauthorized"
}
```

**其他错误**
catch 回调中的 res 对象示例：

res 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)


> **info**
> `qq.BaaS.auth.loginWithQQ` 默认会检查用户是否已登录，若未登录，该接口默认会先执行登录操作

## 关联 QQ 小程序

`UserRecord.linkQQ(data, {syncUserProfile})`

**参数说明**

| 参数    | 类型    | 说明         |
| :------| :------ | :----------- |
| data   | object | qq.getUserInfo() success 回调中收到的参数，可选 |
| syncUserProfile | String | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 `overwrite`、`setnx`、`false`，默认值为`setnx` |

{% include "/js-sdk/frag/_sync_user_profile_param.md" %}


```javascript
// 必须在用户通过 login API 登录后才能进行绑定
qq.BaaS.auth.login({username: 'ifanrx', password: '111111'}).then(user =>{
  // user 为 currentUser 对象
  return user.linkQQ()
}).then(res=>{
  // success
  // 用户可以通过 QQ 授权登录同一个账户了
})
```

```javascript
// 必须在用户通过 login API 登录后才能进行绑定
qq.BaaS.auth.login({username: 'ifanrx', password: '111111'}).then(user =>{
  // user 为 currentUser 对象

  qq.getUserInfo({
    success(info){
      user.linkQQ(info).then(res=>{
        // 关联成功
        console.log(res.statusCode)
      })
    }
  })
})
```

**返回示例**
```JSON
{
  "statusCode": 200,
  "data": {
    "message": "QQ associate succeed.",
    "openid": "ofo380BgVHDSf3gxxx",
    "status": "ok",
    "user_id": 22051668672912
  }
}
```

## 多平台用户统一登录

假设开发者现在同时支持 QQ 小程序和 web 端登录，需要 QQ 小程序新用户关联到已经注册好的用户账户，才能登录成功。
可以通过 `loginWithQQ` 的参数 `createUser` 设置为 `false`，此时，服务端会判断该用户是否已经有账户记录，
如果没有，则返回 404 状态码。开发者可根据此状态码，跳转到需要填写用户名密码页面，进行已有账户的关联或新的账户的创建，
完成后，调用 `linkQQ` 方法完成当前 QQ 小程序用户与账户的绑定。下一次用户再次登录时，则会直接登录成功。

**示例代码**

静默登录时检查

```javascript
// 设置 createUser 参数为 false，避免直接创建一个账户
qq.BaaS.auth.loginWithQQ(null, {createUser: false}).then(user => {
    // 已经有用户记录，不是第一次登录，进入正常业务流程。
  }, err => {
    // 登录失败，没有账户记录。
    // 这时候可以让用户先通过 qq.auth.register() 注册一个账户，或者 qq.auth.login() 登录一个已有账户，再使用 linkQQ 进行绑定，这里以登录账户为例
    if (err.code === 404) {
      qq.BaaS.auth.login({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
        user.linkQQ().then(res => {
          console.log(res.statusCode)
          // 关联成功，下次可以通过 qq.BaaS.auth.loginWithQQ 登录了
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
    qq.BaaS.auth.loginWithQQ(data, {createUser: false}).then(user => {
      // 已经有用户记录，不是第一次登录，进入正常业务流程。
    }, err => {
      // **err 有两种情况**：用户拒绝授权，HError 对象上会包含基本用户信息：id、openid；其他类型的错误，如网络断开、请求超时等，将返回 HError 对象（详情见下方注解）
      // 这时候可以让用户先通过 qq.auth.register() 注册一个账户，或者 qq.auth.login() 登录一个已有账户，再使用 linkQQ 进行绑定，这里以登录账户为例
      if (err.code === 404) {
        qq.BaaS.auth.login({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
          user.linkQQ(data.detail).then(res => {
            console.log(res.statusCode)
            // 关联成功，下次可以通过 qq.BaaS.auth.loginWithQQ 登录了
          })
        })
      }
    })
  },
  // ...
})
```

若已经提前申请了用户授权，也可以在 qq.getUserInfo() 的 success 回调中进行关联账户
```javascript
qq.getUserInfo({
  success(res) {
    qq.BaaS.auth.getCurrentUser().then(user => {
      user.linkQQ(res)
    })
  }
})
```
