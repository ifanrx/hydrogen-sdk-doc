<!-- ex_nonav -->

# 数据表

数据存储是知晓云提供的核心功能之一，借助它，你可以省去自己搭建数据库，维护数据库及优化数据库查询等麻烦操作。通过以下操作，便可以向在控制台创建的数据表添加一条记录：

```js
let tableName = 'product'
// 通过 `tableName` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表
let Product = new BaaS.TableObject(tableName)
// 本地创建一条空记录
let product = Product.create()

let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0,
  created_by: 36395395,
}

// 为上面创建的空记录赋值，并保存到服务器
product.set(apple).save().then(res=>{
  console.log(res)
})
```

**返回示例**

res 结构如下：

```json
{
  "status": 201,
  "data": {
      "_id": "59a3c2b5afb7766a5ec6e84e",
      "amount": 0,
      "created_at": 1503904437,
      "created_by": 36395395,
      "desc": ["good"],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0,
      "read_perm": ["user:*"],
      "updated_at": 1503904437,
      "write_perm": ["user:*"]
  }
}
```


数据表支持多种类型的数据，包括数组类型，时间日期类型，geojson 类型和文件类型，并且支持原子操作等高级功能，如下，既是对产品数量的进行原子性减 1 操作：

```js
let product = Product.getWithoutData(recordID)
// 执行原子性减 1
product.incrementBy('amount', -1)
product.update().then(res => {
  console.log(res)
})
```


**返回示例**

res 结构如下：

```json
{
  "status": 200,
  "data": {
      "_id": "59a3c2b5afb7766a5ec6e84e",
      "amount": -1,
      "created_at": 1503904437,
      "created_by": 36395395,
      "desc": ["good"],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0,
      "read_perm": ["user:*"],
      "updated_at": 1503904437,
      "write_perm": ["user:*"]
  }
}
```

同时，SDK 提供了多种复杂查询操作，包括正则匹配查询，数组查询，甚至是与或的组合查询，如下是正则匹配查询的使用：

使用高级查询我们需要创建一个 `BaaS.Query` 对象实例，通过在 `Query` 实例上调用 `matches`、`compare` 等方法来设置查询条件，

然后调用 `TableObject` 实例的 `setQuery` 方法，来设置查询条件。

最后调用 `TableObject` 实例的 `find` 方法，来发起查询。find 方法返回值为一个 Promise。

```js
// 假设 product 表有一个字段为 product_id ，其中数据的格式形如 '112233'
let Product = new BaaS.TableObject('product')
var query = new BaaS.Query()

// 查找产品 ID 以 11 开头，以 33 结尾的产品
regx = /^11\d+33$/

query.matches('product_id', regx)
Product.setQuery(query).find().then(res => {
  console.log(res)
})
```

**返回示例**

res 结构如下

```json
{
  "status": 200,
  "data": {
    "meta": {
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 2
    },
    "objects": [
      {
        "created_at": 1487053098,
        "id": "59a3c2b5afb7766a5ec6e84f",
        "product_id": "112233"
      },
      {
        "created_at": 1487053095,
        "id": "59a3c2b5afb7766a5ec6e84e",
        "product_id": "112333"
      }
    ]
  }
}
```


## 关于 `created_by` 字段
如果在云函数中创建数据记录时没有指定 `created_by` 字段，则创建的记录的 `created_by` 将是应用所属于企业的超级管理员的用户 ID。
此 ID 在控制台 - 用户中将无法被查到（因为并不是小程序 / Web 应用用户）

如果云函数是由小程序所调用，而云函数中需要以小程序用户身份创建记录，可以从 [event](../usage-notice.html#云函数中-event-结构说明) 中获取到请求云函数用户的信息，从而指定创建记录的 `created_by`：

```js
exports.main = function functionName(event, callback) {
  let tableName = 'product'
  let Product = new BaaS.TableObject(tableName)
  let product = Product.create()
  let apple = {
    name: 'apple',
    created_by: event.request.user.id
  }
  product.set(apple).save().then(res=>{
    callback(null, res.data)
  })
}
```


阅读以下章节，了解更多数据表操作接口：

* [数据类型](./data-type.md)
* [新增数据项](./create-record.md)
* [更新数据项](./update-record.md)
* [删除数据项](./delete-record.md)
* [获取数据项](./get-record-detail.md)
* [查询数据项](./query.md)
* [分页和排序](./limit-and-order.md)
* [地理位置操作](./geo.md)
* [字段过滤与扩展](./select-and-expand.md)
* [数据导入导出操作](./operation.md)
* [API 参考](./api-reference.md)
