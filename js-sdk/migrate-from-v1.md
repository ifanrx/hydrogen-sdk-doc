# 迁移指南

## 登入登出

- 原有通过 `wx.BaaS.login(false)` 来进行静默登录，现在改为 `wx.BaaS.auth.loginWithWechat()`
- `wx.BaaS.logout` API 迁移到 `wx.BaaS.auth.logout`
- 登录接口返回值修改：原有的 `wx.BaaS.login(false)` 返回的 Promise 中回调内容为修改为 [currentUser 对象](./account.md) 

## 获取用户信息
- `wx.BaaS.handleUserInfo` 迁移到 `wx.BaaS.auth.handleUserInfo`
- `wx.BaaS.auth.handleUserInfo` 返回的 Promise 中回调内容为修改为 [currentUser 对象](./account.md) 
- 原有通过 `wx.BaaS.login()` 来获取缓存中的用户信息，现在需要通过 `wx.BaaS.auth.currentUser()` 进行获取，请参考 [currentUser 对象小节](./account.md)，


