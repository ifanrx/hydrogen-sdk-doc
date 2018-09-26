# 短信验证码

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


