# 获取用户的支付记录

**接口**

`GET /hserve/v2.2/idp/pay/order/`

**请求参数**

| 参数                           | 类型    | 说明 |
| :------------------------------| :----- | :-- |
| merchandise_record_id   | string | 商品记录 ID，可用于定位用户购买的物品 |
| merchandise_schema_id   | integer | 商品表 ID，可用于定位用户购买的物品 |
| status                  | string | 订单支付状态,可选值有：pending（待支付）、success（支付成功） |
| refund_status                  | string | 订单退款状态,可选值有：complete（退款成功）、partial（部分退款）、failed（退款失败）、' '(空字符串，订单没有发生退款操作时的默认状态) |
| trade_no                | string | 真正的交易 ID, 业务方在微信后台对账时可看到此字段 |
| transaction_no          | string | 知晓云平台所记录的流水号 |
| gateway_type          | string | 支付方法，可选值有：weixin_tenpay（微信支付）、alipay（支付宝支付） |

**请求示例**
```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'status=success' \
  https://{{服务器域名}}/hserve/v2.2/idp/pay/order/
```
**返回参数说明**

部分关键字段：

| 参数                    | 类型    | 说明 |
| :---------------------- | :----- | :-- |
| created_at              | integer | 订单创建时间 |
| merchandise_description | string | 微信支付-微信支付凭证-商品详情上的文字描述 |
| paid_at                 | integer | 付款时间, 未支付的话为 null |
| status                  | string | 订单支付状态 |
|  refund_status          | string | 退款状态 |
| total_cost              | integer | 发起交易请求时的支付金额 |
| trade_no                | string | 真正的交易 ID, 业务方在微信后台对账时可看到此字段 |
| transaction_no          | string | 知晓云平台所记录的流水号 |
| gateway_extra_info      | String | 支付结果返回信息 |

**返回实例**
```json
{
    "meta": {
        "limit": 20,
        "next": "/hserve/v2.2/idp/pay/order/?limit=20&offset=20",
        "offset": 0,
        "previous": null,
        "total_count": 2
    },
    "objects": [
        {
            "created_at": 1497524129,
            "gateway_extra_info": {},
            "id": 5,
            "ip_address": "127.0.0.1",
            "merchandise_description": "",
            "merchandise_record_id": null,
            "merchandise_schema_id": null,
            "merchandise_snapshot": {},
            "paid_at": null,
            "status": "success",
            "refund_status": null,
            "total_cost": 100.00,
            "trade_no": "1dLSQzzjRcJshqosJCeNruA******",
            "transaction_no": "DEqbLRjWWtCqjxOUapRxaLb******",
            "updated_at": 1497524129,
            "created_by_id": 1091431,
        },
        {
            "created_at": 1497524130,
            "gateway_extra_info": {},
            "id": 6,
            "ip_address": "127.0.0.1",
            "merchandise_description": "",
            "merchandise_record_id": null,
            "merchandise_schema_id": null,
            "merchandise_snapshot": {},
            "paid_at": null,
            "status": "success",
            "refund_status": null,
            "total_cost": 100.00,
            "trade_no": "1dLSR0EopQfRVkbLFrRNFKT*********",
            "transaction_no": "znVAJaEKrwriaTlwjDlVdLZ*********",
            "updated_at": 1497524130,
            "created_by_id": 1091431,
        }
    ]
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



**状态码说明**

`200`: 查询成功

`400`: 参数错误
