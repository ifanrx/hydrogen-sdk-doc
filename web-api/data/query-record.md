# 查询单条数据

**接口**

`GET /hserve/v2.0/table/:table_name/record/:record_id/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/:table_name/record/5cbe89e7f1ec740af442a1fa/
```

**返回示例**
```json
{
  "_id": "5cbe89e7f1ec740af442a1fa",
  "id": "5cbe89e7f1ec740af442a1fa",
  "created_by": 37967230792046,
  "created_at": 1555991015,
  "read_perm":["user:*"],
  "nickname":"hgz",
  "gender": "male",
  "updated_at": 1555991015,
  "write_perm": []
}
```

# pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**接口**

`GET /hserve/v2.0/table/:table_name/record/?where=query`

其中 `:table_name` 需替换为你的数据表名称，`where` 的构造可参考[字段过滤和扩展](./select-and-expand.md)

**示例代码**

假设现在有两张表：order 表和 customer 表，order 表中有一个类型为 pointer，名称为 user 的字段，指向了 customer 表的数据行。
现在需要查询 order 表中，user 字段指向 customer 表中 id 为 `5272` 的数据行。

{% tabs pointerRecordUseCurl="curl", pointerRecordUsePython="python" %}

{% content "pointerRecordUseCurl" %}

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/952728/record/?where={"user": {"$eq": "5272"}}
```

{% content "pointerRecordUsePython" %}

```python
import json
import urllib

import requests

table_name = ''
BASE_API = r'https://{{服务器域名}}/hserve/v2.0/table/%s/record/' % table_name

TOKEN = ''
HEADERS = {
  'Authorization': 'Hydrogen-r1 %s' % TOKEN
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


# 批量查询数据

**接口**

`GET /hserve/v2.0/table/:table_name/record/`

其中 `:table_name` 需替换为你的数据表名称

**参数说明**

| 参数     | 类型   | 必填 | 说明                                                              |
| :------- | :----- | :--- | :---------------------------------------------------------------- |
| where    | String | N    | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| expand   | String | N    | 可对 pointer 类型的字段进行扩展                                   |
| order_by | String | N    | 对资源进行字段排序                                                |
| limit    | Number | N    | 限制返回资源的个数，默认为 20 条，最大可设置为 1000               |
| offset   | Number | N    | 设置返回资源的起始偏移值，默认为 0                                |

- `where` 和 `expand` 的构造可参考[字段过滤和扩展](./select-and-expand.md)
- `limit`、`offset` 和 `order_by` 的构造可参考[分页和排序](./limit-and-order.md)

**请求示例**

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v2.0/table/952728/record/?limit=10&offset=0
```

**返回示例**
```json
{
    "meta": {
        "offset": 0,
        "limit": 10,
        "previous": null,
        "next": null,
        "total_count": 2
    },
    "objects": [
        {
            "created_by": 76797941,
            "gender": "male",
            "nickname": "hgz",
            "id": "5cbe7ccefc63ae0ab7f2d159",
            "write_perm": [
                "user:*"
            ],
            "created_at": 1555987620,
            "updated_at": 1556016901,
            "read_perm": [
                "user:*"
            ],
            "_id": "5cbe7ccefc63ae0ab7f2d159"
        },
        {
            "created_by": 76797941,
            "gender": "male",
            "nickname": "he",
            "id": "5cbe7ce3fc63ae381ba6bc20",
            "write_perm": [
                "user:*"
            ],
            "created_at": 1555987680,
            "updated_at": 1556074279,
            "read_perm": [
                "user:*"
            ],
            "_id": "5cbe7ce3fc63ae381ba6bc20"
        }
    ]
}
```

**状态码**
- `200`: 成功
- `400`: 请求数据不合法;查询参数不合法;操作符不合法