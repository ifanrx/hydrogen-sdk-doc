# 通用注册登录

 `BaaS.auth` 模块集合了和平台无关的用户注册登录相关操作。

## 注册

开发者可以使用 `BaaS.auth.register(opts)` API 来进行用户的通用注册。

> **info**
> 注册成功后会自动登录

opts 参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| opts.username   | String  | 用户名，username 和 email 必选一个 |
| opts.email      | String  | 邮箱，username 和 email 必选一个 |
| opts.password   | String  | 密码 |


### 通过邮箱注册

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.register({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
  console.log(user)
}).catch(err=>{
  // HError 对象
})
```
{% endifanrxCodeTabs %}

**返回结果**

user 为 currentUser 对象，该对象的详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

### 邮箱验证

请参考 [邮箱验证小节](./account.md)


### 通过用户名注册

**示例代码**
{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.register({username: 'ifanrx', password: 'ifanrx123'}).then(user => {
  console.log(user)
})
```
{% endifanrxCodeTabs %}

user 为 currentUser 对象，该对象的详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 登录

开发者可以通过 `BaaS.auth.login(opts)` API 来进行用户的通用登录

opts 参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| opts.username   | String  | 用户名，username 和 email 必选一个 |
| opts.email      | String  | 邮箱，username 和 email 必选一个 |
| opts.password   | String  | 密码 |

### 用户名登录

用户可以通过用户名和密码登录

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.login({username: 'ifanrx', password: 'ifanrx123'}).then(user => {
  console.log(user)
}).catch(err=>{
  // HError
})
```
{% endifanrxCodeTabs %}


**返回结果**

user 为 currentUser 对象，该对象的详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

### 邮箱登录

用户可以通过邮箱和密码登录

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.login({email: 'ifanrx@ifanr.com', password: 'ifanrx123'}).then(user => {
  console.log(user)
}).catch(err => {
  // HError
})
```
{% endifanrxCodeTabs %}

**返回结果**

user 为 currentUser 对象，该对象的详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 其他方式登录

### 微信小程序登录
请参考[微信小程序登录](./wechat/signin-signout.md)

### 支付宝小程序登录
请参考[支付宝小程序登录](./alipay/signin-signout.md)

## 关联小程序账户
用户在完成登录后，可以关联小程序账户，这样用户可以在下次通过多种方式登录同一账户。

### 关联微信小程序
请参考[关联微信小程序](./wechat/signin-signout.md)

### 关联支付宝小程序
请参考[关联支付宝小程序](./alipay/signin-signout.md)

## 忘记密码

### 通过邮件找回密码

当用户忘记了登录密码，可以通过邮件找回密码。

`BaaS.auth.requestPasswordReset({email})`

> **info**
> 只有通过验证的邮箱才能使用邮件找回密码功能

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.requestPasswordReset({email: 'ifanrx@ifanr.com'}).then(res => {
  console.log(res)
}).catch(err=>{
  // HError
})
```
{% endifanrxCodeTabs %}

**返回示例**

成功时 res 结构如下
```json
{
  "statusCode": 201,
  "data": { "status": "ok" }
}
```

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 获取 currentUser 对象

请参考 [获取 currentUser 对象小节](./account.md)
