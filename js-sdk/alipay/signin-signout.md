# 登入登出

## 登入

`my.BaaS.auth.loginWithAlipay({forceLogin, scopes, failIfNotExists})`

**参数说明**

| 参数            | 类型    | 说明         |
| :-------------- | :------ | :----------- |
| forceLogin      | Boolean | 是否强制登录 |
| scopes          | Array   | 需要用户授权的 scope 列表 |
| failIfNotExists | Boolean | 是否在用户不存在时返回失败 |

当 `forceLogin` 为 `false` 时，为静默登录，不会弹窗授权框；
当 `forceLogin` 为 `true` 时，为强制登录，会弹窗授权框。授权成功后，后端可以拿到支付宝用户的用户信息。

`scopes` 参数用于在用户强制登录时，如果需要用户授权除了用户信息之外的其他权限
（例如 `auth_life_msg`、`auth_life_msg_tele` 等），则将这些额外的 scope 通过 `scopes` 参数传给接口。
（静默登录时，会忽略掉这个参数）

当 `failIfNotExists` 为 `true` 时，如果当前支付宝用户未与知晓云应用中的用户关联（即用户未找到），返回 404 错误。
否则接口会在应用中创建一个新用户并与当前支付宝用户关联。

> **info**
> 强制登录时，如果用户拒绝授权，则执行静默登录逻辑。

**返回值**
`Promise<UserRecord>`
UserRecord 对象的内容与接口请参考 [currentUser](/js-sdk/user.md)

**请求示例**

```js
// 支付宝用户登录小程序

// 静默登录
my.BaaS.auth.loginWithAlipay({
  forceLogin: false,
}).then(currentUser => {
  // 登录成功
}, err => {
  // 登录失败
})

// 静默登录
my.BaaS.auth.loginWithAlipay().then(currentUser => {
  // 登录成功
}, err => {
  // 登录失败
})

// 强制登录
my.BaaS.auth.loginWithAlipay({
  forceLogin: true,
  scopes: ['auth_life_msg', 'auth_life_msg_tele'],
  failIfNotExists: true,
}).then(currentUser => {
  // 登录成功
}, err => {
  // 登录失败
})
```

**登录成功返回示例**

`Promise<UserRecord>`
UserRecord 对象的内容与接口请参考 [currentUser](/js-sdk/user.md)

**登录失败返回示例**

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 设置用户名和邮箱

用户通过支付宝登录后，可以设置邮箱、用户名、密码，以便下次可以通过用户名或者邮箱登录。

详情请参考 [更新用户名](../account.md) 和 [更新邮箱](../account.md)

## 关联支付宝账号

`my.BaaS.auth.linkAlipay({forceLogin})`

当使用账号密码登录账号，可以调用该接口，使支付宝账号与当前登录账号相关联。

`forceLogin` 参数的使用方法与上面登录接口一致。
