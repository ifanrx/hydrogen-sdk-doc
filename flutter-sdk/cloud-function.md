<!-- ex_nonav -->

# 调用云函数

该模块允许用户创建、编写运行于知晓云云引擎上的代码。适用于一些对安全性有要求，功能复杂、需求个性化的业务场景。配合触发器可以帮助开发者实现功能复杂的小程序。

{% block tips1 %}

> **info**
> 调用云函数，需要先在控制台创建云函数 [控制台 - 云函数](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]engine/cloud-function/function/)
> ![新建云函数](/images/dashboard/cloud-function-add.jpg)

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}。云函数代码如下：

```js
exports.main = function helloWorld(event, callback) {
  console.log(event)
  callback(null, `hello ${event.data.name}`)
}
```

可在 Flutter 中通过以下方式进行调用云函数：

{% endblock tips1 %}

```Dart
try {
  var result = await invokeCloudFunction(name: "helloWorld", data: {"name": "BaaS"}, sync: true);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

云函数执行相关错误码如下：

`404`  传入的参数 name 不合法

`400`  云函数调度/执行失败

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**参数说明**

| 参数          | 类型                   | 必填 | 说每个 |
| :----------- | :-----                 | :-- | :-- |
| name         | String                 | 是  | 云函数名 |
| data         | `Map<String, dynamic>` | 否  | 传递给云函数的参数 |
| sync         | Bool                   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| result  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据，详细如下面 **result** 样例 |

**result**

```json
{
  "error": {},
  "code": 0,
  "data": "hello BaaS"
}
```

**sync 为 false 时返回示例**

```json
{
  "error": {},
  "code": 0,
  "data": {"status": "ok"}
}
```