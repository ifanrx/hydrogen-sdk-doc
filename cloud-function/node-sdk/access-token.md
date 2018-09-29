# 获取微信 ACCESS_TOKEN

开发者授权知晓云后，知晓云在调用微信 API 时，会获取最新的 ACCESS_TOKEN ，这时如果开发者在自己的服务器上也刷新了 ACCESS_TOKEN 去调用微信的 API，会使知晓云的保存的 ACCESS_TOKEN 失效，会造成额外的 ACCESS_TOKEN 刷新，浪费 ACCESS_TOKEN 的生成次数。
因此知晓云开放了获取知晓云保存的 ACCESS_TOKEN 的 API，开发者只管获取 ACCESS_TOKEN，而无需担心 ACCESS_TOKEN 过期的问题。

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