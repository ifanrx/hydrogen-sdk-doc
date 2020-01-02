<!-- ex_nonav -->

# 调用云函数

该模块允许用户创建、编写运行于知晓云云引擎上的代码。适用于一些对安全性有要求，功能复杂、需求个性化的业务场景。配合触发器可以帮助开发者实现功能复杂的小程序。你只需编写简单的、目的单一的云函数，并将它与其他功能（如触发器、定时任务）产生的事件关联起来，即可在小程序上实现更加复杂的业务逻辑，如订单的自动化取消、抽奖等。使用云函数可以完成市面上全部类型的小程序实现，极大的降低了运维成本，在快速实现功能的基础上，仍然保留了极强的水平扩展能力。想了解更多有关于云函数的内容，请见[控制台操作-云函数](/dashboard/cloud-function.md)。

## `BaaS.invoke(functionName, params, sync)` 

{% block tips1 %}

> **info**
> 调用云函数，需要先在控制台创建云函数 [控制台 - 云函数](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]engine/cloud-function/function/)
> ![新建云函数](/images/dashboard/cloud-function-add.jpg)

默认只允许登录用户（不包含匿名登录用户）调用云函数，如果需要允许匿名登录用户调用，请在[控制台-设置-SDK](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/) 打开“匿名用户调用云函数”开关

![](/images/cloud-function/anonymous.png)

> **danger**
> 由于原则上客户端是不可信任的，匿名用户调用云函数将存在一定的数据安全风险。

{% endblock tips1 %}

**参数说明**

| 参数          | 类型   | 必填 | 说明 |
| :----------- | :----- | :-- | :-- |
| functionName | String | 是  | 云函数名 |
| params       | Object | 否  | 传递给云函数的参数 |
| sync         | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}。云函数代码如下：

```js
exports.main = function helloWorld(event, callback) {
  console.log(event)
  callback(null, `hello ${event.data.name}`)
}
```

可在小程序中通过以下方式调用云函数（默认同步执行）：

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}

```js
wx.BaaS.invoke('helloWorld', {name: 'allen'}).then(res => {
  if (res.code === 0) {
    // success
    console.log(res.data)
  } else {
    // fail
    console.log(res.error.message)
  }
}, err => {
  // HError 对象
  callback(err)
})
```

{% endifanrxCodeTabs %}

> HError 对象结构请参考[错误码和 HError 对象](./error-code.md)

**返回参数**

```json
{
  "error": {},
  "code": 0,
  "data": "hello allen"
}
```

对于不需要等待执行结果的云函数，调用时可选择异步执行（sync 参数设为 false），调用云函数后执行结果直接返回 {status: "ok"}：

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}

```js
wx.BaaS.invoke('helloWorld', {name: 'allen'}, false).then(res => {
  if (res.code === 0) {
    // 调用成功后不等待执行结果，直接返回 {status: "ok"}
    console.log(res.data)
  } else {
    // fail
    console.log(res.error.message)
  }
}, err => {
  // HError 对象
  callback(err)
})
```

{% endifanrxCodeTabs %}

**返回参数**

```json
{
  "error": {},
  "code": 0,
  "data": {"status": "ok"}
}
```

## <span style="color: #f04134;">`已废弃`</span> `wx.BaaS.invokeFunction(functionName, params, sync)`

**参数说明**

| 参数          | 类型   | 必填 | 说每个 |
| :----------- | :----- | :-- | :-- |
| functionName | String | 是  | 云函数名 |
| params       | Object | 否  | 传递给云函数的参数 |
| sync         | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}，可通过以下方式在云函数中进行调用
{% ifanrxCodeTabs  %}

```js
wx.BaaS.invokeFunction('helloWorld', {name: 'allen'}).then(res => {
  if (res.code === 0) {
    // success
    console.log(res.data)
  } else {
    // fail
    console.log(res.error.message)
  }
})
```

{% endifanrxCodeTabs %}

**返回参数**

```json
{
  "error": {},
  "code": 0,
  "data": "hello allen"
}
```
