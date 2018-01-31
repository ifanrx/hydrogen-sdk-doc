# 获取内容库

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取内容库列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/content/group/`

### 请求方法

`GET`

### 提交参数

- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/group/
```

### 返回示例

```json
{
    "meta": {
        "limit": 10,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 1
    },
    "objects": [
        {
            "id": 1680,
            "name": "内容库 1"
        }
    ]
}
```

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/group/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // query string, 被附加到uri的参数
    offset: 0, // 可选
    limit: 20  // 可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

## 获取内容详情

### 接口地址

`https://cloud.minapp.com/oserve/v1/content/group/:content_group_id/`

`content_group_id` 是内容库 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/group/:content_group_id/
```

### 返回示例

```json
{
    "id": 1680,
    "name": "内容库 1"
}
```

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/content/group/15130762111906xx/',  // 15130762111906xx 对应 uri :content_group_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // query string, 被附加到uri的参数
    content_group_id: '15130762111906xx'
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```
