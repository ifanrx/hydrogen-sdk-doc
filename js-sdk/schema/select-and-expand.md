# 字段过滤与扩展

> **danger**
> 该操作适用于 SDK version >= v1.3.0

## 字段过滤

使用 select 来控制请求返回的字段

```js
var Product = new wx.BaaS.TableObject(tableID)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

// 规定返回特定字段
Product.setQuery(query).select('created_at').find()
// or
Product.setQuery(query).select(['created_at']).find()

// 规定不返回特定字段
Product.setQuery(query).select('-created_at').find()
// or
Product.setQuery(query).select(['-created_at']).find()
```

## 字段扩展

使用 expand 来扩展特定字段

```js
var Product = new wx.BaaS.TableObject(tableID)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

// 扩展特定字段
Product.setQuery(query).expand('created_by').find()
// or
Product.setQuery(query).expand(['created_by']).find()

```