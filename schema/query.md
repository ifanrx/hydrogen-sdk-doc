# 查询

### 通用操作

##### 请求示例

```
// 实例化查询对象
var query = new BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
...

// 应用查询对象
var Product = new BaaS.TableObject(tableID)
Product.setQuery(query).find().then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "7",
  "name": "fushi",
  "price": 10,
  "desc": [
    "sweet",
    "red"
  ],
  amount: 2
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
var query1 = new BaaS.Query()
query1.isNull('name')
var query2 = new BaaS.Query()
query1.compare('price', '>', 10)
...

// and 查询
var andQuery = BaaS.Query.and(query1, query2, ...)

// or 查询
var orQuery =  BaaS.Query.or(query1, query2, ...)
```


### 复杂组合查询
```
var query1 = new BaaS.Query()
query1.isNull('name')
var query2 = new BaaS.Query()
query1.compare('price', '>', 10)
...

// and 查询
var andQuery = BaaS.Query.and(query1, query2)

// or 查询中包含 and 查询
var query3 = new BaaS.Query()
query3.compare('amount', '>', 3)
var orQuery =  BaaS.Query.or(andQuery, query3)
```
