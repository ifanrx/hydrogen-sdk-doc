# 分页和排序

## 分页

通过使用 limit 和 offset 来控制分页数据，默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制，limit 最大可设置为 1000。

例如，每页展示 20 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 80 即可。

```js
var Product = new wx.BaaS.TableObject(tableID)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

Product.setQuery(query).limit(10).offset(0).find().then(res => {
  // success
}, err => {
  // err
})
```

## 排序

```js
var Product = new wx.BaaS.TableObject(tableID)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

// 升序
Product.setQuery(query).orderBy('created_at').find()
// or
Product.setQuery(query).orderBy(['created_at']).find()

// 降序
Product.setQuery(query).orderBy('-created_at').find()
// or
Product.setQuery(query).orderBy(['-created_at']).find()
```