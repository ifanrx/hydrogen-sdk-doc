# 数据表操作

`BaaS.TableSchema` 对象封装了针对数据表相关的操作，通过实例化 `TableSchema`，我们可以对数据表进行增删改查。

```js
let tableSchema = new BaaS.TableSchema()
```


## 创建数据表

`tableSchema.createSchema(schemaInfo)`

**参数说明**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| schemaInfo.name           | String(32)   |  是 | 数据表名（以字母开头，字母、数字、下划线的组合) |
| schemaInfo.schema         | Object       |  是 | 数据表字段的元信息 |
| schemaInfo.row_read_perm  | String Array |  是 | 数据表行的默认读权限 |
| schemaInfo.row_write_perm | String Array |  是 | 数据表行的默认写权限 |
| schemaInfo.write_perm     | String Array |  是 | 数据表的写权限 |

参数 row_read_perm 和 row_write_perm 控制数据表数据的读写权限，读权限表示用户是否有权限获取数据，写权限表示用户是否有权限更新数据。

参数 write_perm 控制数据表的写权限，即表示用户是否有权限创建数据。

权限参数的说明：

|       参数       |  类型  | 说明 |
| :-------------- | :---- | :--- |
| user:anonymous  | String| 所有人（匿名用户 + 登录用户）可写／可读 |
| user:*          | String| 登录用户（不包含匿名用户）可写／可读 |
| user:<:user_id> | String| 某个用户可写／可读 |
| gid:<:group_id> | String| 某个分组下的用户可写／可读 |

具体描述与使用场景可参考[ACL 访问控制列表](../../../dashboard/acl.md)。

