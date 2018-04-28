# 数据操作

获得数据表数据接口，支持对**内置表自定义字段的获取与修改**

## 查询数据

**接口**

`GET https://cloud.minapp.com/oserve/v1/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| order_by | String | N   | 对资源进行字段排序 |
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

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
https://cloud.minapp.com/oserve/v1/table/1/record/
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

## 排序返回查询数据

查询接口默认按**创建时间倒序**的顺序来返回数据列表，你也可以通过设置 `order_by` 参数来实现。

示例：

```
# 顺序
https://cloud.minapp.com/oserve/v1/table/:table_id/record/?order_by=id

# 倒序
https://cloud.minapp.com/oserve/v1/table/:table_id/record/?order_by=-id
```

**代码示例**

{% tabs first="Node", second="Python", third="PHP" %}

{% content "first" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/table/3906/record/',  // 3906 对应 :table_id
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
BASE_API = r'https://cloud.minapp.com/oserve/v1/table/%s/record/' % table_id

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
  'where' => ['price' => ['$gt' => 'test search']],
  'order_by' => '-id',
  'limit' => '10',
  'offset' => '0'
  );
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/record/?";
$url .= urlencode(json_encode($condition));
$ch = curl_init();
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// 设置头部
$header = array(
  'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
  'Content-Type: application/json; charset=utf-8',
  );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
// 要求结果为字符串且输出到屏幕上
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
$res = curl_exec($ch);
curl_close($ch);
```

{% endtabs %}


## 获取数据项

**接口**

`GET https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**代码示例**

{% tabs itemFirst="Node", itemSecond="PHP" %}

{% content "itemFirst" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/table/3906/record/5a2fa9b008443e59e0e678xx/',  // 3906 对应 :table_id, 5a2fa9b008443e59e0e678xx 对应 :record_id
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
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/record/{$recornd_id}/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// 设置头部
$header = array(
  'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
  'Content-Type: application/json; charset=utf-8',
  );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
// 要求结果为字符串且输出到屏幕上
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
$res = curl_exec($ch);
curl_close($ch);

```

{% endtabs %}


## 写入数据

**接口**

`POST https://cloud.minapp.com/oserve/v1/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

> **info**
> 插入的数据要与预先在知晓云平台设定的数据类型一致

**代码示例**

{% tabs insertNode="Node", insertPHP="PHP" %}

{% content "insertNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/table/3906/record/',  // 3906 对应 :table_id
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
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "insertPHP" %}
```php
<?php
$table_id = 1;
$param = array(
  'name' =>'nickname',
  'desc' => 'description',
  'price' => 19,
  'amount' => 19,
  'code' => '18814098707'
  );
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/record/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$header = array(
  'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
  'Content-Type: application/json; charset=utf-8',
  );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
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


## 更新数据

本接口提供数据更新的能力，通过指定表 ID 以及 Record ID 来完成操作， 需注意，更新的数据所包含的字段需要与数据表中定义的字段一致。

**接口**

`PUT https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

> **info**
> 更新的数据要与预先在知晓云平台设定的数据类型一致

**代码示例**

{% tabs updateNode="Node", updatePHP="PHP" %}

{% content "updateNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/table/3906/record/5a6ee2ab4a7baa1fc083e3xx',  // 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
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
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/record/{$record_id}/";
$param['name'] = 'nickname';
$ch = curl_init();
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$header = array(
  'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
  'Content-Type: application/json; charset=utf-8'
  );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
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


## 数据删除

> **danger**
> 本接口可直接删除任意数据，不受 ACL 控制

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**代码示例**

{% tabs deleteNode="Node", deletePHP="PHP" %}

{% content "deleteNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/table/3906/record/5a6ee2ab4a7baa1fc083e3xx/',// 3906 对应 :table_id, 5a6ee2ab4a7baa1fc083e3xx 对应 :record_id
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
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/record/{$record_id}/";
$ch = curl_init();
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
// 设置头部
$header = array(
  'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
  'Content-Type: application/json; charset=utf-8',
  );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
// 要求结果为字符串且输出到屏幕上
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

`PUT https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

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
  uri: 'https://cloud.minapp.com/oserve/v1/table/3906/record/5a33406909a805412e3169xx/',  // 3906 对应 :table_id, 5a33406909a805412e3169xx 对应 :record_id
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
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/record/{$record_id}/";
$param = array(
  'desc' => ['$append' => ['atomic data']], 
  'price' => ['$incr_by' => -1]
  );
$ch = curl_init();
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
$header = array(
  'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
  'Content-Type: application/json; charset=utf-8',
  );
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
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
