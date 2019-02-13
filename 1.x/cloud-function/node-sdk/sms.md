# 短信验证码

该接口支持向特定手机号码发送验证码，并校验验证码是否正确的功能，以此来完成一些需要确认用户身份的操作，比如：

* 使用手机号码和验证码进行登录
* 通过手机号码和验证码的方式重置密码
* 进行重要操作的验证确认等

> **info**
> SDK 发送短信需要在知晓云控制台开通并开启发送短信权限，操作步骤请参考本页面末尾

## 发送短信验证码
`BaaS.sendSmsCode({phone, userID})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| phone | String | 手机号码 |
| userID | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |


### 示例代码
```javascript
BaaS.sendSmsCode({
  phone: '15000000000',
  userID: 66879698,
}).then(res => {
  // success
}).catch(e => {
  // err
})
```

### 返回示例

成功：HTTP:1.1 Created
```javascript
{ "status": "ok" }
```


## 验证短信验证码
`BaaS.verifySmsCode({phone, code, userID})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| phone | String | 手机号码 |
| code | Number | 验证码 |
| userID | Number | 用户 ID (对应 _userprofile 表中的 id 字段) |


### 示例代码
```javascript
BaaS.verifySmsCode({
  phone: '15000000000',
  code: 123456,
  userID: 66879698,
}).then(res => {
  // success
}).catch(e => {
  // err
})
```

### 返回示例

成功：HTTP:1.1 Created
```javascript
{ "status": "ok" }
```

## 验证码发送频次

> **info**
>同一企业在 1 分钟内只能发送 30 条短信，如有更高频次需求，请联系客服上调

>对同一手机号码在 1 分钟内只能发送 1 条短信

>对同一手机号码在 1 天内不能发送超过 10 条短信

{% include "/1.x/js-sdk/frag/_enable_sms.md" %}