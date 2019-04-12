# 数据表操作

## 获取数据表详情

**接口**

`GET https://cloud.minapp.com/hserve/v1/table/:table_id/`

**请求示例**

{% tabs getTableCurl="Curl", getTableNode="Node", getTablePHP="PHP" %}

{% content "getTableCurl" %}

```
curl -X GET \
-H "X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***" \
-H "Authorization: Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v1/table/1/
```

{% content "getTableNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/hserve/v1/table/1/',
  headers: 
   { 'Content-Type': 'application/json',
     Authorization: 'Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getTablePHP" %}

```php
<?php
$table_id = 1; // 数据表 ID
$url = "https://cloud.minapp.com/hserve/v1/table/{$table_id}/";

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
  "name": "Table",
  "protected_fields": null,
  "schema": {
    "fields": [
      {
        "name": "String",
        "type": "string"
      }
    ]
  },
  "write_perm": [
    "user:*"
  ],
  "default_row_perm": {
    "_read_perm": [
      "user:*"
    ],
    "_write_perm": [
      "user:*"
    ]
  },
  "created_at": 1519538564,
  "updated_at": 1519640477
}
```

**返回参数说明**

|        参数       |      类型    |   说明    |
| :--------------- | :----------- | :------- |
| id               | Integer      | 数据表 ID |
| name             | String       | 数据表名 |
| protected_fields | String Array | 内置表的保护字段，若数据表不是内置表，该字段为 null |
| schema           | Object       | 数据表字段的元信息 |
| write_perm       | String Array | 数据表写权限 |
| default_row_perm | Object       | 数据表行数据权限 |
| created_at       | Integer      | 数据表创建时间 |
| updated_at       | Integer      | 数据表更新时间 |

**状态码说明**

`200`: 成功


## 获取数据表列表

**接口**

`GET https://cloud.minapp.com/hserve/v1/table/`

**请求示例**

{% tabs getTableListCurl="Curl", getTableListNode="Node", getTableListPHP="PHP" %}

{% content "getTableListCurl" %}

```
curl -X GET \
-H "X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***" \
-H "Authorization: Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/hserve/v1/table/
```

{% content "getTableListNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/hserve/v1/table/',
  headers: 
   { 'Content-Type': 'application/json',
     Authorization: 'Hydrogen-r1  cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getTableListPHP" %}

```php
<?php
$url = "https://cloud.minapp.com/hserve/v1/table/";

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
      "name": "Table",
      "protected_fields": null,
      "schema": {
        "fields": [
          {
            "name": "String",
            "type": "string"
          }
        ]
      },
      "write_perm": [
        "user:*"
      ],
      "default_row_perm": {
        "_read_perm": [
          "user:*"
        ],
        "_write_perm": [
          "user:*"
        ]
      },
      "created_at": 1519538564,
      "updated_at": 1519640477
    }
  ]
}
```

**状态码说明**

`200`: 成功
