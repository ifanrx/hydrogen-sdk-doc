# 新增数据记录

##### 请求示例

```
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let Product = wx.BaaS.TableObject(tableID)
let product = Obj.create()

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
obj.set('name', 'fushi')
obj.set('price', 10)
obj.set('desc', ["LRpq", "HGLa"])
obj.save().then((res) => {}, (err) => {})
```

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "7",
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": [
    "LRpq",
    "HGLa"
  ]
}
```

### Tip

- 插入的数据要与预先在知晓云平台设定的数据类型一致
