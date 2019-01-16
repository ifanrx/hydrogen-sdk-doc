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

## 更新密码

`currentUser.updatePassword({password, newPassword})`

## 更新用户名

## 更新邮箱
`updateEmail(email, sendVerificationEmail = false)`

## 邮箱验证

`currentUser.requestEmailVerification()`

用户通过邮箱注册后或者修改了邮箱后，开发者可能希望对用户填写的邮箱真实性进行校验，
调用该 API 后，知晓云会向当前用户发送一封验证邮件，用户可以打开邮件并进行验证操作。

**示例代码**

```js

```