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
  https://{{服务器域名}}/hserve/v2.4/table/test_table/record/?keys=id,created_at
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
  https://{{服务器域名}}/hserve/v2.4/table/test_table/record/?keys=-id,-created_at
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

> **info**
> 1. v2.4 以上版本字段扩展支持指定 pointer 展开后返回的字段，通过设置 expand=pointer1,pointer2&keys=pointer1.field1,pointer2.field2 的形式进行指定；注意，仅当 expand 中已指定展开对应的 pointer 字段后，keys 中指定的 pointer 展开后返回值才会生效，否则会被忽略
>
> 2. 通过 keys=pointer.field1,pointer.field2 指定返回字段，keys=-pointer.field1,-pointer.field2 指定不返回字段，两者不能同时使用，否则 keys 参数会被直接忽略
>
> 3. 展开后的返回值中默认会带上 _table 字段，表示该 pointer 字段指向的表名

**使用例子**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.4/table/test_table/record/?expand=created_by,pointer_value&keys=created_by.id,created_by.nickanme,pointer_value.name
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
    "id": 62536607,
    "nickname": "Larry。"
  },
  "pointer_value": {
    "_table": "table-name",
    "name": "123",
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
