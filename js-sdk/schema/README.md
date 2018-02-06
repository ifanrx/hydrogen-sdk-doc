<!-- ex_nonav -->

# 数据表

数据存储是知晓云提供的核心功能之一，借助它，你可以省去自己搭建数据库，维护数据库及优化数据库查询等麻烦操作。通过以下操作，便可以向在控制台创建的数据表添加一条记录：

```js
let tableID = 10
let Product = new wx.BaaS.TableObject(tableID)
let product = Product.create()

let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}
product.set(apple).save()
```

数据表支持多种类型的数据，包括数组类型，时间类型，geojson 类型和文件类型，并且支持原子操作等高级功能，如下，既是对产品数量的进行原子性减 1 操作：

```
let product = Product.getWithoutData(recordID)
product.incrementBy('amount', -1)
product.update().then(res => {

})
```

同时，SDK 提供了多种复杂查询操作，包括正则匹配查询，数组查询，甚至是与或的组合查询，如下是正则匹配查询的使用：

```
let Product = new wx.BaaS.TableObject(tableID)
var query = new wx.BaaS.Query()

// 查找产品 ID 以 11 开头，以 33 结尾的产品
regx = /^11\d+33$/

query.matches('pid', regx)
Product.setQuery(query).find().then(res => {
  console.log(res.data)
})
```