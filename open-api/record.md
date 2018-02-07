# 数据操作

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。


## 查询数据

**接口**

`GET https://cloud.minapp.com/oserve/v1/table/:table_id/record/`

`table_id` 是表格 ID

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| where         | String | N   | 查询语句 |
| order_by      | String | N   | 对资源进行排序字段 |
| limit         | Number | N   | 返回资源的个数（默认为 *20*，最大可设置为 *1000*）|
| offset        | Number | N   | 返回资源的起始偏移值 |

  `where` 参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码。

  例如需要查询价格为 10 元的物品时，我们应该这样构造查询:

  查询语句
  ```json
  {
      "price": {"$eq": 10}
  }
  ```

  > 其中 `$eq` 为『等于运算符』

  执行

  ```
  curl -X GET \
  -H "Authorization: Bearer token" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'where={"price":"$eq":10}' \
  https://cloud.minapp.com/oserve/v1/table/1/record/
  ```

  除了支持 `$eq`（等于运算符），此接口还支持许多运算符，具体可查询下表：

  | 运算符 |含义|
  |:--------:|:--------:|
  |`$eq`     |等于|
  |`$ne`      |不等于|
  |`$lt`      |小于|
  |`$lte`     |小于等于|
  |`$gt`      |大于|
  |`$gte`     |大于等于|
  |`$contains`|包含任意一个值|
  |`$nin`     |不包含任意一个数组值|
  |`$in`      |包含任意一个数组值|
  |`$isnull`  |是否为 NULL|
  |`$range`   |包含数组值区间的值|

  通过运算符可以查询出简单条件的数据，如有逻辑运算需求，则可以使用 `$and` 或 `$or` 来实现逻辑组织。

  如需要价格为 10 元并名称中包含`包`的物品时，筛选条件应为：

  ```json
  {
      "$and": [
          {
              "price": {"$eq": 10}
          },
          {
              "name": {"$contains": "包"}
          }
      ]
  }
  ```

  如需要价格为 10 元并名称中包含`包`或价格大于 100 元的物品时，筛选条件应为：

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

**排序**

很多时候我们均需要对查询结果进行排序，接口默认的排序规则是`创建时间倒序`。

如需修改，可通过提交 `order_by` 参数来实现。

示例：

```
# 顺序
https://cloud.minapp.com/oserve/v1/table/:table_id/record/?order_by=id

# 倒序
https://cloud.minapp.com/oserve/v1/table/:table_id/record/?order_by=-id
```

**代码示例**

{% tabs first="Node", second="Python" %}

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

{% endtabs %}

**返回示例**

```json
{
    "meta": {
        "limit": 20,
        "next": "/oserve/v1/table/50/record/?limit=20&offset=20",
        "offset": 0,
        "previous": null,
        "total_count": 1
    },
    "objects": [
        {
            "_id": "59c3a1981eefef0be7d7ffaa",
            "acl_gid": null,
            "acl_permission": 7,
            "created_at": 1505993112,
            "created_by": 1513231,
            "id": "59c3a1981eefef0be7d7ffaa",
            "name": "百搭双肩包 campus bluelounge",
            "price": 498,
            "updated_at": 1506444506
        }
    ]
}
```

## 查询数据项

可根据数据的 `id` 字段来获取该数据项。

**接口**

`GET https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

`table_id` 是某个表的 ID，`record_id` 是该表下的一条记录 ID

**代码示例**

{% tabs itemFirst="Node" %}

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

{% endtabs %}

**返回示例**

```json
{
    "_id": "59c3a1981eefef0be7d7ffaa",
    "acl_gid": null,
    "acl_permission": 7,
    "created_at": 1505993112,
    "created_by": 1513231,
    "id": "59c3a1981eefef0be7d7ffaa",
    "name": "百搭双肩包 campus bluelounge",
    "price": 499,
    "tag": ["Hello"],
    "updated_at": 1506444506
}
```

## 写入数据

本接口提供保存数据的能力，通过指定要你写入的表 ID 来完成操作， 需注意，插入的数据所包含的字段需要与数据表中定义的字段一致。

> 由于数据默认会写入 `created_by` 字段，此参数可以在请求参数中提交，取值需为知晓云的用户 id，具体可参考`用户-登入`。
> 如未提交或者提交错误的用户 ID，则会默认设置为企业账户本身的用户 ID。

**接口**

`POST https://cloud.minapp.com/oserve/v1/table/:table_id/record/`

