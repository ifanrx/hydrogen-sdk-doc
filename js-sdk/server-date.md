# 获取服务器时间

`BaaS.getServerDate()`

通过该接口获取服务器时间，可以防止前端由于用户时间设置错误而导致拿到错误的时间，主要有以下应用场景：

  1. 时间校准。例如前端显示倒计时时，用做基准时间。

  2. 数据查询。防止由于前端拿到错误时间，导致查询到错误的数据。

**示例代码**

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.getServerDate().then(res => {
  // success
  console.log(res.data.time)
}).catch(e=>{
  // HError 对象
})
```
{% endifanrxCodeTabs %}

**返回值说明**

| 属性   | 类型   | 说明     |
|----------|--------|----------|
| time     | string | 服务器时间（ISO 8601）|

**返回示例**

成功时 res 对象结构如下

```json
{
  "data": {
    "time": "2019-11-25T15:05:19.387067+08:00",
  },
  "status": 200
}
```

err 对象结构请参考[错误码和 HError 对象](./error.md)
