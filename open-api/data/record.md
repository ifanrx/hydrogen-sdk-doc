# 数据操作

获得数据表数据接口，支持对**内置表自定义字段的获取与修改**

## 查询数据

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| order_by | String | N   | 对资源进行字段排序 |
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | Number | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

例如需要查询价格为 10 元的物品时，我们应该这样构造查询语句:

```json
{
  "price": {"$eq": 10}
}
```

执行

```
curl -X GET \
-H "Authorization: Bearer token" \
-H "Content-Type: application/json" \
-G \
--data-urlencode 'where={"price":"$eq":10}' \
https://cloud.minapp.com/oserve/v2.2/table/1/record/
```

该接口完整支持的查询操作符如下：

| 查询操作符  | 含义 |
| :-------  | :-- |
| $eq       | 等于 |
| $ne       | 不等于 |
| $lt       | 小于 |
| $lte      | 小于等于 |
| $gt       | 大于 |
| $gte      | 大于等于 |
| $contains | 包含任意一个值 |
| $nin      | 不包含任意一个数组值 |
| $in       | 包含任意一个数组值 |
| $isnull   | 是否为 NULL |
| $range    | 包含数组值区间的值 |

使用以上查询操作符即可完成一些简单的条件查询，同时，你也可以使用 `$and` 和 `$or` 查询操作符，对以上查询操作符进行组合使用，完成更复杂的条件查询，如查询 __价格为 10 元且产品名称中包含 “包” 的物品__ 或 __价格大于 100 元的物品__，其筛选条件为：

```json
{
  "$or": [
    {
      "$and": [
        {
          "price": {"$eq": 10}
        },
        {
          "name": {"$contains": "包"}
        }
      ]
    },
    {
      "price": {"$gt": 100}
    }
  ]
}
```

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/?limit=1&return_total_count=1
``` 

## 排序返回查询数据

查询接口默认按**创建时间倒序**的顺序来返回数据列表，你也可以通过设置 `order_by` 参数来实现。

示例：

```
# 顺序
https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/?order_by=created_at

# 倒序
https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/?order_by=-created_at
```

**代码示例**

{% tabs first="Node", second="Python", third="PHP" %}

{% content "first" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      "price": {"$eq": 10}
    }),
    order_by: '-created_at',   // 可选
    offset: 0,    // 可选
    limit: 20,    // 可选
    return_total_count: 0    // 可选，若不指定则默认不返回 total_count
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "second" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://cloud.minapp.com/oserve/v2.2/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Bearer %s' % TOKEN
}

where_ = {
  'price': {'$gt': 100},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-created_at',
  'limit': 10,
  'offset': 0,
  'return_total_count': 0
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```

{% content "third" %}

```php
<?php
$table_id = 1; // 数据表 ID
$condition = array(
  'order_by' => '-created_at',
  'where' => json_encode(['price' => ['$gt' => 'test search']]),
  'limit' => '10',
  'offset' => '0',
  'return_total_count' => '0'
);
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/?";
$url .= http_build_query($condition);

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


## 获取数据项

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**代码示例**

{% tabs itemFirst="Node", itemSecond="PHP" %}

{% content "itemFirst" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/5a2fa9b008443e59e0e678xx/',  // 3906 对应 :table_id, 5a2fa9b008443e59e0e678xx 对应 :record_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "itemSecond" %}
```php
<?php
$table_id = 1;
$recornd_id = '5a2fa9b008443e59e0e678xx';
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/{$recornd_id}/";

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


## 写入数据

**接口**

`POST https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

> **info**
> - 插入的数据要与预先在知晓云平台设定的数据类型一致
> - 若插入数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终生成的数据中这几个字段将以插入数据中设置的字段值为准。

**代码示例**

{% tabs insertNode="Node", insertPHP="PHP" %}

{% content "insertNode" %}

```js
var request = require('request');