**参数说明**

Content-Type: `application/json`

| 参数               | 类型    | 必填 | 说明 |
| :------------     | :----- | :-- | :-- |
| key         | String(字段对应的数据类型)） | Y  | key 为数据表中定义的字段 |

**代码示例**

{% tabs insertNode="Node" %}

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

{% endtabs %}

**返回示例**

成功返回

```json
{
    "_id": "59c3a1981eefef0be7d7ffaa",
    "acl_gid": null,
    "acl_permission": 7,
    "created_at": 1505993112,
    "created_by": 1513231,
    "id": "59c3a1981eefef0be7d7ffaa",
    "hello": "world",
    "updated_at": 1506444506
}
```

错误返回

```json
{
  "status": "error",
  "error_msg": "Error message from Hydrogen."
}
```

**状态码说明**

- `201` 写入成功
- `400` 请求参数有错

## 更新数据

本接口提供数据更新的能力，通过指定表 ID 以及 Record ID 来完成操作， 需注意，更新的数据所包含的字段需要与数据表中定义的字段一致。

**接口**

`PUT https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

**参数说明**

Content-Type: `application/json`

| 参数               | 类型    | 必填 | 说明 |
| :------------     | :----- | :-- | :-- |
| key         | String(字段对应的数据类型)） | Y  | key 为数据表中定义的字段 |

**代码示例**

{% tabs updateNode="Node" %}

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

{% endtabs %}

**返回示例**

成功返回

```json
{
    "_id": "59c3a1981eefef0be7d7ffaa",
    "acl_gid": null,
    "acl_permission": 7,
    "created_at": 1505993112,
    "created_by": 1513231,
    "id": "59c3a1981eefef0be7d7ffaa",
    "hello": "dlrow",
    "updated_at": 1506444506
}
```

错误返回

```json
{
  "status": "error",
  "error_msg": "Error message from Hydrogen."
}
```

**状态码说明**

- `201` 写入成功
- `400` 请求参数有错

## 数据删除

请注意本接口 **可直接删除任意数据不受 ACL 控制**。

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

`table_id` 是某个表的 ID，`record_id` 是该表下的一条记录 ID

**代码示例**

{% tabs deleteNode="Node" %}

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

{% endtabs %}

**状态码说明**

- `204` 删除成功

## 数据原子性更新

**接口**

`PUT https://cloud.minapp.com/oserve/v1/table/:table_id/record/:record_id/`

`table_id` 是某个表的 ID，`record_id` 是该表下的一条记录 ID

**参数说明**

Content-Type: `application/json`

| 参数               | 类型    | 必填 | 说明 |
| :------------     | :----- | :-- | :-- |
| key         | String(字段对应的数据类型)） | Y  | key 为数据表中定义的字段, 如表中 `key` 字段 |

原子操作适用于数值递增的场景，如点赞数或者阅读数递增。

本接口支持以下原子性操作：

- `incr_by`
- `append`
- `append_unique`
- `remove`

(1) `incr_by` 对数字类型的键进行增减操作

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

(2) append 数组类型的键追加数值（同样为数组类型）

往对象中的 tag 字段追加 「Hello」

```json
{
  "tag": {
    "$append": ["Hello"]
  }
}
```

(3) append_unique 数组类型的键追加数值（同样为数组类型），当已在对象中的值不会再被追加

往对象中的 tag 字段追加 「Hello」，tag 字段依然为 `["Hello"]`

```json
{
  "tag": {
    "$append_unique": ["Hello"]
  }
}
```

(4) remove 数组类型的键删除数值（同样为数组类型）

往对象中的 tag 字段删除 「Hello」

```json
{
  "tag": {
    "$remove": ["Hello"]
  }
}
```

**代码示例**

{% tabs atomicNode="Node" %}

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

{% endtabs %}

**返回示例**

成功返回

```json
{
    "_id": "59c3a1981eefef0be7d7ffaa",
    "acl_gid": null,
    "acl_permission": 7,
    "created_at": 1505993112,
    "created_by": 1513231,
    "id": "59c3a1981eefef0be7d7ffaa",
    "name": "百搭双肩包 campus bluelounge",
    "price": 499,
    "tag": ["Hello"],
    "updated_at": 1506444506
}
```

错误返回

```json
{
  "status": "error",
  "error_msg": "Error message from Hydrogen."
}
```

**状态码说明**

- `200` 更新成功
- `400` 操作符不支持/请求参数有错
