# 调用云函数

`BaaS.invokeFunction(functionID, params, sync)`

##### 参数说明

|    参数名   |  类型   |  必填  |   描述   |
| :--------: | :----: | :----: | :-----: |
| functionID | Number |   是   | 云函数 ID |
|   params   | Object |   否   | 传递给云函数的参数 |
|    sync    |  Bool  |   否   | 是否立即返回结果，默认为 true |

##### 请求示例

定义一个云函数，其接受一个 name 作为参数，返回 hello ${name}

```
BaaS.invokeFunction('1ef2f34tdgdf43r4', {name: 'allen'}).then(res => {
  console.log(res.data.result)  // hello allen
}, err => {
  console.log(err)
})
```