# 通用注册登录

 `BaaS.auth` 模块集合了和平台无关的用户注册登录相关操作。

## 注册

开发者可以使用 `BaaS.auth.register(opts)` API 来进行用户的通用注册。

> **info**
> 注册成功后会自动登录，调用注册方法之前需先前往[设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)打开该登录方法

opts 参数说明：

| 名称             | 类型   | 说明    |
| :--------------- | :----- | :------ |
| opts.username    | String | 用户名，username、phone 和 email 必选一个 |
| opts.email       | String | 邮箱，username、phone 和 email 必选一个 |
| opts.phone | String | 手机号，username、phone 和 email 必选一个 |
| opts.password    | String | 密码    |


### 通过邮箱注册

> **info**
> 邮箱中的英文字母会被强制转换为小写。例如 iFanrX@Hello.com 会被转换成 ifanrx@hello.com

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

> **info**
> 用户名不区分大小写。当用户注册了 username 为 ifanrx 的账号后，其他人不能再注册诸如 Ifanrx、IfAnrx、IFANRX 等账号了

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


### 通过手机号注册

**示例代码**
{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.register({phone: '15000000000', password: 'ifanrx123'}).then(user => {
  console.log(user)
})
```
{% endifanrxCodeTabs %}

user 为 currentUser 对象，该对象的详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 登录

开发者可以通过 `BaaS.auth.login(opts)` API 来进行用户的通用登录

> **info**
> 调用登录方法之前需先前往[设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/)打开该登录方法

opts 参数说明：

| 名称             | 类型   | 说明    |
| :--------------- | :----- | :------ |
| opts.username    | String | 用户名，username、phone 和 email 必选一个 |
| opts.email       | String | 邮箱，username、phone 和 email 必选一个 |
| opts.phone | String | 手机号，username、phone 和 email 必选一个 |
| opts.password    | String | 密码 |

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

### 手机号登录

用户可以通过手机号和密码登录

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.login({phone: '15000000000', password: 'ifanrx123'}).then(user => {
  console.log(user)
}).catch(err => {
  // HError
})
```
{% endifanrxCodeTabs %}

**返回结果**

user 为 currentUser 对象，该对象的详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

### 创建临时用户

往数据表里添加数据，需要有一个用户身份（这样才能保障数据来源可回溯）。
如果不希望强制用户在一开始就进行注册，可以使用临时用户，让应用不提供注册步骤也能使得当前用户可以往 ACL 权限设置为“允许所有人（临时用户 + 登录用户）可写” 的数据表内添加数据。

> 临时用户使用场景举例：假如开发者希望应用内的文章，所有人可以在登录前阅读、点赞，
> 而且仅在调用特定接口时才需要登录，比如发布文章、评论文章。这时可以先使用临时用户，
> 之后再使用其他登录方式登录（这里可能需要进行合并用户数据操作）。

临时用户转换为正式用户（创建临时用户后再使用其他登录方式登录），开发者需要考虑以下情况：

1. 不需要进行用户数据合并

    创建临时用户后，调用 `wx.BaaS.auth.register`，注册返回的 user_id 与之前临时用户的 user_id 是一致的
    （也就是直接把临时用户转变为了正式用户），所以不需要数据合并。

2. 可能需要进行用户数据合并

    创建临时用户后，调用 `wx.BaaS.auth.loginWithWechat`，由于该微信账号可能已经与平台上的账号进行了绑定（即账号可能已经存在），
    登录成功后，返回的 user_id 与之前临时用户的 user_id 不一定一致。可以通过对比前后的 user_id 是否一致来判断是否需要数据合并。

3. 需要进行用户数据合并

    创建临时用户后，调用 `wx.BaaS.auth.login`，登录成功后，返回的 user_id 必定与之前临时用户的 user_id 不一致，所以需要数据合并。

> **info**
> 最终进不进行数据合并，由开发者自己考量决定。合并操作需要开发者自己进行。

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.anonymousLogin().then(user => {
  console.log(user)
}).catch(err => {
  // HError
})
```

**返回结果**

user 为 currentUser 对象，该对象的某些方法临时用户无法调用，详细介绍请参考 [currentUser 小节](./account.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)
{% endifanrxCodeTabs %}

## 其他方式登录

### 手机号 + 短信验证码登录

> **info**
> 短信验证码 smsCode 通过接口 `BaaS.sendSmsCode()` 获取，请查看[文档](/js-sdk/sms.md)

用户可以“手机号 + 短信验证码”进行登录

`BaaS.auth.loginWithSmsVerificationCode(mobilePhone, smsCode, {createUser})`

参数说明：

| 名称        | 类型   | 说明    |
| :---------- | :----- | :------ |
| mobilePhone | String | 手机号码 |
| smsCode     | String | 短信验证码 |
| createUser  | Boolean | 是否创建用户，默认为 `true`，可选 |

`createUser` 参数决定了一个新手机号用户第一次登录时的服务端处理行为。
默认为 `true`，服务端会有该用户创建一个知晓云用户记录。
当 `createUser` 为 `false` 时，服务端会终止登录过程，返回 404 错误码，开发者可根据该返回结果进行多平台账户绑定的处理。详见各平台登录页面下的 `多平台用户统一登录` 说明。

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.auth.loginWithSmsVerificationCode('15000000000', '123456').then(user => {
  console.log(user)
}).catch(err => {
  // HError
})
```
{% endifanrxCodeTabs %}

### 微信小程序登录
请参考[微信小程序登录](./wechat/signin-signout.md)

### 支付宝小程序登录
请参考[支付宝小程序登录](./alipay/signin-signout.md)

### Web 端第三方登录
请参考 [Web 登录](./web/signin-signout.md)

### QQ 小程序登录
请参考 [QQ 小程序登录](./qq/signin-signout.md)

### 百度小程序登录
请参考[百度小程序登录](./baidu/signin-signout.md)

### 京东小程序登录
请参考[京东小程序登录](./jingdong/signin-signout.md)

### 字节跳动小程序登录
请参考[字节跳动小程序登录](./bytedance/signin-signout.md)

## 关联小程序账户
用户在完成登录后，可以关联小程序账户，这样用户可以在下次通过多种方式登录同一账户。

### 关联微信小程序
请参考[关联微信小程序](./wechat/signin-signout.html#关联微信小程序)

### 关联支付宝小程序
请参考[关联支付宝小程序](./alipay/signin-signout.html#关联支付宝小程序)

### 关联 QQ 小程序
请参考[关联 QQ 小程序](./qq/signin-signout.html#关联-qq-小程序)

### 关联百度小程序
请参考[关联百度小程序](./baidu/signin-signout.html#关联百度小程序)

### 关联京东小程序
请参考[关联京东小程序](./jingdong/signin-signout.html#关联京东小程序)

### 关联字节跳动小程序
请参考[关联字节跳动小程序](./bytedance/signin-signout.html#关联字节跳动小程序)

## 登出

清理客户端存储的用户授权信息。

通过 `BaaS.auth.logout()` 函数完成登出功能。

**请求示例**

{% ifanrxCodeTabs %}
```javascript
// 登出 BaaS
wx.BaaS.auth.logout().then(res => {
  // success
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

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
