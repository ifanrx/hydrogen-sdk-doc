# 登出

清理客户端存储的用户授权信息

通过 `wx.BaaS.logout()` 函数完成登出功能：

```
// 登出 BaaS
wx.BaaS.logout().then((res) => {
  // success
}, (err) => {
  // err
});
```