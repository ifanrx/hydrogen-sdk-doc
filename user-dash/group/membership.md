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

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.patch('https://cloud.minapp.com/userve/v1/miniapp/group/membership/',
  [{
    op: 'add',
    path: '/membership',
    users: [5, 6],
    groups: [53, 54]
  },
    {
      op: 'remove',
      path: '/membership',
      users: [5, 6],
      groups: [53, 54]
    }]).then(res => {
  console.log(res)
})
```

**状态码说明**

`204` 修改成功，`400` 参数错误
