# 限制和排序

### 限制（主要用于分页操作）

```
// 通过查询获取到的数据列表默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制
var Product = new BaaS.TableObject(tableID)

var query = new Query()
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
var Product = new BaaS.TableObject(tableID)

// 升序
Product.orderBy('createAt')
// or
Product.orderBy(['createAt'])

// 降序
Product.orderBy('-createAt')
// or
Product.orderBy(['-createAt'])
```