# 内容分类操作

## 获取内容分类详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/:content_group_id/category/:category_id/`

其中 `content_group_id` 是内容库的 ID, `category_id` 是内容分类的 ID

**代码示例**

{% tabs getContentCategoryCurl="Curl"%}

{% content "getContentCategoryCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/1/category/1/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "name": "category",
  "parent": null,
  "subcategories": [
    {
      "id": 2,
      "name": "subcategory",
      "parent": {
        "id": 1,
        "name": "category"
      },
      "subcategories": [],
      "created_at": 1519901783,
      "updated_at": 1519901783
    }
  ],
  "created_at": 1516963449,
  "updated_at": 1516963449
}
```

**返回参数说明**

|      参数     | 说明 |
| :-------------| :------ |
| id            | 分类 ID |
| name          | 分类名称 |
| parent        | 分类的父类 |
| subcategories | 子类名称 |
| created_at    | 分类创建时间 |
| updated_at    | 分类更新时间 |

## 获取内容分类列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/1/category/1/`

**提交参数**

- parent 内容分类父分类列表查询

  `https://cloud.minapp.com/oserve/v1/content/:content_id/category/?parent__isnull=true`

- name 内容分类名称的等值查询

  `https://cloud.minapp.com/oserve/v1/content/:content_id/category/?name=category`


**代码示例**

{% tabs getContentCategoryListCurl="Curl"%}

{% content "getContentCategoryListCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/1/category/
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
    "total_count": 2
  },
  "objects": [
    {
      "id": 1,
      "name": "category",
      "parent": null,
      "subcategories": [
        {
          "id": 2,
          "name": "subcategory",
          "parent": {
            "id": 1,
            "name": "category"
          },
          "subcategories": [],
          "created_at": 1519901783,
          "updated_at": 1519901783
        }
      ],
      "created_at": 1516963449,
      "updated_at": 1516963449
    },
    {
      "id": 2,
      "name": "subcategory",
      "parent": {
        "id": 1516963449144537,
        "name": "category"
      },
      "subcategories": [],
      "created_at": 1519901783,
      "updated_at": 1519901783
    }
  ]
}
```

## 创建内容分类

**接口**

`POST https://cloud.minapp.com/oserve/v1/content/`

**参数说明**

Content-Type: `application/json`

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-----  | :-- | :-- |
| name   | String  |  Y  | 分类名称 |
| parent | Integer |  N  | 父分类 ID |

> **warning**
> 注意：最多只允许三层嵌套分类

**代码示例**

{% tabs createContentCategoryCurl="Curl"%}

{% content "createContentCategoryCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "name": "分类1",
    }' \
https://cloud.minapp.com/oserve/v1/content/1/category/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 3,
  "name": "分类1",
  "parent": null,
  "subcategories": [],
  "created_at": 1519910966,
  "updated_at": 1519910966
}
```

**状态码说明**

`201`: 创建成功

`400`: 同一父分类下的子分类名不能相同；父分类 ID 不合法


## 编辑内容分类

**接口**

`PUT https://cloud.minapp.com/oserve/v1/content/:content_group_id/catgegory/:category_id/`


**代码示例**

{% tabs updateContentCategoryCurl="Curl"%}

{% content "updateContentCategoryCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "name": "Test Category"
    }' \
https://cloud.minapp.com/oserve/v1/content/1/category/3/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 3,
  "name": "Test Category",
  "parent": null,
  "subcategories": [],
  "created_at": 1519910966,
  "updated_at": 1519910966
}
```

**状态码说明**

`200`: 修改成功

`400`: 同一父分类下的子分类名不能相同；父分类 ID 不合法

## 删除内容库

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/content/:content_group_id/category/:category_id/`


**代码示例**

{% tabs deleteContentCategoryCurl="Curl"%}

{% content "deleteContentCategoryCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/1/category/1/
```

{% endtabs %}


**状态码说明**

`204`: 删除成功
