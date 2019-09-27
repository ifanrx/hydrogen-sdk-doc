# 短信验证码 

该接口支持向特定手机号码发送验证码，并校验验证码是否正确的功能，以此来完成一些需要确认用户身份的操作，比如：

* 使用手机号码和验证码进行登录
* 通过手机号码和验证码的方式重置密码
* 进行重要操作的验证确认等

> **info**
> SDK 发送短信需要在知晓云控制台开通并开启发送短信权限，操作步骤请参考本页面末尾

## 发送短信验证码

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
BaaS.sendSmsCode(phone: "1508805****") { (success, error) in

}
```
{% content "oc1" %}
```
[BaaS sendSmsCodeWithPhone:@"1508805****" completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名   | 类型   | 说明     | 必填 |
|----------|--------|----------|----|
| phone | String | 手机号 |  Y  |

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| success  | Bool | 是否发送成功 |
| error | NSError                 | 错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md) |

**错误状态码**

| 状态码   | 说明     |
|----------|----------|
| 400     | 失败（rate limit 或参数错误） |
| 402     | 当前应用已欠费 |
| 500     | 服务错误 |


## 校验短信验证码

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
BaaS.verifySmsCode(phone: "1508805****", code: "11111") { (success, error) in

}
```
{% content "oc2" %}
```
[BaaS verifySmsCodeWithPhone:"1508805****" code:@"11111" completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名   | 类型   | 说明     | 必填  |
|----------|--------|----------|-----|
| phone   | String   | 手机号 | Y |
| code    | String   | 验证码 |  Y |

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| success  | Bool | 是否验证成功 |
| error | NSError                 | 错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md) |

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