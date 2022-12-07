<!-- ex_nonav -->
# 错误码和 HError 对象

## HError 错误对象的格式

在大部分情况下，SDK API 抛出的错误统一为 HError 类的实例，可以使用 `try-catch` 块进行捕捉。

HError 实例上有两个重要的属性，对调试错误很有帮助：

| 字段名    | 类型   | 说明     |
|----------|--------|----------|
| code     | int |  错误码 |
| message  | string | 错误描述 |


**示例代码**
```dart
TableObject product = new TableObject('1234');
TableRecord record = product.create();

try {
  record.set(123);
} catch (err) {
  print(err.code); // 605
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

`600`  network disconnected  网络已断开

`601`  request timeout  请求超时

`602`  uninitialized  未调用 BaaS.init() 进行初始化

`603`  unauthorized  用户尚未授权

`604`  session missing  用户尚未登录

`605`  incorrect parameter type  不正确的参数类型

`607`  payment cancelled  用户取消支付

`608`  payment failed  支付失败

`610`  errorTracker uninitialized  errorTracker 未初始化

`611`  unsupported function  不支持该方法

`612`  anonymous user is not allowed  临时用户不支持调用该方法

`613`  third party auth denied  用户拒绝第三方授权

`614`  third party auth failed  第三方授权失败
