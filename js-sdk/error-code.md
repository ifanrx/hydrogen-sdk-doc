<!-- ex_nonav -->

# 错误码详解

`sdk v1.1.4` 版本重构优化了错误返回信息，你可以通过如下方式对错误信息进行判断。

```js
wx.BaaS.login().then(res => {
  console.log('登录成功')
}, err => {
  if (err.code === 600) {
    console.log('网络已断开')
  } if (err.code === 601) {
    console.log('请求超时')
  }
  ...
})
```

错误码对应的错误信息如下：

`600`  network disconnected  网络已断开

`601`  request timeout  请求超时

`602`  uninitialized  未调用 BaaS.init() 进行初始化

`603`  unauthorized  用户尚未授权

`604`  session missing  用户尚未登录

`605`  incorrect parameter type  不正确的参数类型

`607`  payment cancelled  用户取消支付

`608`  payment failed  支付失败