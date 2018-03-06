# 用户 加入／移出 用户组操作

**接口**

`PATCH https://cloud.minapp.com/userve/v1/miniapp/group/membership/`

**参数说明**

Content-Type: `application/json`

| 参数    | 类型    | 必填 | 说明 |
| :-------| :----- | :-- | :-- |
| op      | String | N   | 将要执行的操作，即 `add` 为将用户加入用户组；`remove` 将用户从用户组中移出 |
| path    | String | N   | 访问的路径，默认为 `/membership` |
| users   | String | N   | 用户的 user_id 列表，列表不能为空 |
| groups  | String | N   | 用户组 ID 列表，列表不能为空 |

提交的数据是一个数组，数组中包含一系列由上面参数组成的操作。

**代码示例**

{% tabs patchCurl="Curl", patchNode="Node" %}

{% content "patchCurl"%}

```
curl -X PATCH \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '[
      {"op": "add", "path": "/membership", "users": [5, 6], "groups": [53,54]},
      {"op": "remove", "path": "/membership", "users": [5, 6], "groups":[53,54]}
    ]' \
https://cloud.minapp.com/userve/v1/miniapp/group/membership/
```

{% content "patchNode"%}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/userve/v1/miniapp/group/membership/',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: [   // 指定 data 以 "Content-Type": 'application/json' 传送
    {"op": "add", "path": "/membership", "users": [36476036], "groups": [561]}
  ]
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% endtabs %}

**状态码说明**

`204` 修改成功，`400` 参数错误