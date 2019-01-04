<!-- ex_nonav -->

# 调用云函数

## `BaaS.invoke(functionName, params, sync)`

**参数说明**

| 参数          | 类型   | 必填 | 描述 |
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

```js
BaaS.invoke('helloWorld', {name: 'allen'}).then(res => {
  let result = res
  if (result.code === 0) {
    callback(null, result.data)
  } else {
    callback(result.error.message)
  }
}, err => {
  callback(err)
})
```

**返回参数**

```json
{
  "error": {},
  "code": 0,
  "data": "hello allen"
}
```

## `BaaS.invokeFunction(functionName, params, sync)` <span style="color:red;">已废弃</span> 

**参数说明**

| 参数          | 类型   | 必填 | 描述 |
| :----------- | :----- | :-- | :-- |
| functionName | String | 是  | 云函数名 |
| params       | Object | 否  | 传递给云函数的参数 |
| sync         | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| data.code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data.data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| data.error | Object                 | 返回的错误信息，成功则返回空对象 |

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}，可通过以下方式在云函数中进行调用

```js
BaaS.invokeFunction('helloWorld', {name: 'allen'}).then(res => {
  let result = res.data // 此处的 res 为完整的 http response
  if (result.code === 0) {
    callback(null, result.data)
  } else {
    callback(result.error.message)
  }
}, err => {
  callback(err)
})
```

**返回参数**

```json
{
  "error": {},
  "code": 0,
  "data": "hello allen" 
}
```