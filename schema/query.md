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
      "desc": ["good"],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0, "updated_at": 1503904437
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


### 数组查询

```
query.in('price', [10, 20, 30])

query.notIn('price', [10, 20, 30])
```

### 判断 is null

```
query.isNull('name')
query.isNull(['name', 'price'])

query.isNotNull('name')
query.isNotNull(['name', 'price'])
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
