# 数据表操作

## 创建数据表

**接口**

`POST https://cloud.minapp.com/oserve/v1.8/table/`

**提交参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| name           | String(32)   |  是 | 数据表名（以字母开头，字母、数字、下划线的组合) |
| schema         | Object       |  是 | 数据表字段的元信息 |
| row_read_perm  | String Array |  是 | 数据表行的默认读权限 |
| row_write_perm | String Array |  是 | 数据表行的默认写权限 |
| write_perm     | String Array |  是 | 数据表的写权限 |

参数 row_read_perm 和 row_write_perm 控制数据表数据的读写权限，读权限表示用户是否有权限获取数据，写权限表示用户是否有权限更新数据。

参数 write_perm 控制数据表的写权限，即表示用户是否有权限创建数据。

权限参数的说明：

|       参数       |  类型  | 说明 |
| :-------------- | :---- | :--- |
| user:anonymous  | String| 所有人（临时用户 + 登录用户）可写／所有人（登录用户 + 未登录用户）可读 |
| user:*          | String| 登录用户（不包含匿名用户）可写／可读 |
| user:<:user_id> | String| 某个用户可写／可读 |
| gid:<:group_id> | String| 某个分组下的用户可写／可读 |

具体描述与使用场景可参考[ACL 访问控制列表](../../dashboard/acl.md)。

