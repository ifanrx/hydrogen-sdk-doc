# v1.x -> v2.x 迁移指南

> **info**
> 目前 SDK 2.x 版本暂时兼容 1.x 版本的所有写法，开发者可以在不变动代码的情况下进行 SDK 版本升级，但**强烈建议**开发者根据下方的指导对代码进行调整。
>
> 由于 1.x 仅支持微信小程序，所以本迁移指南只针对微信小程序的迁移

由于支持多平台登录，2.x 相比 1.x 在用户授权机制方面有不兼容的更新：

1. 自动登录：

  1.x 的接口在 token 已失效，后端返回了 401 错误后，会自动调用静默登录（wx.BaaS.login(false)）。登录成功后，重发之前失败的请求。
  这个登录与重发机制对开发者来说是透明的。

  静默登录会给未注册用户`直接创建用户`，而多平台应用的需求可能是`关联一个已经用用户名密码创建的用户`（参考 [linkWechat](/js-sdk/wechat/signin-signout.html#关联微信小程序)），
  这就产生了冲突。因此，在 2.x 中，这种默认的自动登录机制被取消了。改为由开发者决定是否打开自动登录，具体请查看下文[初始化](#初始化)章节。

2. 登录成功返回值：

  1.x 的 wx.BaaS.login(false) 登录成功后返回值如下：

  ```js
  {
    "id": 61736923,
    "openid": "ofo380BgVHDSf3gz0QK1DYPGnLxx",
    "unionid": "",
    "session_expires_at" : 1546588122840
  }
  ```

  2.x 推荐使用 wx.BaaS.auth.loginWithWechat() 来代替 wx.BaaS.login(false)，调用成功后，返回值为[currentUser](/js-sdk/account.md)。
  currentUser 在兼容旧返回值的情况下，还增加了其他更改当前用户信息的方法，具体请查看[对应章节](/js-sdk/account.md)

## 初始化
原有的 `wx.BaaS.init(ClientID)` 增加了 `autoLogin` 参数，函数签名为 `wx.BaaS.init(ClientID, {autoLogin: false})`

1.x 版本的 JS SDK `autoLogin` 配置强制为 `true`，在 2.x 版本中，`autoLogin` 参数默认为 `false`，
具体请参考 [多平台用户统一登录](./wechat/signin-signout.md#多平台用户统一登录)。

> **info**
> 如果开发的应用的微信单平台应用，可以直接设置 autoLogin 为 true
>
> 如果应用是多平台应用，autoLogin 建议设置为 false。
>
> 如果 autoLogin 没设置或设置为 false，开发者需要自行处理接口返回的 401 错误。

```javascript
/**
 * 下面 1.x 的 init 与 2.x 的 init 调用，效果是相同的
 */

wx.BaaS.init(ClientID)  // 1.x

// 由 1.x 版本升级到 2.x ，开发者需要配置 autoLogin
wx.BaaS.init(ClientID, {autoLogin: true})  // 2.x
```

## 登入登出

- 原有通过 `wx.BaaS.login(false)` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.loginWithWechat()`，[点此查看接口说明](./account.md)
- `wx.BaaS.logout` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.logout`

## 获取用户信息
- `wx.BaaS.handleUserInfo` 已不推荐使用，现在推荐使用 `wx.BaaS.auth.loginWithWechat`
