# 企业付款

企业付款为企业提供付款至用户零钱的能力，支持通过API接口付款，具体的场景介绍参考[微信企业付款场景介绍](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1)

企业付款需要到微信支付商户平台中，产品大全 -> 企业付款到零钱 -> 产品设置，配置发起方式，勾选 “使用 API 接口发起付款”，并将以下 IP 加入到接口调用 IP。

```
52.80.43.200
52.80.37.170
52.80.57.80
```

> **info**
> 使用以下接口时必须根据上述步骤进行配置


`BaaS.wxPromotionTransfer({userID, amount, description, checkName, reUserName})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| userID | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |
| amount | Number | 付款金额 |
| description | String | 付款描述 |
| checkName | Boolean | 是否检测真实名字 |
| reUserName | String | 【可选】真实名字（checkName 为 false 时，可不填） |


### 示例代码
```javascript
BaaS.wxPromotionTransfer({
  userID: "xxxx",
  amount: 0.3,
  description: "test",
  checkName: true,
  reUserName: "xxxx",
}).then(res => {
  // success
}).catch(e => {
  // err
})
```

### 返回示例

调用结果会直接将微信的结果进行返回，开发者可根据返回的信息做处理。(请参考[微信企业付款文档](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2))

成功：HTTP:1.1 OK
```javascript
{
  "return_code": "SUCCESS",
  "partner_trale_no": "xxx",
  "payment_no": "xxx",
  "payment_time": "2018-01-01 00:00:00"
}
```

失败：HTTP:1.1 OK
```javascript
{
  "err_code": "xxx",
  "err_code_des": "xxxx"
}
```
