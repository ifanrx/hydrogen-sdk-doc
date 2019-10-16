# 订单查询

订单查询包括查询订单详情和获取订单列表。

## 查询订单详情

通过订单的流水号(`transactionNo`)，来查询该订单的详细信息。通常用于：
1. 查询订单列表中某个订单的详细信息；
2. 用户发起支付，并在微信或支付宝完成支付后，调用该接口获取订单的详细信息。开发者可以根据该订单的状态进行后续操作，比如订单状态(status)为 success 时，给用户发送商品。

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let transactionNo = "xxxxxxxxxx"
Pay.shared.order(transactionNo) { (order, error) in

}
```
{% content "oc1" %}
```
NSString *transactionNo = @"xxxxxxxxxx";
[BaaSPay.shared order:transactionNo completion:^(BaaSOrder * _Nullable order, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| transactionNo | String |  Y  | 知晓云平台所记录的流水号 |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| order  |   Order           | 订单信息，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

## 订单查询

`OrderQuery` 继承 `Query`， 并定义了订单状态、退款状态、支付方式、`trade_no`、`transaction_no`、`merchandise_record_id`、`merchandise_schema_id` 等 7 种查询条件。

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```

// 1. 创建查询条件
let query = OrderQuery()

// 2. 设置查询条件

// 通过订单状态查询：订单状态为 success
query.status(.success)

// 通过订单状态查询：订单状态为 pending
query.status(.pending)

// 通过退款状态查询：退款状态为 complete
query.refundStatus(.complete)

// 通过退款状态查询：订单状态为 partial
query.refundStatus(.partial)

// 通过支付方式查询：支付方式为 weixin
query.gateWayType(.weixin)

// 通过支付方式查询：订单状态为 alipay
query.gateWayType(.alipay)

// 通过 trade_no 查询
query.tradeNo("xxxxxxxxxxxxxx")

// 通过 transaction_no 查询
query.transactionNo("xxxxxxxxxxxxxx")

// 通过 merchandise_record_id 查询
query.merchandiseRecordId("xxxxxxxxxxxxxx")

// 通过 merchandise_schema_id 查询
query.merchandiseSchemaId("xxxxxxxxxxxxxx")

// 设置分页
query.limit(10)
query.offset(0)

// 3. 开始查询
Pay.shared.orderList(query: query) { (result, error) in

}
```
{% content "oc2" %}
```
// 1. 创建查询条件
BaaSOrderQuery *query = [[BaaSOrderQuery alloc] init];

// 2. 设置查询条件

// 通过订单状态查询：订单状态为 success
[query status:BaaSOrderStatusSuccess];

// 通过订单状态查询：订单状态为 pending
[query status:BaaSOrderStatusPending];

// 通过退款状态查询：退款状态为 complete
[query status:BaaSRefundStatusComplete];

// 通过订单状态查询：退款状态为 partial
[query status:BaaSRefundStatusPartial];

// 通过支付方式查询：支付方式为  weixin
[query status:BaaSGateWayTypeWeixin];

// 通过支付方式查询：支付方式为 alipay
[query status:BaaSGateWayTypeAlipay];

// 通过 trade_no 查询
[query tradeNo:@"xxxxxxxxxxxxxx"];

// 通过 transaction_no 查询
[query transactionNo:@"xxxxxxxxxxxxxx"];

// 通过 merchandise_record_id 查询
[query merchandiseRecordId:@"xxxxxxxxxxxxxx"];

// 通过 merchandise_schema_id 查询
[query merchandiseSchemaId:@"xxxxxxxxxxxxxx"];

// 设置分页
[query limit:10];
[query offset:0];

// 3. 开始查询
[BaaSPay.shared orderListWithQuery:query completion:^(BaaSOrderList * _Nullable orders, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | OrderQuery |  N  | 查询条件 |

可以设置的查询条件，有订单状态： `OrderStatus`、退款状态 `RefundStatus`、支付类型 `GateWayType`，详见 **数据类型** 小节

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | OrderList | 文件分类列表结果，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

<!-- # 重新支付

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
Pay.shared.repay(self.order) { (result, error) in

}
```
{% content "oc3" %}
```
[BaaSPay.shared repay:self.order completion:^(BaaSOrder * _Nullable order, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| order | Order |  Y  | 待支付订单, 详见 **数据类型** 小节 |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| order  |   Order           | 订单信息，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md) -->

## 数据类型
### Order

订单信息

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| Id         |   String  | 订单 ID |
| tradeNo |  String    | 真正的交易 ID, 业务方在微信后台对账时可看到此字段 |
| transactionNo  |  String  | 知晓云平台所记录的流水号 |
| currencyType  |  String | 货币类型 |
| totalCost  |  CGFloat | 金额 |
| status |  String  | 订单支付状态 |
| createdBy |  String   |   创建订单的用户 ID |
| createdAt | TimeInterval  |  订单创建时间 | 
| updatedAt | TimeInterval  |  订单更新时间 | 
| payAt  |  TimeInterval | 支付时间 |
| refundStatus | String  |   退款状态 | 
| gateWayType|   String    | 支付类型：可选值有：weixin_tenpay（微信支付）、alipay（支付宝支付） |
| merchandiseRecordId  |  String | 商品记录 ID |
| merchandiseSchemaId | String  |   商品表 ID | 
| merchandiseDescription|   String    | 商品详情描述 |
| gatewayExtraInfo  |  Dictionary  | 自定义信息 |

### OrderList

`OrderList` 表示一次查询数据库所返回的订单列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回内容的最大个数   |
| offset    | Int  |    返回内容的起始偏移值 |
| totalCount   | Int   |   实际返回的内容总数 |
| next      |  String   |   下一页地址  |
| previous  |  String    |   上一页地址  |
| orders  |   Array<Order> | 内容列表，每个元素为 Order 类型   |

### 订单状态

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}

 `OrderStatus`

| 类型            | 说明      |
| :--------------| :-----------------|
| success         | 支付成功      |
| pending         |    待支付   |

{% content "oc4" %}

`BaaSOrderStatus`

| 类型            | 说明      |
| :--------------| :-----------------|
| BaaSOrderStatusSuccess         | 支付成功      |
| BaaSOrderStatusPending         |    待支付   |

{% endtabs %}

### 退款状态

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}

 `RefundStatus`

| 类型            | 说明      |
| :--------------| :-----------------|
| complete         | 退款成功      |
| partial         |  部分退款     |

{% content "oc5" %}

`BaaSRefundStatus`

| 类型            | 说明      |
| :--------------| :-----------------|
| BaaSRefundStatusComplete         | 退款成功      |
| BaaSRefundStatusPartial        |    部分退款   |

{% endtabs %}

### 支付方式

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}

 `GateWayType`

| 类型            | 说明      |
| :--------------| :-----------------|
| weixin         | 微信支付      |
| alipay         |  支付宝     |

{% content "oc6" %}

`BaaSGateWayType`

| 类型            | 说明      |
| :--------------| :-----------------|
| BaaSGateWayTypeWeixin         | 微信支付      |
| BaaSGateWayTypeAlipay        |    支付宝   |

{% endtabs %}