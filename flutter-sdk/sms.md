# 短信验证码 

该接口支持向特定手机号码发送验证码，并校验验证码是否正确的功能，以此来完成一些需要确认用户身份的操作，比如：

* 使用手机号码和验证码进行登录
* 通过手机号码和验证码的方式重置密码
* 进行重要操作的验证确认等

> **info**
> SDK 发送短信需要在知晓云控制台开通并开启发送短信权限，操作步骤请参考本页面末尾

## 发送短信验证码

`sendSmsCode({@required String phone, String signatureID})`

```Dart
try {
  await BaaS.sendSmsCode(phone: "1508805****");
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 参数名          | 类型     | 说明          | 必填 |
|:----------     |:--------|:----------    |:----|
| phone          | String  | 手机号         |  Y  |
| signatureID    | String  | 短信签名 ID     |  N  |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**错误状态码**

| 状态码   | 说明     |
|----------|----------|
| 400      | 失败（rate limit 或参数错误） |
| 402      | 当前应用已欠费 |
| 500      | 服务错误 |


## 校验短信验证码

> **info**
> 在 1.0.0-alpha-5 及以上版本 code 更改为 String 类型

`verifySmsCode({@required String phone, @required String code})`

```Dart
try {
  await BaaS.verifySmsCode(phone: "1508805****", code: '012345');
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 参数名   | 类型   | 说明     | 必填  |
|----------|--------|----------|-----|
| phone   | String   | 手机号 | Y |
| code    | String      | 验证码 |  Y |

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**错误状态码**

| 状态码   | 说明     |
|----------|----------|
| 400     | 验证码错误 / 参数错误 |

## 验证码发送频次

{% block tips1 %}

> **info**
>同一企业在 1 分钟内只能发送 30 条短信，如有更高频次需求，请联系客服上调

>对同一手机号码在 1 分钟内只能发送 1 条短信

>对同一手机号码在 1 天内不能发送超过 10 条短信

{% endblock tips1 %}

{% include "/js-sdk/frag/_enable_sms.md" %}