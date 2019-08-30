<!-- ex_nonav -->

# 调用云函数

该模块允许用户创建、编写运行于知晓云云引擎上的代码。适用于一些对安全性有要求，功能复杂、需求个性化的业务场景。配合触发器可以帮助开发者实现功能复杂的小程序。

## `BaaS.invokeCloudFunc(funcName, data, sync, callback)` 

{% block tips1 %}

> **info**
> 调用云函数，需要先在控制台创建云函数 [控制台 - 云函数](https://cloud.minapp.com/dashboard/#/app/engine/cloud-function/function/)
> ![新建云函数](/images/dashboard/cloud-function-add.jpg)

{% endblock tips1 %}

**参数说明**

| 参数          | 类型   | 必填 | 说明 |
| :----------- | :----- | :-- | :-- |
| functionName | String | 是  | 云函数名 |
| data         | String | 否  | 传递给云函数的参数（这里输入 json 字符串，sdk 会把 json 字符串序列化为 json 类型） |
| sync         | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Integer                                          | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定（sdk 序列化为 JsonElement） | 函数通过 callback 返回的数据 |
| error | JosnElement                                      | 返回的错误信息，成功则返回空对象 |

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}。云函数代码如下：

```js
exports.main = function helloWorld(event, callback) {
  console.log(event)
  callback(null, `hello ${event.data.name}`)
}
```

可在小程序中通过以下方式进行调用云函数：

```java
String funcName = "helloWorld";
String data = "{\"name\":\"allen\"}";
BaaS.invokeCloudFunc(funcName, data, null, new BaseCallback<CloudFuncResp>() {
    @Override
    public void onSuccess(CloudFuncResp cloudFuncResp) {
        if (cloudFuncResp.getCode() == 0) {
            // 调用成功
        }
    }

    @Override
    public void onFailure(Throwable e) {
        // 调用失败
    }
});
```

**返回参数**

```json
{
  "error": {},
  "code": 0,
  "data": "hello allen"
}
```

异常请参考[异常](./error-code.md)
