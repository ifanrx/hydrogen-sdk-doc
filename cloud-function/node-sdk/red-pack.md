{% import "./macro/weixin-tenpay.md" as WeixinTenpay %}

# 公众号发送红包


## 准备工作

1. 阅读[微信文档](https://pay.weixin.qq.com/wiki/doc/api/tools/cash_coupon.php?chapter=13_1)，了解发送红包发放前的准备事项
2. 若开发者尚未在知晓云配置支付证书，请前往[知晓云-支付证书页面](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]payment/config/) 配置支付证书
3. 确保你账户里的资金充足

> **info**
> 小程序和公众号需要绑定在同一个微信商户号下


## 发送红包

`redPack.sendRedPack(params)`

**参数说明**
 
| 参数名                      | 类型   | 说明     |
|----------------------------|--------|----------|
| params.type                | string | 红包类型，普通红包：normal，裂变红包：fission；必填 |
| params.re_openid           | string | 红包接受人（裂变红包时是种子用户）在公众号下的 openid；必填 |
| params.send_name           | string | 商户名称，红包发送者名称；必填 |
| params.official_account_id | string | 公众号 appid；必填 |
| params.total_amount        | number | 付款金额，单位元，浮点；必填 |
| params.total_num           | integer | 红包发放总人数，整数；必填 |
| params.act_name            | string | 活动名称；必填 |
| params.remark              | string | 备注；必填 |
| params.wishing             | string | 红包祝福语；必填 |
| params.scene_id            | string | 场景 id， 可选 |
| params.risk_info           | string | 活动信息， 可选 |
| params.gateway_type        | GatewayType | 微信支付商户类型，可选，默认为微信小程序 |

{{WeixinTenpay.getGatewayType()}}

**示例代码**
```javascript
const redPack = new BaaS.RedPack()

// 发送红包
redPack.sendRedPack({
  "type": "normal",
  "official_account_id": "wxcbda96de0b165486",
  "send_name": "send_name",
  "re_openid": "onqOjjmM1tad-3ROpncN-yUfa6uI",
  "total_amount": 200,
  "total_num": 1,
  "wishing": "恭喜发财",
  "act_name": "新年红包",
  "remark": "新年红包",
  "scene_id": "PRODUCT_2",
  "risk_info": "posttime%3d123123412%26clientversion%3d234134%26mobile%3d122344545%26deviceid%3dIOS",
  "gateway_type": "weixin_tenpay_wap",
}).then(res => {
  console.log(res.data.return_code === 'SUCCESS')
}).catch(err=>{
  // 见下方常见错误说明
})
```

**返回示例**

知晓云验证请求参数与证书成功，且微信服务器返回成功，res 结构如下：
```json
 {
   "status": 200,
   "data":{
     "return_code": "SUCCESS",
     "mch_billno": "0010010404201411170000046545",
     "send_listid": ""
   }
 }
```

知晓云验证请求参数与证书成功，但微信服务器返回错误，res 结构如下：
```json
 {
   "status": 200,
   "data":  {
    "err_code": 1,
    "err_code_des": "系统繁忙,请稍后再试."
    }
 }
```

**其他常见错误**

| 状态码                      | 说明     |
|----------------------------|----------|
|  400 | 缺少必要的参数、参数值错误、未配置支付证书|
|  415 | 不允许在非云函数环境下调用|


## 查询发送记录

`redPack.getSentRedPackList(params)`


**参数说明**

| 参数名               | 类型   | 说明     |
|---------------------|--------|----------|
| params.limit        | integer   |  限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| params.offset       | integer   |  设置返回资源的起始偏移值，默认为 0 |

**示例代码**

```javascript
const redPack = new BaaS.RedPack()

redPack.getSentRedPackList({offset: 0, limit: 20}).then(res => {
  console.log(res.data.objects)
})
```

**返回示例**

