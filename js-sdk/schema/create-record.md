# 新增数据记录

`BaaS.TableRecord#save(options)`

**参数说明**

options:

| 参数          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| expand        | string 或 string[] |  否  | 空字符串 | 是否返回对应字段扩展 |

> **info**
> 临时用户新增数据记录，请先查看[数据表匿名读写权限特别说明](/js-sdk/schema/#数据表匿名读写权限特别说明)

<!-- 分隔两个 info -->
> **info**
> SDK 3.14.5 及以上版本提供单条数据新增返回字段扩展的支持。expand 属性可传入字符串或者包含字符串的数组。例如：
>
> `record.save({expand: 'created_by'})`
>
> `record.save({expand: ['created_by']})`
>
> 有关字段扩展的介绍，请查看[字段扩展](/js-sdk/schema/select-and-expand.html/#字段扩展)。

## 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

{% ifanrxCodeTabs %}
`let MyTableObject = new wx.BaaS.TableObject(tableName)`
{% endifanrxCodeTabs %}

**参数说明**

tableName 和 tableID 二选一，不能同时存在

| 名称     | 类型   | 必填   | 说明                   |
| :-----  | :----- | :---- | :--- |
| tableID   | Number | 是  | 数据表的 ID             |
| tableName | String |  是 | 数据表名（SDK >= 1.2.0） |

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
> - 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据
> - 若插入数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终生成的数据中这几个字段将以插入数据中设置的字段值为准。

4.将创建的记录保存到服务器

`MyRecord.save()`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。


## 添加普通数据

**请求示例**

{% ifanrxCodeTabs %}
```js
// 向 tableName 为 'product' 的数据表插入一条记录
let tableName = 'product'
let Product = new wx.BaaS.TableObject(tableName)
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
{% endifanrxCodeTabs %}

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


## 添加日期时间 Date 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 ISO Date 格式的字符串，如 Product 表定义一个时间日期类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
let isoStr = ((new Date()).toISOString()).toString()
product.set('expiration_time', isoStr)
```

## 添加 file 类型数据

使用 SDK 1.1.2 及以上版本，操作如下：

{% ifanrxCodeTabs %}
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
{% endifanrxCodeTabs %}

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

{% ifanrxCodeTabs %}
```
wx.BaaS.uploadFile(params).then(res => {
  let data = JSON.parse(res.data)
  product.set('manual', data.file)
  product.save()
})
  ```
  {% endifanrxCodeTabs %}

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

## 添加 geojson 类型数据

查看 [地理位置操作](./geo.md) 章节

## 添加 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

## 添加 array 类型数据

添加 array 类型数据的方法与添加其他类型数据的方法基本一致。区别在于，array 类型数据是将一个的数组赋值给某个字段。

array 类型数据中的元素类型，要与预先在知晓云平台设定的字段类型一致。否则创建的数据将不包含该 array 类型的字段。

{% ifanrxCodeTabs %}
```js
// 元素类型为 integer
let Table = new wx.BaaS.TableObject(tableName)
let record = Table.create()
record.set('array_int', [1, 2, 3])
record.save()
```

```js
// 元素类型为 string
let Table = new wx.BaaS.TableObject(tableName)
let record = Table.create()
record.set('array_str', ['a', 'b', 'c'])
record.save()
```

```js
// 元素类型为 object
let Table = new wx.BaaS.TableObject(tableName)
let record = Table.create()
let obj_1 = {a: 10}
let obj_2 = {b: 20}
record.set('array_obj', [obj_1, obj_2])
record.save()
```

```js
// 元素类型为 geojson
let Table = new wx.BaaS.TableObject(tableName)
let record = Table.create()
let point = new wx.BaaS.GeoPoint(10, 10)
record.set('array_geo', [point])
record.save()
```

```js
// 元素类型为 file
let Table = new wx.BaaS.TableObject(tableName)
let record = Table.create()
let MyFile = new wx.BaaS.File()
MyFile.upload(fileParam).then(res => {
  let file = res.data.file  // res.data 为 Object 类型
  record.set('array_file', [file])
  return record.save()
})
```

```js
// 元素类型为 date
let Table = new wx.BaaS.TableObject(tableName)
let record = Table.create()
let date = new Date().toISOString()
record.set('array_date', [date])
record.save()
```
{% endifanrxCodeTabs %}

## 添加 pointer 类型数据

> **info**
> 每张表最多能建立 3 个 pointer 类型的字段。如有更多需求，请提交工单说明
> pointer 指向的数据表，不能改名或删除

假设现在有一张 Article 表, Article 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| comment        |  pointer         | 指向了 `Comment` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |

现在在 Article 表中新增一条数据，其中:

comment 字段指向了 Comment 表中 id 为 5bad87ab0769797b4fb27a1b 的数据行

user 字段指向了 _userprofile 表中 id 为 69147880 的数据行

{% ifanrxCodeTabs %}
```js
// 获取一个 tableRecord 实例
let Comment = new wx.BaaS.TableObject('Comment')
// 5bad87ab0769797b4fb27a1b 为 Comment 表中某行数据的 id
let comment = Comment.getWithoutData('5bad87ab0769797b4fb27a1b')
// 69147880 为 _userprofile 表中某行数据的 id
let user = new wx.BaaS.User().getWithoutData('69147880')

// 在 city 表中创建一行数据
let Article = new wx.BaaS.TableObject('Article')
let article = Article.create()

// 给 pointer 字段赋值
article.set('comment', comment)
article.set('user', user)

article.save().then(res=>{
  // success
})
```
{% endifanrxCodeTabs %}

**返回示例**

res 结构如下
```json
{
  "statusCode": 201,
  "data": {
    "_id": "5be5283240507206d6938ba8",
    "created_at": 1541744690,
    "created_by": 3,
    "id": "5be5283240507206d6938ba8",
    "comment": {
      "id": "5bad87ab0769797b4fb27a1b",
      "_table": "Comment"
    },
    "user": {
      "id": 69147880,
      "_table": "_userprofile"
    },
    "read_perm": [ "user:*" ],
    "updated_at": 1541744690,
    "write_perm": [ "user:*" ] }
}
```

## 批量新增数据项

SDK **1.4.0** 及以上版本支持批量新增数据项。

`TableObject.createMany([item,...])`

> **info**
> 批量创建记录的数量，最大限制为 1000

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| item   | object     |   符合表结构的对象      |

**请求示例**

{% ifanrxCodeTabs %}
```js
let MyTableObject = new wx.BaaS.TableObject(tableName)

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
{% endifanrxCodeTabs %}

**返回示例**

then 回调中 res 结构如下:
```json
{
  "statusCode": 201, // 201 表示创建成功, 注意这不代表所有数据都插入成功，具体要看 operation_result 字段
  "data": {
    "succeed": 10, // 成功插入记录数
    "total_count": 10, // 总的待插入记录数
    "operation_result": [  // 创建的详细结果
       {
         "success": {      // 成功时会有 success 字段
           "id": "5bffbab54b30640ba8135650",
           "created_at": 1543486133
         }
       },
       {
         "success": {
           "id": "5bffbab54b30640ba8135651",
           "created_at": 1543486133
         }
       },
       {
         "error": {     // 失败时会有 error 字段
           "code": 16837,
           "err_msg": "数据更新失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。"
         }
       }
     ]
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



### 批量创建时不触发触发器

> **info**
> 批量创建记录的数量，最大限制为 1000

```js
// 知晓云后台设置的触发器将不会被触发
MyTableObject.createMany(records, {enableTrigger: false}).then(res => {
   console.log(res.data.succeed)
}, err => {
  //err 为 HError 对象
})
```

**返回示例**

```json
{
  "statusCode": 201, // 201 表示创建成功, 注意这不代表所有数据都插入成功，具体要看 operation_result 字段
  "data": {
    "succeed": 10, // 成功插入记录数
    "total_count": 10, // 总的待插入记录数
    "operation_result": [  // 创建的详细结果
       {
         "success": {      // 成功时会有 success 字段
           "id": "5bffbab54b30640ba8135650",
           "created_at": 1543486133
         }
       },
       {
         "success": {
           "id": "5bffbab54b30640ba8135651",
           "created_at": 1543486133
         }
       },
       {
         "error": {     // 失败时会有 error 字段
           "code": 16837,
           "err_msg": "数据更新失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。"
         }
       }
     ]
  }
}
```