function getFile(cb) {
  var fileID = '5a2fe93308443e313a428cxx' // 文件 ID 需要到知晓云控制台文件面板获取
  var opt = {
    uri: `https://cloud.minapp.com/oserve/v2.2/file/${fileID}/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  request(opt, function (err, res, body) {
    cb(JSON.parse(body))
  })
}

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'nickname',
    desc: ['description'],
    price: 19,
    amount: 19,
    code: '18814098707',
    obj: {
      a: 1,
      b: 2,
    },
    geo: {
      coordinates: [10, 10],
      type: 'Point',
    },
    file: '',
    pointer: 	'72477415',  // 需要先获取到要指向的数据表行 id
  }
}

getFile(function (file) {
  opt.json.file = file
  request(opt, function(err, res, body) {
    console.log(res.statusCode)
  })
})
```

{% content "insertPHP" %}
```php
<?php
function getFile() {
  $file_id = '5a2fe93308443e313a428cxx'; // 文件 ID 需要到知晓云控制台文件面板获取
  $url = "https://cloud.minapp.com/oserve/v2.2/file/{$file_id}/";

  $header = array(
      "Authorization: Bearer {$token}",
      'Content-Type: application/json; charset=utf-8'
  );
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
  curl_setopt($curl, CURLOPT_TIMEOUT, 30);
  curl_setopt($curl, CURLOPT_HEADER, 0);
  curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);//这个是重点。
  $data = curl_exec($curl);
  curl_close($curl);
  return $data;
}
$table_id = 1;
$param = array(
  'name' =>'nickname',
  'desc' => 'description',
  'price' => 19,
  'amount' => 19,
  'code' => '18814098707',
  'obj' => array(
    'a': 1,
    'b': 2,
  ),
  'geo' => array(
    'coordinates' => array(10, 10),
    'type' => 'Point',
  ),
  'file' => getFile(),
  'pointer' => 	'72477415'  // 需要先获取到要指向的数据表行 id
);
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/";


$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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

**状态码说明**

`201` 写入成功，`400` 请求参数有错

> **info**
> 如果需要在数据表中存储文件，文件类型的字段必须要包含 `id, name, created_at, mime_type, cdn_path, size` 这几个属性，如果文件类型的字段没有保存成功，请检查文件字段有没有包含这几个属性

## 更新数据

本接口提供数据更新的能力，通过指定表 ID 以及 Record ID 来完成操作， 需注意，更新的数据所包含的字段需要与数据表中定义的字段一致。

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

> **info**
> - 更新的数据要与预先在知晓云平台设定的数据类型一致
> - 若更新数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终更新完成的数据中这几个字段将以更新数据中设置的字段值为准。

**代码示例**

{% tabs updateNode="Node", updatePHP="PHP" %}

{% content "updateNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/5a6ee2ab4a7baa1fc083e3xx/',  // 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'nickname'
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "updatePHP" %}

```php
<?php
$table_id = 1; // 数据表 ID
$record_id = '5a6ee2ab4a7baa1fc083e3xx'; // 记录 ID
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/{$record_id}/";
$param['name'] = 'nickname';

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

**状态码说明**

`201` 写入成功，`400` 请求参数有错


## 修改数据行 ACL 

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

假设 product 表 (id=3906) 中有一行 id 为 5a6ee2ab4a7baa1fc083e3xx 的数据行，目前其 acl 为 所有人可读，所有人可写，现在需要将其修改为 `用户组【开发人员】和创建者可写` 、`创建者可读`。

 其中用户组 `开发人员` 的 group_id 为 `656`、创建者的 user_id (对应 _userprofile 表中的 `id` 列) 为 `37087886`。

`write_perm` 和 `read_perm` 的可选值请参考 [数据表操作-创建数据表](./table.md) 小节

**代码示例**

{% tabs updateACLNode="Node", updateACLPHP="PHP" %}

{% content "updateACLNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/5a6ee2ab4a7baa1fc083e3xx/',  // 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    write_perm: [ "gid:656", "user:37087886"],
    read_perm: [ "user:37087886" ]
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```
{% content "updateACLPHP" %}
 
```php
<?php
$table_id = 3906; // 数据表 ID
$record_id = '5a6ee2ab4a7baa1fc083e3xx'; // 记录 ID
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/{$record_id}/";
$param['write_perm'] = [ "gid:656", "user:37087886"];
$param['read_perm'] = [ "user:37087886" ];

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
 
**状态码说明**

`200` 更新成功，`400` 请求参数有错


## 数据删除

> **danger**
> 本接口可直接删除任意数据，不受 ACL 控制

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**代码示例**

{% tabs deleteNode="Node", deletePHP="PHP" %}

{% content "deleteNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/5a6ee2ab4a7baa1fc083e3xx/',// 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "deletePHP" %}
```php
<?php
$table_id = 1; // 数据表 ID
$record_id = '5a6ee2ab4a7baa1fc083e3xx'; // 记录 ID
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/{$record_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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

`204` 删除成功


## 数据原子性更新

当请求同时对一个数据进行修改时，原子性更新使得冲突和覆盖导致的数据不正确的情况不会出现，目前支持的数据类型是**数字类型**和**数组类型**

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

本接口支持以下原子性操作：

(1) `incr_by` 对数字类型的字段的值进行增减操作

将对象中的价格（price）字段加 1

```json
{
  "price": {
    "$incr_by": 1
  }
}
```

将对象中的价格（price）字段减 1

```json
{
  "price": {
    "$incr_by": -1
  }
}
```

(2) `append` 对数组类型的字段的值追加一个数组

往对象中的 tag 字段追加 「Hello」

```json
{
  "tag": {
    "$append": ["Hello"]
  }
}
```

(3) `append_unique` 对数组类型的字段的值追加一个数组，但追加的数组里的数组项，如果已存在于原数组中，则该**数组项**不会再被追加

往对象中的 tag 字段追加 「Hello」，tag 字段依然为 `["Hello"]`

```json
{
  "tag": {
    "$append_unique": ["Hello"]
  }
}
```

(4) `remove` 从数组类型的字段的值里，删除包含在指定数组中的数组项

往对象中的 tag 字段删除 「Hello」

```json
{
  "tag": {
    "$remove": ["Hello"]
  }
}
```

**代码示例**

{% tabs atomicNode="Node", atomicPHP="PHP" %}

{% content "atomicNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/5a33406909a805412e3169xx/',  // 3906 对应 :table_id, 5a33406909a805412e3169xx 对应 :record_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    desc: {
      "$append": ['atomic data']
    },
    price: {
      "$incr_by": -1
    }
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "atomicPHP" %}

```php
<?php
$table_id = 1; // 数据表 ID
$record_id = '5a6ee2ab4a7baa1fc083e3xx'; // 记录 ID
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/{$record_id}/";
$param = array(
  'desc' => ['$append' => ['atomic data']], 
  'price' => ['$incr_by' => -1]
);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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

**状态码说明**

`200` 更新成功，`400` 操作符不支持/请求参数有错


> **danger**
> 以下操作仅适用于 API version >= v1.8


## pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/?where=query`

其中 `:table_id` 需替换为你的数据表 ID，query 为查询条件

**示例代码**

假设现在有两张表： order 表和 customer 表，order 表中有一个类型为 pointer，名称为 user 的字段，指向了 customer 表的数据行。
现在需要查询 order 表中，user 字段指向 customer 表中 id 为 `5bf4f7457fed8d6c2f5c3d6e` 的数据行。

{% tabs pointerFirst="Node", pointerSecond="Python", pointerThird="PHP" %}

{% content "pointerFirst" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      "user": {"$eq": "5bf4f7457fed8d6c2f5c3d6e"}
    }),
    order_by: 'id',   // 可选
    offset: 0,    // 可选
    limit: 20,    // 可选
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "pointerSecond" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://cloud.minapp.com/oserve/v2.2/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Bearer %s' % TOKEN
}

where_ = {
  'user': {'$eq': "5bf4f7457fed8d6c2f5c3d6e"},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-id',
  'limit': 10,
  'offset': 0,
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```

{% content "pointerThird" %}

```php
<?php
$table_id = 1; // 数据表 ID
$condition = array(
  'order_by' => '-id',
  'where' => json_encode(['user' => ['$eq' => '5bf4f7457fed8d6c2f5c3d6e']]),
  'limit' => '10',
  'offset' => '0',
);
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/?";
$url .= http_build_query($condition);

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


## 字段扩展

支持 expand created_by 以及 pointer 类型字段。返回结果中的 created_by 以及扩展的 pointer 类型字段会被替换为这个字段对应的完整对象。

> **info**
> 字段扩展功能仅支持在 v1.8 及以上版本接口使用

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/?expand=pointer,created_by`

其中 `:table_id` 需替换为你的数据表 ID

### expand 返回结果示例
不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 1234,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer": {"id": "5a2fa9b008443e59e0e67889", "_table": "pointer"}
}
```

使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": {
    "avatar": "https://media.ifanrusercontent.com/tavatar/fb/cd/xxxx.jpg",
    "id": 62536607,
    "nickname": "Larry。"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer": {
    "id": "5a2fa9b008443e59e0e67889",
    "_table": "pointer",
    "customized_field": "field_content"
  }
}
```

**代码示例**

{% tabs expandFirst="Node", expandSecond="Python", expandThird="PHP" %}

{% content "expandFirst" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      "price": {"$eq": 10}
    }),
    order_by: 'id',   // 可选
    offset: 0,    // 可选
    limit: 20,    // 可选
    expand: 'pointer,created_by',    //必选，表示需要扩展的字段
  }
}

request(opt, function(err, res, body) {
  console.log(body)
})
```

{% content "expandSecond" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://cloud.minapp.com/oserve/v2.2/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Bearer %s' % TOKEN
}

where_ = {
  'price': {'$gt': 100},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-id',
  'limit': 10,
  'offset': 0,
  'expand': 'pointer,created_by'
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```

{% content "expandThird" %}

```php
<?php
$table_id = 1; // 数据表 ID
$condition = array(
  'order_by' => '-id',
  'where' => json_encode(['price' => ['$gt' => 'test search']]),
  'limit' => '10',
  'offset' => '0',
  'expand' => 'pointer,created_by'
);
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/?";
$url .= http_build_query($condition);

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


## 添加 pointer 类型数据

**接口**

`POST https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**代码示例**

{% tabs pointerInsertNode="Node", pointerInsertPHP="PHP" %}

{% content "pointerInsertNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/',  // 3906 对应 :table_id
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    name: 'nickname',
    desc: ['description'],
    price: 19,
    amount: 19,
    code: '18814098707'
    pointer: '5a2fa9b008443e59e0e67889',    // pointer 关联的数据 ID
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "pointerInsertPHP" %}

```php
<?php
$table_id = 1;
$param = array(
  'pointer' => '5a2fa9b008443e59e0e67889'
);
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8',
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

**状态码说明**

`201` 写入成功

`400` 请求参数有错

## 更新 pointer 类型数据

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**代码示例**

{% tabs pointerUpdateNode="Node", pointerUpdatePHP="PHP" %}

{% content "pointerUpdateNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/table/3906/record/5a6ee2ab4a7baa1fc083e3xx',  // 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    pointer: '5a2fa9b008443e59e0e67889',    // pointer 关联的数据 ID
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "pointerUpdatePHP" %}

```php
<?php
$table_id = 1; // 数据表 ID
$record_id = '5a6ee2ab4a7baa1fc083e3xx'; // 记录 ID
$url = "https://cloud.minapp.com/oserve/v2.2/table/{$table_id}/record/{$record_id}/";
$param['pointer'] = '5a2fa9b008443e59e0e67889';

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

**状态码说明**

`200` 更新成功

`400` 请求参数有错

## 批量写入数据

**接口**

`POST https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。一次请求最多支持创建 1000 条数据，支持触发触发器。

**参数说明**

Content-Type: `application/json`

将需要批量创建的数据放到一个数组里提交。

**代码示例**

{% tabs bulkCreateRecordCurl="Curl", bulkCreateRecordNode="Node", bulkCreateRecordPHP="PHP" %}

{% content "bulkCreateRecordCurl"%}

```shell
curl -X POST \
  https://cloud.minapp.com/oserve/v2.2/table/70264/record/ \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
  -H 'Content-Type: application/json' \
  -d '[{"name": "Sam", "pretty": true}, {"name": "Sam", "pretty": true}]'
```

{% content "bulkCreateRecordNode" %}

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v2.2/table/70264/record/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  body: [{ 'name': 'Sam', 'pretty': true}, { 'name': 'Andrew', 'pretty': false}],
  json: true
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "bulkCreateRecordPHP"%}

```php
<?php
$token = '35919068aa799eccdef19160e1da4bf21381d2a2';
$url = "https://cloud.minapp.com/oserve/v2.2/table/70264/record/";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];
$payload = json_encode([
    ["name" => "Sam", "pretty" => true],
    ["name" => "Andrew", "pretty" => true]
  ]);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "operation_result": [
    {
      "success": {
        "id": "5cac254426eda1729d9f1d8c",
        "created_at": 1554785604
      }
    },
    {
      "error": {
        "err_msg": "数据写入失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。",
        "code": 11000
      }
    }
  ],
  "total_count": 2,
  "succeed": 1
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| total_count | Integer | 总共需要创建的记录数 |
| succeed | Integer | 创建成功的记录数 |
| operation_result | Array | 包含的元素类型是 Object，一个 Object 表示一条记录创建的结果。 |

operation_result 包含的 Object 的参数说明：

创建成功（对象中包含键：success）：

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| id | String | 记录 ID |
| created_at | Integer | 记录创建时的时间戳 |

创建失败（对象中包含键：error）：

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| err_msg | String | 错误信息 |
| code | Integer | 错误代码 |

**状态码说明**

`201`: 成功。

`400`: 参数错误，比如缺少必填项，数据类型不对。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 指定的数据表不存在。

## 同步批量修改数据

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求最多修改 1000 条数据，支持触发触发器。

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回待更新对象总数，以协助不关心对象总数只关心数据更新结果的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回待更新对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| limit    | Integer | Y   | 设置单次请求可以更新最大数据条数，默认为 1000 |
| offset   | Integer | N   | 设置更新的起始偏移值，默认为 0 |
| return_total_count   | Integer | N   | 返回结果中是否包含 total_count，1 为包含，0 为不包含，默认不包含 |

**参数说明**

Content-Type: `application/json`

与修改单条数据的参数一致。

**代码示例**

{% tabs bulkUpdateRecordCurl="Curl", bulkUpdateRecordNode="Node", bulkUpdateRecordPHP="PHP" %}

{% content "bulkUpdateRecordCurl"%}

```shell
curl -X PUT \
  https://cloud.minapp.com/oserve/v2.2/table/70264/record/ \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
  -H 'Content-Type: application/json' \
  -d '{"name": "Sam"}'
```

{% content "bulkUpdateRecordNode" %}

```javascript
var request = require("request");

var options = {
  method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v2.2/table/70264/record/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  body: {'name': 'Sam'},
  json: true
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "bulkUpdateRecordPHP"%}

```php
<?php
$token = '35919068aa799eccdef19160e1da4bf21381d2a2';
$url = "https://cloud.minapp.com/oserve/v2.2/table/70264/record/";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];
$payload = json_encode(["name" => "Sam"]);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "offset": 0,
  "operation_result": [
    {
      "success": {
        "updated_at": 1556414642,
        "id": "5cc5009f04cc155b1d61dc26"
      }
    }
  ],
  "next": null,
  "total_count": 1,
  "limit": 1000,
  "succeed": 1
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| total_count | Integer | 总共需要更新的记录数，仅在 return_total_count=1 的情况下返回 |
| succeed | Integer | 更新成功的记录数 |
| offset | Integer | 偏移量，默认为 0 |
| next | String | 下一次的更新链接，若待删除记录数超过 limit 指定的上限，可通过该链接继续更新，更新完成时值为：null |
| limit | Integer | 与 URL 中参数 limit 一致（默认为 1000） |
| operation_result | Array | 包含的元素类型是 Object，一个 Object 表示一条记录修改的结果。 |

operation_result 包含的 Object 的参数说明：

更新成功（对象中包含键：success）：

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| id | String | 记录 ID |
| updated_at | Integer | 记录修改完成时的时间戳 |

更新失败（对象中包含键：error）：

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| err_msg | String | 错误信息 |
| code | Integer | 错误代码 |

**状态码说明**

`200`: 成功。

`400`: 参数错误，比如缺少必填项，数据类型不对。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 指定的数据表不存在。

## 同步批量删除数据

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求最多删除 1000 条数据，支持触发触发器。

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回待删除对象总数，以协助不关心对象总数只关心数据删除结果的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回待删除对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| limit    | Integer | Y   | 设置单次请求至多可以删除多少条数据，默认为 1000 |
| offset   | Integer | N   | 设置删除的起始偏移值，默认为 0 |
| return_total_count   | Integer | N   | 返回结果中是否包含 total_count，1 为包含，0 为不包含，默认不包含 |

**代码示例**

{% tabs bulkDeleteRecordCurl="Curl", bulkDeleteRecordNode="Node", bulkDeleteRecordPHP="PHP" %}

{% content "bulkDeleteRecordCurl"%}

```shell
curl -X DELETE \
  https://cloud.minapp.com/oserve/v2.2/table/70264/record/?where={"pretty": true} \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
```

{% content "bulkDeleteRecordNode" %}

```javascript
var request = require("request");

var options = {
  method: 'DELETE',
  url: 'https://cloud.minapp.com/oserve/v2.2/table/70264/record/',
  headers:
  {
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      'pretty': true
    }),
  }
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "bulkDeleteRecordPHP"%}

