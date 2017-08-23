# 登入

通过 `wx.BaaS.login()` 完成用户登录(静默登录)以及用户信息授权(弹框询问)：

```
// 微信用户登录小程序
wx.BaaS.login().then((res) => {
  // 登录成功
}, (err) => {
  // 系统级错误
})
```

调用 `wx.BaaS.login()` 方法后, 用户完成静默登录。本地存储会存有当前登录用户的 `UID`, 可通过 `wx.BaaS.storage.get('uid')` 获取。

此过程会弹框询问用户是否授权给开发者获取其公开信息(如头像、昵称、性别等)。

用户点击允许, 则开发者可以在登录成功的回调方法中拿到用户信息,  SDK 也将返回的用户信息保存在 storage 中, 开发者可借助开发者工具进行查看。

用户点击拒绝, 登录成功的回调方法返回空对象, 开发者无法获取到该登录用户的用户信息。但此时该用户仍然是一个有效的登录用户, 只是开发者无法拿到其昵称、头像等信息。

有关用户登录以及用户信息获取的更多详细信息请参考: [wx.login](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html#wxloginobject) 和 [wx.getUserInfo](https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html#wxgetuserinfoobject) `wx.BaaS.login()` 封装了 `wx.login` 和 `wx.getUserInfo`

### 注意事项

- 通过 BaaS 提供的方法调用 BaaS 接口时，已自动完成登入 BaaS 功能