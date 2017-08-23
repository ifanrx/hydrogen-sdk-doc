# 新增数据记录

##### 请求示例

```
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let Product = wx.BaaS.TableObject(tableID)
let product = Product.create()

// 设置方式一
let apple = {
  name: 'fushi',
  price: 10,
  dec: [
    'sweet',
    'red'
  ],
  amount: 2
}
product.set(apple).save().then( (res) => {
  // success
}, (err) => {
  // err
})

// 设置方式二
product.set('name', 'fushi')
product.set('price', 10)
product.set('desc', ["LRpq", "HGLa"])
product.save().then((res) => {}, (err) => {})
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

### Tip

- 插入的数据要与预先在知晓云平台设定的数据类型一致
