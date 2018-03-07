# 内容操作

本文档介绍了内容的获取（包括内容表的自定义字段）和内容的创建、编辑和删除等操作

## 获取内容详情

**接口**

`GET https://cloud.minapp.com/userve/v1/content/:content_group_id/text/:text_id/`

其中 `content_group_id` 是内容库的 ID, `text_id` 是内容的 ID

**代码示例**

{% tabs getRichTextEntryCurl="Curl"%}

{% content "getRichTextEntryCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/content/1/text/1/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "title": "Title",
  "content": "",
  "cover": null,
  "description": "",
  "group_id": 1,
  "categories": [
    {
      "id": 1,
      "name": "category",
      "parent": null
    }
  ],
  "created_at": 1516950540,
  "updated_at": 1517800400
}
```

**返回参数说明**

|      参数    | 说明  |
| :---------- | :---- |
| id          | 内容 ID |
| title       | 内容标题 |
| content     | 详细容 |
| cover       | 封面图 |
| description | 内容摘要 |
| group_id    | 内容库 ID |
| categories  | 内容所属分类 |
| created_at  | 内容创建时间 |
| updated_at  | 内容更新时间 |


## 获取内容列表

**接口**

`GET https://cloud.minapp.com/userve/v1/content/1/text/`

**提交参数**

内容查询与[数据表接口](../record.md)查询保持一致

**代码示例**

{% tabs getRichTextEntryListCurlCurl="Curl"%}

{% content "getRichTextEntryListCurlCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/content/1/text/
```

{% endtabs %}

**返回示例**

```json
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "id": 1,
      "title": "Title",
      "content": "",
      "cover": null,
      "description": "",
      "group_id": 1,
      "categories": [
        {
          "id": 1,
          "name": "category",
          "parent": null
        }
      ],
      "created_at": 1516950540,
      "updated_at": 1517800400
    }
  ]
}
```

## 创建内容分类

**接口**

`POST https://cloud.minapp.com/userve/v1/content/:content_group_id/text/`

**参数说明**

Content-Type: `application/json`

内容表内置字段：

|      参数    |    类型       | 说明    |
| :---------- | :----------   | :----  |
| id          | Integer       | 内容 ID |
| title       | String        | 内容标题 |
| content     | String        | 详细容 |
| cover       | File          | 封面图 |
| description | String        | 内容摘要 |
| group_id    | Integer       | 内容库 ID |
| categories  | Integer Array | 内容所属分类 |
| created_at  | Integer       | 内容创建时间 |
| updated_at  | Integer       | 内容更新时间 |

内容接口参数格式将与[数据表接口](../record.md)保持一致


> **warning**
> 字段 group_id 将会被接口自动赋值，所以即使提交的数据中有 group_id 也将会被覆盖


**代码示例**

{% tabs createRichTextEntryCurl="Curl"%}

{% content "createRichTextEntryCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{"title": "Test Title"}' \
https://cloud.minapp.com/userve/v1/content/1/text/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 2,
  "title": "Test Title",
  "group_id": 1,
  "categories": [],
  "created_at": 1519960085,
  "updated_at": 1519960085
}
```


> **info**
> 在发送创建内容的请求没有对一些内置字段如 content、description 或自定义字段赋值时，接口返回的字段将不会包含这些未被赋值的字段；若希望接口返回所有的字段，可以在创建内容的请求中携带所有的字段；

> **info**
> 接口会根据字段在数据表中定义的类型对提交的数据进行强类型的判断，提交的数据类型不合法，接口将会过滤掉这些字段，只存储合法的字段

**状态码说明**

`201`: 创建成功

`400`: 提交数据为空；提交的数据都不合法


## 编辑内容分类

**接口**

`PUT https://cloud.minapp.com/userve/v1/content/:content_group_id/text/:text_id/`


**代码示例**

{% tabs updateRichTextEntryCurl="Curl"%}

{% content "updateRichTextEntryCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{"name": "Test Category"}' \
https://cloud.minapp.com/userve/v1/content/1/text/2/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 2,
  "title": "Test Title",
  "group_id": 1,
  "categories": [],
  "created_at": 1519960085,
  "updated_at": 1519960085
}
```

**状态码说明**

`200`: 修改成功

`400`: 提交数据为空；提交的数据都不合法


## 删除内容库

**接口**

`DELETE https://cloud.minapp.com/userve/v1/content/:content_group_id/text/:text_id/`


**代码示例**

{% tabs deleteRichTextEntryCurl="Curl"%}

{% content "deleteRichTextEntryCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/content/1/text/1/
```

{% endtabs %}


**状态码说明**

`204`: 删除成功
