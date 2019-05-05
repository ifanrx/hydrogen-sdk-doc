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

|      参数      |   说明   |
| :-------------| :------ |
| id            | 分类 ID |
| name          | 分类名称 |
| have_children | 是否有子分类 |
| children      | 子分类详情 |

## 获取内容分类列表

**接口**

`GET /hserve/v1/content/category/`

**请求参数**

- `content_group_id` 内容库列表，必选参数。

**请求示例**
```shell
curl -X GET \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v1/content/category/?content_group_id=1
```

**返回参数说明**

| 参数              | 说明                     |
| :--------------- | :----------------------- |
| id               | 分类 ID |
| name             | 分类名称 |
| have_children    | 是否有子分类 |
| offset           | 偏移量          |
| limit            | 每次请求返回的最大记录数目|
| previous         | 上一页地址       |
| next             | 下一页地址       |
| total_count      | 记录总数目       |

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
