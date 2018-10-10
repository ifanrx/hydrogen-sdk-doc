# 企业付款

企业付款为企业提供付款至用户零钱的能力，支持通过API接口付款，具体的场景介绍参考[微信企业付款场景介绍](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1)

`BaaS.wxPromotionTransfer({userID, amount, description, checkName, reUserName})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| userID | Number | 用户 ID |
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
