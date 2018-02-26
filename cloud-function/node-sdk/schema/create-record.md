# 新增数据记录

## 操作步骤

1.通过 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new wx.BaaS.TableObject(tableID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :---|
| tableID | Number |  是 | 数据表 ID |

2.本地创建一条空记录

`let MyRecord = MyTableObject.create()`

3.为上面创建的空记录赋值

`MyRecord.set(data)`

该方法支持两种类型的赋值操作：

a.一次性赋值：

```js
MyRecord.set({
  key1: value1,
  key2: value2
})
```

b.逐个赋值

```js
MyRecord.set(key1, value1)
MyRecord.set(key2, value2)
```

> **info**
> 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据

4.将创建的记录保存到服务器

`MyRecord.save()`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。

## 添加普通数据

**请求示例**

```js
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let Product = new BaaS.TableObject(tableID)
let product = Product.create()

// 设置方式一
let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}
product.set(apple).save().then(res => {
  // success
}, err => {
  // err
})

// 设置方式二
product.set('name', 'apple')
product.set('price', 1)
product.set('desc', ['good'])
product.set('amount', 0)

product.save().then(res => {}, (err) => {})
```

**返回示例** （res.statusCode === 201）

res.data:
```json
{
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
```

## 添加时间类型的数据

数据表允许添加时间类型的列，为该类型的记录赋值，需要使用 ISO 格式的字符串，如 Product 表定义一个时间类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
let isoStr = ((new Date()).toISOString()).toString()
product.set('expiration_time', isoStr)
```


## 添加 file 类型数据

**请求示例**
```js
let MyFile = new wx.BaaS.File()
MyFile.upload(params).then(res => {
  product.set('manual', res.data.file)
  product.save()
})
```

## 添加 geojson 类型数据

查看 [地理位置操作](./geo.md) 章节