# 登入/登出

### 登入

通过 `wx.BaaS.login()` 函数完成登入功能：

```
// 登入 BaaS
wx.BaaS.login().then((res) => {
  // success
  // 此时 res 包含当前微信登录用户的信息
}, (err) => {
  // err
});
```

调用 `wx.BaaS.login()` 函数后，无论用户是否授权，本地存储都会存有当前登录用户的 `UID`，可通过 `wx.BaaS.storage.get('uid')` 获取。如果用户允许授权，那么返回的 `res` 是包含用户微信信息的对象，如果用户拒绝授权，那么返回的 `res` 为空对象 `{}`。

### 登出

通过 `wx.BaaS.logout()` 函数完成登出功能：

```
// 登出 BaaS
wx.BaaS.logout().then((res) => {
  // success
}, (err) => {
  // err
});
```

### 注意事项

- 通过 BaaS 提供的方法调用 BaaS 接口时，已自动完成登入 BaaS 功能