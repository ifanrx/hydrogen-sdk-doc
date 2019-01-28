# 迁移指南

> **info**
> 目前 SDK 2.x 版本暂时兼容 1.x 版本的所有写法，开发者可以在不变动代码的情况下进行 SDK 版本升级，但**强烈建议**开发者根据下方的指导对代码进行调整。

## 登入登出

- 原有通过 `wx.BaaS.login(false)` 来进行静默登录，现在改为 `wx.BaaS.auth.loginWithWechat()`
- `wx.BaaS.logout` API 迁移到 `wx.BaaS.auth.logout`
- 登录接口返回值修改：原有的 `wx.BaaS.login(false)` 返回的 Promise 中回调内容为修改为 [currentUser 对象](./account.md) 

## 获取用户信息
- `wx.BaaS.handleUserInfo` 迁移到 `wx.BaaS.auth.handleUserInfo`
- `wx.BaaS.auth.handleUserInfo` 返回的 Promise 中回调内容为修改为 [currentUser 对象](./account.md) 
