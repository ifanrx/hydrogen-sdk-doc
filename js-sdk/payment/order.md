# 订单查询

通过 BaaS SDK 提供的 `wx.BaaS.order(OBJECT)` 方法, 可查询到交易的详细信息。典型的使用场景为: 调用 `wx.BaaS.pay(object)` 发起支付, 在成功回调中获取到 transactionID, 在要路由到新的页面时带上此 ID, 在新页面的 onLoad 方法中获取到该 ID, 从而使用此 ID 获取交易的详细信息。

##### OBJECT 参数说明
参数列表采用**驼峰命名, 区分大小写**的命名方式和书写规范

|      参数名      |   类型   | 是否必填 | 参数描述                      |
| :-----------: | :----: | :--: | :------------------------ |
| transactionID | String |  Y   | BaaS 平台所记录的 transactionID |

##### 接口说明
- 使用 `wx.BaaS.order(object)` 发起事务查询请求后, BaaS 服务器会返回当前事务 ID 的详细信息。
  部分关键字段和含义如下:

```javascript
data: {
  created_at: '',              // 调用 wx.BaaS.pay(object) 的时刻
  merchandise_description: '', // 微信支付-微信支付凭证-商品详情上的文字描述
  paid_at: null,               // 付款时间, 未支付的话为 null
  status: 'pending',           // 订单支付状态
  total_cost: 233,             // 发起交易请求时的支付金额
  trade_no: '',                // 真正的交易 ID, 业务方在微信后台对账时可看到此 trade_no
  transaction_no: '',          // BaaS 平台所记录的 transactionID
}
```

##### 示例代码

```
// 获取支付交易示例代码
let transactionID = "iMiTAsOrgjDKItmKifWzzayHAwneYwYo"
let params = { transactionID }

wx.BaaS.order(params).then((res) => {
  // 注: 只要是服务器有返回的情况都会进入 success, 即便是 4xx，5xx 都会进入
  // 这是微信的处理方式与 BaaS 服务(器)无关
}, (err) => {
  // err 只有发生网络异常等其他系统级别的错误才会进入这里
  // 这是微信服务器的处理方式，与 BaaS 服务(器)无关
});
```