```php
<?php
$token = "35919068aa799eccdef19160e1da4bf21381d2a2";
$url = "https://cloud.minapp.com/oserve/v2.2/table/70264/record/?where={'pretty': true}";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "total_count": 2,
  "offset": 0,
  "next": null,
  "limit": 1000,
  "succeed": 2
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| total_count | Integer | 总共需要删除的记录数，仅在 return_total_count=1 的情况下返回 |
| succeed | Integer | 删除成功的记录数 |
| offset | Integer | 偏移量，默认为 0 |
| next | String | 下一次的删除链接，若待删除记录数超过 limit 指定的上限，可通过该链接继续删除，删除完成时值为：null |
| limit | Integer | 与 URL 中参数 limit 一致（默认为 1000） |

**状态码说明**

`200`: 成功。

`400`: 查询参数不合法，比如：数据类型不对。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 指定的数据表不存在。

## 异步大批量修改数据

**接口**

`PUT https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求更新的数据条数大于 1000 条且 Query 参数中没有 limit 参数时会自动使用此接口，不支持触发触发器。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |

**参数说明**

Content-Type: `application/json`

与修改单条数据的参数一致。

**代码示例**

{% tabs asyncBulkUpdateRecordCurl="Curl", asyncBulkUpdateRecordNode="Node", asyncBulkUpdateRecordPHP="PHP" %}

