{% import "./macro/profit-sharing.md" as profitSharing %}

{% macro receiverOperationParams() %}
**参数说明**

options 是 Object 类型，它包括以下几个属性

| 参数            | 类型            | 必填 | 说明                                               |
| :-------------- | :-------------- | :--- | :------------------------------------------------- |
| request_no      | String          |  是  | 分账接收关系集修改请求号，用户自己生成自己维护。2个字符以内，可包含字母、数字、下划线。需保证在商户端不重复。|
| receivers       | Receiver[] |  是  | 待添加的分账接收方列表     |

Receiver 类型包括以下几个属性：

| 参数            | 类型   | 必填 | 说明                                               |
| :-------------- | :----- | :--- | :------------------------------------------------- |
| type            | ReceiverType |  是  | 分账接收方类型                               |
| account         | String |  是  | 分账接收方账户 id                                  |
| name            | String |  是  | 分账接收方全称                                     |

{{profitSharing.receiverTypeAlipay()}}
{% endmacro %}

# 支付宝商家分账

对某一订单进行分账，请查看[订单操作文档](/cloud-function/node-sdk/order.html#支付宝商家分账)

## 添加分账接收方

`BaaS.alipay.profitSharing.addReceiver(options)`

{{receiverOperationParams()}}

**示例代码**

```js
BaaS.alipay.profitSharing.addReceiver({
  receivers: [{
    type: '...',
    account: '...',
    name: '...',
  }],
  request_no: '...',
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
    "result_code": "SUCCESS",
    "return_code": "10000"
  },
  "status": 200
}
```

## 删除分账接收方

`BaaS.alipay.profitSharing.removeReceiver(options)`

{{receiverOperationParams()}}

**示例代码**

```js
BaaS.alipay.profitSharing.removeReceiver({
  receivers: [{
    type: '...',
    account: '...',
    name: '...',
  }],
  request_no: '...',
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
    "result_code": "SUCCESS",
    "return_code": "10000"
  },
  "status": 200
}
```

## 查询分账接收关系集

`BaaS.alipay.profitSharing.receiverQuery(options)`

**参数说明**

options 是 Object 类型，它包括以下几个属性:

| 参数          | 类型            | 必填 | 说明 |
| :------------ | :-------------- | :--- | :--- |
| request_no    | String          | 是   | 分账接收关系集查询请求号，用户自己生成自己维护。2个字符以内，可包含字母、数字、下划线。需保证在商户端不重复。 |
| page_num      | Number          | 否   | 第几页，从1开始。不填默认为1   |
| page_size     | Number          | 否   | 页面大小。每页记录数，取值范围是(0,100]。不填默认为20   |

**示例代码**

```js
BaaS.alipay.profitSharing.receiverQuery({
  request_no: '...',
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
    "current_page_num": 1,
    "current_page_size": 20,
    "receiver_list": [
      {
        "account": "...",
        "type": "userId"
      },
      {
        "account": "...",
        "type": "userId"
      }
    ],
    "result_code": "SUCCESS",
    "return_code": "10000",
    "total_page_num": 1,
    "total_record_num": 2
  },
  "status": 200
}
```

## 分账订单操作

### 分账单查询

`BaaS.alipay.profitSharing.Order#getOrderList()`

支持分页操作 `offset`、`limit`

params 是 Object 类型，为订单过滤条件，你可以参考后面的返回参数说明，进行筛选。

**参数说明**

| 参数            | 类型   | 说明     |
| :-------------- | :----- | :------- |
| params.trade_no | String | 分账单号 |
| params.status   | Status | 分账单状态 |

Status 可选值说明:

| 值           | 说明       |
| :----------- | :--------- |
| 'accepted'   | 受理成功   |
| 'processing' | 处理中     |
| 'finished'     | 处理完成   |
| 'closed'     | 处理失败，已关单 |

**示例代码**

```js
var order = new BaaS.alipay.profitSharing.Order()
order.offset(20).limit(20).getOrderList({trade_no: '...'}).then(res => {
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
    "meta": {
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 1
    },
    "objects": [
      {
        "created_by_name": "...",
        "order_type": "profit_sharing",
        "payment_order_id": 1058,
        "receiver": [
          {
            "account": "...",
            "amount": 1,
            "description": "分账1分钱",
            "type": "userId"
          }
        ],
        "status": "finished",
        "trade_no": "1iITyzXl8q9HYJIp0NaiHPxOB4x9zjto"
      }
    ]
  },
  "status": 200
}
```
