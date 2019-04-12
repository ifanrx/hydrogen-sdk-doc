<!-- ex_nonav -->
# 错误处理和错误码

## 错误对象

SDK API 的错误对象作为回调参数 error 传回，错误对象类型为 NSError。通过对象是否为 nil 来判断是否发生错误，并获取错误信息。error 对象上有两个重要的属性，对调试错误很有帮助：

| 字段名    | 类型   | 说明     |
|----------|--------|----------|
| code  |  Int |  错误码 | 
| localizedDescription | String | 错误描述 | 

**示例代码**

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
Auth.login(username: "test0402", password: "111") { (user, error) in
    // 错误处理
    if error != nil {
        if let error = error as? HError {
            print("Parsing error: \(error.error.code), \(error.localizedDescription)")
        } else {
            print("Other error: \(error!)")
        }
    }

    
}
```
{% content "oc1" %}
```
[BAASAuth loginWithUsername:@"test" password:@"111" completion:^(BAASUser * _Nullable user, NSError * _Nullable error) {

    // 错误处理
    if (error) {
        NSLog(@"Parsing error: [code: %ld], [description: %@]", error.code, error.localizedDescription);
        return;
    }
    
}];
```
{% endtabs %}

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