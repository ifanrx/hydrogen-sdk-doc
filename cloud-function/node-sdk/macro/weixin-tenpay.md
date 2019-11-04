{% macro getGatewayType() %}
GatewayType:

| 值                         | 说明       |
|----------------------------|------------|
| `'weixin_tenpay'`          | 微信小程序 |
| `'weixin_tenpay_js'`       | JSAPI      |
| `'weixin_tenpay_native'`   | Native Pay |
| `'weixin_tenpay_app'`      | App        |
| `'weixin_tenpay_wap'`      | H5         |
{% endmacro %}
