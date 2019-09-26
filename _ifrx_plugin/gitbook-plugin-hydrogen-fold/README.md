# 功能介绍

## 生成可折叠内容

### 使用方式

![](./images/fold.png)

一般用法：
<pre>
{% fold %}
```js
// 支付示例代码
wx.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```
{% endfold %}
</pre>

默认打开:
<pre>
{% fold open=true %}
```js
// 支付示例代码
wx.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```
{% endfold %}
</pre>


默认打开，添加样式:
<pre>
{% fold summary="示例代码", open=true, style="background: gray;padding: 10px;" %}
```js
// 支付示例代码
wx.BaaS.pay(params).then(res => {
  // success. 支付请求成功响应，可以在 res 中拿到 transaction_no 和支付结果信息
}, err => {
  // 未完成用户授权或发生网络异常等
  console.log(err)
})
```
{% endfold %}
```
</pre>
