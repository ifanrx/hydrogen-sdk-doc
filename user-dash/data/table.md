# 数据表操作

## 获取数据表详情

**接口**

`GET https://cloud.minapp.com/userve/v1/table/:table_id/`

**代码示例**

{% tabs getRichTextEntryCurl="Curl"%}

{% content "getRichTextEntryCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/table/1/
```

{% endtabs %}

**返回示例**

```json
{
  "id": 1,
  "name": "Table",
  "is_protected": false,
  "protected_fields": null,
  "schema": {
    "fields": [
      {
        "description": "id",
        "name": "id",
        "type": "id"
      },
      {
        "description": "created_by",
        "name": "created_by",
        "type": "integer"
      },
      {
        "description": "created_at",
        "name": "created_at",
        "type": "integer"
      },
      {
        "description": "updated_at",
        "name": "updated_at",
        "type": "integer"
      },
      {
        "acl": {
          "clientReadOnly": false,
          "clientVisible": true,
          "creatorVisible": false
        },
        "constraints": {
          "required": false
        },
        "default": [
          1
        ],
        "description": "",
        "items": {
          "type": "integer"
        },
        "name": "array_int",
        "type": "array"
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

接口字段说明：

| 参数  | 类型 | 说明 |
| :--- | :-- | :-- |
| id | Number | 数据表 ID |
| name | String| 数据表名 |
| is_protected | Boolean | 数据表是否为内置表的标志位，true 为内置表 |
| protected_fields | String Array | 内置表的保护字段，若数据表不是内置表，该字段为 null |
| schema | Object | 数据表字段的元信息 |
| write_perm | String Array | <p>数据表写权限</p><p>- user:* 所有人可写</p><p> |
| default_row_perm | Object | 数据表下行数据的默认权限 |
| created_at | Number | 数据表创建时间 |
| updated_at | Number | 数据表更新时间 |

字段 schema 参数说明：

| 参数  | 类型 | 说明 |
| :--- | :-- | :-- |
| name | String| 字段名 |
| type | String | 字段类型 |
| description | String | 字段描述 |
| items | Object | 数组字段的元素类型 |
| clientReadOnly | Boolean | 客户端只读的标志位，true 表示字段在客户端不能被写入／更新|
| clientVisible | Boolean | 客户端可见的标志位， true 表示字段在客户端可见 |
| creatorVisible | Boolean | 客户端创建者可见的标志位，true 表示字段在客户端只有创建者可见 |
| required | Boolean | 是否是写入/更新必填选项 |
| default | 与字段类型保持一致 | 字段的默认值 |

权限参数的说明：

| 参数  | 类型 | 说明 |
| :--- | :-- | :-- |
| user:* | String| 所有人可写／可读 |
| user:<:user_id> | String| 某个用户可写／可读 |
| gid:<:group_id> | String| 某个分组下的用户可写／可读 |


## 获取数据表列表

**接口**

`GET https://cloud.minapp.com/userve/v1/table/`

**提交参数**

- name 支持对数据表名的等值查询

`https://cloud.minapp.com/userve/v1/table/?name=Table`

**代码示例**

{% tabs getTableListCurl="Curl"%}

{% content "getTableListCurl" %}

```
curl -X GET \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/userve/v1/table/
```

{% endtabs %}

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
      "is_protected": false,
      "name": "Table",
      "protected_fields": null,
      "schema": {
        "fields": [
          {
            "description": "id",
            "name": "id",
            "type": "id"
          },
          {
            "description": "acl_permission",
            "name": "acl_permission",
            "type": "integer"
          },
          {
            "description": "acl_gid",
            "name": "acl_gid",
            "type": "integer"
          },
          {
            "description": "created_by",
            "name": "created_by",
            "type": "integer"
          },
          {
            "description": "created_at",
            "name": "created_at",
            "type": "integer"
          },
          {
            "description": "updated_at",
            "name": "updated_at",
            "type": "integer"
          },
          {
            "acl": {
              "clientReadOnly": false,
              "clientVisible": true,
              "creatorVisible": false
            },
            "constraints": {
              "required": false
            },
            "default": [
              1
            ],
            "description": "",
            "items": {
              "type": "integer"
            },
            "name": "array_int",
            "type": "array"
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
