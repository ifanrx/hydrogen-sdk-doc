# 获取内容

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取内容列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/content/detail/`

### 请求方法

`GET`

### 排序

接口支持以 `created_at` 字段进行排序，默认是以`创建时间的顺序`进行排序。

通过提交 `order_by` 参数来更改接口的排序；

示例：

```
# 顺序
https://cloud.minapp.com/oserve/v1/content/detail/?order_by=created_at

# 倒序
https://cloud.minapp.com/oserve/v1/content/detail/?order_by=-created_at
```

### 提交参数

- `category_id` 内容分类的 ID
- `content_group_id` 内容库的 ID
- `order_by` 对资源进行排序
- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）

  `category_id` 和 `content_group_id` 参数值应该是换取 `token` 的应用下的内容分类 ID 和内容库 ID。

  注意：发起请求时需要携带 `category_id` 或 `content_group_id` 参数。

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
-d category_id=category_id \
https://cloud.minapp.com/oserve/v1/content/detail/?content_group_id=1
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
            "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
            "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
            "created_at": 1504152062,
            "description": "超新约全书摘要",
            "id": 1680,
            "title": "超新约全书"
        }
    ]
}
```

## 获取内容详情

### 接口地址

`https://cloud.minapp.com/oserve/v1/content/detail/:content_id/`

`content_id` 是内容的 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/detail/:content_id/
```

### 返回示例

```json
{
    "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
    "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
    "created_at": 1504152062,
    "description": "超新约全书摘要",
    "id": 1680,
    "title": "超新约全书"
}
```
