# 更新数据项

## 操作步骤

1.通过 `数据表 ID` 或 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new BaaS.TableObject(tableID | tableName)`

**参数说明**

tableID 和 tableName 二选一，不能同时存在

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableID   | integer | 数据表的 ID                          |
| tableName | string  | 数据表名                             |

2.通过数据行 id（以下用 `recordID` 参数名表示）设置指定记录

`let MyRecord = MyTableObject.getWithoutData(recordID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据行 id |

3.调用 set 或 unset 修改指定记录的数据

a. set 操作

为某个字段赋值

`product.set(key, value)` 或 `product.set(obj)`

 **参数说明**
 
| 参数  | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | any               | 是  | 与 key 字段的类型保持一致 |
| obj   | Object            | 是  | 一次性赋值的键值对对象, 如 `{a: 10, b: 20}` |
 
 b. unset 操作 
 
 将某个字段的值清空
 
 `product.unset(key)` 或 `product.unset(obj)`
 
**参数说明**

| 参数  | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| obj   | Object            | 是  | 一次性赋值的键值对对象, 如 `{a: '', b: ''}` |


set 和 unset 方法都支持两种类型的赋值操作：

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
> 1.对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据
>
> 2.不可同时用 `set` 与 `unset` 操作同一字段，否则会报 605 错误

4.将修改后的记录保存到服务器

`MyRecord.update()`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。


## 普通数据更新

**请求示例**

{% tabs updateRecordAsync="async/await", updateRecordPromise="promise" %}
{% content "updateRecordAsync" %}
```js
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 price 字段
async function updateRecord() {
  try {
    let tableID = 10
    let recordID = '59897882ff650c0477f00485'

    let Product = new BaaS.TableObject(tableID)
    let product = Product.getWithoutData(recordID)

    product.set('price', 11)
    let res = await product.update()
    // success
    return res
  } catch(err) {
    // err
    throw err
  }
}
```

{% content "updateRecordPromise" %}
```js
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 price 字段
function updateRecord() {
  let tableID = 10
  let recordID = '59897882ff650c0477f00485'

  let Product = new BaaS.TableObject(tableID)
  let product = Product.getWithoutData(recordID)

  product.set('price', 11)
  product.update().then(res => {
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

回调中的 res 对象结构如下：

```json
{
  "status": 200,
  "statusText": "OK",
  "data": {
    "created_at": 1487053095,
    "id": "7",
    "name": "fushi",
    "price": 11,
    "desc": ["sweet", "red"],
    "amount": 2
  }
}
```

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 400            | 1. 提交的数据不合法、2. 重复创建数据（设置了唯一索引）    |
| 403            | 没有权限更新数据    |
| 404            | 数据行不存在    |



## 计数器原子性更新

对数字类型的字段进行原子性增减操作。当请求同时对一个数据进行增减时，原子性使得冲突和覆盖导致的数据不正确的情况不会出现。

`product.incrementBy(key, value)`

**参数说明**

| 参数   | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | Number 或 Integer | 是  | 与 key 的类型保持一致 |

**请求示例**

```js
product.incrementBy('amount', 1)
product.update().then(res => {}, err => {})
```



## 更新 pointer 类型字段

假设有 product 表, product 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| customer       |  pointer         | 指向了 `customer` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |

现在需要更新 product 表中 id 为 `5bdfaf068asd123123asd` 的数据行

**示例代码**
{% tabs updatePointerAsync="async/await", updatePointerPromise="promise" %}
{% content "updatePointerAsync" %}
```js
async function updatePointer() {
  try {
    // 获取一个 tableRecord 实例
    let Customer = new BaaS.TableObject('customer')
    let customer = Customer.getWithoutData('5bdfaf068b155c0891d064ad')

    // 获取要修改的数据行的实例
    let Product = new BaaS.TableObject('product')
    let product = Product.getWithoutData('5bdfaf068asd123123asd')
    // 69147880 为 _userprofile 表中某行数据的 id
    let user = new BaaS.User().getWithoutData(69147880)

    // 给 pointer 字段赋值
    product.set('customer', customer)
    product.set('user', user)

    let res = await product.update()
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "updatePointerPromise" %}
```js
function updatePointer() {
  // 获取一个 tableRecord 实例
  let Customer = new BaaS.TableObject('customer')
  let customer = Customer.getWithoutData('5bdfaf068b155c0891d064ad')

  // 获取要修改的数据行的实例
  let Product = new BaaS.TableObject('product')
  let product = Product.getWithoutData('5bdfaf068asd123123asd')
  // 69147880 为 _userprofile 表中某行数据的 id
  let user = new BaaS.User().getWithoutData(69147880)

  // 给 pointer 字段赋值
  product.set('customer', customer)
  product.set('user', user)

  product.update().then(res=>{
    // success
    callback(null, res)
  })
}
```
{% endtabs %}

**返回示例**
```json
{
  "status": 200,
  "data": {
    "_id": "5bdfaf068asd123123asd",
    "created_at": 1541744690,
    "created_by": 3,
    "id": "5bdfaf068asd123123asd",
    "customer": {
      "id": "5bdfaf068b155c0891d064ad",
      "_table": "customer"
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



## 数组原子性更新

#### 将 _待插入的数组_ 加到原数组末尾

`product.append(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :----------------- | :-- | :--- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |

**请求示例**

```js
product.append('desc', ['big'])
// or
product.append('desc', 'big')
```

#### 将 _待插入的数组_ 中不包含在原数组的数据加到原数组末尾

`product.uAppend(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是   | - |

**请求示例**

```js
product.uAppend('desc', ['sweet'])
// or
product.uAppend('desc', 'sweet')
```

#### 从原数组中删除指定的值

`product.remove(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | 如果元素类型是 geojson、object、file，则只能是 Array item，或 length 为 1 的 Array |

> **info**
> 如果 array 类型字段的子元素类型是 geojson、object 或 file，则 value 只能是 Array item 或 length 为 1 的 Array,
> value 数组中多余的项，将会被忽略。

> 下面的操作是能按预期执行的:

> `product.remove('array_obj', {a: 10})`

> `product.remove('array_obj', [{a: 10}])`

> 下面的 `{a: 30}`，将会被忽略:

> `product.remove('array_obj', [{a: 10}, {a: 30}])`

**请求示例**

```js
product.remove('desc', ['sweet'])
// or
product.remove('desc', 'sweet')
```

> **info**
> 对**同一字段**设置多次 `append` 或 `remove` 操作后进行 `update` 操作，则只有最后一次进行的 `append` 或 `remove` 是有效的；如果同时对**同一字段**进行 `set`、`remove` 和 `append` 操作，则只有最后执行的操作是有效的。

<span class="attention">注：</span> 设置的数据要与预先在知晓云平台设定的数据类型一致，当仅更新一个字段，并且数据不合法时，将无法成功保存，请求返回 `Failed to save record, type conflict on fields` 错误，如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

```js
/*
* 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个字符串类型的值，
* 该请求会返回 200，但只有 amount 被成功设置为 10
*/

let order = Order.getWithoutData(orderID)
order.set('amount', 10)
order.set('date', 'abc')
order.update()
```

## 自定义条件批量更新数据项

通过设置自定义查询条件 Query，将符合条件的数据进行批量更新操作

> 注意：由于条件查询可能命中非常多的数据，默认情况下，限制为最多更新前 1000 条数据。
> 如需要一次性更新更多数据，请参考下一个章节：不触发触发器的更新，或者通过维护分页来进行。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**
{% tabs updateDataAsync="async/await", updateDataPromise="promise" %}
{% content "updateDataAsync" %}
```js
async function updateData() {
  try {
    let MyTableObject = new BaaS.TableObject(tableName)

    let query = new BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    ...

    // limit、offset 可以指定按条件查询命中的数据分页
    let records = MyTableObject.limit(10).offset(0).getWithoutData(query)

    // 与更新特定记录一致
    records.set(key1, value1)
    records.incrementBy(key2, value2)
    records.append(key3, value3)

    let res = await records.update()
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "updateDataPromise" %}
```js
function updateData() {
  let MyTableObject = new BaaS.TableObject(tableName)

  let query = new BaaS.Query()

  // 设置查询条件（比较、字符串包含、组合等）
  ...

  // limit、offset 可以指定按条件查询命中的数据分页
  let records = MyTableObject.limit(10).offset(0).getWithoutData(query)

  // 与更新特定记录一致
  records.set(key1, value1)
  records.incrementBy(key2, value2)
  records.append(key3, value3)

  records.update().then(res => {
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

回调中的 res 对象结构如下：

```json
{
  "status": 200, // 200 表示更新成功, 注意这不代表所有数据都更新成功，具体要看 operation_result 字段
  "statusText": "OK",
  "data": {
    "succeed": 8, // 成功更新记录数
    "total_count": 10,  // where 匹配的记录数，包括无权限操作记录
    "offset": 0,
    "limit": 1000,
    "next": null, // 下一次更新 url，若为 null 则表示全部更新完毕
    "operation_result": [  // 创建的详细结果
       {
         "success": {      // 成功时会有 success 字段
           "id": "5bffbab54b30640ba8135650",
           "updated_at": 1543486133
         }
       },
       {
         "success": {
           "id": "5bffbab54b30640ba8135651",
           "updated_at": 1543486133
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

**状态码说明**

200 更新成功，400 请求数据非法

### 按条件批量更新时不触发触发器

> **info**
> 不触发触发器，limit <= 1000 时，操作记录为同步执行。超过则会转为异步执行并移除限制，变成操作全部

{% tabs batchUpdateAsync="async/await", batchUpdatePromise="promise" %}
{% content "batchUpdateAsync" %}
```js
async function batchUpdate() {
  try {
    let MyTableObject = new BaaS.TableObject(tableName)

    let query = new BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    //...

    let records = MyTableObject.getWithoutData(query)

    // 与更新特定记录一致
    // 设置更新内容 ...

    // 知晓云后台设置的触发器将不会被触发
    let res = await records.update({enableTrigger: false})
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "batchUpdatePromise" %}
```js
function batchUpdate() {
  let MyTableObject = new BaaS.TableObject(tableName)

  let query = new BaaS.Query()

  // 设置查询条件（比较、字符串包含、组合等）
  //...

  let records = MyTableObject.getWithoutData(query)

  // 与更新特定记录一致
  // 设置更新内容 ...

  // 知晓云后台设置的触发器将不会被触发
  records.update({enableTrigger: false}).then(res => {
    callback(null, res)
  }).catch(err => {
    callback(err)
  })
}
```
{% endtabs %}

```js
let MyTableObject = new BaaS.TableObject(tableName)

let query = new BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
//...

let records = MyTableObject.getWithoutData(query)

// 与更新特定记录一致
// 设置更新内容 ...

// 知晓云后台设置的触发器将不会被触发
records.update({enableTrigger: false}).then(res => {}, err => {})
```

## 更新 object 类型内的属性
```javascript
product.patchObject('obj1', {name: '123'})
```

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | Object              | 是  | 更新的对象 |

> **info**
> 该操作的效果类似 Object.assign(), 是浅合并，也就是只合并第一层，嵌套的属性仍然是被替换。
> 对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

**请求示例**
假设数据表 Product 中有数据行如下
```javascript
[{
   id: "7",
   obj1: {a: [1, 2, 3], b: 666, c: {age: 100}}
}]
```

```javascript
let record = Product.getWithoutData('7')

let patch = {a: [222], b: 555, d: 888}
record.patchObject('obj1', patch)

```
执行结果

```javascript
[
  {
    id: '7',
    obj1: {a: [222], b: 555, c: {age: 100}, d: 888}
  }
]
```

## 修改数据行 ACL

有时候我们需要设置特定数据行的 ACL 权限，之前只能在知晓云控制台修改数据行 ACL，现在云函数中支持通过代码来完该操作了。 

假设 product 表中有一行 id 为 5bffbab54b30640ba8135650 的数据行，目前其 acl 为 所有人可读，所有人可写，现在需要将其修改为 `用户组【开发人员】和创建者可写` 、`创建者可读`。

其中用户组 `开发人员` 的 group_id 为 `656`、创建者的 user_id (对应 _userprofile 表中的 `id` 列) 为 `37087886`。

`write_perm` 和 `read_perm` 的可选值请参考 [数据表操作-创建数据表](./table.md) 小节

**示例代码**
{% tabs updateACLAsync="async/await", updateACLPromise="promise" %}
{% content "updateACLAsync" %}
```js
async function updateACL() {
  try {
    let Product = new BaaS.TableObject('product')
    let record = Product.getWithoutData('5bffbab54b30640ba8135650')
    
    record.set('write_perm', [ "gid:656", "user:37087886"])
    record.set('read_perm', [ "user:37087886" ])

    let res = record.update()
    // success
    return res
  } catch(e) {
    // error
    throw err
  }
}
```

{% content "updateACLPromise" %}
```js
function updateACL() {
  let Product = new BaaS.TableObject('product')
  let record = Product.getWithoutData('5bffbab54b30640ba8135650')
  
  record.set('write_perm', [ "gid:656", "user:37087886"])
  record.set('read_perm', [ "user:37087886" ])
  
  record.update().then(res=>{
    // success
    callback(null, res)
  }).catch(e=>{
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
  "status": 200,
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
