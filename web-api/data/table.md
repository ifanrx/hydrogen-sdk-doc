# 数据表操作

## 获取数据表详情

**接口**

`GET /hserve/v1/table/:table_id/`

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{Client ID}}" \
  -H "Authorization: Hydrogen-r1  {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{ServerUrl}}/hserve/v1/table/952728/
```

**返回示例**

```json
{
  "id": 1,
  "name": "Table",
  "protected_fields": null,
  "schema": {
    "fields": [
      {
        "name": "String",
        "type": "string"
      }
    ]
  },
  "write_perm": [
    "user:*"
  ],
  "default_row_perm": {
    "_read_perm": [
      "user:*"
    ],
    "_write_perm": [
      "user:*"
    ]
  },
  "created_at": 1519538564,
  "updated_at": 1519640477
}
```

**返回参数说明**

|        参数       |      类型    |   说明    |
| :--------------- | :----------- | :------- |
| id               | Integer      | 数据表 ID |
| name             | String       | 数据表名 |
| protected_fields | String Array | 内置表的保护字段，若数据表不是内置表，该字段为 null |
| schema           | Object       | 数据表字段的元信息 |
| write_perm       | String Array | 数据表写权限 |
| default_row_perm | Object       | 数据表行数据权限 |
| created_at       | Integer      | 数据表创建时间 |
| updated_at       | Integer      | 数据表更新时间 |

**状态码说明**

`200`: 成功


## 获取数据表列表

**接口**

`GET /hserve/v1/table/`

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{Client ID}}" \
  -H "Authorization: Hydrogen-r1  {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{ServerUrl}}/hserve/v1/table/
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
      "id": 1,
      "name": "Table",
      "protected_fields": null,
      "schema": {
        "fields": [
          {
            "name": "String",
            "type": "string"
          }
        ]
      },
      "write_perm": [
        "user:*"
      ],
      "default_row_perm": {
        "_read_perm": [
          "user:*"
        ],
        "_write_perm": [
          "user:*"
        ]
      },
      "created_at": 1519538564,
      "updated_at": 1519640477
    }
  ]
}
```

**状态码说明**

`200`: 成功
