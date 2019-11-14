# 新增单条记录

`POST /hserve/v2.2/table/:table_name/record/`

本接口提供数据写入功能，其中 `:table_name` 需替换为你的数据表名称

**参数说明**

| 参数 | 类型                   | 必填 | 说明                         |
| :--- | :--------------------- | :--- | :--------------------------- |
| key  | key 字段对应的数据类型 | Y    | key 应为数据表中定义的字段名 |

> **info**
> 插入的数据要与预先在知晓云平台设定的数据类型一致

**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"name":"nickname","desc":"desc","created_by":767911111}' \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/
```

> **info**
> 如果需要在数据表中存储文件，文件类型的字段必须要包含 `id, name, created_at, mime_type, cdn_path, size` 这几个属性，如果文件类型的字段没有保存成功，请检查文件字段有没有包含这几个属性

**返回参数说明**

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| id | string | id, 唯一标识 |
| created_at | integer | 创建时间 |
| updated_at | integer | 更新时间 |
| created_by | integer | 创建者 id |
| read_perm | array | 读权限 |
| write_perm | array | 写权限 |

**返回示例**
```json
{
    "_id": "5cbe87f0f1ec740afa429e0c",
    "created_at": 1555990512,
    "created_by": 767911111,
    "id": "5cbe87f0f1ec740afa429e0c",
    "desc": "desc",
    "read_perm": [
        "user:*"
    ],
    "name": "nickname",
    "updated_at": 1555990512,
    "write_perm": []
}
```

# 批量新增记录

`POST /hserve/v2.2/table/:table_name/record/`

本接口提供数据批量写入功能，其中 `:table_name` 需替换为你的数据表名称

**参数说明**

参数为 `object array`, 即一个 `object` 的数组，其中 `object` 的结构如下:

| 参数 | 类型                   | 必填 | 说明                         |
| :--- | :--------------------- | :--- | :--------------------------- |
| key  | key 字段对应的数据类型 | Y    | key 应为数据表中定义的字段名 |

**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '[{"name":"nickname","desc":"desc","created_by":767911111},{"name":"nickname2","desc":"desc2","created_by":767911111}]' \
  https://{{服务器域名}}/hserve/v2.2/table/test_table/record/
```
> **info**
> 状态码返回 201 并不说明批量写入数据完全成功，仅代表服务端已收到并处理了这个请求
> 只有当返回的结果中 operation_result 列表中不存在 error 元素时，才可以认为所有数据均写入成功。

**返回参数说明**

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| id | string | id, 唯一标识 |
| created_at | integer | 创建时间 |
| total_count | integer | 总的待创建记录数 |
| succeed | integer | 成功创建记录数 |
| operation_result | object array | 批量写入每一条数据的结果 |


**返回示例**

写入成功时，返回如下:
```json
{
    "succeed": 2,
    "total_count": 2,
    "operation_result": [
        {
            "success": {
                "created_at": 1555991015,
                "id": "5cbe89e7f1ec740af442a1f9"
            }
        },
        {
            "success": {
                "created_at": 1555991015,
                "id": "5cbe89e7f1ec740af442a1fa"
            }
        }
    ]
}
```
写入失败时，返回如下:
```json
{
    "succeed": 1,
    "total_count": 2,
    "operation_result": [
        {
          "success": {
            "id": "5bfe000ce74243582bf2979f", 
            "created_at": "1543459089"
          }
        },
        {
          "error": {
              "code": 11000,
              "err_msg": "数据写入失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。"
          }
        }
    ]
}
```