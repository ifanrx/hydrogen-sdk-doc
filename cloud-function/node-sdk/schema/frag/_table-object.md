
# {{apiPrefix}}BaaS.TableObject 类

每个 TableObject 实例对应一张数据表，通过 TableObject 实例，你可以对数据表进行增删改查的操作。

## 初始化

 {% if apiPrefix %}
初始化 TableObject 的参数可以用 tableID 或 tableName，这里推荐使用 tableName ( SDK >= 1.2.0 )。

`new TableObject( tableID | tableName )`

 {% else %}
 使用 数据表名来初始化 TableObject。
 
`new TableObject( tableName )`

 {% endif %}

**参数说明**

 {% if apiPrefix %}
 
  tableID 和 tableName 二选一，不能同时存在
  
  | 参数名     | 类型    | 说明                                 |
  |-----------|---------|-------------------------------------|
  | tableID   | integer | 数据表的 ID                          |
  | tableName | string  | 数据表名 ( SDK >= 1.2.0  )           |
 
 {% else %}

 | 参数名     | 类型    | 说明                                 |
 |-----------|---------|-------------------------------------|
 | tableName | string  | 数据表名                             |
 
 {% endif %}



## 实例方法

### create()

创建一行数据

**返回值**

{{apiPrefix}}BaaS.TableRecord 类实例

### createMany ([item, ...])
批量新增数据项

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| item   | object     |   符合表结构的对象      |

**返回值**

`Promise<ResObject>`

ResObject 结构如下:
{% if apiPrefix %}
```js
{
  statusCode: 201, // 状态码
  data: {
    succeed: 10, // 成功插入记录数
    total_count: 10 // 总的待插入记录数
  }
}
```
{% else %}
```js
{
  status: 201, // 状态码
  statusText: "Created",
  data: {
    succeed: 10, // 成功插入记录数
    total_count: 10 // 总的待插入记录数
  }
}
```
{% endif %}

### delete(query|recordID)

批量/单个删除数据行

**参数说明**

query 和 recordID 二选一，不能同时存在

| 参数名   | 类型   | 说明                                               |
|----------|--------|----------------------------------------------------|
| query    | object | {{apiPrefix}}BaaS.Query 实例，符合查询条件的数据行将会被删除   |
| recordID | string / integer | 数据行 ID，指定的数据行将会被删除           |

**返回值**

`Promise<ResObject>`

ResObject 结构如下:
{% if apiPrefix %}
```js
{
  statusCode: 204,
  data: ""
}
```
{% else %}
```js
{
  status: 204,
  statusText: "No Content",
  data: ""
}
```
{% endif %}

### getWithoutData( query | recordID )

获取 TableRecord 实例，以便于更新数据行

**参数说明**

| 参数名   | 类型   | 说明                                                  |
|----------|--------|-------------------------------------------------------|
| query    | object | {{apiPrefix}}BaaS.Query 实例，返回的 TableRecord 指向多个数据行 |
| recordID | string / integer | 数据行 ID，返回的 TableRecord 对象指向指定的数据行    |

**返回值**

{{apiPrefix}}BaaS.TableRecord 类实例

### get(recordID)

获取指定数据行的数据

**参数说明**

| 参数名   | 类型   | 说明                                                  |
|----------|--------|-------------------------------------------------------|
| recordID | string / integer | 数据行 ID                                 |

**返回值**

`Promise<RecordObject>`

RecordObject 结构如下：
{% if apiPrefix %}
```js
{
  statusCode: 200,
  data: {
    _id: "59a3c2b5afb7766a5ec6e84e",
    amount: 0,
    created_at: 1503904437,
    created_by: 36395395,
    id: "59a3c2b5afb7766a5ec6e84e",
    write_perm: ["user:*"]
    // ...
  }
}
```
{% else %}
```js
{
  status: 200,
  statusText: "OK",
  data: {
    _id: "59a3c2b5afb7766a5ec6e84e",
    amount: 0,
    created_at: 1503904437,
    created_by: 36395395,
    id: "59a3c2b5afb7766a5ec6e84e",
    write_perm: ["user:*"]
    // ...
  }
}
```
{% endif %}


### find()

执行查询动作

**参数说明**

无

**返回值**

`Promise<ResObject>`

ResObject 结构如下:
{% if apiPrefix %}
```js
{
  statusCode: 200,
  data: {
    meta: {
      limit: 20,       // 当前查询的 limit
      next: null,
      offset: 0,       // 当前查询的 offset
      previous: null,
      total_count: 3   // 符合查询条件的数据行数量
    },
    objects: [         // 数据行数组
      {                  // 单个数据行内容
        _id: "59a3c2b5afb7766a5ec6e84e",
        // ... 数据行的其他字段
      },
    ]
  }
}
```
{% else %}
```js
{
  status: 200,
  statusText: "OK",
  data: {
    meta: {
      limit: 20,       // 当前查询的 limit
      next: null,
      offset: 0,       // 当前查询的 offset
      previous: null,
      total_count: 3   // 符合查询条件的数据行数量
    },
    objects: [         // 数据行数组
      {                  // 单个数据行内容
        _id: "59a3c2b5afb7766a5ec6e84e",
        // ... 数据行的其他字段
      },
    ]
  }
}
```
{% endif %}

### count()

统计符合条件的数据行数量

**参数说明**

无

**返回值**

`Promise<Integer>`

### setQuery(query)

设置查询条件，将影响 find() 和 count() 的结果

**参数说明**

| 参数名   | 类型   | 说明                 |
|----------|--------|--------------------|
| query    | object | {{apiPrefix}}BaaS.Query 实例 |

**返回值**

this，即当前 TableObject 实例

### select(args)

指定筛选字段

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| args    | string / array |  |

**返回值**

this，即当前 TableObject 实例

### expand(args)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| args    | string / array | 指定要扩展的字段 |

**返回值**

this，即当前 TableObject 实例

### limit(num)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| num    | integer | 数量      |

**返回值**

this，即当前 TableObject 实例

### offset(num)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| num    | integer | 数量         |

**返回值**

this，即当前 TableObject 实例

### orderBy(args)

指定排序值

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| args    | string / array | 若为数组，则同时指定多个排序         |

**返回值**

this，即当前 TableObject 实例
