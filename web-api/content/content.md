## 获取内容列表

**接口**

`GET /hserve/v2.2/content/detail/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**请求参数**
  * `where` 查询语句
  * `order_by` 排序字段
  * `return_total_count` 指定是否在返回结果 meta 中返回 total_count
  
  **以下参数需二选一**
  可选：
  * `category_id`      分类 ID
  * `content_group_id` 内容库 ID

`where` 可参考[查询数据](./query-record.md)中的使用方式

开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://{{服务器域名}}/hserve/v2.2/content/detail/?limit=1&return_total_count=1
```

**请求示例**

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v2.2/content/detail/?content_group_id=1548659930013242
```

**返回参数说明**

|      参数    |    类型       | 说明    |
| :---------- | :----------   | :----  |
| id          | integer       | 内容 ID |
| title       | string        | 内容标题 |
| cover       | file          | 封面图 |
| description | string        | 内容摘要 |
| categories  | array         | 所需分类的 ID |
| group_id    | integer       | 内容库 ID |
| created_at  | integer       | 内容创建时间 |
| updated_at  | integer       | 内容更新时间 |
| created_by       |  integer  |  创建者 id                 |
| offset           |  integer  |  偏移量                    |
| limit            |  integer  |  每次请求返回的最大记录数目    |
| previous         |  string   |  上一页地址                 |
| next             |  string   |  下一页地址                 |
| total_count      |  integer  |  记录总数目，仅当 return_total_count 为 1 时返回                 |

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

`GET /hserve/v2.2/content/detail/:content_id/`

其中 `content_id` 是内容的 ID

**请求示例**

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v2.2/content/detail/1/
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
| id          | integer       | 内容 ID |
| title       | string        | 内容标题 |
| content     | string        | 详细容 |
| cover       | file          | 封面图 |
| description | string        | 内容摘要 |
| group_id    | integer       | 内容库 ID |
| categories  | integer array | 内容所属分类的ID |
| created_at  | integer       | 内容创建时间 |
| updated_at  | integer       | 内容更新时间 |

**状态码说明**

`200`: 获取成功
