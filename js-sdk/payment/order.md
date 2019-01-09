<!-- ex_nonav -->

# 订单查询


{% tabs first="SDK 1.9.0 及以上版本", second="SDK 1.8.1 以下版本" %}

{% content "first" %}

通过 BaaS SDK 提供的 `Order.getOrderList(params)` 方法, 可查询到交易的详细信息。典型的使用场景为: 调用 `wx.BaaS.pay(object)` 发起支付, 在成功回调中获取到 transaction_no 或 trade_no, 在要路由到新的页面时带上此 ID, 在新页面的 onLoad 方法中获取到该 ID, 从而使用此 ID 获取交易的详细信息。

**函数签名**

`Order.getOrderList(params)`

**参数说明**

| 参数                           | 类型    | 说明 |
| :------------------------------| :----- | :-- |
| params.merchandise_record_id   | String | 商品记录 ID，可用于定位用户购买的物品 |
| params.merchandise_schema_id   | Number | 商品表 ID，可用于定位用户购买的物品 |
| params.status                  | String | 订单支付状态,可选值有：complete（退款成功）、pending（待支付）、success（支付成功）、partial（部分退款） |
| params.trade_no                | String | 真正的交易 ID, 业务方在微信后台对账时可看到此字段 |
| params.transaction_no          | String | 知晓云平台所记录的流水号 |

**示例代码**
```js
var order = new wx.BaaS.Order()

// 通过 trade_no 查询订单
order.getOrderList({trade_no: '1gCeU9ZKQQAA8iQgUM0lWhEbnqr89Qtxxx'}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})

// 通过 transaction_no 查询订单
order.getOrderList({transaction_no: 'v4WoZ7aNyZPaZbNlFffOZLvagUKqDcOw'}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})

// 分页查询所有订单
order.offset(20).limit(20).getOrderList().then(res => {
  // success
}).catch(e=>{
  // HError 对象
})

// 查询商品表为 1234 且状态为待支付的订单
order.getOrderList({merchandise_schema_id: 1234, status: 'pending'}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

**返回示例**

成功时 res 对象结构如下

```json
{
  "data": {
    "meta": {"limit": 20, "next": null, "offset": 0, "previous": null, "total_count": 1},
    "objects": [{
      "created_at": "2018-10-12T17:18:10.992125",
      "gateway_extra_info": "{'payment_parameters': {'nonceStr': '1gAtaFdVpelLBqH1iNu6Drny159aN7CL', 'timeStamp': '1539335891', 'appId': 'xxxxxxxxx', 'signType': 'MD5', 'paySign': '9A9277CEDBE9A47B5A0E4CD664E3A6E9', 'package': 'prepay_id=wx121718113084277cb388281e2112421151'}}",
      "id": 47963,
      "ip_address": "183.61.109.211",
      "merchandise_description": "一条支付描述",
      "merchandise_record_id": null,
      "merchandise_schema_id": null,
      "merchandise_snapshot": "{}",
      "paid_at": null,
      "refund_status": null,
      "status": "pending",
      "total_cost": "398.00",
      "trade_no": "1gAtaEFcmu6DyHm5b0ycBSmNO302NGzA",
      "transaction_no": "XDiXbfLFyd8DpxSWqBUcb2jW1AvhVORC",
      "updated_at": "2018-10-12T17:18:11.317089"
    }]
  },
  "statusCode": 200
}
```

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|------------------|
| 400            |  查询参数不合法    |


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
| transaction_no          | String | 知晓云平台所记录的流水号 |

{% content "second" %}

> **info**
> wx.BaaS.order(OBJECT) API 已不推荐使用，后期 JS SDK 可能会移除此 API

通过 BaaS SDK 提供的 `wx.BaaS.order(OBJECT)` 方法, 可查询到交易的详细信息。典型的使用场景为: 调用 `wx.BaaS.pay(object)` 发起支付, 在成功回调中获取到 流水号, 在要路由到新的页面时带上此 ID, 在新页面的 onLoad 方法中获取到该 ID, 从而使用此 ID 获取交易的详细信息。

**OBJECT 参数说明**

| 参数          | 类型    | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| transactionID | String |  Y  | BaaS 平台所记录的流水号 |

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
| transaction_no          | String | 知晓云平台所记录的流水号 |

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
{% endtabs %}

