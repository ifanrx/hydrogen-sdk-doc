# 工具模块

## 获取服务器时间

**接口**

`GET https://cloud.minapp.com/userve/v2.2/server/time/`

请求示例：

```
https://cloud.minapp.com/userve/v2.2/server/time/
```

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.2/server/time/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "time": "2019-11-22T16:09:26.903210+08:00"
}
```