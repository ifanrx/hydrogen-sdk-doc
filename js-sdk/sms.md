# 短信验证码

该接口支持向特定手机号码发送验证码，并校验验证码是否正确的功能，以此来完成一些需要确认用户身份的操作，比如：

* 使用手机号码和验证码进行登录
* 通过手机号码和验证码的方式重置密码
* 进行重要操作的验证确认等

> **info**
> SDK 发送短信需要在[知晓云控制台](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]sms/setting)开通并开启发送短信权限，操作步骤请参考本页面末尾

## 发送短信验证码
`BaaS.sendSmsCode({phone, signatureID})`

### 参数说明

| 参数名      | 类型   | 说明          |
|-------------|--------|---------------|
| phone       | string | 手机号        |
| signatureID (v2.6.0) | Integer | 短信签名 ID   |

> **info**
> 如果短信签名 ID (signatureID) 未指定，后端默认会选用**最新审核通过**的签名发送短信。

### 示例代码

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.sendSmsCode({phone: '1328888888', signatureID: 1}).then(res => {
  // success
  console.log(res.data) // { "status": "ok" }
}).catch(e => {
  // err
  console.log(e.code) // 错误状态码
})
```
{% endifanrxCodeTabs %}

**错误状态码**

| 状态码   | 说明     |
|----------|----------|
| 400     | 失败（rate limit 或参数错误） |
| 402     | 当前应用已欠费 |
| 500     | 服务错误 |


## 校验短信验证码
`BaaS.verifySmsCode({phone, code})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| phone   | string   | 手机号 |
| code    | number   | 验证码 |

### 示例代码
{% ifanrxCodeTabs %}
```js
wx.BaaS.verifySmsCode({phone: '132888888', code: 123456}).then(res => {
    // success
    console.log(res.data) // { "status": "ok" }
}).catch(e => {
    // err
    console.log(e.code) // 错误状态码
})
```
{% endifanrxCodeTabs %}

**错误状态码**

| 状态码   | 说明     |
|----------|----------|
| 400     | 验证码错误 / 参数错误 |

## 短信发送频次

{% block tips1 %}

> **info**
>对同一手机号码在 1 分钟内只能发送 1 条短信

>对同一手机号码在 1 天内不能发送超过 10 条短信

{% endblock tips1 %}

## 开通短信验证码功能

{% include "/js-sdk/frag/_enable_sms.md" %}
