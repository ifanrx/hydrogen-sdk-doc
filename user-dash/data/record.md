# 数据操作

获得数据表数据接口，支持对**内置表自定义字段的获取与修改**

## 查询数据

**接口**

`GET https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.4 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

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

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.4/table/1/record/', {params: {where: {price: {$eq: 10}}}}).then(res => {
  console.log(res.data)
})
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
https://cloud.minapp.com/userve/v2.4/table/:table_id/record/?limit=1&return_total_count=1
``` 

## 排序返回查询数据

查询接口默认按**创建时间倒序**的顺序来返回数据列表，你也可以通过设置 `order_by` 参数来实现。

示例：

```
# 顺序
https://cloud.minapp.com/userve/v2.4/table/:table_id/record/?order_by=created_at

# 倒序
https://cloud.minapp.com/userve/v2.4/table/:table_id/record/?order_by=-created_at
```

## 获取数据项

**接口**

`GET https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

## 写入数据

**接口**

`POST https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

`file` 类型字段的更新比较特殊，需要先将文件上传，拿上传结果中返回的 id 字段调用 [文件模块：文件操作：获取文件详情](https://doc.minapp.com/user-dash/file/file.html#%E8%8E%B7%E5%8F%96%E6%96%87%E4%BB%B6%E8%AF%A6%E6%83%85)
接口后，将返回的文件详情结果设为字段值进行写入。

> **info**
> - 插入的数据要与预先在知晓云平台设定的数据类型一致
> - 若插入数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终生成的数据中这几个字段将以插入数据中设置的字段值为准。

**状态码说明**

`201` 写入成功，`400` 请求参数有错


## 更新数据

本接口提供数据更新的能力，通过指定表 ID 以及 Record ID 来完成操作， 需注意，更新的数据所包含的字段需要与数据表中定义的字段一致。

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

`file` 类型字段的更新比较特殊，需要先将文件上传，拿上传结果中返回的 id 字段调用 [文件模块：文件操作：获取文件详情](https://doc.minapp.com/user-dash/file/file.html#%E8%8E%B7%E5%8F%96%E6%96%87%E4%BB%B6%E8%AF%A6%E6%83%85)
接口后，将返回的文件详情结果设为字段值进行更新。

> **info**
> - 更新的数据要与预先在知晓云平台设定的数据类型一致
> - 若更新数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终更新完成的数据中这几个字段将以更新数据中设置的字段值为准。

**状态码说明**

`200` 更新成功，`400` 请求参数有错


## 清空字段值

将数据表中行数据对应字段值清空

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

| 参数     | 类型    | 必填 | 说明 |
| :---    | :------| :--  | :-- |
| $unset  | Object | Y    | 待清空的字段|

```json
{
  "$unset": {
    "expample": "" 
  }
}
```

**状态码说明**

`200` 更新成功，`400` 请求参数有错


## 修改数据行 ACL

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| read_perm  | String Array | Y   | 待更新的数据行读权限 |
| write_perm | String Array | Y   | 待更新的数据行写权限 |

`write_perm` 和 `read_perm` 的可选值请参考 [数据表操作-创建数据表](./table.md) 小节

**状态码说明**

`200` 更新成功，`400` 请求参数有错


## 数据删除

> **danger**
> 本接口可直接删除任意数据，不受 ACL 控制

**接口**

`DELETE https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**状态码说明**

`204` 删除成功


## 数据原子性更新

当请求同时对一个数据进行修改时，原子性更新使得冲突和覆盖导致的数据不正确的情况不会出现，目前支持的数据类型是**数字类型**和**数组类型**

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

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

**状态码说明**

`200` 更新成功，`400` 操作符不支持/请求参数有错


> **danger**
> 以下操作仅适用于 API version >= v1.8


## pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**接口**

`GET https://cloud.minapp.com/userve/v2.4/table/:table_id/record/?where=query`

其中 `:table_id` 需替换为你的数据表 ID，query 为查询条件

## 字段扩展

支持 expand created_by 以及 pointer 类型字段。返回结果中的 created_by 以及扩展的 pointer 类型字段会被替换为这个字段对应的完整对象。

> **info**
> 1. 字段扩展功能仅支持在 v1.8 及以上版本接口使用
>
> 2. v2.4 以上版本字段扩展支持指定 pointer 展开后返回的字段，通过设置 expand=pointer1,pointer2&keys=pointer1.field1,pointer2.field2 的形式进行指定；注意，仅当 expand 中已指定展开对应的 pointer 字段后，keys 中指定的 pointer 展开后返回值才会生效，否则会被忽略
>
> 3. 通过 keys=pointer.field1,pointer.field2 指定返回字段，keys=-pointer.field1,-pointer.field2 指定不返回字段，两者不能同时使用，否则 keys 参数会被直接忽略
>
> 4. 展开后的返回值中默认会带上 _table 字段，表示该 pointer 字段指向的表名

**接口**

`GET https://cloud.minapp.com/userve/v2.4/table/:table_id/record/?expand=pointer,created_by&keys=created_by.nickanme,created_by.avatar,pointer.customized_field`

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
    "nickname": "Larry。"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer": {
    "_table": "pointer",
    "customized_field": "field_content"
  }
}
```


## 添加 pointer 类型数据

**接口**

`POST https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 需替换为你的数据表 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

