# 删除数据

数据删除依赖当前登录用户拥有的该数据的写权限

**接口**

`DELETE /hserve/v2.2/table/:table_name/record/:record_id/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/5cbe89e7f1ec740af442a1f9/
```

**状态码说明**

`204` 删除成功

`403` 无删除权限


# 按条件批量删除数据

数据删除依赖当前登录用户拥有的该数据的写权限。

**接口**

`DELETE /hserve/v2.2/table/:table_name/record/`

其中 `:table_name` 需替换为你的数据表名称，`record_id` 需替换为你的记录 ID

> **info**
> 1. 当删除的数据大于 1000 条时，不支持使用触发器，且删除操作是异步执行
> 2. 该接口支持通过参数 return_total_count 指定是否返回待删除对象总数，以协助不关心对象总数只关心数据删除结果的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回待删除对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

Query Parameters:

| 参数           | 类型    | 必填 | 说明                                       |
| :------------- | :------ | :--- | :----------------------------------------- |
| where          | object  | Y    | 筛选的条件                                 |
| limit          | integer | N    | 最多删除数                                 |
| offset         | integer | N    | 从第几条开始删除                           |
| enable_trigger | integer | N    | 是否使用触发器，1 为使用触发器，0 为不使用 |
| return_total_count   | integer | N   | 返回结果中是否包含 total_count，1 为包含，0 为不包含，默认不包含 |

- `where` 可参考[查询数据](./query-record.md)中的使用方式
- `limit`、`offset` 的构造可参考[分页和排序](./limit-and-order.md)

**请求示例**

删除 nickname 为 `hgz` 的记录

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode 'where={"string":{"$eq":"he"}}' \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/
```

**返回参数说明**

| 参数              | 类型      | 说明                       |
| :--------------- | :-------  | :-----------------------  |
| succeed          |  integer  | 成功删除记录数               |
| offset           |  integer  |  与传入参数 offset 一致     |
| limit            |  integer  |  与传入参数 limit 一致       |
| next             |  string   |  下一次的删除链接，若待删除记录数超过上限，可通过该链接继续删除 |
| total_count      |  integer  |  where 匹配的记录数，包括无权限操作记录，仅当 return_total_count 为 1 时返回  |

**返回示例**

删除成功时，返回如下:
```json
{
    "succeed": 8,
    "total_count": 10,
    "offset": 0,
    "limit": 10,
    "next": null
}
```