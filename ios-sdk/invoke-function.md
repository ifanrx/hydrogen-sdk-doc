<!-- ex_nonav -->

# 调用云函数

该模块允许用户创建、编写运行于知晓云云引擎上的代码。适用于一些对安全性有要求，功能复杂、需求个性化的业务场景。配合触发器可以帮助开发者实现功能复杂的小程序。

{% block tips1 %}

> **info**
> 调用云函数，需要先在控制台创建云函数 [控制台 - 云函数](https://cloud.minapp.com/dashboard/#/app/engine/cloud-function/function/)
> ![新建云函数](/images/dashboard/cloud-function-add.jpg)

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}。云函数代码如下：

```js
exports.main = function helloWorld(event, callback) {
  console.log(event)
  callback(null, `hello ${event.data.name}`)
}
```

可在 App 中通过以下方式进行调用云函数：

{% endblock tips1 %}

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
BaaS.invoke(name: "helloWorld", data: ["name": "BaaS"], sync: true) { (result, error) in

}
```
{% content "oc1" %}
```
[BaaS invokeWithName:"helloWorld" data:@{@"name": @"BaaS"} sync:YES completion:^(NSDictionary * _Nullable result, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数          | 类型   | 必填 | 说每个 |
| :----------- | :----- | :-- | :-- |
| name | String | 是     | 云函数名 |
| data       | Dictionary | 否  | 传递给云函数的参数 |
| sync         | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| result  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据，详细如下面 **result** 样例 |
| error | NSError                 | 错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md) |

**result**

```json
{
  "error": {},
  "code": 0,
  "data": "hello BaaS"
}
```