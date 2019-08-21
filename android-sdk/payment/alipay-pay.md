<!-- ex_nonav -->

# 支付宝支付

`AlipayComponent.pay(AlipayOrder order, int requestCode, Activity activity)`

**AlipayOrder 参数说明**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| totalCost              | float   | Y   | 支付总额，单位：元 |
| merchandiseDescription | String  | Y   | 微信支付凭证-商品详情的内容 |
| merchandiseSchemaId    | String  | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| merchandiseRecordId    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaId`, 文章记录的 ID 作为你 `merchandiseRecordId` 传入到 `WechatComponent.pay(...)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaId`, `merchandiseRecordId` 来查询用户是否付费。

**支付返回参数说明**

| 参数                      | 类型   | 说明 |
| :-------------------------| :----- | :-- |
| exception | Exception   | 支付过程中发生异常（非用户主动取消） |
| orderInfo | AlipayOrderResp   | 后台成功创建的预付单 |
| result    | AlipaySdkResult | 如果支付宝返回了信息，则保存在这里 |

> **info**
> `AlipaySdkResult`是支付宝 app 返回的内容，里面包含了很多额外的信息


**示例代码**

```java
// 发起一次 398 元的支付请求
AlipayComponent.pay(new AlipayOrder(398f, "知晓云充值-支付宝支付"), SEND_ALIPAY_ORDER, this);

// 接收支付结果
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    switch (requestCode) {
        case SEND_ALIPAY_ORDER:
            AlipayOrderResult result = AlipayComponent.getOrderResultFromData(data);
            if (resultCode == RESULT_OK) {

                // 支付失败了，这里拿到异常，做日志，并提示用户
                if (result.getException() != null) {
                    result.getException();
                } else {

                    // 支付成功，这里可以拿到知晓云服务端返回的信息，以及支付宝 app 返回的原始信息以供查验
                    result.getOrderInfo();
                    result.getResult();
                }
            } else {

                // 用户取消支付
            }
            break;
    }
}
```

**支付返回示例（AlipayOrderResp）**

```json
{
      "payment_url": "...",
      "trade_no": "1i0HqKIsUf3tyRJJ6dFQchCyBifmx7S3",
      "transaction_no": "8HVJc3T5surufHE6e9v0Td0UNyEM4Tet"
    }
```


**接口说明**

![app 支付模式图-来自支付宝官方](http://img01.taobaocdn.com/top/i1/LB1uQPIPVXXXXbAXpXXXXXXXXXX)

`AlipayComponent.pay(...)` 实际上做了发起支付统一下单请求，及拉起支付页面等操作。开发者只需要调用 `AlipayComponent.pay(...)` , 传入必填参数即可发起支付宝支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面。

