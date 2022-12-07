{% import "./macro/profit-sharing.md" as profitSharing %}
{% macro profitSharingCommon() %}
**参数说明**

options 是 Object 类型，它包括以下几个属性:

| 参数          | 类型            | 必填 | 说明 |
| :------------ | :-------------- | :--- | :--- |
| trade_no      | String          | 是   | 支付订单订单号(必须为微信支付订单，并且在创建支付订单时，添加参数 `profitSharing`（值为 `true`）) |
| receivers     | Array<Receiver> | 是   | 分账接收方列表   |
| appid         | String          | 是   | 微信分配的公众账号ID   |

Receiver 类型说明:

| 参数        | 类型   | 必填 | 说明           |
| :---------- | :----- | :--- | :------------- |
| type        | ReceiverType | 是   | 分账接收方类型 |
| account     | String | 是   | 分账接收方账户 |
| amount      | Number | 是   | 分账金额，单位为分，只能为整数，不能超过原订单支付金额及最大分账比例金额 |
| description | String | 是   | 分账描述       |

{{profitSharing.receiverType()}}
{% endmacro %}

# 支付订单操作

## 获取订单

`Order#getOrderList(params)`

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
| params.merchandise_description | String | 商品详情上的文字描述 |
| params.merchandise_record_id   | String | 商品记录 ID，可用于定位用户购买的物品 |
| params.merchandise_schema_id   | Number | 商品表 ID，可用于定位用户购买的物品 |
| params.merchandise_snapshot    | String | - |
| params.paid_at                 | Number | 付款时间, 未支付的话为 null |
| params.refund_amount           | Number | 退款金额 |
| params.refund_status           | String | 退款状态，可能的值有：complete（退款成功）、partial（部分退款），也可能为 null|
| params.status                  | String | 订单状态, pending（待支付）、success（支付成功） |
| params.total_cost              | Number | 发起交易请求时的支付金额 |
| params.trade_no                | String | 知晓云平台所记录的订单号 |
| params.transaction_no          | String | 对应微信（或支付宝）支付成功后返回的 transaction_no，支付流水号 |
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
```js
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


**支付结果返回信息 gateway_extra_info 参数说明**

gateway_extra_info 目前只支持 `gateway_type == 'weixin_tenpay'`（微信支付）时，返回支付成功后回调的订单详细信息。

gateway_extra_info 返回的数据结构如下：

```json
{
  "gateway_extra_info": {
    "wechat_response": {
      "appid": "wx3b040d33346exxxx",
      "bank_type": "OTHERS",
      "cash_fee": "1",
      "fee_type": "CNY",
      "is_subscribe": "N",
      "mch_id": "1501889000",
      "nonce_str": "1jFEJyNvEkr2IePMYXOeUEOHP11eXXXX",
      "openid": "om4vu0FZiwoQbTVAt0U-FEzXXXXX",
      "out_trade_no": "1jFEJyxlAuqzAtGcd4uuNxJwMS1TXXXX",
      "result_code": "SUCCESS",
      "return_code": "SUCCESS",
      "sign": "AB329F580E6E342246350DFE96AEXXXX",
      "time_end": "20200320175220",
      "total_fee": "1",
      "trade_type": "JSAPI",
      "transaction_id": "4200000519202003205153312216"
    }
  }
}
```


wechat_response 中部分关键字段：

| 参数                    | 类型    | 说明 |
| :---------------------- | :----- | :-- |
| appid                   | String | 微信分配的小程序ID |
| bank_type               | String | 银行类型，采用字符串类型的银行标识，银行类型见[银行列表](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2) |
| total_fee               | String | 订单总金额，单位为分 |
| is_subscribe            | String | 用户是否关注公众账号，Y-关注，N-未关注 |
| fee_type                | String | 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY，其他值列表详见[货币类型](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=4_2) |

具体返回参数详情可参照[微信支付结果通知](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_7&index=8)


## 微信直连商户分账

产品介绍，详见[微信直连商户分账官方文档](https://pay.weixin.qq.com/wiki/doc/api/allocation_sl.php?chapter=24_1&index=1)。

“分账接收方操作”、“分账账单操作”，请查看[微信直连商户分账文档](/cloud-function/node-sdk/wechat-profit-sharing.md)

为了支持“微信微信直连商户分账”，在创建支付订单时，需要添加参数 `profitSharing`（值为 `true`），具体请参考 [JS SDK 支付接口文档](/js-sdk/payment/)中微信支付部分。

> **info**
> 1. 只支持使用微信支付的订单

> 2. 需要先添加分账接收方才能分账

### 订单单次分账

{{ profitSharing.warning() }}

`Order#wechatPay.profitSharing(options)`