{% content "asyncBulkUpdateRecordCurl"%}

```shell
curl -X PUT \
  https://cloud.minapp.com/oserve/v2.2/table/70264/record/ \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
  -H 'Content-Type: application/json' \
  -d '{"name": "Sam"}'
```

{% content "asyncBulkUpdateRecordNode" %}

```javascript
var request = require("request");

var options = {
  method: 'PUT',
  url: 'https://cloud.minapp.com/oserve/v2.2/table/70264/record/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  body: {'name': 'Sam'},
  json: true
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "asyncBulkUpdateRecordPHP"%}

```php
<?php
$token = '35919068aa799eccdef19160e1da4bf21381d2a2';
$url = "https://cloud.minapp.com/oserve/v2.2/table/70264/record/";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];
$payload = json_encode(["name" => "Sam"]);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "status": "ok",
  "operation_id": 1
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| status | String | 请求状态，值为：ok |
| operation_id | Integer | 异步结果 ID |

**状态码说明**

`200`: 成功。

`400`: 参数错误，比如缺少必填项，数据类型不对。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 指定的数据表不存在。

## 异步大批量删除数据

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.2/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求删除的数据条数大于 1000 条且 Query 参数中没有 limit 参数时会自动使用此接口，不支持触发触发器。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |

**参数说明**

