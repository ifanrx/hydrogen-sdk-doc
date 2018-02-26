<!-- ex_nonav -->

# 订单查询

通过 BaaS SDK 提供的 `wx.BaaS.order(OBJECT)` 方法, 可查询到交易的详细信息。典型的使用场景为: 调用 `wx.BaaS.pay(object)` 发起支付, 在成功回调中获取到 transactionID, 在要路由到新的页面时带上此 ID, 在新页面的 onLoad 方法中获取到该 ID, 从而使用此 ID 获取交易的详细信息。

**OBJECT 参数说明**

| 参数          | 类型    | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| transactionID | String |  Y  | BaaS 平台所记录的 transactionID |

**返回参数说明**

部分关键字段：

| 参数                    | 类型    | 说明 |
| :---------------------- | :----- | :-- |
| created_at              | Number | 调用 wx.BaaS.pay(object) 的时刻 |
| merchandise_description | String | 微信支付-微信支付凭证-商品详情上的文字描述 |
| paid_at                 | Number | 付款时间, 未支付的话为 null |
| status                  | String | 订单支付状态 |
| total_cost              | Number | 发起交易请求时的支付金额 |
| trade_no                | String | 真正的交易 ID, 业务方在微信后台对账时可看到此字段 |
| transaction_no          | String | 知晓云平台所记录的 transactionID |

**示例代码**

```js
let transactionID = "iMiTAsOrgjDKItmKifWzzayHAwneYwYo"
let params = { transactionID }

wx.BaaS.order(params).then(res => {
  // 注: 只要是服务器有返回的情况都会进入 success，这是微信的处理方式与 BaaS 服务(器)无关
}, err => {
  // 注：只有发生网络异常等其他系统级别的错误才会进入这里
})
```