其中 `pointer` 类型字段的创建只需传入指向的数据行 ID 即可。

**状态码说明**

`201` 写入成功，`400` 请求参数有错


## 更新 pointer 类型数据

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/:record_id/`

其中 `:table_id` 需替换为你的数据表 ID，`record_id` 需替换为你的记录 ID

**参数说明**

Content-Type: `application/json`

| 参数  | 类型                | 必填 | 说明 |
| :--- | :------------------ | :-- | :-- |
| key  | key 字段对应的数据类型 | Y   | key 应为数据表中定义的字段名 |

其中 `pointer` 类型字段的创建只需传入指向的数据行 ID 即可。

**状态码说明**

`200` 更新成功，`400` 请求参数有错


## 批量写入数据

**接口**

`POST https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。一次请求最多支持创建 1000 条数据，支持触发触发器。

**参数说明**

Content-Type: `application/json`

将需要批量创建的数据放到一个数组里提交，数组中的元素构建方式与创建单条数据一致。

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

`404`: 指定的数据表不存在。


## 同步批量修改数据

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求最多修改 1000 条数据，支持触发触发器。

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回待更新对象总数，以协助不关心对象总数只关心数据更新结果的开发者提升接口响应速度。
同时，从 v2.4 版本开始该接口默认不返回待更新对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

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

`404`: 指定的数据表不存在。


## 同步批量删除数据

**接口**

`DELETE https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求最多删除 1000 条数据，支持触发触发器。

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回待删除对象总数，以协助不关心对象总数只关心数据删除结果的开发者提升接口响应速度。
同时，从 v2.4 版本开始该接口默认不返回待删除对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |
| limit    | Integer | Y   | 设置单次请求至多可以删除多少条数据，默认为 1000 |
| offset   | Integer | N   | 设置删除的起始偏移值，默认为 0 |
| return_total_count   | Integer | N   | 返回结果中是否包含 total_count，1 为包含，0 为不包含，默认不包含 |

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

`404`: 指定的数据表不存在。


## 异步大批量修改数据

**接口**

`PUT https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求更新的数据条数大于 1000 条且 Query 参数中没有 limit 参数或 limit 值大于 1000 时会自动使用此接口，不支持触发触发器。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |

**参数说明**

Content-Type: `application/json`

与修改单条数据的参数一致。

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| status | String | 请求状态，值为：ok |
| operation_id | Integer | 异步结果 ID |

**状态码说明**

`200`: 成功。

`400`: 参数错误，比如缺少必填项，数据类型不对。

`404`: 指定的数据表不存在。

## 异步大批量删除数据

**接口**

`DELETE https://cloud.minapp.com/userve/v2.4/table/:table_id/record/`

其中 `:table_id` 是数据表的 ID。单次请求删除的数据条数大于 1000 条且 Query 参数中没有 limit 参数或 limit 值大于 1000 时会自动使用此接口，不支持触发触发器。

**Query 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| where    | String | N   | 查询语句，参数值应经过 JSON 编码为 JSONString 后，再经过 URL 编码 |

**返回参数说明**

| 参数    | 类型   | 说明 |
| :----- | :----- | :-- |
| status | String | 请求状态，值为：ok |
| operation_id | Integer | 异步结果 ID |

**状态码说明**

`200`: 成功。

`400`: 查询参数不合法，比如：数据类型不对。

`404`: 指定的数据表不存在。

## 查询异步批量更新、删除结果

**接口**

`GET https://cloud.minapp.com/userve/v1/bulk-operation/:operation_id/`

其中 `:operation_id` 是异步批量更新或删除接口中返回的 `operation_id` 字段的值。

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

`404`: 操作记录不存在