Content-Type: `application/json`

与修改单条数据的参数一致。

**代码示例**

{% tabs asyncBulkDeleteRecordCurl="Curl", asyncBulkDeleteRecordNode="Node", asyncBulkDeleteRecordPHP="PHP" %}

{% content "asyncBulkDeleteRecordCurl"%}

```shell
curl -X DELETE \
  https://cloud.minapp.com/oserve/v2.2/table/70264/record/?where={"pretty": true} \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
```

{% content "asyncBulkDeleteRecordNode" %}

```javascript
var request = require("request");

var options = {
  method: 'DELETE',
  url: 'https://cloud.minapp.com/oserve/v2.2/table/70264/record/',
  headers:
  {
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  },
  qs: {     // query string, 被附加到uri的参数
    where: JSON.stringify({   // 可选, 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码
      'pretty': true
    }),
  }
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "asyncBulkDeleteRecordPHP"%}

```php
<?php
$token = "35919068aa799eccdef19160e1da4bf21381d2a2";
$url = "https://cloud.minapp.com/oserve/v2.2/table/70264/record/?where={'pretty': true}";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "status": "ok",
  "operation_id": 1
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| status | String | 请求状态，值为：ok |
| operation_id | Integer | 异步结果 ID |

**状态码说明**

`200`: 成功。

