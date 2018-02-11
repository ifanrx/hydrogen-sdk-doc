<!-- ex_nonav -->

# 调用云函数

`BaaS.invokeFunction(functionName, params, sync)`

**参数说明**

| 参数          | 类型   | 必填 | 说每个 |
| :----------- | :----- | :-- | :-- |
| functionName | Number | 是  | 云函数名 |
| params       | Object | 否  | 传递给云函数的参数 |
| sync         | Bool   | 否  | 是否等待返回函数执行结果，默认为 true |

**返回参宿说明**

| 参数   | 类型   | 描述 |
| :---- | :----- | :-- |
| code  | Number | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| error | Object | 传递给云函数的参数 |
| data  | Bool   | 函数通过 callback 返回的数据 |

**请求示例**

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}，可通过以下方式在云函数中进行调用

```js
BaaS.invokeFunction('helloWorld', {name: 'allen'}).then(res => {
  if (res.code === 0) {
    callback(null, res.data)
  } else {
    callback(res.error.message)
  }
}, err => {
  callback(err)
})
```

**返回参数**

```json
{
  error: {},
  code: 0,
  data: 'hello allen'
}
```