# 订单

### 获取订单

`BaaS.getOrderList(data)`

**参数说明**

data 是 Object 类型，为订单过滤条件，目前支持通过transactionID 进行过滤

| 参数      | 类型   | 必填 | 描述 |
| :------- | :----- | :-- | :-- |
| trade_no | String | 是  | 订单号 |

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
| trade_no                | String | 真正的交易 ID, 业务方在微信后台对账时可看到此字段 |
| transaction_no          | String | 知晓云平台所记录的 transactionID |
| updated_at              | Number | 订单更新时间 |


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