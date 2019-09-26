{% macro receiverType() %}
ReceiverType 可选值说明:

| 值                    | 说明       |
| :-------------------- | :--------- |
| 'MERCHANT_ID'         | 商户 ID    |
| 'PERSONAL_WECHATID'   | 个人微信号 |
| 'PERSONAL_OPENID'     | 个人openid |
{% endmacro %}

{% macro warning() %}
> **danger**
> 如果在调用分账接口的过程中遇到错误码为 `SYSTEMERROR` 或 `FREQUENCY_LIMITED` 时，
> 请发工单联系客服，不要重复调用接口，否则可能造成资金损失。（详见[微信官方文档](https://pay.weixin.qq.com/wiki/doc/api/allocation.php?chapter=27_1&index=1) 中错误码列表）
{% endmacro %}
