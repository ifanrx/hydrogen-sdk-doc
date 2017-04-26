# 初始化

初始化 SDK 相当于让 BaaS 验证当前的小程序是否是有效合法的，只有通过 BaaS 验证的小程序才能使用 SDK 提供的全部功能。

---

可以通过 BaaS 提供的 `init` 函数完成：

```
// 初始化 SDK，clientID 从 BaaS 后台获取
wx.BaaS.init(clientID);
```