`400`: 查询参数不合法，比如：数据类型不对。

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确。

`404`: 指定的数据表不存在。

## 查询异步批量更新、删除结果

**接口**

`GET https://cloud.minapp.com/oserve/v1/bulk-operation/:operation_id/`

其中 `:operation_id` 是异步批量更新或删除接口返回中 `operation_id` 字段的值。

**代码示例**

{% tabs getAsyncBulkOperationResultCurl="Curl", getAsyncBulkOperationResultNode="Node", getAsyncBulkOperationResultPHP="PHP" %}

{% content "getAsyncBulkOperationResultCurl"%}

```shell
curl -X GET \
  https://cloud.minapp.com/oserve/v1/bulk-operation/1/ \
  -H 'Authorization: Bearer 35919068aa799eccdef19160e1da4bf21381d2a2' \
```

{% content "getAsyncBulkOperationResultNode" %}

```javascript
var request = require("request");

var options = {
  method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1/bulk-operation/1/',
  headers:
  {
    Authorization: 'Bearer 35919068aa799eccdef19160e1da4bf21381d2a2'
  }
};

var req = request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "getAsyncBulkOperationResultPHP"%}

```php
<?php
$token = "35919068aa799eccdef19160e1da4bf21381d2a2";
$url = "https://cloud.minapp.com/oserve/v1/bulk-operation/1/";

$ch = curl_init();
$header = [
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$response = curl_exec($ch);
$err = curl_error($ch);

curl_close($ch);

if ($err) {
  echo "CURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "schema_id": 1,
  "schema_name": "random_name",
  "operation": "update",
  "status": "success",
  "created_at": 111111,
  "updated_at": 111112,
  "matched_count": 111,
  "modified_count": 111,
}
```

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| id | Integer | 记录 ID |
| schema_id | Integer | 数据表表 ID |
| schema_name | String | 数据表表名 |
| operation | String | 操作类型：update（更新）、delete（删除） |
| status | String | 操作状态：pending（执行中）、 success（成功）|
| created_at | Integer | 任务创建时间，时间戳 |
| updated_at | Integer | 本记录最后更新时间，时间戳 |
| matched_count | Integer | 匹配的数据条数，仅当操作类型是更新时才有 |
| modified_count | Integer | 更新的数据条数，仅当操作类型是更新时才有 |
| deleted_count | Integer | 删除的数据条数，仅当操作类型是删除时才有 |

**状态码说明**

`200`: 成功

`401`: 未授权

`404`: 不存在
