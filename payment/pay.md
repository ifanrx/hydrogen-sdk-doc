# 支付

通过 BaaS SDK 提供的 `wx.BaaS.pay(OBJECT)` 方法, 可以方便地完成微信支付。

##### OBJECT 参数说明
参数列表采用**驼峰命名, 区分大小写**的命名方式和书写规范

| 参数名                    | 类型      | 是否必填 | 参数描述           |
| :--------------------- | :------ | :--: | :------------- |
| totalCost              | Number  |  Y   | 支付总额           |
| merchandiseDescription | String  |  Y   | 微信支付凭证-商品详情的内容 |
| merchandiseSchemaID    | Integer |  N   | 商品表 ID         |
| merchandiseRecordID    | String |  N   | 商品记录 ID          |
| merchandiseSnapshot    | Object  |  N   | 根据业务需求自定义的数据   |

注: 通过 `merchandiseSchemaID` 和 `merchandiseRecordID` 来定位用户购买的物品。

使用场景:

例如开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 merchandiseSchemaID, 文章记录的 ID 作为你 merchandiseRecordID 传入到 `wx.BaaS.pay(object)` 写进支付订单记录。

当用户阅读此付费文章时, 则可以通过 merchandiseSchemaID, merchandiseRecordID 来查询用户是否付完成费。

`merchandiseSnapshot`可将发起支付时的其他数据放在此参数中传递给服务端做持久化存储。

##### 接口说明

调用 `wx.BaaS.pay(object)`时实际执行了以下操作：

- SDK 内部封装了[小程序官方微信支付接口](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject) `wx.requestPayment(object)`

- SDK 使用者只需要调用`wx.BaaS.pay(object)` , 传入必填参数即可发起微信支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面

- 支付请求会先经过 BaaS 服务器, 与 BaaS 服务器通信成功后，BaaS 服务器会返回 `wx.requestPayment(object)` 接口的必填参数, 例如: `timeStamp`、`nonceStr` 等, 具体可参看 [这里](https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-pay.html#wxrequestpaymentobject)。同时也会返回额外的 appId

- SDK 会确认用户具备有效的登录态 (获取到有效的 token) 后再在内部自动发起 `wx.requestPayment(object)`

- 支付成功或失败(某种原因引起的支付失败或者用户取消)都会调用该接口事先返回的 `Promise` 对象

- 注: 微信提供了统一的返回描述字符串 `res.errMsg` 来通知开发者支付结果的详细信息


##### 示例代码

```
// 支付示例代码
let params = {}
params.totalCost = 398
params.merchandiseDescription = '一条支付描述'

wx.BaaS.pay(params).then((res) => {
  // success. 支付请求成功响应。
  /* 如果支付成功, 则可以在 res 中拿到 transaction_no 和支付结果信息
    如果支付失败, 则可以获取失败原因
    注: 只要是服务器有返回的情况都会进入 success, 即便是 4xx，5xx 都会进入
    所以非系统级别错误导致的支付失败也会进入这里, 例如用户取消，参数错误等
    这是微信的处理方式与 BaaS 服务(器)无关
  */
}, (err) => {
  // err. 系统级别错误导致失败。只有发生网络异常等其他系统级错误才会进入这里
  // 这是微信服务器的处理方式与 BaaS 服务(器)无关
});
```