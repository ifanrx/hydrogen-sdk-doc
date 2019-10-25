# 用户模块

## 获取用户列表

**接口**

`GET https://cloud.minapp.com/userve/v2.2/miniapp/user_profile/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| order_by | String | N   | 以下字段不支持排序：gender, country, province, city, language |
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | Number | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/userve/v2.2/miniapp/user_profile/?limit=1&return_total_count=1
```

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.2/miniapp/user_profile/', {
  params: {
    nickname__contains: 'Tom',
    gender: 1,
    created_at__gt: 1483228800,
    order_by: '-created_at',
    return_total_count: 1
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

## 批量修改自定义字段

`PUT https://cloud.minapp.com/userve/v2.2/miniapp/user_profile/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回待更新对象总数，以协助不关心对象总数只关心数据更新结果的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回待更新对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| limit    | Number | N   | 限制单次请求更新的用户数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置更新的偏移值，默认为 0 |
| return_total_count   | Integer | N   | 返回结果中是否包含 total_count，1 为包含，0 为不包含，默认不包含 |

> **info**
> where 字段的详细说明请查看：[数据模块：数据操作](https://doc.minapp.com/user-dash/data/record.html#%E6%9F%A5%E8%AF%A2%E6%95%B0%E6%8D%AE)。

**参数说明**

> **info**
> 参数与更新数据表数据的参数一致，详细说明请查看：[数据模块：更新数据](https://doc.minapp.com/user-dash/data/record.html#%E6%9B%B4%E6%96%B0%E6%95%B0%E6%8D%AE)。
> 支持数据原子性更新，详细说明请查看：[数据模块：数据原子性更新](https://doc.minapp.com/user-dash/data/record.html#%E6%95%B0%E6%8D%AE%E5%8E%9F%E5%AD%90%E6%80%A7%E6%9B%B4%E6%96%B0)。

**代码示例**

```javascript
var axios = require('axios').create({
  withCredentials: true
})

axios.put('https://cloud.minapp.com/userve/v2.2/miniapp/user_profile/', {
  test: 'test'
}).then(res => {
  console.log(res.data)
});

```

**返回示例**

```json
{
  "operation_result": [
    {
      "success": {
        "id": "5a3c51cdceb616ccfc9d5f78",
        "updated_at": 1564411939
      }
    }
  ],
  "succeed": 1,
  "total_count": 1,
  "offset": 0,
  "limit": 1000,
  "next": null
}
```

> **info**
> 返回参数的详细说明请查看：[数据模块：同步批量修改数据](https://doc.minapp.com/open-api/data/record.html#%E5%90%8C%E6%AD%A5%E6%89%B9%E9%87%8F%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE)。

**状态码说明**

`200`: 成功。

`400`: 字段类型不匹配，更新非自定义字段或不存在的字段。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

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
  username: 'pretty_girl'
}).then(res => {
  console.log(res.data)
});

```

**返回示例**

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
