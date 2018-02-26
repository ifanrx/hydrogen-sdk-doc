<!-- ex_nonav -->

# 微信支付

`wx.BaaS.pay(OBJECT)`

**OBJECT 参数说明**

| 参数                    | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| totalCost              | Number  | Y   | 支付总额 |
| merchandiseDescription | String  | Y   | 微信支付凭证-商品详情的内容 |
| merchandiseSchemaID    | Integer | N   | 商品表 ID，可用于定位用户购买的物品 |
| merchandiseRecordID    | String  | N   | 商品记录 ID，可用于定位用户购买的物品 |
| merchandiseSnapshot    | Object  | N   | 根据业务需求自定义的数据 |

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaID`, 文章记录的 ID 作为你 `merchandiseRecordID` 传入到 `wx.BaaS.pay(object)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaID`, `merchandiseRecordID` 来查询用户是否付费。

**返回参数说明**

| 参数            | 类型   | 说明 |
| :------------- | :----- | :-- |
| transaction_no | Number | 订单号 |

**示例代码**

```js
// 支付示例代码
let params = {
  totalCost: 398,
  merchandiseDescription: '一条支付描述'
}

wx.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
  /* 1.1.4 以下版本：
    如果支付失败, 则可以获取失败原因
    注: 只要是服务器有返回的情况都会进入 success, 即便是 4xx，5xx 都会进入
        所以非系统级别错误导致的支付失败也会进入这里, 例如用户取消，参数错误等
        这是微信的处理方式与 BaaS 服务(器)无关
  */
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

注：1.1.4 版本之后，为了方便开发者清楚区分用户取消支付还是支付失败，我们为其增加了错误类型，你可以通过像以下操作，对支付状态进行判断：

```js
wx.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应。
}, err => {
  if (err.code === 603) {
    console.log('用户尚未授权')
  } else if (err.code === 607) {
    console.log('用户取消支付')
  } else if (err.code === 608){
    console.log(err.message)
  }
})
```

> **info**
> 调用 `wx.BaaS.pay(object)` 之前 **必须完成用户授权**（[使用 `wx.BaaS.login()`](../user/sign-in.md)），否则支付将失败。请在产品设计上做好这块的处理，尤其注意处理用户拒绝授权之后的处理方法，具体请参考 “获取用户信息” 章节说明。

**接口说明**

![小程序支付模式图-来自微信官方](https://pay.weixin.qq.com/wiki/doc/api/img/wxa-7-2.jpg)


`wx.BaaS.pay(object)` 实际上做了发起支付统一下单请求，及调用 `wx.requestPayment()` 接口等操作。开发者只需要调用 `wx.BaaS.pay(object)` , 传入必填参数即可发起微信支付。用户感知到的现象就是, 点击付款按钮，弹出支付弹框, 要求用户输入密码, 用户输入正确的密码后完成支付流程, 停在支付结果页。用户可在支付结果页点击返回商家按钮回到支付前界面。
