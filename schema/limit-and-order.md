# 限制和排序

<p style='color:red'>* sdk version >= v1.1.0</p>

### 限制（主要用于分页操作）

```
// 通过查询获取到的数据列表默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制
var Product = new wx.BaaS.TableObject(tableID)

var query = new wx.BaaS.Query()
query.compare('amount', '>', 0)

Product.setQuery(query).limit(10).offset(0).find().then( (res) => {
  // success
}, (err) => {
  // err
})
```

---

### 排序

```
var Product = new wx.BaaS.TableObject(tableID)

// 升序
Product.orderBy('create_at')
// or
Product.orderBy(['create_at'])

// 降序
Product.orderBy('-create_at')
// or
Product.orderBy(['-create_at'])
```