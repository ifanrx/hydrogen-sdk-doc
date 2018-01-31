# 用户组的操作

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取用户组列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-group/`

### 请求方法

`GET`

### 提交参数

- `parent_id` 用户组的组集 ID
- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d parent_id=1 \
https://cloud.minapp.com/oserve/v1/user-group/
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
            "id": 47,
            "members": 0,
            "name": "User Group",
            "parent": {
                "id": 1,
                "name": "Super Group"
            }
        }
    ]
}
```

- `members` 表示在用户组下的用户数量
- `parent` 表示用户组的组集

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    parent_id: "234565423456787645xx",   // 可选, 没有用户组的组集 ID, 可以设置为 null 或者不设置
    offset: 0,         // 可选
    limit: 20          // 可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

## 获取用户组详情

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

`group_id` 是用户组的 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-group/47/
```

### 返回示例

```json
{
    "id": 47,
    "members": 0,
    "name": "User Group",
    "parent": {
        "id": 1,
        "name": "Super Group"
    }
}
```

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/655',  // 655 对应 :group_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

## 创建用户组

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-group/`

### 请求方法

`POST`

### 请求参数

- `name` 用户组的名称
- `parent` 组集 ID（可选）

### 请求示例

```
curl -X POST \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "User Group"}' \
https://cloud.minapp.com/oserve/v1/user-group/
```

### 状态码说明

- `201` 写入成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'testGroup'
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode, body)
})
```

## 修改用户组

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

`group_id` 是用户组的 ID

### 请求方法

`PUT`

### 请求示例

```
curl -X PUT \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "user group"}' \
https://cloud.minapp.com/oserve/v1/user-group/47/
```

### 返回示例

```json
{
    "id": 47,
    "members": 0,
    "name": "user group",
    "parent": {
        "id": 1,
        "name": "Super Group"
    }
}
```

### 状态码说明

- `200` 修改成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/655/',  // 655 对应 :group_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'testGroup_3'   // 修改后的用户组名
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```

## 删除用户组

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-group/:group_id/`

### 请求方法

`DELETE`

### 请求示例

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-group/47/
```

### 状态码说明

- `204` 删除成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/655/',  // 655 对应 :group_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```

## 批量删除用户组

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-group/?id__in=:group_id,group1_id`

### 请求方法

`DELETE`

### 请求示例

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-group/?id__in=48,50
```

### 状态码说明

- `204` 删除成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-group/?id__in=652,653',  // id__in=652,653 对应 id__in=:group_id,group1_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```