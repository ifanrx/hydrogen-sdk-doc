# 分页和排序

## 分页

使用 limit 和 offset 来控制分页数据：

- `limit`  指定该请求返回的结果个数
- `offset`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

{% tabs pagingAsync="async/await", pagingPromise="promise" %}
{% content "pagingAsync" %}
```js
async function paging() {
  try {
    var Product = new BaaS.TableObject(tableName)

    var query = new BaaS.Query()
    query.compare('amount', '>', 0)

    let res = await Product.setQuery(query).limit(10).offset(0).find()
    // success
  } catch(err) {
    // error
  }
}
```

{% content "pagingPromise" %}
```js
function paging() {
  var Product = new BaaS.TableObject(tableName)

  var query = new BaaS.Query()
  query.compare('amount', '>', 0)

  Product.setQuery(query).limit(10).offset(0).find().then(res => {
    // success
  }).catch(err => {
    // error
  })
}
```
{% endtabs %}

## 排序

使用 orderBy 来控制使用升序或降序获取数据列表。

{% tabs sortingAsync="async/await", sortingPromise="promise" %}
{% content "sortingAsync" %}
```js
async function sorting() {
  try {
    var Product = new BaaS.TableObject(tableName)

    var query = new BaaS.Query()
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
    let res = await Product.setQuery(query).orderBy(['-created_at', 'created_by']).find()
    // 👆先按照 created_at 降序，再按照 created_by 升序排列
    // success
  } catch(err) {
    // error
  }
}
```

{% content "sortingPromise" %}
```js
function sorting() {
  var Product = new BaaS.TableObject(tableName)

  var query = new BaaS.Query()
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
}
```
{% endtabs %}