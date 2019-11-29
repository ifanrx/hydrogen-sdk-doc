# 文件分类操作

## 获取分类详情

**接口**

`GET /hserve/v2.2/file-category/:category_id/`

其中 `:category_id` 需替换为你的文件分类 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/file-category/5a1bb2ed7026d950ca7d2a78/
```

**返回示例**

```json
{
  "files": 0,
  "id": "5a1bb2ed7026d950ca7d2a78",
  "name": "Category 1",
  "created_at": 1511761847,
  "parent": null,
  "subcategories": []
}
```


## 获取文件分类列表

**接口**

`GET /hserve/v2.2/file-category/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | string | N   | 排序（支持 `created_at` 进行排序）|
| limit    | integer | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | integer | N   | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | integer | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://{{服务器域名}}/hserve/v2.2/file-category/?limit=1&return_total_count=1
```

**请求示例**
```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/file-category/?order_by=-created_at
```

**返回参数说明**

| 参数              | 类型      | 说明                       |
| :--------------- | :-------  | :-----------------------  |
| id               |  string   | id, 唯一标识               |
| name             |  string  |  文件名                  |
| created_at       |  integer  | 创建时间                  |
| offset           |  integer  |  偏移量                    |
| limit            |  integer  |  每次请求返回的最大记录数目    |
| previous         |  string   |  上一页地址                 |
| next             |  string   |  下一页地址                 |
| total_count      |  integer  |  记录总数目，仅当 return_total_count 为 1 时返回                 |

**返回示例**

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

字段 `files` 在返回中有两个地方出现；在 `meta` 中表示应用上传文件的数量总和；在 `objects` 中表示每个分类下的上传文件的数量，同时字段 `files` 从 v2.2 版本开始仅在 return_total_count 为 1 时返回。
