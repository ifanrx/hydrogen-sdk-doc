# 文件分类操作

## 获取分类详情

**接口**

`GET /hserve/v1.3/file-category/:category_id/`

其中 `:category_id` 需替换为你的文件分类 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v1.3/file-category/5a1bb2ed7026d950ca7d2a78/
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

`GET /hserve/v1.3/file-category/`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | N   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**请求示例**
```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v1.3/file-category/?order_by=-created_at
```

**返回参数说明**

| 参数              | 说明                     |
| :--------------- | :----------------------- |
| id               | id, 唯一标识    |
| name            | 文件名        |
| created_at       | 创建时间        |
| offset           | 偏移量          |
| limit            | 每次请求返回的最大记录数目|
| previous         | 上一页地址       |
| next             | 下一页地址       |
| total_count      | 记录总数目       |

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

字段 `files` 在返回中有两个地方出现；在 `meta` 中表示应用上传文件的数量总和；在 `objects` 中表示每个分类下的上传文件的数量。
