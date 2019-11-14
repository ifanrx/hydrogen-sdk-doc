# 内容操作（新）

本文档介绍了内容的获取（包括内容表的自定义字段）和内容的创建、编辑和删除等操作

## 获取内容详情

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/text/:text_id/`

其中 `content_group_id` 是内容库的 ID, `text_id` 是内容的 ID

**代码示例**

{% tabs getRichTextEntryCurl="Curl", getRichTextEntryNode="Node", getRichTextEntryPHP="PHP" %}

{% content "getRichTextEntryCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/content/1/text/1/
```

{% content "getRichTextEntryNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v2.2/content/1/text/1/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getRichTextEntryPHP" %}

```php
<?php
$content_group_id = 1; // 内容库 ID
$text_id = 1; // 内容 ID
$url = "https://cloud.minapp.com/oserve/v2.2/content/{$content_group_id}/text/{$text_id}/";

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

|      参数    |     类型     |   说明 |
| :---------- | :----------- | :---- |
| id          | Integer      |  内容 ID |
| title       | String       |  内容标题 |
| content     | String       |  详细容 |
| cover       | String       |  封面图 |
| description | String       |  内容摘要 |
| group_id    | Integer      |  内容库 ID |
| categories  | Object Array |  内容所属分类 |
| created_at  | Integer      |  内容创建时间 |
| updated_at  | Integer      |  内容更新时间 |


## 获取内容列表

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/text/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**提交参数**

内容查询与[数据表接口](../data/record.md)查询保持一致

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/text/?limit=1&return_total_count=1
```

**代码示例**

{% tabs getRichTextEntryListCurlCurl="Curl", getRichTextEntryListCurlNode="Node", getRichTextEntryListPHP="PHP" %}

{% content "getRichTextEntryListCurlCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/content/1/text/
```

{% content "getRichTextEntryListCurlNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v2.2/content/1/text/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getRichTextEntryListPHP" %}

```php
<?php
$content_group_id = 1; // 内容库 ID
$url = "https://cloud.minapp.com/oserve/v2.2/content/{$content_group_id}/text/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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

## 创建内容

**接口**

`POST https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/text/`

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

内容接口参数格式将与[数据表接口](../data/record.md)保持一致

> **danger**
> 字段 group_id 将会被接口自动赋值，所以即使提交的数据中有 group_id 也将会被覆盖

**代码示例**

{% tabs createRichTextEntryCurl="Curl", createRichTextEntryNode="Node", createRichTextEntryPHP="PHP" %}

{% content "createRichTextEntryCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{"title": "Test Title"}' \
https://cloud.minapp.com/oserve/v2.2/content/1/text/
```

{% content "createRichTextEntryNode" %}

```js
var request = require("request");

var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v2.2/content/1/text/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  body: { title: 'Test Title' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "createRichTextEntryPHP" %}

```php
<?php
$content_group_id = 1;
$param['title'] = 'TestCreateGroup';
$url = "https://cloud.minapp.com/oserve/v2.2/content/{$content_group_id}/text/";

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
<br></br>
>接口会根据字段在数据表中定义的类型对提交的数据进行强类型的判断，提交的数据类型不合法，接口将会过滤掉这些字段，只存储合法的字段

**状态码说明**

`201`: 创建成功

`400`: 提交数据为空；提交的数据都不合法


## 编辑内容

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/text/:text_id/`


**代码示例**

{% tabs updateRichTextEntryCurl="Curl", updateRichTextEntryNode="Node", updateRichTextEntryPHP="PHP" %}

{% content "updateRichTextEntryCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{"title": "Test Category"}' \
https://cloud.minapp.com/oserve/v2.2/content/1/text/2/
```
{% content "updateRichTextEntryNode" %}

```js
var request = require("request");

var options = { method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v2.2/content/1/text/2/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  body: { title: 'Test Category' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```
{% content "updateRichTextEntryPHP" %}

```php
<?php
$content_group_id = 1; // 内容库 ID
$text_id = 2; // 内容 ID
$url = "https://cloud.minapp.com/oserve/v2.2/content/{$content_group_id}/text/{$text_id}/";
$param['title'] = 'TestUpdate';

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


## 删除内容

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.2/content/:content_group_id/text/:text_id/`


**代码示例**

{% tabs deleteRichTextEntryCurl="Curl", deleteRichTextEntryNode="Node", deleteRichTextEntryPHP="PHP" %}

{% content "deleteRichTextEntryCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/content/1/text/1/
```

{% content "deleteRichTextEntryNode" %}

```js
var request = require("request");

var options = { method: 'DELETE',
  url: 'https://cloud.minapp.com/oserve/v2.2/content/1/text/1/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "deleteRichTextEntryPHP" %}

```php
<?php
$content_group_id = 1; // 内容库 ID
$text_id = 1; // 内容 ID
$url = "https://cloud.minapp.com/oserve/v2.2/content/{$content_group_id}/text/{$text_id}/";

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
