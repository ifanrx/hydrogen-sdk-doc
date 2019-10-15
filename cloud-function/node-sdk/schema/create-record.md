# 新增数据记录

## 操作步骤

1.通过 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new BaaS.TableObject(tableName)`

**参数说明**


| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableName | string  | 数据表名                             |

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

> **info**
> 注意：云函数中创建数据的 `created_by` 字段需手动指定，否则将会是应用企业的超级管理员的用户 ID。
>
> 具体参考：[关于 `created_by` 字段](./README.md/#关于-createdby-字段)

## 添加普通数据

**请求示例**

{% tabs createProductAsync="async/await", createProductPromise="promise" %}
{% content "createProductAsync" %}
```js
async function createProduct() {
  try {
    let tableName = 'product'
    let Product = new BaaS.TableObject(tableName)
    let product = Product.create()

    // 设置方式一
    let apple = {
      name: 'apple',
      price: 1,
      desc: ['good'],
      amount: 0
    }
    let res = await product.set(apple).save()
    //success
    console.log(res)

    // 设置方式二
    product.set('name', 'apple')
    product.set('price', 1)
    product.set('desc', ['good'])
    product.set('amount', 0)

    let res = await product.save()
    //success
    console.log(res)
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "createProductPromise" %}
```js
function createProduct() {
  let tableName = 'product'
  let Product = new BaaS.TableObject(tableName)
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
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })

  // 设置方式二
  product.set('name', 'apple')
  product.set('price', 1)
  product.set('desc', ['good'])
  product.set('amount', 0)

  product.save().then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

回调中的 res 对象结构如下，其中 res.data 为新增的数据行：

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

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因        |
|----------------|------------------|
| 400            | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403            | 没有权限写入数据    |
| 404            | 写入的数据表不存在  |

> **info**
> 对于不合法的数据，知晓云会进行过滤，比如开发者尝试在 integer 类型的字段写入 string 类型的数据，该操作不会报错而是会忽略对该字段的修改。
> 因此可以检查 res.data 中对应的字段来判断某些字段是否添加成功。


## 添加日期时间 Date 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 ISO Date 格式的字符串，如 Product 表定义一个时间日期类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```js
let isoStr = ((new Date()).toISOString()).toString()
product.set('expiration_time', isoStr)
```


## 添加 file 类型数据

**请求示例**

{% tabs addFileAsync="async/await", addFilePromise="promise" %}
{% content "addFileAsync" %}
```js
async function addFile() {
  try {
    let MyFile = new BaaS.File()
    await MyFile.upload(params)
    product.set('manual', res.data.file)
    let res = await product.save()
    console.log(res)
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "addFilePromise" %}
```js
function addFile() {
  let MyFile = new BaaS.File()
  MyFile.upload(params).then(res => {
    product.set('manual', res.data.file)
    product.save().then(res=>{
      console.log(res)
      callback(null, res)
    }).catch(err => {
      // error
      callback(err)
    })
  })
}
```
{% endtabs %}

**返回示例**

res 结构如下

```json
{
  "status": 201,
  "data": {
    "_id": "5bbac6e7bd66033df7fd0aac",
    "created_at": 1538967271,
    "created_by": 61736923,
    "file": {
      "cdn_path": "1g9LgkbXEdbXwAJT.jpg",
      "created_at": 1538967271,
      "id": "5bbac6e6bd66033efcfd0a95",
      "mime_type": "image/jpeg",
      "name": "6b86e382a1e3294.o6zAJs5dCuYRqqJOq0MwNPlGiFVM.UxdrZqves41D1cd738e01dc1c7417c03d046e96408cc.jpg",
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

## 添加 geojson 类型数据

查看 [地理位置操作](./geo.md) 章节

## 添加 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的。

## 添加 array 类型数据

添加 array 类型数据的方法与添加其他类型数据的方法基本一致。区别在于，array 类型数据是将一个的数组赋值给某个字段。

array 类型数据中的元素类型，要与预先在知晓云平台设定的字段类型一致。否则创建的数据将不包含该 array 类型的字段。

```js
// 元素类型为 integer
let Table = new BaaS.TableObject(tableName)
let record = Table.create()
record.set('array_int', [1, 2, 3])
record.save()
```

```js
// 元素类型为 string
let Table = new BaaS.TableObject(tableName)
let record = Table.create()
record.set('array_str', ['a', 'b', 'c'])
record.save()
```

```js
// 元素类型为 object
let table = new baas.tableobject(tablename)
let record = table.create()
let obj_1 = {a: 10}
let obj_2 = {b: 20}
record.set('array_obj', [obj_1, obj_2])
record.save()
```

```js
// 元素类型为 geojson
let Table = new BaaS.TableObject(tableName)
let record = Table.create()
let point = new BaaS.GeoPoint(10, 10)
record.set('array_geo', [point])
record.save()
```

```js
// 元素类型为 file
let Table = new BaaS.TableObject(tableName)
let record = Table.create()
let MyFile = new BaaS.File()
MyFile.upload(fileParam).then(res => {
  let file = res.data.file  // res.data 为 Object 类型
  record.set('array_file', [file])
  return record.save()
})
```

```js
// 元素类型为 date
let Table = new BaaS.TableObject(tableName)
let record = Table.create()
let date = new Date().toISOString()
record.set('array_date', [date])
record.save()
```

## 添加 pointer 类型数据

> **info**
> 每张表最多能建立 3 个 pointer 类型的字段，如有更多需求，请提交工单说明  
> pointer 指向的数据表，不能改名或删除
 

假设现在有一张 Article 表, Article 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| comment        |  pointer         | 指向了 `Comment` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |

现在在 Article 表中新增一条数据，其中: 

comment 字段指向了 Comment 表中 id 为 5bad87ab0769797b4fb27a1b 的数据行

user 字段指向了 _userprofile 表中 id 为 69147880 的数据行

{% tabs addPointerAsync="async/await", addPointerPromise="promise" %}
{% content "addPointerAsync" %}
```js
async function addPointer() {
  try {
    // 获取一个 tableRecord 实例
    let Comment = new BaaS.TableObject('Comment')
    // 5bad87ab0769797b4fb27a1b 为 Comment 表中某行数据的 id
    let comment = Comment.getWithoutData('5bad87ab0769797b4fb27a1b')
    // 69147880 为 _userprofile 表中某行数据的 id
    let user = new BaaS.User().getWithoutData(69147880)

    // 在 city 表中创建一行数据
    let Article = new BaaS.TableObject('Article')
    let article = Article.create()

    // 给 pointer 字段赋值
    Article.set('comment', comment)
    Article.set('user', user)

    let res = await article.save()
    // success
    return res
  } catch (err) {
    // error
    throw err
  }
}
```

{% content "addPointerPromise" %}
```js
function addPointer() {
  // 获取一个 tableRecord 实例
  let Comment = new BaaS.TableObject('Comment')
  // 5bad87ab0769797b4fb27a1b 为 Comment 表中某行数据的 id
  let comment = Comment.getWithoutData('5bad87ab0769797b4fb27a1b')
  // 69147880 为 _userprofile 表中某行数据的 id
  let user = new BaaS.User().getWithoutData(69147880)

  // 在 city 表中创建一行数据
  let Article = new BaaS.TableObject('Article')
  let article = Article.create()

  // 给 pointer 字段赋值
  Article.set('comment', comment)
  Article.set('user', user)

  article.save().then(res=>{
    // success
    callback(null, res)
  }).catch(e => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

res 结构如下
```json
{
  "status": 201,
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

## 新增数据项

`TableObject.createMany([item,...])`

> **info**
> 批量创建记录的数量，最大限制为 1000

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| item   | object     |   符合表结构的对象   |

**请求示例**

{% tabs createManyAsync="async/await", createManyPromise="promise" %}
{% content "createManyAsync" %}
```js
async function createMany() {
  try {
    let MyTableObject = new BaaS.TableObject(tableName)

    const records = [{
      name: 'apple',
      price: 1,
      desc: ['good'],
      amount: 0
    }, {
      name: 'banana',
      price: 2,
      desc: ['good'],
      amount: 1
    }]

    let res = await MyTableObject.createMany(records)
    console.log(res.data.succeed)
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "createManyPromise" %}
```js
function createMany() {
  let MyTableObject = new BaaS.TableObject(tableName)

  const records = [{
    name: 'apple',
    price: 1,
    desc: ['good'],
    amount: 0
  }, {
    name: 'banana',
    price: 2,
    desc: ['good'],
    amount: 1
  }]
  
  MyTableObject.createMany(records).then(res => {
    console.log(res.data.succeed)
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}

**返回示例**

回调中 res 结构如下:
```json
{
  "status": 201, // 201 表示创建成功, 注意这不代表所有数据都插入成功，具体要看 operation_result 字段
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
err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|------------------|
| 400            | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403            | 没有权限写入数据    |
| 404            | 写入的数据表不存在   |

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
  "status": 201, // 201 表示创建成功, 注意这不代表所有数据都插入成功，具体要看 operation_result 字段
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

## 设置数据行 ACL

有时候我们需要设置特定数据行的 ACL 权限，之前只能在知晓云控制台修改数据行 ACL，现在云函数中支持通过代码来完该操作了。 

假设现在需要在 product 表中创建一行记录，并指定 ACL 为 `用户组【开发人员】和创建者可写` 、`创建者可读`。

其中用户组 `开发人员` 的 group_id 为 `656`、创建者的 user_id (对应 _userprofile 表中的 `id` 列) 为 `37087886`。

`write_perm` 和 `read_perm` 的可选值请参考 [数据表操作-创建数据表](./table.md) 小节

**示例代码**

{% tabs setACLAsync="async/await", setACLPromise="promise" %}
{% content "Async" %}
```js
async function setACL() {
  try {
    let Product = new BaaS.TableObject('product')
    let record = Product.create()

    record.set('write_perm', [ "gid:656", "user:37087886"])
    record.set('read_perm', [ "user:37087886" ])

    let res = await record.save()
    // success
    return res
  } catch(e) {
    // error
    throw err
  }
}
```

{% content "setACLPromise" %}
```js
function setACL() {
  let Product = new BaaS.TableObject('product')
  let record = Product.create()

  record.set('write_perm', [ "gid:656", "user:37087886"])
  record.set('read_perm', [ "user:37087886" ])

  record.save().then(res=>{
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })
}
```
{% endtabs %}
 
 **返回示例**
 
 res 结构如下：
 
 ```json
{
  "status": 201,
  "data": {
    "_id": "5bffbab54b30640ba8135650",
    "created_at": 1544423640,
    "created_by": 16042162,
    "read_perm": [
      "user:37087886"
    ],
    "updated_at": 1544593093,
    "write_perm": [
      "gid:656",
      "user:37087886"
    ]
  }
}
```
