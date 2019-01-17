<!-- ex_nonav -->
# 错误码和 HError 对象

`sdk v1.1.4` 版本重构优化了错误返回信息，你可以通过如下方式对错误信息进行判断。

## HError 错误对象的格式

在大部分情况下，SDK API 抛出的错误统一为 HError 类的实例，可以使用 `try-catch` 块进行捕捉，若 SDK 的 API 返回值是一个 Promise 时，HError 对象则会作为 catch 回调的参数。

HError 实例上有两个重要的属性，对调试错误很有帮助：

| 字段名    | 类型   | 说明     |
|----------|--------|----------|
| code     |  integer |  错误码 | 
| message  | string | 错误描述 | 


**示例代码**
{% ifanrxCodeTabs %}
```js
// SDK API 返回值是一个 Promise 对象，在 catch 中捕捉错误

wx.BaaS.login().then(res => {
  console.log('登录成功')
}, err => {
  // err 为 HError 类实例
  if (err.code === 600) {
    console.log('网络已断开')
  } if (err.code === 601) {
    console.log('请求超时')
  }
  // ...
})
```
{% endifanrxCodeTabs %}

{% ifanrxCodeTabs %}
```js
// SDK API 是一个同步的操作，则用 try-catch 来捕捉错误

let product = new wx.BaaS.TableObject(1234)

// setQuery 方法必须传递一个 wx.BaaS.Query 对象
try {
  product.setQuery(123)
} catch (err) {
  console.log(err.code) // 605
}

```
{% endifanrxCodeTabs %}


## 错误码详解

错误码对应的错误信息如下：

`400`  Bad Request 参数错误

`401`  Unauthorized 未授权  

`402`  Payment Required 应用欠费

`403`  Forbidden 禁止访问  

`404`  Not Found 服务器找不到给定的资源

`500`  Internal Server Error 内部服务器错误

`600`  network disconnected  网络已断开

`601`  request timeout  请求超时

`602`  uninitialized  未调用 BaaS.init() 进行初始化

`603`  unauthorized  用户尚未授权

`604`  session missing  用户尚未登录

`605`  incorrect parameter type  不正确的参数类型

`607`  payment cancelled  用户取消支付

`608`  payment failed  支付失败