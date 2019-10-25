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

**返回参数说明**

| 参数              | 类型      | 说明             |
| :--------------- | :-------  | :-------------- |
| id               |  string   | id, 唯一标识     |
| created_at       |  integer  | 创建时间         |
| updated_at       |  integer  | 更新时间         |
| created_by       |  integer  | 创建者 id        |
| read_perm        |  array    | 读权限           |
| write_perm       |  array    | 写权限           |


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

# 批量查询数据

**接口**

`GET /hserve/v2.2/table/:table_name/record/`

其中 `:table_name` 需替换为你的数据表名称

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

| 参数     | 类型   | 必填 | 说明                                                              |
| :------- | :----- | :--- | :---------------------------------------------------------------- |
| where    | string | N    | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| keys     | string | N    | 字段过滤                                  |
| expand   | string | N    | 可对 pointer 类型的字段进行扩展                                   |
| order_by | string | N    | 对资源进行字段排序                                                |
| limit    | integer | N    | 限制返回资源的个数，默认为 20 条，最大可设置为 1000               |
| offset   | integer | N    | 设置返回资源的起始偏移值，默认为 0                                |
| return_total_count   | integer | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

- `keys` 和 `expand` 的构造可参考[字段过滤和扩展](./query-keys-expand.md)
- `limit`、`offset` 和 `order_by` 的构造可参考[分页和排序](./limit-and-order.md)

**请求示例**

```shell
curl -X GET \
-H "X-Hydrogen-Client-ID: {{ClientID}}" \
-H "Authorization: Hydrogen-r1 {{AccessToken}}" \
-H "Content-Type: application/json" \
https://{{服务器域名}}/hserve/v2.2/table/952728/record/?limit=10&offset=0
```

**返回参数说明**

| 参数              | 类型      | 说明                       |
| :--------------- | :-------  | :-----------------------  |
| id               |  string   | id, 唯一标识               |
| created_at       |  integer  | 创建时间                  |
| updated_at       |  integer  | 更新时间                  |
| created_by       |  integer  | 创建者 id                 |
| read_perm        |  array    | 读权限                    |
| write_perm       |  array    | 写权限                    |
| offset           |  integer  | 偏移量                    |
| limit            |  integer  | 每次请求返回的最大记录数目    |
| previous         |  string   | 上一页地址                 |
| next             |  string   | 下一页地址                 |
| total_count      |  integer  | 记录总数目，仅当 return_total_count 为 1 时返回                 |

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

## 如何使用 where

当请求参数支持使用 `where` 时，你可以通过构造 `where` 参数来构造查询条件。

- `where` 支持 `or`、`and` 等逻辑操作符查询，查询语句是将操作符以逆波兰表示法进行树结构的构造
- `where` 可以抽象的认为是一种`键值对`的结构
- `where` 查询语句可以进行`嵌套查询`

> **info**
> where 一定要作为 URL 的 **Query Parameters** 传入

**使用方式**

`Query Parameters` 作为一个**JSON string**，需要经过 `urlencode` 才可正常使用，通常有两种用法:

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/?where=%7b%22status%22%3a%7b%22%24eq%22%3a%22deleted%22%7d%7d
```

其中 `%7b%22status%22%3a%7b%22%24eq%22%3a%22deleted%22%7d%7d` 为 `{"status":{"$eq":"deleted"}}` 经过 urlencode 后的值

或

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'where={"status":{"$eq":"deleted"}}' \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/
```

> **info**
> 注意：知晓云的 api URL 长度限定为 16386，超出则返回 502，请在构造查询条件时注意长度控制，如 in 操作符后边的数组长度、match 操作符后边的字符串长度等。

### where 支持的操作符

- or([cond1, cond2…]): 满足某个条件
- and([cond1, cond2…]): 满足全部条件
- exists(true | false): 某个字段是否存在于记录中
- isnull(true | false): 某个字段的值是否为 null
- regex(regex): string 字段是否匹配正则表达式
- options(value): 在 regex 内部使用，如增加 i 选项，忽略大小写
- has_key(key): key 是否存在 object 字段中
- range(start, end): integer 或 integer 字段是否存在于某个区间中
- contains(str): string 字段是否包含子串 str
- icontains(str): string 字段是否包含子串 str(不区分大小写)
- eq(value): 判断某个字段的值是否等于 value
- ne(value): 判断某个字段的值是否不等于 value
- gt(value): 数值字段是否大于 value
- gte(value): 数值字段是否大于等于 value
- lt(value): 数值字段是否小于 value
- lte(value): 数值字段是否小于等于 value
- in(value): value 是否存在于 list 字段中
- nin(value): value 是否不存在于 list 字段中
- all([value1, value2…]): 是否所有 value 均存在于 list 字段中

使用以上操作符时需要加上前缀 `$`，以便让服务器知道这是一个操作符

### 数据类型对应查询操作符表

