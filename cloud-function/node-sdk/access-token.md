# 获取微信 ACCESS_TOKEN

`BaaS.wxAccessToken(signKey)`

## 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| signKey | string | 从 event.signKey 取得的密钥，用于解密 |

## 返回值

```javascript
{
  access_token: '2222',
  expires_in: 111
}
```

## 示例代码
```javascript
exports.main = function (e, cb) {
  BaaS.wxAccessToken(e.signkey).then(res => {
    console.log(res)
    cb(null, res)
  }).catch(e => {
    console.log(e)
  })
}
```