# 迁移指南

> **info**
> 目前 SDK 2.x 版本暂时兼容 1.x 版本的所有写法，开发者可以在不变动代码的情况下进行 SDK 版本升级，但**强烈建议**开发者根据下方的指导对代码进行调整。

## 登入登出

- 原有通过 `wx.BaaS.login(false)` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.loginWithWechat()`，[点此查看接口说明](./account.md)
- `wx.BaaS.logout` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.logout`

## 获取用户信息
- `wx.BaaS.handleUserInfo` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.handleUserInfo`
