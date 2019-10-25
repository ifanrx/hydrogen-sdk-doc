# 内容分类操作

## 获取内容分类详情

**接口**

`GET /hserve/v1/content/category/:category_id/`

其中 `category_id` 是内容分类的 ID

**请求示例**
```shell
curl -X GET \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v1/content/category/1/
```

**返回示例**

```json
{
    "children": [
        {
            "have_children": false,
            "id": 1554806396128475,
            "name": "test"
        }
    ],
    "have_children": true,
    "id": 1554806170889376,
    "name": "ifanr"
}
```

**返回参数说明**

| 参数              | 类型      | 说明                       |
| :--------------- | :-------  | :-----------------------  |
| id               |  integer   | 分类 ID           |
| children         |  object array | 子分类详情    |
| have_children    |  bool    |  是否有子分类      |
| name             |  string   | 分类名称          |

## 获取内容分类列表

**接口**

`GET /hserve/v2.2/content/category/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**请求参数**

- `content_group_id` 内容库列表，必选参数。
- `return_total_count` 指定是否在返回结果 meta 中返回 total_count

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/hserve/v2.2/content/category/?limit=1&return_total_count=1
``` 

**请求示例**
```shell
curl -X GET \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/content/category/?content_group_id=1
```

**返回参数说明**

| 参数              | 类型      | 说明                       |
| :--------------- | :-------  | :-----------------------  |
| id               |  string   | id, 唯一标识               |
| name             |  string  | 分类名称                    |
| have_children    |  bool    |  是否有子分类               |
| offset           |  integer  |  偏移量                    |
| limit            |  integer  |  每次请求返回的最大记录数目    |
| previous         |  string   |  上一页地址                 |
| next             |  string   |  下一页地址                 |
| total_count      |  integer  |  记录总数目，仅当 return_total_count 为 1 时返回                 |


**返回示例**

```json
{
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 3
    },
    "objects": [
        {
            "have_children": true,
            "id": 1554806170889376,
            "name": "ifanr"
        },
        {
            "have_children": false,
            "id": 1554806175759642,
            "name": "weixin"
        },
        {
            "have_children": false,
            "id": 1554806180997534,
            "name": "tit"
        }
    ]
}
```
