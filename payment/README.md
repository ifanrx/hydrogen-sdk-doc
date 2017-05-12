# 支付

通过 BaaS SDK 提供的 `wx.BaaS.pay(OBJECT)` 方法, 可以方便地完成微信支付。

##### OBJECT 参数说明
参数列表采用**驼峰命名, 区分大小写**的命名方式和书写规范

| 参数名                    | 类型      | 是否必填 | 参数描述           |
| :--------------------- | :------ | :--: | :------------- |
| totalCost              | Number  |  Y   | 支付总额           |
| merchandiseDescription | String  |  Y   | 微信支付凭证-商品详情的内容 |
| merchandiseSchemaID    | Integer |  N   | 商品表 ID         |
| merchandiseRecordID    | Integer |  N   | 商品 ID          |
| merchandiseSnapshot    | Object  |  N   | 根据业务需求自定义的数据   |

注: 通过 `merchandiseSchemaID` 和 `merchandiseRecordID` 来定位用户购买的物品。

使用场景: 

例如开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 merchandiseSchemaID, 文章记录的 ID 作为你 merchandiseRecordID 传入到 `wx.BaaS.pay(object)` 写进支付订单记录。

当用户阅读此付费文章时, 则可以通过 merchandiseSchemaID, merchandiseRecordID 来查询用户是否付完成费。

`merchandiseSnapshot `可将发起支付时的其他数据放在此参数中传递给服务端做持久化存储。

接口说明

调用微信支付接口时包含以下操作：

- SDK 使用者只需要调用`wx.BaaS.pay(object)` , 传入必填参数即可发起微信支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面
- SDK 会确认用户具备有效的登录态 (可以获取到有效的 token) 后再发起 `wx.requestPayment(object)` 
- 支付请求会先经过 BaaS 服务器, 与 BaaS 服务器通信成功后，BaaS 服务器会返回 `wx.requestPayment(object)` 的必填参数, 例如: `timeStamp`、`nonceStr` 等。以及额外的 appId
- 支付成功或失败(某种原因引起的支付失败或者用户取消)都会调用该接口事先返回的 `Promise` 对象
- 注: 微信提供了统一的返回描述字符串 `res.errMsg` 来通知开发者支付结果的详细信息
示例代码

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