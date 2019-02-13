<!-- ex_nonav -->
# SDK Error 说明

## HError 错误对象的格式

在大部分情况下，SDK API 抛出的错误统一为 HError 类的实例，可以使用 `try-catch` 块进行捕捉，若 SDK 的 API 返回值是一个 Promise 时，HError 对象则会作为 catch 回调的参数。

HError 实例上有两个重要的属性，对调试错误很有帮助：

| 字段名    | 类型   | 说明     |
|----------|--------|----------|
| code     |  integer |  错误码 | 
| message  | string | 错误描述 | 


**示例代码**

```js
// SDK API 返回值是一个 Promise 对象，在 catch 中捕捉错误

BaaS.wxAccessToken().then(res => {
  console.log(res) // access_token
}, err => {
  // err 为 HError 类实例
  if (err.code === 500) {
    console.log('服务器错误')
  } if (err.code === 400) {
    console.log('未配置 appSecret')
  }
  // ...
})
```

```js
// SDK API 是一个同步的操作，则用 try-catch 来捕捉错误

let product = new BaaS.TableObject(1234)

// setQuery 方法必须传递一个 wx.BaaS.Query 对象
try {
  product.setQuery(123)
} catch (err) {
  console.log(err.code) // 605
}

```

## 错误码详解

错误码对应的错误信息如下：

`400`  Bad Request 参数错误

`401`  Unauthorized 未授权  

`402`  Payment Required 应用欠费

`403`  Forbidden 禁止访问  

`404`  Not Found 服务器找不到给定的资源

`500`  Internal Server Error 内部服务器错误
