# 新增数据记录

{% tabs first="SDK 1.1.0 及以上版本", second="SDK 1.1.0 以下版本" %}

{% content "first" %}

## SDK 1.1.0 及以上版本

### 操作步骤

1.通过 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new wx.BaaS.TableObject(tableID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :---|
| tableID | Number |  是 | 数据表 ID |

> **info**
> SDK 1.2.0 版本已支持通过数据表名实例化 TableObject，如操作数据表名为 'product' 的数据表，可进行如下实例化：new wx.BaaS.TableObject('product')

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


### 添加普通数据

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

product.save().then(res => {}, err => {})
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

### 添加时间类型的数据

数据表允许添加时间类型的列，为该类型的记录赋值，需要使用 ISO 格式的字符串，如 Product 表定义一个时间类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
let isoStr = ((new Date()).toISOString()).toString()
product.set('expiration_time', isoStr)
```

### 添加 file 类型数据

使用 SDK 1.1.2 及以上版本，操作如下：

```
let MyFile = new wx.BaaS.File()  // 具体操作查看「文件操作」章节
MyFile.upload(params).then(res => {
  product.set('manual', res.data.file)
  product.save()
})
```

使用 SDK 1.1.2 以下版本，操作如下：

```
wx.BaaS.uploadFile(params).then(res => {
  let data = JSON.parse(res.data)
  product.set('manual', data.file)
  product.save()
})
  ```

<span class="attention">注：</span> 添加记录时为字段设置的数据，要与预先在知晓云平台设定的字段的数据类型一致，当仅更新一个字段，并且使用的数据不合法时，将无法成功保存，请求返回 `Failed to save record, type conflict on fields` 错误，如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

```js
/*
 * 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个字符类型的值，
 * 该请求会返回 200，但只有 amount 被成功设置为 10
 */

let order = Order.create()
order.set('amount', 10)
order.set('date', 'abc')
order.save()
```

### 添加 geojson 类型数据

查看 [地理位置操作](./geo.md) 章节

### 添加 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 {$ifanr.x: 123} 和 {知晓云: "test"} 是错误的


### 批量新增数据项

SDK 1.4.0 及以上版本支持批量新增数据项。

**请求示例**

```js
let MyTableObject = new wx.BaaS.TableObject(tableID)

const records = [
  {
    name: 'apple',
    price: 1,
    desc: ['good'],
    amount: 0
  }, {
    name: 'banana',
    price: 2,
    desc: ['good'],
    amount: 1
  }
]

MyTableObject.createMany(records).then(res => {}, err => {})
```

**返回示例**

res.data:
```js
{
  "succeed": 10, // 成功插入记录数
  "total_count": 10, // 总的待插入记录数
}
```

**状态码说明**

201 创建成功，400 请求数据非法或超过最大操作条目数上限

<span class="attention">注：</span> 由于对数据表的增删改均会触发 trigger 动作，为了防止出现严重消耗系统资源的情况，对数据表进行批量操作的数据条目最多不能超过 1000 条。

{% content "second" %}

## SDK 1.1.0 以下版本

> **info**
> 该写法在 sdk v2.0 前仍然有效

`wx.BaaS.createRecord(OBJECT)`

**OBJECT 参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| tableID | Number | 是  | 数据表 ID |
| data    | Object | 是  | 待插入的自定义数据 |

**返回参数**

| 参数        | 类型    | 描述 |
| :--------- | :------ | :-- |
| id         | String  | 数据表 ID |
| created_at | Integer | 创建时间 |
| is_admin   | Boolean | 自定义字段 |
| name       | String  | 自定义字段 |
| price      | Number  | 自定义字段 |
| tags       |  Array  | 自定义字段 |

**请求示例**

```js
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let data = {
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": ["LRpq", "HGLa"]
}
let objects = {
  tableID,
  data
}
wx.BaaS.createRecord(objects).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```js
{
  "created_at": 1487053095,
  "id": "7",
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": ["LRpq", "HGLa"]
}
```

> **info**
> 插入的数据要与预先在知晓云平台设定的数据类型一致

{% endtabs %}
