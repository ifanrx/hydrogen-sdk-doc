# 短信验证码

## 发送短信验证码
`BaaS.sendSmsCode({phone, userID})`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| phone | String | 手机号码 |
| userID | Number | 用户 ID |


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

成功：HTTP:1.1 OK
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
| userID | Number | 用户 ID |


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

成功：HTTP:1.1 OK
```javascript
{ "status": "ok" }
```

