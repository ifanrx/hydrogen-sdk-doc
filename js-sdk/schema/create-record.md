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
  console.log(res)
}, err => {
  //err 为 HError 对象
})


// 设置方式二
product.set('name', 'apple')
product.set('price', 1)
product.set('desc', ['good'])
product.set('amount', 0)

product.save().then(res => {
  // success
  console.log(res)
}, err => {
  // HError 对象
})
```

**返回示例**

then 回调中的 res 对象结构如下，其中 res.data 为新增的数据行：

```json
{
  "statusCode": 201,
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
err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|------------------|
| 400            | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403            | 没有权限写入数据    |
| 404            | 写入的数据表不存在   |


> **info**
> 对于不合法的数据，知晓云会进行过滤。比如开发者尝试在 integer 类型的字段写入 string 类型的数据，该操作不会报错而是会忽略对该字段的修改。
> 因此可以检查 res.data 中对应的字段来判断某些字段是否添加成功。


### 添加日期时间 Date 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 ISO Date 格式的字符串，如 Product 表定义一个时间日期类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
let isoStr = ((new Date()).toISOString()).toString()
product.set('expiration_time', isoStr)
```

### 添加 file 类型数据

使用 SDK 1.1.2 及以上版本，操作如下：

```js
let MyFile = new wx.BaaS.File()  // 具体操作查看「文件操作」章节
MyFile.upload(params).then(res => {
  product.set('manual', res.data.file)
  product.save().then(res => {
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
})
```

**返回示例**

res 结构如下

```json
{
  "statusCode": 201,
  "data": {
    "_id": "5bbac6e7bd66033df7fd0aac",
    "created_at": 1538967271,
    "created_by": 61736923,
    "file": {
      "cdn_path": "1g9LgkbXEdbXwAJT.jpg",
      "created_at": 1538967271,
      "id": "5bbac6e6bd66033efcfd0a95",
      "mime_type": "image/jpeg",
      "name": "wxc6b86e382a1e3294.o6zAJs5dCuYRqqJOq0MwNPlGiFVM.UxdrZqves41D1cd738e01dc1c7417c03d046e96408cc.jpg",
      "path": "https://cloud-minapp-11033.cloud.ifanrusercontent.com/1g9LgkbXEdbXwAJT.jpg",
      "size": 6151
    },
    "id": "5bbac6e7bd66033df7fd0aac",
    "name": "new",
    "read_perm": ["user:*"],
    "updated_at": 1538967271,
    "write_perm": ["user:*"]
  }
}
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
 * 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个 string 类型的值，
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

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

### 添加 array 类型数据

添加 array 类型数据的方法与添加其他类型数据的方法基本一致。区别在于，array 类型数据是将一个的数组赋值给某个字段。

array 类型数据中的元素类型，要与预先在知晓云平台设定的字段类型一致。否则创建的数据将不包含该 array 类型的字段。

```js
// 元素类型为 integer
let Table = new wx.BaaS.TableObject(tableID)
let record = Table.create()
record.set('array_int', [1, 2, 3])
record.save()
```

```js
// 元素类型为 string
let Table = new wx.BaaS.TableObject(tableID)
let record = Table.create()
record.set('array_str', ['a', 'b', 'c'])
record.save()
```

```js
// 元素类型为 date
let Table = new wx.BaaS.TableObject(tableID)
let record = Table.create()
let isoStr = ((new Date()).toISOString()).toString()
record.set('array_date', [isoStr])
record.save()
```

```js
// 元素类型为 object
let Table = new wx.BaaS.TableObject(tableID)
let record = Table.create()
let obj_1 = {a: 10}
let obj_2 = {b: 20}
record.set('array_obj', [obj_1, obj_2])
record.save()
```

### 批量新增数据项

SDK **1.4.0** 及以上版本支持批量新增数据项。

`TableObject.createMany([item,...])`

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| item   | object     |   符合表结构的对象      |

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

MyTableObject.createMany(records).then(res => {
   console.log(res.data.succeed)
}, err => {
  //err 为 HError 对象
})
```

**返回示例**

then 回调中 res 结构如下:
```json
{
  "statusCode": 201, // 状态码 201 表示成功
  "data": {
    "succeed": 10, // 成功插入记录数
    "total_count": 10 // 总的待插入记录数
  }
}
```
err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因        |
|----------------|------------------|
| 400            | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403            | 没有权限写入数据    |
| 404            | 写入的数据表不存在  |



**状态码说明**

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

```json
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
