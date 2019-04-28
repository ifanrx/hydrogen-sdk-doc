# 更新单条数据

**接口**

`PUT /hserve/v2.0/table/:table_name/record/:record_id/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

**参数说明**

| 参数   | 类型   | 必填 | 说明     |
| :----- | :----- | :--- | :------- |
| $unset | Object | N    | 删除字段 |
| $set   | Object | Y    | 更新字段 |

>	**info**
> - 对同一字段进行多次 set 操作，后面的数据会覆盖掉前面的数据
> - 不可同时用 set 与 unset 操作同一字段，否则会报 605 错误
> - 数据要与预先在知晓云平台设定的数据类型一致
> - 如果没有指定为 $unset 更新，则默认为 $set 更新

**请求示例**

更新表 test_table 中 id 为 `5cbe89e7f1ec740af442a1fa` 的记录，将记录的 nickname 更新为 `cool`, 删除记录的 gender 字段 
```shell
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"$set": {"nickname": "cool"}, "$unset": {"gender": ""}}' \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/5cbe89e7f1ec740af442a1fa/
```

**返回示例**
```json
{
    "_id": "5cbe89e7f1ec740af442a1fa",
    "_prefetched_objects_cache": {},
    "created_at": 1555990980,
    "created_by": 37967230792046,
    "id": "5cbe89e7f1ec740af442a1fa",
    "read_perm": [
        "user:*"
    ],
    "nickname": "cool",
    "updated_at": 1556006931,
    "write_perm": [
        "user:37967230792046"
    ]
}
```

**状态码说明**

- `200` 更新成功

# 更新 pointer 类型数据

**接口**

`PUT /hserve/v2.0/table/:table_name/record/:record_id/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

**请求示例**

假设有 product 表, product 表部分字段如下:

| 字段名 | 字段类型 | 说明                   |
| ------ | -------- | ---------------------- |
| user   | pointer  | 指向了 _userprofile 表 |

现在需要更新 product 表中 id 为 `1bdfaf068asd123123asd` 的数据行, 将它的 user 字段指向 `_userprofile` 表中 id 为 `5cbecc548b155c0b6d1da762` 的记录

```shell
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"user":"5cbecc548b155c0b6d1da762"}' \
  https://{{服务器域名}}/hserve/v2.0/table/product/record/1bdfaf068asd123123asd/
```

**返回示例**
```json
{
    "_id": "1bdfaf068asd123123asd",
    "_prefetched_objects_cache": {},
    "created_at": 1555990980,
    "created_by": 37967230792046,
    "id": "1bdfaf068asd123123asd",
    "read_perm": [
        "user:*"
    ],
    "user": {
        "_table": "_userprofile",
        "id": "5cbecc548b155c0b6d1da762"
    },
    "updated_at": 1556008061,
    "write_perm": [
        "user:37967230792046"
    ]
}
```

**状态码说明**

- `200` 更新成功


# 数据原子性更新

当请求同时对一个数据进行修改时，原子性更新使得冲突和覆盖导致的数据不正确的情况不会出现，目前支持的数据类型是**数字类型**和**数组类型**

**接口**

`PUT /hserve/v2.0/table/:table_name/record/:record_id/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

**参数说明**

| 参数 | 类型                   | 必填 | 说明                         |
| :--- | :--------------------- | :--- | :--------------------------- |
| key  | key 字段对应的数据类型 | Y    | key 应为数据表中定义的字段名 |

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
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"desc": {"$append": ["atomic data"]}, "price": {"$incr_by": -1}}' \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/5cbe89e7f1ec740af442a1fa/
```

**返回示例**

```json
{
  "created_at": 1487053095,
  "id": "7",
  "name": "fushi",
  "price": 11,
  "desc": ["sweet", "red"],
  "amount": 2
}
```

# 按条件批量更新数据

数据更新依赖当前登录用户拥有的该数据的写权限。

**接口**

`PUT /hserve/v2.0/table/:table_name/record/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

> **info**
> 1. 当更新的数据大于 1000 条时，不支持使用触发器，且删除操作是异步执行
> 2. 如需更新 1000 条以上数据，可指定 enable_trigger 为 0 不触发触发器。

**参数说明**

Query Parameters:

| 参数           | 类型    | 必填 | 说明                                       |
| :------------- | :------ | :--- | :----------------------------------------- |
| where          | Object  | Y    | 筛选的条件                                 |
| limit          | Integer | N    | 最多更新数                                 |
| offset         | Integer | N    | 从第几条开始更新                           |
| enable_trigger | Integer | N    | 是否使用触发器，1 为使用触发器，0 为不使用 |

- `where` 的构造可参考[字段过滤和扩展](./query-keys-expand.md)
- `limit`、`offset` 的构造可参考[分页和排序](./limit-and-order.md)

**请求示例**

更新 nickname 为 `hgz` 的记录, 将 age 加 1

```shell
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"age": {"$incr_by": 1}}' \
  "https://{{服务器域名}}/hserve/v2.0/table/test_table/record/?where=%7b%22nickname%22%3a%7b%22%24eq%22%3a%22hgz%22%7d%7d"
```

其中 `%7b%22nickname%22%3a%7b%22%24eq%22%3a%22hgz%22%7d%7d` 为 `{"nickname":{"$eq":"hgz"}}` 经过 urlencode 后的结果

**info**
> where 一定要作为 URL 的 **Query Parameters** 传入

**返回参数说明**

| 参数        | 说明                                                           |
| :---------- | :------------------------------------------------------------- |
| succeed     | 成功更新记录数                                                 |
| total_count | where 匹配的记录数，包括无权限操作记录                         |
| offset      | 与传入参数 offset 一致                                         |
| limit       | 与传入参数 limit 一致                                          |
| next        | 下一次的更新链接，若待更新记录数超过上限，可通过该链接继续更新 |

**返回示例**

```json
{
    "succeed": 8,
    "total_count": 10,
    "offset": 0,
    "limit": 10,
    "next": null
}
```