```json
 {
   "status": 200,
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
         "act_name": "7af1dHyHQ7fyYG7m0ucFOehVxDyxhXSO",
         "amt_type": null,
         "created_at": 1548176856,
         "id": "5c474dd8e2aa136e58867af3",
         "mch_billno": "1glzWSaTi1865qJSVRey97kbRPxj",
         "miniapp_id": "1",
         "official_account_id": "4pEqBtacy4J2w3fCqfc2cdRdxYblgRRd",
         "pk": "5c474dd8e2aa136e58867af3",
         "raw_result": "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[发放成功.]]></return_msg>\n         <result_code><![C",
         "re_openid": "PSSmXsnrTaurKspMjbHe1PepRecxTnl9",
         "remark": "1Tj58luM9A",
         "result": {
           "mch_billno": "0010010404201411170000046545", 
           "send_listid": "100000000020150520314766074200", 
           "return_code": "SUCCESS"
         },
         "risk_info": null,
         "scene_id": null,
         "send_name": "6FqAgayy90lcrJ6xXVwXyjoViyXRTqWi",
         "status": null,
         "total_amount": 1.1,
         "total_num": 1,
         "type": "fission",
         "updated_at": 1548176856,
         "wishing": "jHrmfUDqJc"
       }
     ]
   }
 }
```

## 获取单个发送记录详情

`redPack.getSentRedPack(id)`

**参数说明**


| 参数名               | 类型   | 说明     |
|---------------------|--------|----------|
| id                  | string   | 红包记录 ID |

**示例代码**

```javascript
const redPack = new BaaS.RedPack()

redPack.getSentRedPack('i5c46d771b1b9de0ab5e3c4eed').then(() => {
  console.log(res.data)
})
```

**返回示例**

```json
 {
   "status": 200,
   "data": {
     "act_name": "7af1dHyHQ7fyYG7m0ucFOehVxDyxhXSO",
     "amt_type": null,
     "created_at": 1548176856,
     "id": "5c474dd8e2aa136e58867af3",
     "mch_billno": "1glzWSaTi1865qJSVRey97kbRPxj",
     "miniapp_id": "1",
     "official_account_id": "4pEqBtacy4J2w3fCqfc2cdRdxYblgRRd",
     "raw_result": "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[发放成功.]]></return_msg>\n         <result_code><![CDATA[SUCCESS]]></result_code>\n         <err_code><![CDATA[0]]></err_code>\n         <err_code_des><![CDATA[发放成功.]]></err_code_des>\n         <mch_billno><![CDATA[0010010404201411170000046545]]></mch_billno>\n         <mch_id>10010404</mch_id>\n         <wxappid><![CDATA[wx6fa7e3bab7e15415]]></wxappid>\n         <re_openid><![CDATA[onqOjjmM1tad-3ROpncN-yUfa6uI]]></re_openid>\n         <total_amount>1.1</total_amount>\n         <send_listid><![CDATA[100000000020150520314766074200]]></send_listid>\n      </xml>",
     "re_openid": "PSSmXsnrTaurKspMjbHe1PepRecxTnl9",
     "remark": "1Tj58luM9A",
     "result": {
       "mch_billno": "0010010404201411170000046545",
       "send_listid": "100000000020150520314766074200",
       "return_code": "SUCCESS"
     },
     "risk_info": null,
     "scene_id": null,
     "send_name": "6FqAgayy90lcrJ6xXVwXyjoViyXRTqWi",
     "status": null,
     "total_amount": 1.1,
     "total_num": 1,
     "type": "fission",
     "updated_at": 1548176856,
     "wishing": "jHrmfUDqJc"
   }
 }
```

## 查询发送状态

`redPack.getRedPackStatus(params)`

通过 `订单 ID` 或 `红包记录 ID` 查询发送状态

**参数说明**

| 参数名               | 类型   | 说明     |
|---------------------|--------|----------|
| params.mch_billno          | string   | 订单 ID， mch_billno 和 id 二选一    |
| params.id                  | string   | 红包记录 ID，mch_billno 和 id 二选一 |


**示例代码**

```javascript
redPack.getRedPackStatus({
  id: "i5c46d771b1b9de0ab5e3c4eed"
})
```

**返回示例**

```json
 {
   "status": 200,
   "data": {
     "err_code": "SUCCESS",
     "total_num": "1",
     "total_amount": "100",
     "mch_billno": "9010080799701411170000046603",
     "err_code_des": "OK",
     "mch_id": "11475856",
     "result_code": "SUCCESS",
     "send_type": "ACTIVITY",
     "return_msg": "OK",
     "detail_id": "10000417012016080830956240040",
     "return_code": "SUCCESS",
     "hb_type": "NORMAL",
     "send_time": "2016-08-08 21:49:22",
     "status": "RECEIVED"
   }
 }
```
