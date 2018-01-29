# 文件分类的管理

开发者可以根据文件分类管理所上传的文件。

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取文件分类列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/file-category/`

### 请求方法

`GET`

### 提交参数

- `order_by` 排序（支持 `created_at` 进行排序）
- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
https://cloud.minapp.com/oserve/v1/file-category/
```

### 返回示例

```json
{
    "meta": {
        "files": 7,
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 1
    },
    "objects": [
        {
            "files": 0,
            "id": "5a1bb2ed7026d950ca7d2a78",
            "name": "Category 1",
            "created_at": 1511761847
        }
    ]
}
```

字段 `files` 在返回中有两个地方出现；在 `meta` 中表示应用上传文件的数量总和；在 `objects` 中表示每个分类下的上传文件的数量。

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file-category/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // 被附加到uri的参数
    offset: 0,     // 可选
    limit: 20,     // 可选
    order_by: 'created_at'  // 按照创建时间来排序，可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

## 获取分类详情

### 接口地址

`https://cloud.minapp.com/oserve/v1/file-category/:category_id/`

`category_id` 是文件分类的 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/file-category/5a1bb2ed7026d950ca7d2a78/
```

### 返回示例

```json
{
    "files": 0,
    "id": "5a1bb2ed7026d950ca7d2a78",
    "name": "Category 1",
    "created_at": 1511761847
}
```
### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file-category/5a2fe91508443e3123dbe1xx/',  // 5a2fe91508443e3123dbe1xx 对应 uri :category_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // 被附加到uri的参数
    category_id: '5a2fe91508443e3123dbe1xx'
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
    
```

## 创建文件分类

### 接口地址

`https://cloud.minapp.com/oserve/v1/file-category/`

### 请求方法

`POST`

### 请求参数

- `name` 文件分类的名称

### 请求示例

```
curl -X POST \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "Category"}' \
https://cloud.minapp.com/oserve/v1/file-category/
```

### 状态码说明

- `201` 写入成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file-category/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {
    name: 'testCreateFile'
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
    
```

## 修改文件分类

### 接口地址

`https://cloud.minapp.com/oserve/v1/file-category/:category_id/`

`category_id` 是文件分类的 ID

### 请求方法

`PUT`

### 请求示例

```
curl -X PUT \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-d '{"name": "category"}' \
https://cloud.minapp.com/oserve/v1/file-category/5a1bb2ed7026d950ca7d2a78/
```

### 返回示例

```json
{
    "files": 0,
    "id": "5a1bb2ed7026d950ca7d2a78",
    "name": "category",
    "created_at": 1511761847
}
```

### 状态码说明

- `200` 修改成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file-category/5a6ad3cffff1d675b9e2cexx/',  // 5a6ad3cffff1d675b9e2cexx 对应 uri :category_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {
    name: 'testCreateFiles'
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
    
```

## 删除文件分类

### 接口地址

`https://cloud.minapp.com/oserve/v1/file-category/:category_id/`

### 请求方法

`DELETE`

### 请求示例

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/file-category/5a1bb2ed7026d950ca7d2a78/
```

### 状态码说明

- `204` 删除成功

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
    uri: 'https://cloud.minapp.com/oserve/v1/file-category/5a6ad3cffff1d675b9e2cexx/',  // 5a6ad3cffff1d675b9e2cexx 对应 uri :category_id
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  request(opt, function(err, res, body) {
      console.log(res.statusCode)
  })
    
```
