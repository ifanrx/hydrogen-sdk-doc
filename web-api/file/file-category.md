# 文件分类操作

## 获取分类详情

**接口**

`GET https://cloud.minapp.com/hserve/v1.3/file-category/:category_id/`

其中 `:category_id` 需替换为你的文件分类 ID

**请求示例**

{% tabs getDetailCurl="Curl", getDetailNode="Node", getDetailPHP="PHP" %}

{% content "getDetailCurl" %}

```
curl -X GET \
-H "X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***" \
-H "Authorization: Hydrogen-r1  58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v1.3/file-category/5a1bb2ed7026d950ca7d2a78/
```

{% content "getDetailNode"%}


```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/hserve/v1.3/file-category/5a2fe91508443e3123dbe1xx/',  // 5a2fe91508443e3123dbe1xx 对应 uri :category_id
  method: 'GET',
  headers: {
    Authorization: `Hydrogen-r1  ${token}`
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "getDetailPHP"%}

```php
<?php
$category_id = '5a2fe91508443e3123dbe1xx'; // 文件分类 ID
$url = "https://cloud.minapp.com/hserve/v1.3/file-category/{$category_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Hydrogen-r1  {$token}",
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

`GET https://cloud.minapp.com/hserve/v1.3/file-category/`

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | N   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**请求示例**

{% tabs getCategoryCurl="Curl", getCategoryNode="Node", getCategoryPHP="PHP" %}

{% content "getCategoryCurl" %}

```
curl -X GET \
-H "X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***" \
-H "Authorization: Hydrogen-r1  58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
https://cloud.minapp.com/hserve/v1.3/file-category/
```

{% content "getCategoryNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/hserve/v1.3/file-category/',
  method: 'GET',
  headers: {
    Authorization: `Hydrogen-r1  ${token}`
  },
  qs: {     // query string, 被附加到uri的参数
    offset: 0,     // 可选
    limit: 20,     // 可选
    order_by: 'created_at'  // 按照创建时间来排序，可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
```

{% content "getCategoryPHP"%}

```php
<?php
$url = "https://cloud.minapp.com/hserve/v1.3/file-category/";

$ch = curl_init();
$header = array(
  "Authorization: Hydrogen-r1  {$token}",
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
