# 新增数据记录

{% tabs first="SDK 1.1.0 及以上版本", second="SDK 1.1.0 以下版本" %}

{% content "first" %}

## 添加普通数据

**请求示例**

```js
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let Product = new wx.BaaS.TableObject(tableID)
let product = Product.create()

// 设置方式一
let apple = {
  name: 'apple',
  price: 1,
  desc: ['good'],
  amount: 0
}
product.set(apple).save().then( (res) => {
  // success
}, (err) => {
  // err
})

// 设置方式二
product.set('name', 'apple')
product.set('price', 1)
product.set('desc', ['good'])
product.set('amount', 0)

product.save().then((res) => {}, (err) => {})
```

**返回示例** （res.statusCode === 201）

res.data:
```js
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

需要是 ISO 格式的字符串

  ```
  ((new Date()).toISOString()).toString()
  ```

## 添加 file 类型数据

  <span style='color:red'>* sdk version >= v1.1.2</span>

  ```
  let MyFile = new wx.BaaS.File()
  MyFile.upload(params).then((res) => {
    product.set('manual', res.data.file)
    product.save()
  })
  ```

  <span style='color:red'>* sdk version >= v1.1.1</span>

  ```
  wx.BaaS.uploadFile(params).then((res) => {
    let data = JSON.parse(res.data)
    product.set('manual', data.file)
    product.save()
  })
  ```

> **info**
> 设置的数据要与预先在知晓云平台设定的数据类型一致，当仅更新一个字段，并且数据不合法时，将无法成功保存，请求返回 `Failed to save record, type conflict on fields` 错误，如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

  ```
  /*
   * 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个字符类型的值，
   * 该请求会返回 200，但只有 amount 被成功设置为 10
   */

  let order = Order.create()
  order.set('amount', 10)
  order.set('date', 'abc')
  order.save()
  ```

{% content "second" %}

<p style='color:red'>* 该写法在 sdk v2.0 前仍然有效</p>

`wx.BaaS.createRecord(OBJECT)`

**OBJECT 参数说明**

|  参数名  |   类型  | 必填 |       描述       |
| :-----: | :----: | :--: | :-------------: |
| tableID | Number |  是  |     数据表 ID    |
|  data   | Object |  是  | 待插入的自定义数据 |

**请求示例**

```
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let data = {
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": [
    "LRpq",
    "HGLa"
  ]
}
let objects = {
  tableID,
  data
}
wx.BaaS.createRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
})
```

**返回参数**

|    参数名   |   类型   |    描述   |
| :--------: | :-----: | :------: |
|     id     | String  | 数据表 ID |
| created_at | Integer |  创建时间  |
|  is_admin  | Boolean | 自定义字段 |
|    name    | String  | 自定义字段 |
|   price    | Number  | 自定义字段 |
|    tags    |  Array  | 自定义字段 |

**返回示例**

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

> **info**
> 插入的数据要与预先在知晓云平台设定的数据类型一致

{% endtabs %}