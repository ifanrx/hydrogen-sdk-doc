# 字段过滤

Hydrogen 所有的数据接口均支持指定输出/不输出某个字段。需注意，接口不支持指定输出，不输出的情况，即：`?keys=-a,b`

## 指定字段输出

**使用方式**

在 Query Parameters 中加入 keys，值为需要指定输出的字段，可同时指定多个字段，中间用 `,` 隔开，如 `?keys=id,created_at`

**使用例子**

设 `test_table` 表拥有 4 个字段，分别为 `id`, `created_at`, `nickname`, `gender` 

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/?keys=id,created_at
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
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/?keys=-id,-created_at
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
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/?expand=created_by,pointer_value
```

**返回示例**

pointer_value 为指向其他表的 pointer 类型字段

> **info**
> 未 expand 的情况下，created_by 的值是 int 类型，而其他 pointer 的值是 object

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
  "pointer_value": {
    "id": "5a2fa9xxxxxxxxxxxxxx",
    "_table": "table-name"
  }
}
```
