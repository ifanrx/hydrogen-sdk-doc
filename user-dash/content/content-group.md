# 内容库操作

## 获取内容库详情

**接口**

`GET https://cloud.minapp.com/userve/v1/content/:content_group_id/`

其中 `content_group_id` 是内容库的 ID

**代码示例**

{% tabs getContentGroupCurl="Curl"%}

{% content "getContentGroupCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/content/1/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "name": "内容库",
  "acl_gids": [],
  "created_at": 1489137188,
  "updated_at": 1495769882
}
```

## 获取内容库列表

**接口**

`GET https://cloud.minapp.com/userve/v1/content/`

**提交参数**

- name 内容库名称等值查询查询

  例：查询内容库名称为 "内容库1" 的内容库

  `https://cloud.minapp.com/userve/v1/content/?name=内容库1`



**代码示例**

{% tabs getContentGroupListCurl="Curl"%}

{% content "getContentGroupListCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/content/
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
      "name": "内容库",
      "acl_gids": [],
      "created_at": 1489137188,
      "updated_at": 1495769882
    }
  ]
}
```

## 创建内容库

**接口**

`POST https://cloud.minapp.com/userve/v1/content/`

**参数说明**

Content-Type: `application/json`

|   参数    |      类型     | 必填 | 说明 |
| :------- | :-----------  | :--- | :--- |
| name     | String        |  Y   | 内容库名称 |
| acl_gids | Integer Array |  N   | 用户的访问权限，其内为分组 ID |

**代码示例**

{% tabs createContentGroupCurl="Curl"%}

{% content "createContentGroupCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "name": "Content Group",
      "acl_gids": [1, 2]
    }' \
https://cloud.minapp.com/userve/v1/content/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 2,
  "name": "Content Group",
  "acl_gids": [1, 2],
  "created_at": 1489137188,
  "updated_at": 1495769882
}
```

**状态码说明**

`201`: 创建成功

`400`: 用户组 ID 不合法


## 编辑内容库

**接口**

`PUT https://cloud.minapp.com/userve/v1/content/:content_group_id/`


**代码示例**

{% tabs updateContentGroupCurl="Curl"%}

{% content "updateContentGroupCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "name": "Test Group"
    }' \
https://cloud.minapp.com/userve/v1/content/2/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 2,
  "name": "Test Group",
  "acl_gids": [1, 2],
  "created_at": 1489137188,
  "updated_at": 1495769882
}
```

**状态码说明**

`200`: 修改成功

`400`: 用户组 ID 不合法


## 删除内容库

**接口**

`DELETE https://cloud.minapp.com/userve/v1/content/:content_group_id/`


**代码示例**

{% tabs deleteContentGroupCurl="Curl"%}

{% content "deleteContentGroupCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/content/2/
```

{% endtabs %}


**状态码说明**

`204`: 删除成功