| 数据类型 |    可使用的查询操作                                   |
|:---------|:------------------------------------------------- |
| string   | eq, isnull, contains, regex, exists               |
| integer  | eq, lt, gte, gt, lte, ne, isnull, exists, range   |
| integer   | eq, lt, gte, gt, lte, ne, isnull, exists, range   |
| array    | eq, in, nin, isnull, all, exists                  |
| boolean  | eq, exists, isnull                                |
| date     | eq, lt, gte, gt, lte, exists, isnull              |
| file     | isnull, exists                                    |
| object   | eq, has_key, isnull, exists                       |
| pointer  | eq, ne, isnull, exists                            |

**假设 API 接口的返回结构如下**

```json
{
  "meta": {....},
  "objects": [
    {
      "_id": "59a3c2b5afb7766a5ec6e84e",
      "amount": 0,
      "created_at": 1503904437,
      "created_by": 36395395,
      "animals": ["cat", "dog", "bird"],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "subname": "banana",
      "price": 1.0,
      "read_perm": ["user:*"],
      "updated_at": 1503904437,
      "write_perm": ["user:*"],
      "owner": {
        "name": "he",
        "age": 12,
      }
    }
    ......
  ]
}
```
利用这个 API 为示例展示 `where` 的各种使用方法

## 比较查询

需要构造的 `where` 如下

```json
// 查询 amount == 1 的记录
{"amount": {"$eq":1}}
// 查询 amount > 1 的记录
{"amount": {"$gt":1}}
// 查询 amount >= 1 的记录
{"amount": {"$gte":1}}
// 查询 amount <= 1 的记录
{"amount": {"$lte":1}}
// 查询 amount < 1 的记录
{"amount": {"$lt":1}}
// 查询 amount != 1 的记录
{"amount": {"$ne":1}}
// 查询 name == "apple" 的记录
{"name": {"$eq":"apple"}}
```

## 字符串查询

需要构造的 `where` 如下

```json
// 查询字符串 name 中包含 `app` 的记录
{"name": {"$contains":"app"}}
// icontains 忽略大小写, 所以此时 where 的效果是查询 name 中包含 `a` 或 `A` 的记录
{"name": {"$icontains":"a"}}
```

## 字符串正则匹配

正则表达式的构造可参照[正则表达式相关知识](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions), 需要构造的 `where` 如下

```json
// 查询字符串 name 中匹配正则表达式 `^a` 的记录(`^a`: 以 'a' 开头的字符串)
{"name": {"$regex":"^a"}}
// 查询字符串 name 中匹配正则表达式 `e$` 的记录(`e$`: 以 'e' 结尾的字符串)
{"name": {"$regex":"e$"}}
```

## 数组查询

需要构造的 `where` 如下

```json
// 查询数组 animals 中含有 `cat` 或 `dog` 的记录 
{"animals": {"$in": ["cat", "dog"]}}
// 查询数组 animals 中含有 `cat` 和 `dog` 的记录 
{"animals": {"$all": ["cat", "dog"]}}
// 查询数组 animals 中不包含 `bird` 的记录
{"animals": {"$nin": ["bird"]}}
```

## pointer 查询

假设现在有两张表：`order` 表和 `customer` 表，`order` 表中有一个类型为 `pointer`，名称为 `user` 的字段，指向了 `customer` 表的数据行。
现在需要查询 `order` 表中，`user` 字段指向 `customer` 表中 `id` 为 `5272` 的数据行，此时需要构造的 `where` 如下

```json
{"user": {"$eq": "5272"}}
```

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）


## null 或非 null 查询

需要构造的 `where` 如下

```json
// 查询 animals 字段为 `null` 的记录
{"animals": {"$isnull":true}}
// 查询 animals 字段不为 `null` 的记录
{"animals": {"$isnull":false}}
```

## 空或非空查询

需要构造的 `where` 如下

```json
// 查询字段 name 的值为 `非空字符串` 的记录
{"name": {"$exists":true}}
// 查询字段 name 的值为 `空字符串` 的记录
{"name": {"$exists":false}}
```

## has_key 查询 （仅限 object 类型）

需要构造的 `where` 如下

```json
// 查询字段 owner 的含有 `age` 字段的记录
{"owner": {"$has_key": "age"}}
```

## 组合查询

### and (交集)

查询 `100 < price < 200` 的记录，需要构造的 `where` 如下

```json
{
  "$and": [
    {
      "price": {
        "$lt": 200
      }
    },
    {
      "price": {
        "$gt": 100
      }
    }
  ]
}
```

### or (并集)

查询 `name` 为 `apple` 或 `banana` 的记录，需要构造的 `where` 如下

```json
{
  "$or": [
    {
      "name": {
        "$eq": "apple"
      }
    },
    {
      "name": {
        "$eq": "banana"
      }
    }
  ]
}
```

### 复杂组合查询

查询 `name` 包含 `app` 或 `subname` 包含 `ba` 的所有资源，并且这些资源的 `price` 需要 `小于` 100，需要构造的 `where` 如下

```json
{
  "$and": [
    {
      "price": {
        "$lt": 100
      }
    },
    {
      "$or": [
        {
          "name": {
            "$contains": "app"
          }
        },
        {
          "subname": {
            "$contains": "ba"
          }
        }
      ]
    }
  ]
}
```

### 获取查询对象总数

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/hserve/v2.2/table/:table_name/record/?limit=1&return_total_count=1
```
