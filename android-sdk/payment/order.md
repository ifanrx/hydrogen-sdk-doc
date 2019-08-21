<!-- ex_nonav -->

# 订单查询

通过 BaaS Android SDK 提供的 `AlipayComponent.getOrderInfo` or `WechatComponent.getOrderInfo` 方法, 可查询到交易的详细信息。典型的使用场景为: 调用 `WechatComponent.pay()` or `AlipayComponent.pay()` 发起支付, 在成功回调中获取到 transactionNo 或 tradeNo, 从而使用此 ID 获取交易的详细信息。

**函数签名**

`AlipayComponent.getOrderInfo(String transactionNo, BaseCallback<OrderResp> cb)`
`WechatComponent.getOrderInfo(String transactionNo, BaseCallback<OrderResp> cb)`

**参数说明**

| 参数                           | 类型    | 说明 |
| :------------------------------| :----- | :-- |
| transactionNo          | String | 知晓云平台所记录的流水号 |

**示例代码**
```java
// 通过 transaction_no 查询订单
AlipayComponent.getOrderInfo("v4WoZ7aNyZPaZbNlFffOZLvagUKqDcOw", new BaseCallback<OrderResp>() {
    @Override
    public void onSuccess(OrderResp orderResp) {
        //...
    }`
    @Override
    public void onFailure(Throwable e) {
        //...
    }
});
```

**返回示例**

成功时服务端返回的数据如下：

```json
{
    "created_at": "2019-08-21T15:29:58.352871",
    "created_by": "81500648837475",
    "currency_type": "CNY",
    "gateway_type": "weixin_tenpay_app",
    "id": 189586,
    "ip_address": "189.173.186.113",
    "merchandise_description": "知晓云充值-微信支付",
    "merchandise_snapshot": "{}",
    "paid_at": "2019-08-21T15:30:08.722298",
    "status": "success",
    "total_cost": "0.01",
    "trade_no": "1i0L4AJieK3V4YPIbCgbOiABwSLjQGj3",
    "transaction_no": "Y9i6NopUSdFhFxZG8qQHHr1dEtZHat35",
    "updated_at": "2019-08-21T15:30:08.719994"
}
```


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
