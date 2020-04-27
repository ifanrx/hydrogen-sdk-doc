# 登录

## 通用注册登录

请参考[通用注册登录](/js-sdk/auth.md)章节

## 第三方授权登录（微博、微信、Apple）

**接口说明：**

`BaaS.auth.loginWithAuthData(authData, options)`

**参数说明**

authData 为 Object 类型，字段属性如下：

| 属性                 | 类型    | 必填 | 默认值 | 说明         |
| :------------------- | :------ | :--- | :----- | :----------- |
| token                | String  | 是   | -      | 第三方 OAuth 登录后返回的 token |
| username             | String  | 否   | -      | 用户名，Apple 登录时必填 |

options 为 Object 类型，字段属性如下：

| 参数            | 类型    | 必填 | 默认值 | 说明         |
| :-------------- | :------ | :--- | :----- | :----------- |
| provider        | String  | 是   | -      | 第三方平台，目前支持 `wechat`（微信登录）、`apple`（Apple 登录） |
| createUser      | Boolean | 否   | `true` | 是否创建用户 |
| syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |


**返回结果**

Promise<[UserRecord](/js-sdk/account.md)>

**请求示例**

```js
BaaS.auth.loginWithAuthData({
  token: '****',
}, {
  provider: 'wechat',
  createUser: true,
  syncUserProfile: 'overwrite',
})
  .then(user => {
    // 登录成功
  })
  .catch(err => {
    // 登录失败
  })
```

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

## 已登录用户关联第三方平台账号

> **info**
> 使用前，请确保已经完成了[第三方授权配置](/js-sdk/web/third-party-auth-config.md)并且用户为已登录状态。

关联第三方平台账号步骤与第三方授权登录步骤基本相同，区别在于关联第三方平台账号的第一步需调用 `UserRecord.linkThirdParty(provider, authPageUrl, options)` 接口，第三方授权和获取授权结果的操作步骤与第三方授权登录中的步骤一致。

**接口说明：**

`UserRecord.linkThirdParty(authData, options)`

**参数说明**

authData 为 Object 类型，字段属性如下：

| 属性                 | 类型    | 必填 | 默认值 | 说明         |
| :------------------- | :------ | :--- | :----- | :----------- |
| token                | String  | 是   | -      | 第三方 OAuth 登录后返回的 token |
| username             | String  | 否   | -      | 用户名，Apple 登录时必填 |

options 为 Object 类型，字段属性如下：

| 参数            | 类型    | 必填 | 默认值 | 说明         |
| :-------------- | :------ | :--- | :----- | :----------- |
| provider        | String  | 是   | -      | 第三方平台，目前支持 `wechat`（微信登录）、`apple`（Apple 登录） |
| syncUserProfile | String  | 否   | `'setnx'` | 是否[同步第一层级用户信息](/js-sdk/account.md#同步第一层级用户信息)，可选值为 overwrite、setnx、false |

**请求示例**

```js
BaaS.auth.getCurrentUser().then(user => {
  return user.linkAuthData({
    token: '****',
  }, {
    provider: 'wechat',
    syncUserProfile: 'overwrite',
  })
})
  .then(() => {
    // 关联成功
  })
  .catch(err => {
    // 关联失败
  })
```

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)
