<!-- ex_nonav -->

# 调用云函数

`BaaS.invoke(functionName, params, sync)`

> **info**
> 原有的 `BaaS.invokeFunction` API 将被废弃，不推荐继续使用。
> 新版的 `invoke` API 的返回参数和 jssdk 的 `invoke` API 的返回参数保持了统一，更加便于使用。

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