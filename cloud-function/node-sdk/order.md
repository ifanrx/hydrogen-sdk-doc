# 微信支付订单操作

### 获取订单

`BaaS.getOrderList(data)`

**参数说明**

data 是 Object 类型，为订单过滤条件，你可以参考后面的返回参数说明，进行筛选。

**返回参数说明**

部分关键字段：

| 参数                    | 类型    | 说明 |
| :---------------------- | :----- | :-- |
| created_at              | Number | 调用 wx.BaaS.pay(object) 的时刻 |
| created_by_id           | Number | 订单创建者 id |
| created_by_name         | String | 订单创建者姓名 |
| id                      | Number | 订单 id，用于退款的 order_id |
| ip_address              | Number | - |
| merchandise_description | String | 微信支付-微信支付凭证-商品详情上的文字描述 |
| merchandise_record_id   | Number | - |
| merchandise_schema_id   | Number | - |
| merchandise_snapshot    | String | - |
| paid_at                 | Number | 付款时间, 未支付的话为 null |
| refund_amount           | Number | 退款金额 |
| refund_status           | String | 退款状态 |
| status                  | String | 订单状态 |
| total_cost              | Number | 发起交易请求时的支付金额 |
| trade_no                | String | 知晓云平台所记录的订单号 |
| transaction_no          | String | 对应微信支付成功后返回的 transaction_no |
| updated_at              | Number | 订单更新时间 |

| 参数      | 类型   | 必填 | 描述 |
| :------- | :----- | :-- | :-- |
| trade_no | String | 是  | 订单号 |

**示例代码**

根据订单号查找
```js
BaaS.getOrderList({
  trade_no: '1fjy6ZBaaSbJeNESnnAQpQjVVGPxZpuv'
}).then(res => {
  // success
})
```

根据支付成功后返回的 transaction_no 查找
```js
BaaS.getOrderList({
  transaction_no: 'gwqUzWKAMWAgMeZZnhVFnWrkFZYuFGje'
}).then(res => {
  // success
})
```

### 退款

`BaaS.refund(data)`

**参数说明**

data 是 Object 类型，它包括以下几个属性

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| refund_amount | Number | 否  | 默认为退还剩余所有款项  |
| order_id      | Number | 是  | 订单 id |
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

调用退款接口，需要先通过 `BaaS.getOrderList` 接口，拿取返回数据中的 id 字段作为 order_id 的值

```js
BaaS.refund({
  order_id: 29973,
  memo: '测试退款'
}).then(res => {
  // success
})
```