参数 schema 用于存储数据表字段的元信息，其结构遵循[JSON-Table-Schema](https://frictionlessdata.io/specs/table-schema/)的描述。

例：

```python
{
  "fields": [
    {
      "name": "field_name",
      "type": "string",
      "description": "description of field_name",
      "constraints": {
        "required": true # 设置写入/更新必填选项
      },
      "default": "hello, world", # 设置默认值
      "acl": {
        "clientVisibile": true, # 设置客户端可见
        "clientReadOnly": true, # 设置客户端只读
        "creatorVisible": true  # 设置创建者可见
      }
    }
  ]
}
```

数据表列的元信息：

|        属性     |       类型     | 必填 | 说明 |
| :-------------- | :------------ |:---| :-- |
| name            | String(32)    | 是 | 字段名（字母开头，字母、数字、下划线的组合） |
| type            | String        | 是 | 字段类型 |
| items           | Object        | 否 | 列表元素类型，array 字段类型必填 |
| format          | String        | 否 | geojson 字段类型必填，值默认为 `default` |
| description     | String        | 否 | 字段的描述，不填自动赋值为字段名称 |
| constraints     | Object        | 否 | 字段的约束属性，仅支持 required 属性 |
| default         | 跟字段类型一致  | 否 | 字段的默认值 |
| acl             | Object        | 否 | 字段权限相关的属性 |
| coordinate_type | String        | 否 | geojson 字段类型必填|
| schema_id       | String        | 否 | pointer 字段类型必填，表示关联的数据表 ID|

- `type` 目前支持 string、integer、number、boolean、array、geojson、file、date、reference(pointer 类型字段)等

- `items` 目前支持 string、integer、number、boolean 等

- `coordinate_type` 目前支持 wgs84（地球坐标）、gcj02（火星坐标）

若字段是 array 类型，字段元信息为：

```json
{
  "name": "array_field",
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

若字段是 geojson 类型，字段元信息为：

```json
{
  "name": "location",
  "type": "geojson",
  "format": "default",
  "coordinate_type": "gcj02"
}
```

若字段是 pointer 类型，字段元信息为：

```json
{
  "name": "pointer",
  "type": "reference",
  "schema_id": "1"
}
```

字段权限相关的属性存储在 acl 中：

|       属性      |   类型  | 必填 | 说明 |
| :--------------| :------ | :--| :--- |
| clientVisibile | Boolean | 否 | 客户端只读的标志位，true 表示字段在客户端只读，不能被写入／更新 |
| clientReadOnly | Boolean | 否 | 客户端可见的标志位， false 表示字段在客户端不可见 |
| creatorVisible | Boolean | 否 | 客户端创建者可见的标志位，true 表示字段在客户端只有创建者可见 |

**代码示例**

{% tabs createTableCurl="Curl", createTableNode="Node", createTablePHP="PHP" %}

{% content "createTableCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "name": "Table199",
      "schema": {
        "fields": [
          {
            "name": "String",
            "type": "string"
          }
        ]
      },
      "row_read_perm": ["user:*"],
      "row_write_perm": ["user:*"],
      "write_perm": ["user:*"]
    }' \
https://cloud.minapp.com/oserve/v1.8/table/
```
{% content "createTableNode" %}

```js
var request = require("request");

var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1.8/table/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  body:
   { name: 'Table199',
     schema: { fields: [ { name: 'String', type: 'string' } ] },
     row_read_perm: [ 'user:*' ],
     row_write_perm: [ 'user:*' ],
     write_perm: [ 'user:*' ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```
{% content "createTablePHP" %}
```php
<?php
$schema['fields'] = [array(
  'name' => 'String',
  'type' => 'string'
)];
$param['name'] = 'Table199';
$param['schema'] = $schema;
$param['row_read_perm'] = ['user:*'];
$param['row_write_perm'] = ['user:*'];
$param['write_perm'] = ['user:*'];
$url = 'https://cloud.minapp.com/oserve/v1.8/table/';

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
  "id": 1,
  "name": "Table",
  "protected_fields": null,
  "schema": {
    "fields": [
      {
        "description": "id",
        "name": "id",
        "type": "id"
      },
      {
        "description": "created_by",
        "name": "created_by",
        "type": "integer"
      },
      {
        "description": "created_at",
        "name": "created_at",
        "type": "integer"
      },
      {
        "description": "updated_at",
        "name": "updated_at",
        "type": "integer"
      },
      {
        "name": "String",
        "type": "string",
        "description": "string",
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

> **info**
> 字段如 id、created_by、created_at、updated_at 为自动添加的内置字段

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

`201`: 修改成功

`400`: 表名已存在；不合法的数据


## 获取数据表详情

**接口**

`GET https://cloud.minapp.com/oserve/v1.8/table/:table_id/`

**代码示例**

{% tabs getTableCurl="Curl", getTableNode="Node", getTablePHP="PHP" %}

{% content "getTableCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1.8/table/1/
```

{% content "getTableNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1.8/table/1/',
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
$table_id = 1; // 数据表 ID
$url = "https://cloud.minapp.com/oserve/v1.8/table/{$table_id}/";

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

**状态码说明**

`200`: 成功


## 获取数据表列表

**接口**

`GET https://cloud.minapp.com/oserve/v1.8/table/`

**提交参数**

- name 支持对数据表名的等值查询

`https://cloud.minapp.com/oserve/v1.8/table/?name=Table`

**代码示例**

{% tabs getTableListCurl="Curl", getTableListNode="Node", getTableListPHP="PHP" %}

{% content "getTableListCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1.8/table/
```

{% content "getTableListNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1.8/table/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getTableListPHP" %}

```php
<?php
$url = "https://cloud.minapp.com/oserve/v1.8/table/";

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


## 更新数据表

**接口**

`PUT https://cloud.minapp.com/oserve/v1.8/table/:table_id/`

> **info**
> 数据表更新接口支持一次更新一个或多个字段

**代码示例**

{% tabs updateTableCurl="Curl", updateTableNode="Node", updateTablePHP="PHP" %}

{% content "updateTableCurl" %}

```
curl -X PUT \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "name": "table"
    }' \
https://cloud.minapp.com/oserve/v1.8/table/1/
```

{% content "updateTableNode" %}

```js
var request = require("request");

var options = { method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v1.8/table/1/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  body: { name: 'table' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "updateTablePHP" %}

```php
<?php
$table_id = 1; // 数据表 ID
$url = "https://cloud.minapp.com/oserve/v1.8/table/{$table_id}/";
$param['name'] = 'table';

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
  "id": 1,
  "name": "table",
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

**状态码说明**

`200`: 修改成功

`400`: 表名已存在；不合法的数据

## 删除数据表

**接口**

`DELETE https://cloud.minapp.com/oserve/v1.8/table/:table_id/`

**代码示例**

{% tabs deleteTableCurl="Curl", deleteTablePHP="PHP" %}

{% content "deleteTableCurl" %}

```
curl -X DELETE \
-H "cookie: {{ cookie }}" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1.8/table/1/
```

{% content "deleteTablePHP" %}

```php
<?php
$table_id = 1; // 表 ID
$url = "https://cloud.minapp.com/oserve/v1.8/table/{$table_id}/";

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

# 索引

## 获取数据表下所有的唯一索引

**接口**

`GET https://cloud.minapp.com/oserve/v2.6/schema/:schema_id/index/`

**代码示例**

{% tabs getIndexCurl="Curl", getIndexNode="Node", getIndexPHP="PHP" %}

{% content "getIndexCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.6/schema/20/index/
```

{% content "getIndexNode" %}

```js
var request = require("request");

var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v2.6/schema/20/index/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
  	 json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getIndexPHP" %}

```php
<?php
$shema_id = 1; // 索引 ID
$url = "https://cloud.minapp.com/oserve/v2.6/schema/{$shema_id}/index/";

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

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
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
      "fields": ["name"],
      "index": "name_1"
    },
    {
      "fields": ["name", "description"],
      "index": "name_1_description_1"
    }
  ]
}
```

**状态码说明**

`200:`成功

`401:`未授权

## 建立（联合）唯一索引

**接口**

`POST https://cloud.minapp.com/oserve/v2.6/schema/:schema_id/index/`

**提交示例**

{% tabs createIndexCurl="Curl", createIndexNode="Node", createIndexPHP="PHP" %}

{% content "createIndexCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
      "fields":["name","description"]
    }' \
https://cloud.minapp.com/oserve/v2.6/schema/20/index/
```

{% content "createIndexNode" %}

```js
var request = require("request");

var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v2.6/schema/20/index/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4' },
     body: { fields: ["name","description"] },
  	 json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "createIndexPHP" %}

```php
<?php
$shema_id = 1; // 索引 ID
$url = "https://cloud.minapp.com/oserve/v2.6/schema/{$shema_id}/index/";
$param['fields'] = ["name","description"];

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
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
[
  {
    "fields": ["name"],
    "index": "name_1"
  },
  {
    "fields": ["name", "description"],
    "index": "name_1_description_1"
  }
]
```

**状态码说明**

`201:`成功

## 删除索引

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.6/schema/:schema_id/index/:index_name/`

**代码示例**

{% tabs deleteIndexCurl="Curl", deleteIndexPHP="PHP" %}

{% content "createIndexCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.6/schema/20/index/name_1
```

{% content "deleteIndexPHP" %}

```php
<?php
$shema_id = 1; // 关联表 ID
$index_name = "name_1"; // 索引名
$url = "https://cloud.minapp.com/oserve/v2.6/schema/{$shema_id}/index/{$index_name}";

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

`204:`成功



