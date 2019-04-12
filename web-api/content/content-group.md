# 内容库操作

## 获取内容库详情

**接口**

`GET https://cloud.minapp.com/hserve/v1/content/group/:content_group_id/`

其中 `content_group_id` 是内容库的 ID

**请求示例**

{% tabs getContentGroupCurl="Curl", getContentGroupNode="Node", getContentGroupPHP="PHP" %}

{% content "getContentGroupCurl" %}

```
curl -X GET \
-H "Authorization: Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v1/content/group/1/
```

{% content "getContentGroupNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/hserve/v1/content/group/1/',
  headers: 
   { 'Content-Type': 'application/json',
     Authorization: 'Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getContentGroupPHP" %}

```php
<?php
$content_group_id = 1; // 内容库的 ID
$url = "https://cloud.minapp.com/hserve/v1/content/group/{$content_group_id}/";

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
  "id": 1,
  "name": "内容库"
}
```

## 获取内容库列表

**接口**

`GET https://cloud.minapp.com/hserve/v1/content/group/`


**请求示例**

{% tabs getContentGroupListCurl="Curl", getContentGroupListNode="Node", getContentGroupListPHP="PHP" %}

{% content "getContentGroupListCurl" %}

```
curl -X GET \
-H "Authorization: Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v1/content/group/
```

{% content "getContentGroupListNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/hserve/v1/content/group/',
  headers: 
   { 'Content-Type': 'application/json',
     Authorization: 'Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getContentGroupListPHP" %}

```php
<?php
$url = "https://cloud.minapp.com/hserve/v1/content/group/";

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
    }
  ]
}
```
