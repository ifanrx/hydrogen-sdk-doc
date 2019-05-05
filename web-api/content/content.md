## 获取内容列表

**接口**

`GET /hserve/v2.0/content/detail/`

**请求参数**
  * `where` 查询语句
  * `order_by` 排序字段
  
  **以下参数需二选一**
  可选：
  * `category_id`      分类 ID
  * `content_group_id` 内容库 ID

`where` 的构造可参考[字段过滤和扩展](./query-keys-expand.md)

**请求示例**

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v2.0/content/detail/?content_group_id=1548659930013242
```

**返回参数说明**

| 参数              | 说明                     |
| :--------------- | :----------------------- |
| id               | id             |
| title            |  内容标题        |
| cover            |  封面图片地址     |
| description      |  简介           |
| group_id         |  分组 id        |
| created_at       | 创建时间        |
| updated_at       | 更新时间        |
| created_by       | 创建者 id       |
| offset           | 偏移量          |
| limit            | 每次请求返回的最大记录数目|
| previous         | 上一页地址       |
| next             | 下一页地址       |
| total_count      | 记录总数目       |

**返回示例**

```json
{
    "meta": {
        "next": null,
        "total_count": 1,
        "previous": null,
        "offset": 0,
        "limit": 20
    },
    "objects": [
        {
            "id": 1548659954888866,
            "cover": "https://cloud-minapp-18630.cloud.ifanrusercontent.com/1go1CEZfzPGKLfdP.jpg",
            "description": "",
            "categories": [
                1554806170889376,
                1554806175759642
            ],
            "created_by": 16042162,
            "updated_at": 1554806203,
            "title": "hello",
            "group_id": 1548659930013242,
            "created_at": 1548659954
        }
    ]
}
```

## 获取内容详情

**接口**

`GET /hserve/v2.0/content/detail/:content_id/`

其中 `content_id` 是内容的 ID

**请求示例**

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v2.0/content/detail/1/
```

**返回示例**

```json
{
    "id": 1548659954888866,
    "cover": "https://cloud-minapp-18630.cloud.ifanrusercontent.com/1go1CEZfzPGKLfdP.jpg",
    "description": "",
    "created_at": 1548659954,
    "created_by": 16042162,
    "content": "<p><img src=\"https://cloud-minapp-18630.cloud.ifanrusercontent.com/1go1CJNRACOs442M.jpg\"/></p>",
    "updated_at": 1554806203,
    "title": "hello",
    "group_id": 1548659930013242,
    "categories": [
        1554806170889376,
        1554806175759642
    ]
}
```

**返回参数说明**

内容表内置字段：

|      参数    |    类型       | 说明    |
| :---------- | :----------   | :----  |
| id          | Integer       | 内容 ID |
| title       | String        | 内容标题 |
| content     | String        | 详细容 |
| cover       | File          | 封面图 |
| description | String        | 内容摘要 |
| group_id    | Integer       | 内容库 ID |
| categories  | Integer Array | 内容所属分类的ID |
| created_at  | Integer       | 内容创建时间 |
| updated_at  | Integer       | 内容更新时间 |

**状态码说明**

`200`: 获取成功