{{ profitSharingCommon() }}

**示例代码**


```js
var order = new BaaS.Order()
order.wechatPay.profitSharing({
  trade_no: '...',
  appid: '...',
  receivers: [{
    type: '...',
    account: '...',
    amount: 10,
    description: '...',
  }],
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

**返回示例**

成功时 res 对象结构如下

```json
{
  "data": {
    "return_code": "SUCCESS",
    "appid": "...",
    "mch_id": "...",
    "trade_no": "...",
    "wechat_order_no": "..."
  },
  "status": 200
}
```

### 订单多次分账

{{ profitSharing.warning() }}

`Order#wechatPay.multiProfitSharing(options)`

{{ profitSharingCommon() }}

**示例代码**


```js
var order = new BaaS.Order()
order.wechatPay.multiProfitSharing({
  trade_no: '...',
  appid: '...',
  receivers: [{
    type: '...',
    account: '...',
    amount: 10,
    description: '...',
  }],
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

**返回示例**

成功时 res 对象结构如下

```json
{
  "data": {
    "return_code": "SUCCESS",
    "appid": "...",
    "mch_id": "...",
    "trade_no": "...",
    "wechat_order_no": "..."
  },
  "status": 200
}
```

## 支付宝商家分账

产品介绍，详见[支付宝商家分账官方文档](https://docs.alipay.com/mini/introduce/splitbill)。

“分账接收方操作”、“分账账单操作”，请查看[支付宝商家分账文档](/cloud-function/node-sdk/alipay-profit-sharing.md)


> **info**
> 1. 只支持使用支付宝支付的订单

> 2. 需要先添加分账接收方才能分账

### 订单分账

`Order#alipay.profitSharing(options)`

**参数说明**

options 是 Object 类型，它包括以下几个属性:

| 参数          | 类型            | 必填 | 说明 |
| :------------ | :-------------- | :--- | :--- |
| trade_no      | String          | 是   | 支付订单订单号(必须为支付宝支付订单) |
| receivers     | Array<Receiver> | 是   | 分账接收方列表   |

Receiver 类型说明:

| 参数        | 类型   | 必填 | 说明           |
| :---------- | :----- | :--- | :------------- |
| type        | ReceiverType | 是   | 分账接收方类型 |
| account     | String | 是   | 分账接收方账户 |
| amount      | Number | 是   | 分账金额，单位为分，只能为整数，不能超过原订单支付金额 |
| description | String | 是   | 分账描述       |

{{profitSharing.receiverTypeAlipay()}}

**示例代码**


```js
var order = new BaaS.Order()
order.alipay.profitSharing({
  trade_no: '...',
  receivers: [{
    type: '...',
    account: '...',
    amount: 10,
    description: '...',
  }],
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

**返回示例**

成功时 res 对象结构如下

```json
{
  "data": {
    "return_code": "10000",
    "trade_no": "1iIUfhTxivu6RxvyQgkRRwp9VklswK46"
  },
  "status": 200
}
```

## 退款

`BaaS.refund(data)`

> **info**
> 使用了分账的订单，需要先调用分账回退接口将钱回退到订单商户号中，否则可能会退款失败

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
| status        | String | 订单支付状态（succeed：成功；failed：失败） |

**示例代码**

调用退款接口，需要先通过上文的 `Order#getOrderList` API，拿取返回数据中的 id 字段作为 order_id 的值，来进行退款操作
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
