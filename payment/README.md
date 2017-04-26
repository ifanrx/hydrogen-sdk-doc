# 支付

通过此 SDK 提供的 `wx.BaaS.pay()` 方法，可以方便的完成微信支付功能。

---

调用微信支付功能时包含以下操作：

- 调用 BaaS 支付接口
- 如果上一步成功则通过 `wx.requestPayment()` 唤起微信支付服务
- 如果无法成功调用 BaaS 支付接口或者唤起微信支付服务失败，则回调支付失败函数

---

以上操作可以通过 BaaS 提供的 `wx.BaaS.pay()` 函数完成：

```
// 支付
wx.BaaS.pay().then((res) => {
  // success
}, (err) => {
  // err
});
```