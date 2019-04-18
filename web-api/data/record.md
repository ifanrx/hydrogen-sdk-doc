# 数据操作
## 查询数据

**接口**

`GET /hserve/v2.0/table/:table_id/record/`

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

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
-G \
--data-urlencode 'where={"price":"$eq":10}' \
https://{{ServerUrl}}/hserve/v2.0/table/952728/record/
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
https://{{ServerUrl}}/hserve/v2.0/table/:table_id/record/?order_by=created_at

# 倒序
https://{{ServerUrl}}/hserve/v2.0/table/:table_id/record/?order_by=-created_at
```

**请求示例**
{% tabs getRecordUseCurl="curl", getRecordUsePython="python" %}

{% content "getRecordUseCurl" %}

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'limit=10' \
  --data-urlencode 'offset=0' \
  https://{{ServerUrl}}/hserve/v2.0/table/952728/record/
```

{% content "getRecordUsePython" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://{{ServerUrl}}/hserve/v2.0/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Hydrogen-r1  %s' % TOKEN
}

where_ = {
  'price': {'$gt': 100},
}

query_ = urllib.urlencode({
  'where': json.dumps(where_),
  'order_by': '-created_at',
  'limit': 10,
  'offset': 0,
})

API = '?'.join((BASE_API, query_))

resp_ = requests.get(API, headers=HEADERS)
print resp_.content
```
{% endtabs %}

## 获取数据项

**接口**

`GET /hserve/v2.0/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{ServerUrl}}/hserve/v2.0/table/952728/record/5272/
```

## 写入数据

**接口**

`POST /hserve/v2.0/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

> **info**
> 插入的数据要与预先在知晓云平台设定的数据类型一致

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"name":"nickname","desc":"desc"}' \
  https://{{ServerUrl}}/hserve/v2.0/table/952728/record/
```

**状态码说明**

`201` 写入成功，`400` 请求参数有错

> **info**
> 如果需要在数据表中存储文件，文件类型的字段必须要包含 `id, name, created_at, mime_type, cdn_path, size` 这几个属性，如果文件类型的字段没有保存成功，请检查文件字段有没有包含这几个属性

## 更新数据

本接口提供数据更新的能力，通过指定表 ID 以及 Record ID 来完成操作， 需注意，更新的数据所包含的字段需要与数据表中定义的字段一致。

**接口**

`PUT  /hserve/v2.0/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

> **info**
> 更新的数据要与预先在知晓云平台设定的数据类型一致

**请求示例**

```shell
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"name":"nickname","desc":"desc"}' \
  https://{{ServerUrl}}/hserve/v2.0/table/952728/record/5272/
```

**状态码说明**

`201` 写入成功，`400` 请求参数有错


## 数据删除

> **danger**
> 本接口可直接删除任意数据，不受 ACL 控制

**接口**

`DELETE /hserve/v2.0/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{ServerUrl}}/hserve/v2.0/table/952728/record/5272/
}
```

**状态码说明**

`204` 删除成功


## 数据原子性更新

当请求同时对一个数据进行修改时，原子性更新使得冲突和覆盖导致的数据不正确的情况不会出现，目前支持的数据类型是**数字类型**和**数组类型**

**接口**

`PUT  /hserve/v2.0/table/:table_id/record/:record_id/`

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

**请求示例**

```shell
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d "{'desc': '{'$append': ['atomic data']}', 'price': '{'$incr_by': -1}'}" \
  https://{{ServerUrl}}/hserve/v2.0/table/952728/record/5272/
}
```

**状态码说明**

`200` 更新成功，`400` 操作符不支持/请求参数有错


> **danger**
> 以下操作仅适用于 API version >= v1.8


## pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**接口**

`GET /hserve/v1.8/table/:table_id/record/?where=query`

其中 `:table_id` 需替换为你的数据表 ID，query 为查询条件

**示例代码**

假设现在有两张表： order 表和 customer 表，order 表中有一个类型为 pointer，名称为 user 的字段，指向了 customer 表的数据行。
现在需要查询 order 表中，user 字段指向 customer 表中 id 为 `5272` 的数据行。

{% tabs pointerRecordUseCurl="curl", pointerRecordUsePython="python" %}

{% content "pointerRecordUseCurl" %}

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'where={"user": {"$eq": "5272"}}' \
  --data-urlencode 'limit=10' \
  --data-urlencode 'offset=0' \
  https://{{ServerUrl}}/hserve/v1.8/table/952728/record/
```

{% content "pointerRecordUsePython" %}

```python
import json
import urllib

import requests

table_id = ''
BASE_API = r'https://{{ServerUrl}}/hserve/v1.8/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Hydrogen-r1  %s' % TOKEN
}

where_ = {
  'user': {'$eq': "5272"},
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

## 字段扩展

支持 expand created_by 以及 pointer 类型字段。返回结果中的 created_by 以及扩展的 pointer 类型字段会被替换为这个字段对应的完整对象。

**接口**

`GET /hserve/v1.8/table/:table_id/record/?expand=pointer,created_by`

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

**请求示例**
{% tabs expandRecordUseCurl="curl", expandRecordUsePython="python" %}

{% content "expandRecordUseCurl" %}

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{ServerUrl}}/hserve/v1.8/table/952728/record/?expand=pointer,created_by
```

{% content "expandRecordUsePython" %}

```python
import json
import urllib

import requests


table_id = ''
BASE_API = r'https://{{ServerUrl}}/hserve/v1.8/table/%s/record/' % table_id

TOKEN = ''
HEADERS = {
  'Authorization': 'Hydrogen-r1  %s' % TOKEN
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
{% endtabs %}

## 添加 pointer 类型数据

**接口**

`POST /hserve/v1.8/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"name":"nickname","desc":"["description"]"}' \
  https://{{ServerUrl}}/hserve/v1.8/table/952728/record/
```

**状态码说明**

`201` 写入成功，`400` 请求参数有错


## 更新 pointer 类型数据

**接口**

`PUT  /hserve/v1.8/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**请求示例**

```js
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientId}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"pointer":"5a2fa9b008443e59e0e67889"}' \
  https://{{ServerUrl}}/hserve/v1.8/table/952728/record/5272
```

**状态码说明**

`200` 更新成功，`400` 请求参数有错
