# 工具模块

## 获取服务器时间

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/server/time/`

**代码示例**

{% tabs getTableCurl="Curl", getTableNode="Node", getTablePHP="PHP" %}

{% content "getTableCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/server/time/
```

{% content "getTableNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v2.2/server/time/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "getTablePHP" %}

```php
<?php
$url = "https://cloud.minapp.com/oserve/v2.2/server/time/";

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
  "time": "2019-11-22T16:09:26.903210+08:00"
}
```

**状态码说明**

`200`: 成功