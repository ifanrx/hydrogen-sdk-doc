# 用户模块

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取用户列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/miniapp/user-profile/`

### 请求方法

`GET`

### 提交参数

若无格外提醒，默认为等值查询

- `nickname` 用户的微信昵称，支持等值查询、模糊查询

    等值查询：

      https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?nickname=Tom

    模糊查询

      https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?nickname__contains=Tom

- `gender` 用户的性别，其中 `1` 表示男，`2` 表示女

- `created_at` 用户创建的时间，值为时间戳

    查询创建时间大于等于 2017-01-01 的用户：

      https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?created_at__gte=1483228800

    查询创建时间小于等于 2017-01-01 的用户：

      https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?created_at__lte=1483228800

    查询创建时间大于 2017-01-01 和小于 2017-12-01 的用户：

      https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?created_at__gt=1483228800&created_at__lt=1512086400

- `user_id` 用户 ID
- `group` 给定用户组 ID 查询在用户组下的用户列表

    只支持 `in` 查询：

      https://cloud.minapp.com/oserve/v1/miniapp/user-profile/?group__in=258,360

- `openid` 用户的 OpenID
- `unionid` 用户的 UnionID
- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）
- `order_by` 排序（支持 `created_at` 进行排序）

### 请求示例

```
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

### 返回示例

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

### 接口地址

`https://cloud.minapp.com/oserve/v1/miniapp/user-profile/:profile_id/`

`profile_id` 是用户的 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/miniapp/user-profile/55019/
```

### 返回示例

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

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/miniapp/user-profile/', 
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // 被附加到uri的参数
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
