{% import "./macro/profit-sharing-receiver.md" as receiver %}

# 微信服务商分账

对某一订单进行分账，请查看[订单操作文档](/cloud-function/node-sdk/order.html#微信服务商分账)

## 添加分账接收方

`BaaS.wechat.profitSharing.addReceiver(addReceiverOptions)`

**参数说明**

options 是 Object 类型，它包括以下几个属性

| 参数            | 类型   | 必填 | 说明                                             |
| :-------------- | :----- | :--- | :----------------------------------------------- |
| mch_id          | String |  是  | 商户号                                           |
| appid           | String |  是  | 微信分配的公众账号 ID                            |
| type            | ReceiverType |  是  | 分账接收方类型                             |
| account         | String |  是  | 分账接收方账户 id                                |
| relation_type   | ReceiverRelationType |  是  | 与分账商户的关系类型               |
| name            | String |  否  | 分账接收方全称，type 为 `MERCHANT_ID` 或 `PERSONAL_WECHATID` 时必填 |
| custom_relation | String |  否  | relation_type 为 CUSTOM 时必填                   |

{{receiver.receiverType()}}

ReceiverRelationType 可选值说明:

| 值                 | 说明     |
| :----------------- | :------- |
| 'SERVICE_PROVIDER' | 服务商   |
| 'STORE'            | 商户 ID  |
| 'STAFF'            | 员工     |
| 'STORE_OWNER'      | 店主     |
| 'PARTNER'          | 合作伙伴 |
| 'HEADQUARTER'      | 总部     |
| 'BRAND'            | 品牌方   |
| 'DISTRIBUTOR'      | 分销商   |
| 'USER'             | 用户     |
| 'SUPPLIER'         | 供应商   |
| 'CUSTOM'           | 自定义   |

**示例代码**

```js
BaaS.wechat.profitSharing.addReceiver({
  mch_id: '...',
  type: '...',
  account: '...',
  relation_type: '...',
  name: '...',
  custom_relation: '...',
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

## 删除分账接收方

`BaaS.wechat.profitSharing.removeReceiver(options)`

**参数说明**

options 是 Object 类型，它包括以下几个属性

| 参数            | 类型   | 必填 | 说明              |
| :-------------- | :----- | :--- | :---------------- |
| mch_id          | String |  是  | 商户号            |
| appid           | String |  是  | 微信分配的公众账号 ID |
| type            | ReceiverType |  是  | 分账接收方类型  |
| account         | String |  是  | 分账接收方账户 id |

{{receiver.receiverType()}}

**示例代码**

```js
BaaS.wechat.profitSharing.removeReceiver({
  mch_id: '...',
  type: '...',
  account: '...',
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

## 分账订单操作

### 分账单查询

`BaaS.wechat.profitSharing.Order#getOrderList()`

支持分页操作 `offset`、`limit`

**示例代码**

```js
var order = new BaaS.wechat.profitSharing.Order()
order.offset(20).limit(20).getOrderList().then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

### 完结分账

`BaaS.wechat.profitSharing.Order#finish(options)`

**参数说明**

options 是 Object 类型，它包括以下几个属性

| 参数            | 类型   | 必填 | 说明              |
| :-------------- | :----- | :--- | :---------------- |
| trade_no        | String |  是  | 支付订单订单号(必须为微信支付订单) |
| appid           | String |  是  | 微信分配的公众账号 ID |
| description     | String |  是  | 分账完结描述    |

**示例代码**

```js
var order = new BaaS.wechat.profitSharing.Order()
order.finish({
  trade_no: '...',
  description: '...',
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

### 分账回退

`BaaS.wechat.profitSharing.Order#refund(options)`

**参数说明**

options 是 Object 类型，它包括以下几个属性

| 参数            | 类型   | 必填 | 说明                               |
| :-------------- | :----- | :--- | :--------------------------------- |
| trade_no        | String |  是  | 分账单单号(**非支付订单单号**)         |
| appid           | String |  是  | 微信分配的公众账号 ID              |
| refund_no       | String |  是  | 分账回退单号，用户自己生成自己维护，商户系统内部唯一，同一回退单号多次请求等同一次，只能是数字、大小写字母_-|*@  |
| type            | ReceiverType |  是  | 分账回退方类型               |
| account         | String |  是  | 分账回退方账户 id                  |
| amount          | Number |  是  | 分账金额，单位为分，只能为整数，不能超过原订单支付金额及最大分账比例金额 |
| description     | String |  是  | 分账回退描述                       |

{{receiver.receiverType()}}

**示例代码**

```js
var order = new BaaS.wechat.profitSharing.Order()
order.refund({
  trade_no: '...',
  refund_no: '...',
  type: '...',
  account: '...',
  amount: 100,
  description: '...',
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```

### 分账回退结果查询

`BaaS.wechat.profitSharing.Order#getRefundmentOrder(options)`

**参数说明**

options 是 Object 类型，它包括以下几个属性

| 参数            | 类型   | 必填 | 说明                               |
| :-------------- | :----- | :--- | :--------------------------------- |
| trade_no        | String |  是  | 分账单单号(**非支付订单单号**)         |
| appid           | String |  是  | 微信分配的公众账号 ID              |
| refund_no       | String |  是  | 分账回退单号，用户自己生成自己维护，商户系统内部唯一，同一回退单号多次请求等同一次，只能是数字、大小写字母_-|*@  |

**示例代码**

```js
var order = new BaaS.wechat.profitSharing.Order()
order.getRefundmentOrder({
  trade_no: '...',
  refund_no: '...',
}).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```
