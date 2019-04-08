# 用户模块

## 获取用户列表

**接口**

`GET https://cloud.minapp.com/userve/v2.0/miniapp/user_profile/`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| created_at | String | N   | 用户创建的时间，值为时间戳。查询创建时间大于等于 2017-01-01 的用户 `created_at__gte=1483228800`，查询创建时间小于等于 2017-01-01 的用户：`created_at__lte=1483228800` |
| gender     | Number | N   | 户的性别，其中 `1` 表示男，`2` 表示女 |
| group      | String | N   | 给定用户组 ID 查询在用户组下的用户列表。只支持 `in` 查询：`group__in=258,360`|
| limit      | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| nickname   | String | N   | 用户的微信昵称，支持等值查询 `nickname=Tom`, 模糊查询 `nickname__contains=Tom` |
| offset     | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| openid     | String | N   | 用户的 OpenID |
| order_by   | String | N   | 排序（支持 `created_at` 进行排序） |
| unionid    | String | N   | 用户的 UnionID |
| user_id    | String | N   | 用户 ID (对应 _userprofile 表中的 id 字段) |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.0/miniapp/user_profile/', {
  params: {
    nickname__contains: 'Tom',
    gender: 1,
    created_at__gt: 1483228800,
    order_by: '-created_at',
  }
}).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "avatar": "https://media.ifanrusercontent.com/media/tavatar/55/c3/55c3dbebcc61891be10d29ded808c84a01dcf864.jpg",
      "city": "Guangzhou",
      "country": "China",
      "created_at": 1504504504,
      "gender": 1,
      "nickname": "PCG",
      "openid": "onzns0KsLKFyg3-VcW0GwTE652_k",
      "unionid": "onzns0KsLKFyg3-VcW0GwTE652_k",
      "province": "Guangdong",
      "user_group": [
          137
      ],
      "user_id": 36619758
    }
  ]
}
```

## 获取用户详情

**接口**

`GET https://cloud.minapp.com/userve/v2.0/miniapp/user_profile/{{user_id}}/`

其中 `user_id` 即用户 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.0/miniapp/user_profile/36619758/')
.then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "avatar": "https://media.ifanrusercontent.com/media/tavatar/55/c3/55c3dbebcc61891be10d29ded808c84a01dcf864.jpg",
  "city": "Guangzhou",
  "country": "China",
  "created_at": 1504504504,
  "gender": 1,
  "nickname": "PCG",
  "openid": "onzns0KsLKFyg3-VcW0GwTE652_k",
  "unionid": "onzns0KsLKFyg3-VcW0GwTE652_k",
  "province": "Guangdong",
  "user_group": [
      137
  ],
  "user_id": 36619758
}
```

## 修改用户登录信息

**接口**

`PUT https://cloud.minapp.com/userve/v2.0/miniapp/user/account/:id/`

其中 `:id` 是用户在 `_userprofile` 表中的 `id`。

**参数说明**

Content-Type: `application/json`

| 参数    | 类型   | 必填 | 说明 |
| :----- | :----- | :-- | :-- |
| username   | String | N   | 用户名，不区分大小写 |
| email | String | N   | 邮箱，不区分大小写 |
| password | String | N | 用户密码，新用户密码若 new_password 不为空则必填 |
| new_password | String | N | 新用户密码 |

**代码示例**

```javascript
var axios = require('axios').create({
  withCredentials: true
})

axios.put('https://cloud.minapp.com/userve/v2.0/miniapp/user/account/70695404/', {
  username: "pretty_girl"
}).then(res => {
  console.log(res.data)
});

```

{% endtabs %}

**返回示例**

```json
{
  "email": "pretty_girl@fake.com",
  "email_verified": false,
  "username": "pretty_girl"
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| username   | String | 用户名，不区分大小写 |
| email | String | 邮箱，不区分大小写 |
| email_verified | Boolean | 用户邮箱是否已激活 |

**状态码说明**

`200`: 成功。

`400`: password 错误、email 不合法、username 或 email 已经存在。

`404`: 用户不存在。