# 获取微信 ACCESS_TOKEN

`BaaS.wxAccessToken(signKey)`

## 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| signKey | string | 从 event.signKey 取得的密钥，用于解密 |

## 返回值

```javascript
{
  access_token: '13_9cUD6KTQb4qtASzoL_k1uDCWqjOGRfHieF3-aHBahJ5XGjsDAhaoQLf8DWk1lpfm3J76F0LI3E820dMSAkWwnzlq264qxca8M5xBXU7y4e1Ka5IrUMu8zzvei9BFzE4QmXL1yVxwmsp45VhtXTOfABATPK',
  expires_in: 5400
}
```

## 示例代码
```javascript
exports.main = function (event, callback) {
  BaaS.wxAccessToken(event.signkey).then(res => {
    console.log(res)
    callback(null, res)
  }).catch(e => {
    console.log(e)
    callback(e)
  })
}
```