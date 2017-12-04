# 获取内容分类

本文档所描述的接口均需要同认证授权才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 获取内容分类列表

### 接口地址

`https://cloud.minapp.com/oserve/v1/content/category/`

### 请求方法

`GET`

### 提交参数

- `content_group_id` 内容库的 ID
- `offset` 返回资源的起始偏移值
- `limit` 返回资源的个数（默认为 20，最大可设置为 1000）

  `content_group_id` 参数值应该是换取 `token` 的应用下的内容库 ID。

  注意：发起请求时需要携带 `content_group_id` 参数。

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
-d content_group_id=content_group_id \
https://cloud.minapp.com/oserve/v1/content/category/?content_group_id=1
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
            "name": "分类 1",
            "have_children": true
        }
    ]
}
```

`have_children` 表示该分类是否包含子分类，通过`获取内容分类详情接口`可获得子分类的内容。


## 获取内容分类详情

### 接口地址

`https://cloud.minapp.com/oserve/v1/content/category/:category_id/`

`category_id` 是内容分类的 ID

### 请求方法

`GET`

### 请求示例

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/category/:category_id/
```

### 返回示例

```json
{
    "id": 1680,
    "name": "分类 1",
    "have_children": true,
    "children": [
        {
            "have_children": false,
            "id": 1708,
            "name": "子分类"
        }
    ]
}
```
