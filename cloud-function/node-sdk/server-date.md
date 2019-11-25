# 获取服务器时间

`BaaS.getServerDate()`

通过该接口获取服务器时间，主要有以下应用场景：

  1. 用于时间校准

  2. 用于数据查询

**示例代码**

{% tabs getServerDateAsync="async/await", getServerDatePromise="promise" %}
{% content "getServerDateAsync" %}
```javascript
const res = await BaaS.getServerDate()
console.log(res.data.time)
```

{% content "getServerDatePromise" %}
```javascript
BaaS.getServerDate().then(res => {
  // success
  console.log(res.data.time)
}).catch(e=>{
  // HError 对象
})
```
{% endtabs %}


**返回值说明**

| 参数名   | 类型   | 说明     |
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
