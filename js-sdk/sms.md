# 短信验证码

该接口支持向特定手机号码发送验证码，并校验验证码是否正确的功能，以此来完成一些需要确认用户身份的操作，比如：

* 使用手机号码和验证码进行登录
* 通过手机号码和验证码的方式重置密码
* 进行重要操作的验证确认等

## 发送短信验证码
`wx.BaaS.sendSmsCode({phone})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| phone | string | 手机号 |

### 示例代码
```js
wx.BaaS.sendSmsCode({phone: '1328888888'}).then(res => {
  // success
  if (res.statusCode == 201) {
    console.log(res.data) // { "status": "ok" }
  } else {
    console.log(res.statusCode) // 错误状态码
  }
}).catch(e => {
  // err
})
```

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
```js
wx.BaaS.verifySmsCode({phone: '132888888', code: 123456}).then(res => {
    // success
    if (res.statusCode == 201) {
      console.log(res.data) // { "status": "ok" }
    } else {
      console.log(res.statusCode) // 错误状态码
    }
}).catch(e => {
    // err
})
```

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
