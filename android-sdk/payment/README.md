<!-- ex_nonav -->

# 支付

知晓云提供了快速接入微信支付与支付宝支付的功能。
你可以在知晓云控制台支付面板，填写你的商户号等信息，方便快捷地完成微信支付绑定（支付宝支付无需配置，SDK 接入成功并且在支付宝小程序后台完成了小程序支付签约即可使用），
同时可通过支付记录面板，查看和查询支付记录。
同时你可以借助 SDK 实现支付功能，下面以微信支付为例：

```java
// 发起一次 398 元的支付请求
WechatComponent.pay(new WechatOrder(398f, "知晓云充值-微信支付"), SEND_WX_ORDER, this);

// 此 api 会打开对应的透明页面，并在此透明页面里与服务端通讯和拉起支付页面
// 在 onActivityResult 里接收支付结果
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    switch (requestCode) {
        case SEND_WX_ORDER:
            if (resultCode == RESULT_OK) {
                WechatOrderResult result = WechatComponent.getOrderResultFromData(data);

                // 支付失败了，这里拿到异常，做日志，并提示用户
                if (result.getException() != null) {
                    result.getException();
                } else {

                    // 支付成功，这里可以拿到知晓云服务端返回的信息，以及微信 app 返回的原始信息以供查验
                    result.getOrderInfo();
                    result.getPayResp();
                }
            } else {

                // 用户取消了支付
            }
            break;
    }
}
```

同时，SDK 也支持通过 transaction_no 获取订单信息，同样以微信为例：

```java
WechatComponent.getOrderInfo("iMiTAsOrgjDKItmKifWzzayHAwneYwYo", new BaseCallback<OrderResp>() {
    @Override
    public void onSuccess(OrderResp orderResp) {
        // ...
    }
    @Override
    public void onFailure(Throwable e) {
        // ...
    }
});
```

阅读以下章节，了解更多支付相关的操作接口：

* [支付功能接入指南及 demo 使用指南](./demo.md)
* [微信支付](./wechat-pay.md)
* [支付宝支付](./alipay-pay.md)
* [订单查询](./order.md)
