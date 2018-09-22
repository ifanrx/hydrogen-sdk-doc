# 分页和排序

{% tabs first="SDK 1.1.0 及以上版本", second="SDK 1.1.0 以下版本" %}

{% content "first" %}

## SDK 1.1.0 及以上版本

### 分页

使用 limit 和 offset 来控制分页数据：

- `limit`  指定该请求返回的结果个数
- `offset`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

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

### 排序

使用 orderBy 来控制使用升序或降序获取数据列表。

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

// 多重排序
Product.setQuery(query).orderBy(['-created_at', 'created_by']).find()
// 👆先按照 created_at 降序，再按照 created_by 升序排列
```

{% content "second" %}

## SDK 1.1.0 以下版本

### 分页

使用 `limit` 和 `offset` 参数来控制分页请求

- `limit`， 指定该请求返回的结果个数（默认 20，最大 1000）
- `offset`（偏移量），指定该请求返回的结果的起始位置（`offset` 从 0 开始算起）

示例：查询数据表 `ID` 为 10 的第 3 页数据

```js
let pageNum = 3 // 页码
let limit = 16
let offset = limit * (pageNum - 1)

let objects = {
  tableID: 10,
  limit
  offset
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

### 排序

示例 1：查询数据表 `ID` 为 10 的数据，返回的数据按 `id` 逆序排序

```js
let objects = {
  tableID: 10,
  order_by: '-id', // 如果是正序就是 order_by: 'id'
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

示例 2：查询数据表 `ID` 为 10 的数据，返回的数据按 `id` 逆序、`created_by` 正序排序（前面的优先）

```js
let objects = {
  tableID: 10,
  order_by: '-id,created_by', // 如果是正序就是 order_by: id
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

{% endtabs %}