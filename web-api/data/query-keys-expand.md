# 查询

当请求参数支持使用 `where` 时，你可以通过构造 `where` 参数来构造查询条件。

- `where` 支持 `or`、`and` 等逻辑操作符查询，查询语句是将操作符以逆波兰表示法进行树结构的构造
- `where` 可以抽象的认为是一种`键值对`的结构
- `where` 查询语句可以进行`嵌套查询`

> **info**
> where 一定要作为 URL 的 **Query Parameters** 传入

**操作符**

`where` 支持的操作符有:

- or([cond1, cond2…]): 满足某个条件
- and([cond1, cond2…]): 满足全部条件
- exists(true | false): 某个字段是否存在于记录中
- isnull(true | false): 某个字段的值是否为 null
- regex(regex): string 字段是否匹配正则表达式
- options(value): 在 regex 内部使用，如增加 i 选项，忽略大小写
- has_key(key): key 是否存在 object 字段中
- range(start, end): integer 或 number 字段是否存在于某个区间中
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

**使用方式**
- 以 `and`（操作符）为键时，值是是所有子查询的集合（数组），在值（数组）中每一个元素之间是`交集`的关系(`and` 查询语句还可嵌套 `or` 查询)
- 以 `or`（操作符）为键时，值中每一个元素之间是并集的关系

eg: 查询 `title` 包含 A1 或 `subtitle` 包含 A1 的所有资源，并且这些资源的 `price` 需要 `小于` 100，此时的 `where` 如下:

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
          "title": {
            "$contains": "A1"
          }
        },
        {
          "subtitle": {
            "$contains": "A1"
          }
        }
      ]
    }
  ]
}
```

> **info**
> 注意：知晓云的 api URL 长度限定为 16386，超出则返回 502，请在构造查询条件时注意长度控制，如 in 操作符后边的数组长度、match 操作符后边的字符串长度等。

**使用示例**

查询 test_table 表中 status 为 `deleted` 的记录

此时的 url 较为特殊，Query Parameters 为一个**字典**，需要经过 urlencode 才可正常使用，通常有两种用法:

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/?where%3d%7b%22status%22%3a%7b%22%24eq%22%3a%22deleted%22%7d%7d
```

其中 `where%3d%7b%22status%22%3a%7b%22%24eq%22%3a%22deleted%22%7d%7d` 为 `where={"status":{"$eq":"deleted"}}` 经过 urlencode 后的值

或

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'where={"status":{"$eq":"deleted"}}' \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/
```


# 字段过滤

Hydrogen 所有的数据接口均支持指定输出/不输出某个字段。需注意，接口不支持指定输出，不输出的情况，即：`?keys=-a,b`

## 指定字段输出

**使用方式**

在 Query Parameters 中加入 keys，值为需要指定输出的字段，可同时指定多个字段，中间用 `,` 隔开，如 `?keys=id,created_at`

**使用例子**

设 `test_table` 表拥有 4 个字段，分别为 `id`, `created_at`, `nickname`, `gender` 

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/?keys=id,created_at
```

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
            "id": 16,
            "created_at": 1514174425
        }
    ]
}
```

## 指定字段不输出

**使用方式**

在 Query Parameters 中加入 keys，值为需要指定不输出的字段，字段需要加上前缀 `-`，可同时指定多个字段，中间用 `,` 隔开, 如 `?keys=-id,-created_at`

**使用例子**

设 `test_table` 表拥有 4 个字段，分别为 `id`, `created_at`, `nickname`, `gender` 

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/?keys=-id,-created_at
```

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
          "nickname": "John Doe",
          "gender": "famale"
        }
    ]
}
```

> **info**
> 当提交 keys 不是 Table 的字段时，会报 400 的错误

# 字段扩展

开发者可以通过 expand pointer 来查询该字段的更多信息,返回结果中的 pointer 字段会被替换为这个字段对应的完整对象。

> **info**
> - created_by 字段是一个特殊的 pointer，开发者无需配置，默认指向了 _userpofile 表
> - 使用 expand 方法会增加一次数据表查询，api call 计费 +1

**使用方式**

在 Query Parameters 中加入 expand，值为需要扩展的字段，可同时扩展多个字段，中间用 `,` 隔开

**使用例子**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/table/test_table/record/?expand=created_by,pointer_value
```

**返回示例**

注：pointer_value 为指向其他表的 pointer 类型字段

使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": {
    "avatar": "https://media.ifanrusercontent.com/tavatar/fb/cd/xxxx.jpg",
    "id": 62536607,
    "nickname": "Larry。"
  },
  "pointer_value": {
    "created_at": 1516118400,
    "name": "123",
    "id": "5a2fa9xxxxxxxxxxxxxx"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199
}
```

不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 1234,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer_value": "5a2fa9xxxxxxxxxxxxxx"
}
```