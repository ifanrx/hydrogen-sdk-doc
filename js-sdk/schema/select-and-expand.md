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

<span class="attention">注：</span>

通过数组控制请求返回字段时，若数组内元素同时存在“规定返回”和“规定不返回”的字段，如：`['-created_at', 'created_by']`。后端服务会忽略掉此次操作，直接返回所有字段。

## 字段扩展
