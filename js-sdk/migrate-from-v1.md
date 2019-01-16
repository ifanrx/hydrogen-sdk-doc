# 迁移指南

## 登入登出

- 原有通过 `wx.BaaS.login(false)` 来进行匿名授权登录，现在改为 `wx.BaaS.auth.loginWithWechat()`
- `wx.BaaS.logout` 迁移到 `wx.BaaS.auth.logout`

## 获取用户信息
- `wx.BaaS.handleUserInfo` 迁移到 `wx.BaaS.auth.handleUserInfo`
- 原有通过 `wx.BaaS.login()` 来获取缓存中的用户信息，现在需要通过 `wx.BaaS.auth.currentUser()` 进行获取，参考 [currentUser 对象小节](./account.md)，

## 用户信息返回字段修改

请参考[登录小节](./auth.md)