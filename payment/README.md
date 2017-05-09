# 支付

通过 BaaS SDK 提供的 `wx.BaaS.pay(OBJECT)` 方法，可以方便地完成微信支付。

##### OBJECT 参数说明
参数列表采用**驼峰命名, 区分大小写**的命名方式和书写规范

|          参数名           |   类型   | 是否必填 |  参数描述  |
| :--------------------: | :----: | :--: | :--: |
|       totalCost        | Number |  Y   | 支付总额 |
| merchandiseDescription | String |  Y   | 支付描述 |

##### 接口说明
调用微信支付接口时包含以下操作：

- 调用 BaaS 支付接口(SDK 使用者无需感知，此步骤是获取 `wx.requestPayment()` 接口请求的必填参数，例如: `timeStamp`、`nonceStr` 等参数。全部支付接口所需参数列表请参考[小程序官方文档之 `wx.requestPayment`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject)。除去该接口所需的必填参数之外，BaaS 服务器还会返回当前小程序的 appId)
- 如果上一步成功则通过封装在 SDK 内部的 `wx.requestPayment()` 接口发起微信支付请求
- 支付成功或失败(某种原因引起的支付失败或者用户取消)都会调用该接口事先返回的 `Promise` 对象
- 注: 微信提供了统一的返回描述字符串 `res.errMsg` 来通知开发者支付结果的详细信息
##### 示例代码
```
// 支付示例代码
let params = {}
params.totalCost = 398
params.merchandiseDescription = '一条支付描述'

wx.BaaS.pay(params).then((res) => {
  // success
}, (err) => {
  // err
});
```