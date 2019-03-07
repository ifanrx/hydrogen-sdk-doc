# 迁移指南

> **info**
> 目前 SDK 2.x 版本暂时兼容 1.x 版本的所有写法，开发者可以在不变动代码的情况下进行 SDK 版本升级，但**强烈建议**开发者根据下方的指导对代码进行调整。

## 初始化
原有的 `wx.BaaS.init(ClientID)` 增加了 `autoLogin` 参数，函数签名为 `wx.BaaS.init(ClientID, {autoLogin: false})`

1.x 版本的 JS SDK `autoLogin` 配置强制为 `true`，即用户在未登录的情况下，请求知晓云接口时，会自动帮用户进行静默登录，此时知晓云会直接在后台创建一个用户，
该操作可能会影响开发者实现多平台用户登录的逻辑。因此在 2.x 版本中，`autoLogin` 参数默认为 `false`，
具体请参考 [多平台用户统一登录](./wechat/signin-signout.md#多平台用户统一登录)。

```javascript
// 开发者需要配置 autoLogin 参数为 true
wx.BaaS.init(ClientID, {autoLogin: true})
```

## 登入登出

- 原有通过 `wx.BaaS.login(false)` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.loginWithWechat()`，[点此查看接口说明](./account.md)
- `wx.BaaS.logout` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.logout`

## 获取用户信息
- `wx.BaaS.handleUserInfo` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.loginWithWechat`
