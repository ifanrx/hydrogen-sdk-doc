# 账户管理

开发者可以调用 `BaaS.auth.currentUser()` 获取 `currentUser` 对象，通过该对象进而对当前用户进行管理。

## currentUser 对象

### 属性说明

可以将 `currentUser` 对象看做是指向 `_userprofile` 表中的一个实例，通过该实例，可以对该行数据行进行修改。同时该对象上拥有`_userprofile` 表的所有的*内置字段*。

### 获取该用户的所有字段

`currentUser.toJSON()`

开发者可能会在 _userprofile 表中定义一些自定义字段，要拿到这些自定义字段信息，可以通过 `currentUser.toJSON()` API，来获得一个完整的用户信息。

**示例代码**

```js

```

## 更新用户信息

用户可以通过下列 API 来修改登录方式。

常见使用场景：
- 用户的用户名/邮箱设置有误，需要修改为新的用户名/邮箱。
- 用户使用小程序授权登录后，通过设置用户名或邮箱，以便下次通过用户名或邮箱登录。

### 更新用户名

`currentUser.updateUsername({username, password})`

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| username   | String  | 新用户名 |
| password      | String  | 密码 |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
let user = wx.BaaS.auth.currentUser()

user.updateUsername({
  username: 'ifanrx_new',
  password: '111111',
}).then(res => {
  console.log(res)
})
```
{% endifanrxCodeTabs %}

### 更新邮箱

`currentUser.updateEmail({email, password }, {sendVerificationEmail} = {})`

**参数说明**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| email      | String  | 新邮箱 |
| password      | String  | 密码 |
| sendVerificationEmail   | Boolean  | 是否发送验证邮件，可选，默认为 false |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
let user = wx.BaaS.auth.currentUser()

user.updateEmail({
  email: 'ifanrx_new@ifanr.com',
  password: '111111',
}, {sendVerificationEmail: true}).then(res => {
  console.log(res)
})

```
{% endifanrxCodeTabs %}

### 更新密码

`currentUser.updatePassword({password, newPassword})`

参数说明：

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| password      | String  | 用户密码 （若用户当前密码为空则为`空`） |
| newPassword   | String  | 新用户密码 (若用户当前密码为空则为`必填`） |

**示例代码**

{% ifanrxCodeTabs %}
```javascript
let user = wx.BaaS.auth.currentUser()
user.updatePassword({password: '111111', newPassword: '222222'}).then(res => {
  console.log(res)
})
```
{% endifanrxCodeTabs %}


## 邮箱验证

`currentUser.requestEmailVerification()`

用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**

{% ifanrxCodeTabs %}
```js
let user = wx.BaaS.auth.currentUser()
user.requestEmailVerification().then(res => {
  console.log(res)
})
```
{% endifanrxCodeTabs %}
