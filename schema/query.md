# 查询

<p style='color:red'>* sdk version >= v1.1.0</p>

### 通用操作

##### 请求示例

```
// 实例化查询对象
var query = new wx.BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
...

// 应用查询对象
var Product = new wx.BaaS.TableObject(tableID)
Product.setQuery(query).find().then( (res) => {
  // success
}, (err) => {
  // err
})

// 不设置查询条件
Product.find().then()
```

##### 返回示例 (res.statusCode === 200)

res.data:
```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 3
  },
  "objects": [
    {
      "_id": "59a3c2b5afb7766a5ec6e84e",
      "acl_gid": null,
      "acl_permission": 7,
      "amount": 0,
      "created_at": 1503904437,
      "created_by": 36395395,
      "desc": ["good", 'great'],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0, 
      "updated_at": 1503904437
    },
    ...
  ]
}
```


### 比较查询

`query.compare(key, operator, value)`

operator 包含 =, !=, <, <=, >, >=

```
query.compare('amount', '>',  1)
```


### 字符串查询

```
query.contains('name', 'apple')
```

也支持正则匹配 ( <span style='color:red'>* sdk version >= v1.1.1</span> )

```
query.matches('name', regExp)
```


### 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个
```
query.in(fieldName, array)
```

field 的类型不限制，field 的 value 不含有 array 中的任何一个
```
query.notIn(fieldName, array)
```

field 的类型必须为数组, field 的 value 包含 array 中的每一个  ( <span style='color:red'>* sdk version >= v1.1.1</span> )
```
query.arrayContains(fieldName, array)
```

如果希望对数组进行完全匹配查询，可以使用比较查询
```
query.compare(fieldName, '=', array)
```

##### 请求示例：
```
/* color 是类型为字符串的字段，desc 是类型为数组的字段 */

// 查询 color 是 green 或 red 或 yellow 的记录
query.in('color', ['green', 'red', 'yellow'])

// 查询 desc 中包含 green 或 red 或 yellow 的记录
query.in('desc', ['green', 'red', 'yellow'])

// 查询 color 不是 green、red 和 yellow 的记录
query.notIn('color', ['green', 'red', 'yellow'])

// 查询 desc 中不包含 green、red 和 yellow 的记录
query.notIn('desc', ['green', 'red', 'yellow'])

// 查询 desc 中包含 green、red 和 yellow 的记录
query.arrayContains('desc', ['green', 'red', 'yellow'])

// 查询 desc 中只包含 green、red 和 yellow 的记录
query.compare('desc', '=', ['green', 'red', 'yellow'])
```

### 判断 is null

```
query.isNull('name')
query.isNull(['name', 'price'])

query.isNotNull('name')
query.isNotNull(['name', 'price'])
```

### 判断字段是否存在 ( <span style='color:red'>* sdk version >= v1.1.1</span> )

```
query.isExist('name')
query.isExist(['name', 'price'])

query.isNotExist('name')
query.isNotExist(['name', 'price'])
```

### 组合查询

```
var query1 = new wx.BaaS.Query()
query1.isNull('name')
var query2 = new wx.BaaS.Query()
query1.compare('price', '>', 10)
...

// and 查询
var andQuery = wx.BaaS.Query.and(query1, query2, ...)

// or 查询
var orQuery =  wx.BaaS.Query.or(query1, query2, ...)
```


### 复杂组合查询

```
var query1 = new wx.BaaS.Query()
query1.isNull('name')
var query2 = new wx.BaaS.Query()
query1.compare('price', '>', 10)
...

// and 查询
var andQuery = wx.BaaS.Query.and(query1, query2)

// or 查询中包含 and 查询
var query3 = new wx.BaaS.Query()
query3.compare('amount', '>', 3)
var orQuery = wx.BaaS.Query.or(andQuery, query3)
```