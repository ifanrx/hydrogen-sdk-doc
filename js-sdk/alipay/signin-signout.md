# 登入登出

## 登入

`my.BaaS.auth.loginWithAlipay({forceLogin})`

当 `forceLogin` 为 `false` 时，为静默登录，不会弹窗授权框。

当 `forceLogin` 为 `true` 时，为强制登录，会弹窗授权框。授权成功后，后端可以拿到支付宝用户的用户信息。

> **info**
> 强制登录时，如果用户拒绝授权，则执行静默登录逻辑。

**参数说明**

| 参数       | 类型    | 说明         |
| :--------- | :------ | :----------- |
| forceLogin | Boolean | 是否强制登录 |

**返回值**
`Promise<UserRecord>`
UserRecord 对象的内容与接口请参考 [currentUser](/js-sdk/user.md)

**请求示例**

```js
// 支付宝用户登录小程序
my.BaaS.auth.loginWithAlipay({forceLogin: false}).then(currentUser => {
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
