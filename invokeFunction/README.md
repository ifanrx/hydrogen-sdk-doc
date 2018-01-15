# 调用云函数

<p style='color:red'>* sdk version >= v1.1.5</p>

`wx.BaaS.invokeFunction(functionName, params, sync)`

##### 参数说明

|     参数名    |  类型  |  必填  |        描述         |
| :----------: | :----: | :---: | :------------------|
| functionName | String |  是   |      云函数名        |
|    params    |  不限   |  否   | 传递给指定云函数的参数 |
|     sync     |  Bool  |   否  | 是否等待返回函数执行结果，默认为 true |

##### 请求示例

假设已经创建了一个云函数 helloWorld，其接受一个 name 作为参数，返回 hello ${name}，可通过以下方式在云函数中进行调用

```
wx.BaaS.invokeFunction('helloWorld', {name: 'allen'}).then(res => {
  if (res.code === 0) {
    console.log(res.data)  // hello allen
  } else {
    console.log(res.error.message)
  }
}, err => {
  console.log(err)
})
```

##### 返回参数

```
{
  error: {},
  code: 0,  // code 为 0 时表示成功执行云函数，否则为执行云函数失败，通过 error 可以获取失败原因
  data: ...
}
```
