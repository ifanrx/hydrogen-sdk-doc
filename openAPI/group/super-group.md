# 组集的操作

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取组集列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-supergroup/`

### 请求方法

`GET`

### 提交参数

- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
https://cloud.minapp.com/oserve/v1/user-supergroup/
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
            "children": [
                {
                    "id": 51,
                    "name": "User Group"
                },
            ],
            "id": 52,
            "name": "Super Group"
        }
    ]
}
```

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(body)
}
```

## 获取组集详情

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-supergroup/:group_id/`

`group_id` 是组集的 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-supergroup/52/
```

### 返回示例

```json
{
    "children": [
        {
            "id": 51,
            "name": "User Group"
        }
    ],
    "id": 52,
    "name": "Super Group"
}
```

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/666',  // 666 对应 :group_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

## 创建组集

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-supergroup/`

### 请求方法

`POST`

### 请求参数

- `name` 组集的名称
- `children` 用户组 ID 列表

### 请求示例

```
curl -X POST \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "Super Group", "children": [51]}' \
https://cloud.minapp.com/oserve/v1/user-supergroup/
```

### 状态码说明

- `201` 写入成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {
    name: 'super group',
    children: [561]
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
```

## 修改组集

请注意本接口 **会清除掉旧有的组集和用户组的关系，重新与传入的用户组建立关系**。

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-supergroup/:group_id/`

`group_id` 是组集的 ID

### 请求方法

`PUT`

### 请求示例

```
curl -X PUT \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "super group 3", "children": [51]}' \
https://cloud.minapp.com/oserve/v1/user-supergroup/52/
```

### 返回示例

```json
{
    "children": [
        {
            "id": 51,
            "name": "User Group"
        }
    ],
    "id": 52,
    "name": "super group 3"
}
```

### 状态码说明

- `200` 修改成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/user-supergroup/666/',  // 665 对应 :group_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {
    name: 'super group',
    children: [561]
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode, body)
})
```

## 删除组集

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-supergroup/:group_id/`

### 请求方法

`DELETE`

### 请求示例

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-supergroup/52/
```

### 状态码说明

- `204` 删除成功


## 批量删除组集

### 接口地址

`https://cloud.minapp.com/oserve/v1/user-supergroup/?id__in=:group_id,group1_id`

### 请求方法

`DELETE`

### 请求示例

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/user-supergroup/?id__in=58,56
```

### 状态码说明

- `204` 删除成功
