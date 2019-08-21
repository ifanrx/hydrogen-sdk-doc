# Web 支付

目前 Web 端支持一下支付方式：

1. [微信网页支付](#微信网页支付)
2. [支付宝网页支付](#支付宝网页支付)
3. [QQ 网页支付](#qq-网页支付)

**客户端支付结果判断：**

当开发者调用支付接口后，需要通过[查询支付订单](/js-sdk/payment/order.md)状态来判断订单是否已经支付成功。

## 微信网页支付

`BaaS.payment.payWithWechat(options)`

Web 端微信支付支持三种支付方式：

1. 电脑端扫码支付（gatewayType: `weixin_tenpay_native`）
2. JSAPI 支付（微信客户端内置浏览器内使用）（gatewayType: `weixin_tenpay_js`）
3. 手机 H5 支付（gatewayType: `weixin_tenpay_wap`）

> **info**
> 使用 JSAPI 支付时，需要先通过公众号登录（[web 第三方登录](/js-sdk/web/signin-signout.md)，`providor` 为 `oauth-wechat-mp`），
> 或通过已经关联了微信公众号登录用户的账号登录。

**参数说明**

| 参数                   | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| options.gatewayType            | String  | Y   | 支付方式，`weixin_tenpay_wap` / `weixin_tenpay_native` / `weixin_tenpay_js` |
| options.totalCost              | Number  | Y   | 支付总额，单位：元 |
| options.merchandiseDescription | String  | Y   | 微信支付凭证-商品详情的内容 |
| options.merchandiseSchemaID    | Integer | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| options.merchandiseRecordID    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaID`, 文章记录的 ID 作为你 `merchandiseRecordID` 传入到 `BaaS.pay(object)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaID`, `merchandiseRecordID` 来查询用户是否付费。

**返回参数说明**

1. JSAPI 支付：

  | 参数           | 类型   | 说明 |
  | :--------------| :----- | :-- |
  | err_msg        | String | 错误信息 |
  | transaction_no | String | 微信支付流水号 |
  | trade_no       | String | 微信支付交易 ID, 业务方在微信后台对账时可看到此字段 |

  当支付取消或发生错误时，会抛出错误（[HError 对象](/js-sdk/error-code.md)）

2. 其他：

  | 参数                      | 类型   | 说明 |
  | :-------------------------| :----- | :-- |
  | transaction_no | String   | 微信支付流水号 |
  | trade_no    | String | 微信支付交易 ID, 业务方在微信后台对账时可看到此字段 |
  | code_url    | String | gatewayType="`weixin_tenpay_native`" 时返回，用于生成支付二维码 |
  | mweb_url    | String | gatewayType="`weixin_tenpay_wap`"时返回，用户可通过访问该 url 来拉起微信客户端，完成支付 |

> **info**
> 电脑端扫码支付时，开发者调用支付接口并成功获取到 `code_url` 后，需要将 `code_url` 转换为二维码。

**示例代码**

桌面端扫码支付:

```js
let params = {
  gatewayType: 'weixin_tenpay_native',
  totalCost: 0.1,
  merchandiseDescription: '深蓝色秋裤'
}

BaaS.payment.payWithWechat(params).then(res => {
  /**
   * success.
   * res.data.code_url 用来生成二维码
   * res.data.trade_no 用来查询支付状态
   */
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

移动端 H5 支付:

```js
let params = {
  gatewayType: 'weixin_tenpay_wap',
  totalCost: 0.1,
  merchandiseDescription: '深蓝色秋裤'
}

BaaS.payment.payWithWechat(params).then(res => {
  /**
   * success.
   * res.data.mweb_url 用来跳转到支付页面
   * res.data.trade_no 用来查询支付状态
   */
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

**支付成功返回示例**

桌面端扫码支付:

```
{
  code_url: 'wechat://***',
  transaction_no: "MDUhtNmacdYBKokJbCXhvYuoJnHXzpeN",
  trade_no: '4DySOWgNssfu5XsiTH9Ek2f5m9jWTwTw'
}
```

移动端 H5 支付:

```
{
  mweb_url: 'https://***',
  transaction_no: "MDUhtNmacdYBKokJbCXhvYuoJnHXzpeN",
  trade_no: '4DySOWgNssfu5XsiTH9Ek2f5m9jWTwTw'
}
```

## 支付宝网页支付

Web 端支付宝支付支持两种支付方式：

`BaaS.payment.payWithAlipay(options)`

1. 电脑端扫码支付（gatewayType: `alipay_page`）
2. 手机 H5 支付（gatewayType: `alipay_wap`）

**参数说明**

| 参数                   | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| options.gatewayType            | String  | Y   | 支付方式，`alipay_page` / `alipay_wap` |
| options.totalCost              | Number  | Y   | 支付总额，单位：元 |
| options.merchandiseDescription | String  | Y   | 支付宝支付凭证-商品详情的内容 |
| options.merchandiseSchemaID    | Integer | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| options.merchandiseRecordID    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaID`, 文章记录的 ID 作为你 `merchandiseRecordID` 传入到 `BaaS.pay(object)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaID`, `merchandiseRecordID` 来查询用户是否付费。

**返回参数说明**

| 参数                      | 类型   | 说明 |
| :-------------------------| :----- | :-- |
| transaction_no | String   | 支付宝支付流水号 |
| trade_no    | String | 支付宝支付交易 ID, 业务方在微信后台对账时可看到此字段 |
| payment_url    | String | 用户可通过访问该 url 来拉起支付宝支付收银台的中间页面，完成支付 |

**示例代码**

桌面端扫码支付:

```js
let params = {
  gatewayType: 'alipay_page',
  totalCost: 0.1,
  merchandiseDescription: '深蓝色秋裤'
}

BaaS.payment.payWithAlipay(params).then(res => {
  /**
   * success.
   * res.data.payment_url 用来跳转到支付页面
   * res.data.trade_no 用来查询支付状态
   */
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

移动端 H5 支付:

```js
let params = {
  gatewayType: 'alipay_wap',
  totalCost: 0.1,
  merchandiseDescription: '深蓝色秋裤'
}

BaaS.payment.payWithAlipay(params).then(res => {
  /**
   * success.
   * res.data.payment_url 用来跳转到支付页面
   * res.data.trade_no 用来查询支付状态
   */
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

**支付成功返回示例**

```
{
  payment_url: 'https://***',
  transaction_no: "MDUhtNmacdYBKokJbCXhvYuoJnHXzpeN",
  trade_no: '4DySOWgNssfu5XsiTH9Ek2f5m9jWTwTw'
}
```

## QQ 网页支付

Web 端 QQ 支付支持电脑端扫码支付：

`BaaS.payment.payWithQQ(options)`

**参数说明**

| 参数                   | 类型    | 必填 | 参数描述 |
| :--------------------- | :------ | :-- | :------ |
| options.gatewayType            | String  | Y   | 支付方式，`qpay_native` |
| options.totalCost              | Number  | Y   | 支付总额，单位：元 |
| options.merchandiseDescription | String  | Y   | 支付宝支付凭证-商品详情的内容 |
| options.merchandiseSchemaID    | Integer | N   | 商品数据表 ID，可用于定位用户购买的物品 |
| options.merchandiseRecordID    | String  | N   | 商品数据行 ID，可用于定位用户购买的物品 |

> **info**
> 举例：开发者有一个 Article 表, 里面有免费 / 付费的文章, 当用户对一篇付费文章进行支付时, 则可以将 Article 表的 ID 作为 `merchandiseSchemaID`, 文章记录的 ID 作为你 `merchandiseRecordID` 传入到 `BaaS.pay(object)` 写进支付订单记录。当用户阅读此付费文章时, 则可以通过 `merchandiseSchemaID`, `merchandiseRecordID` 来查询用户是否付费。

**返回参数说明**

| 参数                      | 类型   | 说明 |
| :-------------------------| :----- | :-- |
| transaction_no | String   | QQ 支付流水号 |
| trade_no    | String | QQ 支付交易 ID, 业务方在QQ 后台对账时可看到此字段 |
| code_url    | String | 用于生成支付二维码 |

> **info**
> 开发者调用支付接口并成功获取到 `code_url` 后，需要将 `code_url` 转换为二维码。

**示例代码**

```js
let params = {
  gatewayType: 'qpay_native',
  totalCost: 0.1,
  merchandiseDescription: '深蓝色秋裤'
}

BaaS.payment.payWithQQ(params).then(res => {
  /**
   * success.
   * res.data.code_url 用于生成支付二维码
   */
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```

**支付成功返回示例**

```
{
  code_url: 'https://***',
  transaction_no: "MDUhtNmacdYBKokJbCXhvYuoJnHXzpeN",
  trade_no: '4DySOWgNssfu5XsiTH9Ek2f5m9jWTwTw'
}
```
