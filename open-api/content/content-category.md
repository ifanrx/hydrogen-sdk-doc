# 内容分类操作

## 获取内容分类详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/content/:content_group_id/category/:category_id/`

其中 `content_group_id` 是内容库的 ID, `category_id` 是内容分类的 ID

**代码示例**

{% tabs getContentCategoryCurl="Curl", getContentCategoryNode="Node", getContentCategoryPHP="PHP" %}

{% content "getContentCategoryCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/1/category/1/
```

{% content "getContentCategoryNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1/content/1/category/1/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getContentCategoryPHP" %}

```php
<?php
$content_group_id = 1; // 内容库的 ID
$category_id = 1; // 内容分类的 ID
$url = "https://cloud.minapp.com/oserve/v1/content/{$content_group_id}/category/{$category_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res = curl_exec($ch);
curl_close($ch);
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

|      参数     |      类型     |   说明   |
| :-------------| :----------- | :------ |
| id            | Integer      | 分类 ID |
| name          | String       | 分类名称 |
| parent        | Object       | 分类的父类 |
| subcategories | Object Array | 子类名称 |
| created_at    | Integer      | 分类创建时间 |
| updated_at    | Integer      | 分类更新时间 |

## 获取内容分类列表

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/category/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**提交参数**

- parent 内容分类父分类列表查询

  `https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/category/?parent__isnull=true`

- name 内容分类名称的等值查询

  `https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/category/?name=category`

- return_total_count 指定是否在 meta 中返回 total_count

  `https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/category/?return_total_count=0`

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/category/?limit=1&return_total_count=1
``` 

**代码示例**

{% tabs getContentCategoryListCurl="Curl", getContentCategoryListNode="Node", getContentCategoryListPHP="PHP" %}

{% content "getContentCategoryListCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/content/1/category/
```

{% content "getContentCategoryListNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v2.2/content/1/category/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getContentCategoryListPHP" %}

```php
<?php
$content_group_id = 1;// 内容库的 ID
$url = "https://cloud.minapp.com/oserve/v2.2/content/{$content_group_id}/category/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res = curl_exec($ch);
curl_close($ch);
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

`POST https://cloud.minapp.com/oserve/v1/content/:content_group_id/category/`

**参数说明**

Content-Type: `application/json`

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-----  | :-- | :-- |
| name   | String  |  Y  | 分类名称 |
| parent | Integer |  N  | 父分类 ID |

> **warning**
> 注意：最多只允许三层嵌套分类

**代码示例**

{% tabs createContentCategoryCurl="Curl", createContentCategoryNode="Node", createContentCategoryPHP="PHP" %}

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

{% content "createContentCategoryNode" %}

```js
var request = require("request");

var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1/content/1/category/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  body: { name: "分类1" },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "createContentCategoryPHP" %}

```php
<?php
$content_group_id = 1;// 内容库的 ID
$param['name'] = 'CreateCategory';
$url = "https://cloud.minapp.com/oserve/v1/content/{$content_group_id}/category/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
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

`PUT https://cloud.minapp.com/oserve/v1/content/:content_group_id/category/:category_id/`


**代码示例**

{% tabs updateContentCategoryCurl="Curl", updateContentCategoryNode="Node", updateContentCategoryPHP="PHP" %}

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

{% content "updateContentCategoryNode" %}

```js
var request = require("request");

var options = { method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v1/content/1/category/3/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  body: { name: 'Test Category' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "updateContentCategoryPHP" %}

```php
<?php
$content_group_id = 1; // 内容库 ID
$category_id = 1;// 内容分类的 ID
$url = "https://cloud.minapp.com/oserve/v1/content/{$content_group_id}/category/{$category_id}/";
$param['name'] = 'updateCategory';

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
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

## 删除内容分类

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/content/:content_group_id/category/:category_id/`


**代码示例**

{% tabs deleteContentCategoryCurl="Curl", deleteContentCategoryNode="Node", deleteContentCategoryPHP="PHP" %}

{% content "deleteContentCategoryCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/content/1/category/1/
```

{% content "deleteContentCategoryNode" %}

```js
var request = require("request");

var options = { method: 'DELETE',
  url: 'https://cloud.minapp.com/oserve/v1/content/1/category/1/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

{% content "deleteContentCategoryPHP" %}

```php
<?php
$content_group_id = 1; // 内容库 ID
$category_id = 1;// 内容分类的 ID
$url = "https://cloud.minapp.com/oserve/v1/content/{$content_group_id}/category/{$category_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}


**状态码说明**

`204`: 删除成功
