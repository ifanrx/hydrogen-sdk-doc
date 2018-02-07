<!-- ex_nonav -->

# 支付

知晓云提供了快速接入微信支付的功能。你可以在知晓云控制台支付面板，填写你的商户号等信息，方便快捷地完成微信支付绑定，同时可通过支付记录面板，查看和查询支付记录。同时你可以借助 SDK 实现微信支付功能，如下示例，发起一次 398 元的支付请求：

```js
let params = {
  totalCost: 398,
  merchandiseDescription: '一条支付描述'
}

wx.BaaS.pay(params).then(res => {
  console.log('订单号', res.transaction_no)
}, err => {
  if (err.code === 607) {
    console.log('用户取消支付')
  } else if (err.code === 608){
    console.log('支付失败', err.message)
  }
})
```

同时，SDK 也支持通过 transaction_no 获取订单信息，如下：

```js
let transactionID = "iMiTAsOrgjDKItmKifWzzayHAwneYwYo"
let params = { transactionID }

wx.BaaS.order(params).then()
```