参数 schema 用于存储数据表字段的元信息，其结构遵循[JSON-Table-Schema](https://frictionlessdata.io/specs/table-schema/)的描述。

例：

```python
{
  "fields": [
    {
      "name": "field_name",
      "type": "string",
      "description": "description of field_name",
      "constraints": {
        "required": true # 设置写入/更新必填选项
      },
      "default": "hello, world", # 设置默认值
      "acl": {
        "clientVisibile": true, # 设置客户端可见
        "clientReadOnly": true, # 设置客户端只读
        "creatorVisible": true  # 设置创建者可见
      }
    }
  ]
}
```

数据表列的元信息：

|        属性     |       类型     | 必填 | 说明 |
| :-------------- | :------------ |:---| :-- |
| name            | String(32)    | 是 | 字段名（字母开头，字母、数字、下划线的组合） |
| type            | String        | 是 | 字段类型 |
| items           | Object        | 否 | 列表元素类型，array 字段类型必填 |
| format          | String        | 否 | geojson 字段类型必填，值默认为 `default` |
| description     | String        | 否 | 字段的描述，不填自动赋值为字段名称 |
| constraints     | Object        | 否 | 字段的约束属性，仅支持 required 属性 |
| default         | 跟字段类型一致  | 否 | 字段的默认值 |
| acl             | Object        | 否 | 字段权限相关的属性 |
| coordinate_type | String        | 否 | geojson 字段类型必填|
| schema_id       | String        | 否 | pointer 字段类型必填，表示关联的数据表 ID|

- `type` 目前支持 string、integer、number、boolean、array、geojson、file、date、reference(pointer 类型字段)等

- `items` 目前支持 string、integer、number、boolean 等

- `coordinate_type` 目前支持 wgs84（地球坐标）、gcj02（火星坐标）

若字段是 array 类型，字段元信息为：

```json
{
  "name": "array_field",
  "type": "array",
  "items": {
    "type": "string"
  }
}
```

若字段是 geojson 类型，字段元信息为：

```json
{
  "name": "location",
  "type": "geojson",
  "format": "default",
  "coordinate_type": "gcj02"
}
```

若字段是 pointer 类型，字段元信息为：

```json
{
  "name": "pointer",
  "type": "reference",
  "schema_id": "1"
}
```

字段权限相关的属性存储在 acl 中：

|       属性      |   类型  | 必填 | 说明 |
| :--------------| :------ | :--| :--- |
| clientVisibile | Boolean | 否 | 客户端只读的标志位，true 表示字段在客户端只读，不能被写入／更新 |
| clientReadOnly | Boolean | 否 | 客户端可见的标志位， false 表示字段在客户端不可见 |
| creatorVisible | Boolean | 否 | 客户端创建者可见的标志位，true 表示字段在客户端只有创建者可见 |

**代码示例**

{% tabs async="async/await", promise="promise" %}
{% content "async" %}

```javascript
const schemaInfo = {
  "name": "Table199",
  "schema": {
    "fields": [
      {
        "name": "String",
        "type": "string"
      }
    ]
  },
  "row_read_perm": [
    "user:anonymous"
  ],
  "row_write_perm": [
    "user:*"
  ],
  "write_perm": [
    "user:*"
  ]
}

async function createSchema() {
  try {
    let tableSchema = new BaaS.TableSchema()
    let res = await tableSchema.createSchema(schemaInfo)
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```
{% content "promise" %}

```javascript
const schemaInfo = {
  "name": "Table199",
  "schema": {
    "fields": [
      {
        "name": "String",
        "type": "string"
      }
    ]
  },
  "row_read_perm": [
    "user:anonymous"
  ],
  "row_write_perm": [
    "user:*"
  ],
  "write_perm": [
    "user:*"
  ]
}

function createSchema() {
  let tableSchema = new BaaS.TableSchema()
  tableSchema.createSchema(schemaInfo).then(res=>{
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```

{% endtabs %}

**返回示例**

{% ifanrxfold summary="res.data 结构如下" %}

```json
{
  "id": 1,
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
        "name": "String",
        "type": "string",
        "description": "string"
      }
    ]
  },
  "write_perm": [
    "user:*"
  ],
  "default_row_perm": {
    "_read_perm": [
      "user:anonymous"
    ],
    "_write_perm": [
      "user:*"
    ]
  },
  "created_at": 1519538564,
  "updated_at": 1519640477
}
```
{% endifanrxfold %}

> **info**
> 字段如 id、created_by、created_at、updated_at 为自动添加的内置字段

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

`201`: 修改成功

`400`: 表名已存在；不合法的数据


## 获取数据表详情

**接口**

`tableSchema.getSchema(schemaID)`

**代码示例**

{% tabs getSchemaAsync="async/await", getSchemaPromise="promise" %}
{% content "getSchemaAsync" %}
```js
async function getSchema() {
  try {
    let tableSchema = new BaaS.TableSchema()
    let res = await tableSchema.getSchema(1)
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "getSchemaPromise" %}
```js
function getSchema() {
  let tableSchema = new BaaS.TableSchema()
  tableSchema.getSchema(1).then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

res.data 结构如下

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

**状态码说明**

`200`: 成功


## 获取数据表列表

`tableSchema.getSchemaList({offset, limit})`

**参数说明**

|       参数       |  类型  | 说明 |
| :-------------- | :---- | :--- |
| limit    | Number | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

{% tabs getSchemaListAsync="async/await", getSchemaListPromise="promise" %}
{% content "getSchemaListAsync" %}
```js
async funnction getSchemaList() {
  try {
    let res = await tableSchema.getSchemaList({limit:20, offset: 0})
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "getSchemaListPromise" %}
```js
function getSchemaList() {
  tableSchema.getSchemaList({limit:20, offset: 0}).then(res=>{
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

res.data 结构如下

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


## 更新数据表

`tableSchema.updateSchema(schemaID, schemaInfo)`

> **info**
> 数据表更新接口支持一次更新一个或多个字段

**代码示例**

{% tabs updateSchemaAsync="async/await", updateSchemaPromise="promise" %}
{% content "updateSchemaAsync" %}
```js
const schemaInfo = {
  name: "table"
}

async function updateSchema() {
  try {
    let res = await tableSchema.updateSchema(1, schemaInfo)
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "updateSchemaPromise" %}
```js
const schemaInfo = {
  name: "table"
}

function updateSchema() {
  tableSchema.updateSchema(1, schemaInfo).then(res=>{
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

res.data 接口如下

```json
{
  "id": 1,
  "name": "table",
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

**状态码说明**

`200`: 修改成功

`400`: 表名已存在；不合法的数据

## 删除数据表

`tableSchema.deleteSchema(schemaID)`

**代码示例**

{% tabs deleteSchemaAsync="async/await", deleteSchemaPromise="promise" %}
{% content "deleteSchemaAsync" %}
```js
async function deleteSchema() {
  try {
    let res = await tableSchema.deleteSchema(1)
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "deleteSchemaPromise" %}
```js
function deleteSchema() {
  tableSchema.deleteSchema(1).then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**状态码说明**

`204`: 删除成功
