# 用户模块

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取用户列表

**接口地址**

`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/`

**参数说明**

| 参数               | 类型    | 必填 | 说明 |
| :------------  | :----- | :-- | :-- |
| nickname       | String | N  | 用户的微信昵称，支持等值查询(默认): `https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?nickname=Tom`, 模糊查询: `https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?nickname__contains=Tom` |
| gender         | Number | N  | 户的性别，其中 `1` 表示男，`2` 表示女 |
| created_at     | String | N  | 用户创建的时间，值为时间戳。查询创建时间大于等于 2017-01-01 的用户:`https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?created_at__gte=1483228800`，查询创建时间小于等于 2017-01-01 的用户：`https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?created_at__lte=1483228800`，查询创建时间大于 2017-01-01 和小于 2017-12-01 的用户：`https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?created_at__gt=1483228800&created_at__lt=1512086400` |
| user_id        | String | N  | 用户 ID |
| group          | String | N  | 给定用户组 ID 查询在用户组下的用户列表。只支持 `in` 查询：`https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?group__in=258,360`|
| openid         | String | N  | 用户的 OpenID |
| unionid        | String | N  | 用户的 UnionID |
| offset         | String | N  | 返回资源的起始偏移值 |
| limit          | String | N  | 返回资源的个数（默认为 20，最大可设置为 1000）|
| order_by       | String | N  | 排序（支持 `created_at` 进行排序） |

**代码示例**

{% tabs first="Node", second="Python", third="curl命令" %}

{% content "first" %}

  ```js
  var request = require('request');

  var opt = {
    uri: 'https://cloud.minapp.com/oserve/v1/miniapp/user-profile/', 
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    qs: {     // query string, 被附加到uri的参数
      nickname__contains: 'username',
      gender: 1,
      created_at__gte: 1483228800,
      user_id: '363953xx',
      order_by: '-created_at'
    }
  }

  request(opt, function(err, res, body) {
      console.log(body)
  })
  ```

{% content "second" %}

  ```python
    python code ……
  ```

{% content "third" %}

```curl
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d nickname__contains=Tom \
-d gender=1 \
-d created_at__gt=1483228800 \
-d order_by=-created_at \
https://cloud.minapp.com/oserve/v1/miniapp/user-profile/
```

{% endtabs %}

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
            "openid": "onzns0KsLKFyg3-VcW0GwTE652_k",
            "unionid": "onzns0KsLKFyg3-VcW0GwTE652_k",
            "gender": 1,
            "id": 55019,
            "nickname": "PCG",
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

`GET https://cloud.minapp.com/oserve/v1/miniapp/user-profile/:profile_id/`

> `profile_id` 是用户的 ID

**代码示例**

{% tabs  curl="curl命令", node="Node", python="Python" %}

{% content "curl"%}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/miniapp/user-profile/55019/
```

{% content "node" %}

```js
var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/miniapp/user-profile/4271xx/',   // 4271xx 对应 :profile_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "python" %}

```python
  python code ……
```

{% endtabs %}

**返回参数**

```json
{
  "avatar": "https://media.ifanrusercontent.com/media/tavatar/55/c3/55c3dbebcc61891be10d29ded808c84a01dcf864.jpg",
  "city": "Guangzhou",
  "country": "China",
  "created_at": 1504504504,
  "gender": 1,
  "id": 55019,
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