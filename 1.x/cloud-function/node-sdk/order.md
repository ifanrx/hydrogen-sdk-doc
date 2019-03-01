# 支付订单操作

## 获取订单

`Order.getOrderList(params)`

**参数说明**

params 是 Object 类型，为订单过滤条件，你可以参考后面的返回参数说明，进行筛选。

**返回参数说明**

部分关键字段：

| 参数                           | 类型   | 说明 |
| :----------------------------- | :----- | :-- |
| params.gateway_type            | String | 支付方式，可选值有：weixin_tenpay（微信支付）、alipay（支付宝支付）|
| params.created_at              | Number | 创建支付请求的时间戳 |
| params.created_by_id           | Number | 订单创建者 id |
| params.created_by_name         | String | 订单创建者姓名 |
| params.id                      | Number | 订单 id，用于退款的 order_id |
| params.ip_address              | Number | - |
| params.merchandise_description | String | 微信支付-微信支付凭证-商品详情上的文字描述 |
| params.merchandise_record_id   | String | 商品记录 ID，可用于定位用户购买的物品 |
| params.merchandise_schema_id   | Number | 商品表 ID，可用于定位用户购买的物品 |
| params.merchandise_snapshot    | String | - |
| params.paid_at                 | Number | 付款时间, 未支付的话为 null |
| params.refund_amount           | Number | 退款金额 |
| params.refund_status           | String | 退款状态，可能的值有：complete（退款成功）、partial（部分退款），也可能为 null|
| params.status                  | String | 订单状态, pending（待支付）、success（支付成功） |
| params.total_cost              | Number | 发起交易请求时的支付金额 |
| params.trade_no                | String | 知晓云平台所记录的订单号 |
| params.transaction_no          | String | 对应微信支付成功后返回的 transaction_no，支付流水号 |
| params.updated_at              | Number | 订单更新时间 |
| params.paid_at__gte            | Number | 付款时间区间的开始时间 |
| params.paid_at__lte            | Number | 付款时间区间的结束时间 |

**示例代码**

查找微信支付订单
```js
var order = new BaaS.Order()
// 通过 gateway_type 查询订单
order.getOrderList({gateway_type: 'weixin_tenpay'}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

根据订单号查找
```js
var order = new BaaS.Order()
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
```

分页查询所有订单
```json
order.offset(20).limit(20).getOrderList().then(res => {
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
  "status": 200
}
```

## 退款

`BaaS.refund(data)`

**参数说明**

data 是 Object 类型，它包括以下几个属性

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| refund_amount | Number | 否  | 默认为退还剩余所有款项  |
| order_id      | Number | 是  | 订单 id |
| trade_no      | String | 是  | - |
| transaction_no| String | 是  | - |
| memo          | String | 否  | 备注信息 |

**返回参数说明**

部分关键字段：

| 参数           | 类型   | 说明 |
| :------------ | :----- | :-- |
| error_msg     | String | - |
| id            | Number | - |
| memo          | String | 备注信息 |
| order_id      | Number | 订单 id |
| refund_amount | String | 退款金额 |
| refund_no     | String | 退款单号 |
| status        | String | 订单支付状态 |

**示例代码**

调用退款接口，需要先通过上文的 `Order.getOrderList` API，拿取返回数据中的 id 字段作为 order_id 的值，来进行退款操作
也可以通过 `trade_no` 和 `transaction_no` 来退款。

```js
// 通过订单 ID 退款
BaaS.refund({
  order_id: 29973,
  memo: '测试退款'
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})

// 通过 trade_no 退款
BaaS.refund({
  trade_no: '1gAtaEFcmu6DyHm5b0ycBSmNO302NGzA',
  memo: '测试退款'
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})

// 通过 transaction_no 退款
BaaS.refund({
  transaction_no: '1gAtaEFcmu6DyHm5b0ycBSmNO302NGzA',
  memo: '测试退款'
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)
