## wx.BaaS.TableObject 类

每个 TableObject 实例对应一张数据表，通过 TableObject 实例，你可以对数据表进行增删改查的操作。

### 初始化

初始化 TableObject 的参数可以用 tableID 或 tableName，这里推荐使用 tableName ( SDK >= 1.2.0 )。

`new TableObject( tableID | tableName )`

**参数说明**

tableID 和 tableName 二选一，不能同时存在

| 参数名     | 类型    | 说明                                 |
|-----------|---------|-------------------------------------|
| tableID   | integer | 数据表的 ID                          |
| tableName | string  | 数据表名 ( SDK >= 1.2.0  )           |


### 方法

#### create()

创建一行数据

**返回值**

wx.BaaS.TableRecord 类实例

#### createMany ([item, ...])
批量新增数据项

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| item   | object     |   符合表结构的对象      |

**返回值**

`Promise<Object>`

#### delete(query|recordID)

批量/单个删除数据行

**参数说明**

query 和 recordID 二选一，不能同时存在

| 参数名   | 类型   | 说明                                               |
|----------|--------|----------------------------------------------------|
| query    | object | wx.BaaS.Query 实例，符合查询条件的数据行将会被删除   |
| recordID | string / integer | 数据行 ID，指定的数据行将会被删除           |

**返回值**

`Promise<Object>`


#### getWithoutData( query | recordID )

获取 TableRecord 实例，以便于更新数据行

**参数说明**

| 参数名   | 类型   | 说明                                                  |
|----------|--------|-------------------------------------------------------|
| query    | object | wx.BaaS.Query 实例，返回的 TableRecord 指向多个数据行 |
| recordID | string / number | 数据行 ID，返回的 TableRecord 对象指向指定的数据行    |

**返回值**

wx.BaaS.TableRecord 类实例

#### get(recordID)

获取指定数据行的数据

**参数说明**

| 参数名   | 类型   | 说明                                                  |
|----------|--------|-------------------------------------------------------|
| recordID | string / number | 数据行 ID                                 |

**返回值**

`Promise<RecordObject>`

#### find()

执行查询动作

**参数说明**

无

**返回值**

`Promise<ResObject>`

在 ResObject 的 `data` 字段中可以取得查询结果

ResObject.data 结构说明

```json
{
  "meta": {
    "limit": 20,       // 当前查询的 limit
    "next": null,
    "offset": 0,       // 当前查询的 offset
    "previous": null,
    "total_count": 3   // 符合查询条件的数据行数量
  },
  "objects": [         // 数据行数组
    {                  // 单个数据行内容
      "_id": "59a3c2b5afb7766a5ec6e84e",
      // ... 数据行的其他字段
    },
  ]
}
```

#### count()

统计符合条件的数据行数量

**参数说明**

无

**返回值**

`Promise<Integer>`

#### setQuery(query)

设置查询条件，将影响 find() 和 count() 的结果

**参数说明**

| 参数名   | 类型   | 说明                 |
|----------|--------|--------------------|
| query    | object | wx.BaaS.Query 实例 |

**返回值**

this，即当前 TableObject 实例

#### select(args)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| args    | string / array | 指定要筛选的字段 |

**返回值**

this，即当前 TableObject 实例

#### expand(args)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| args    | string / array | 指定要扩展的字段 |

**返回值**

this，即当前 TableObject 实例

#### limit(num)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| num    | number | 指定要筛选的字段 |

**返回值**

this，即当前 TableObject 实例

#### offset(num)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| num    | number | 要跳过的数据行数         |

**返回值**

this，即当前 TableObject 实例


#### orderBy(args)

| 参数名   | 类型   | 说明                   |
|----------|--------|--------------------   |
| args    | string / array | 指定排序         |

**返回值**

this，即当前 TableObject 实例