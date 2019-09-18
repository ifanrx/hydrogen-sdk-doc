{% macro receiverType() %}
ReceiverType 可选值说明:

| 值                    | 说明                                   |
| :-------------------- | :------------------------------------- |
| 'MERCHANT_ID'         | 商户 ID                                |
| 'PERSONAL_WECHATID'   | 个人微信号                             |
| 'PERSONAL_OPENID'     | 个人openid（由父商户APPID转换得到）    |
{% endmacro %}
