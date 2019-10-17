# 查询

## 数据类型对应查询操作符表

| 数据类型 |                            可使用的查询操作                                             | 说明 |
|:---------|:--------------------------------------------------------------------------------------- |:-----|
| string   | =, in, notIn, !=, isNull, isNotNull, contains, matches, exists, notExists               |      |
| integer  | =, >, >=, <, <=, !=, in, notIn, isNull, isNotNull, exists, notExists                    |      |
| number   | =, >, >=, <, <=, !=, in, notIn, isNull, isNotNull, exists, notExists                    |      |
| array    | =, in, notIn, isNull, isNotNull, arrayContains, exists, notExists                       | `file`、`geojson`、`object`、`date` 类型的 array 不支持查询操作。如果进行查询，会返回空数组 |
| boolean  | =, exists, notExists, isNull, isNotNull                                                 |      |
| date     | =, >, >=, <, <=,  exists, notExists, isNull, isNotNull                                  |      |
| file     | isNull, isNotNull, exists, notExists                                                    |      |
| geojson  | include, within, withinCircle, exists, notExists, isNull, isNotNull                     | 请参考[地理位置操作](./geo.md)章节 |
| object   | =, hasKey, isNull, isNotNull, exists, notExists                                         |      |
| pointer  | =, in, notIn, !=, isNull, isNotNull, exists, notExists                                  |      |

> **info**
> file、geojson、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组

## 操作步骤

1.通过 `数据表 ID` 或 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，

`let MyTableObject = new BaaS.TableObject(tableID | tableName)`

**参数说明**

tableID 和 tableName 二选一，不能同时存在

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableID   | integer | 数据表的 ID                          |
| tableName | string  | 数据表名                             |

2.实例化一个 Query 对象，在该对象上添加查询条件

`let query = new BaaS.Query()`

查看下面的文档，了解目前支持的查询条件

3.支持查询条件并执行查找操作

`MyTableObject.setQuery(query).find()`

## 示例

**请求示例**
{% tabs queryAsync="async/await", queryPromise="promise" %}
{% content "queryAsync" %}
```js
asynnc function query() {
  try {
    // 实例化查询对象
    let query = new BaaS.Query()

    // 设置查询条件（比较、字符串包含、组合等）
    //...

    // 应用查询对象
    let Product = new BaaS.TableObject(tableName)
    let res = await Product.setQuery(query).find()
    // success
    return res

    // 不设置查询条件
    let res = Product.find()
    // success
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "queryPromise" %}
```js
function query() {
  let query = new BaaS.Query()

  // 设置查询条件（比较、字符串包含、组合等）
  //...

  // 应用查询对象
  let Product = new BaaS.TableObject(tableName)
  Product.setQuery(query).find().then(res => {
    // success
    callback(null, res)
  }).catch(err => {
    // error
    callback(err)
  })

  // 不设置查询条件
  Product.find().then(res => {
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

res 结构如下

```json
{
  "status": 200,
  "data": {
    "meta": {
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 3
    },
    "objects": [
      {
        "_id": "59a3c2b5afb7766a5ec6e84e",
        "amount": 0,
        "created_at": 1503904437,
        "created_by": 36395395,
        "desc": ["good", "great"],
        "id": "59a3c2b5afb7766a5ec6e84e",
        "name": "apple",
        "price": 1.0,
        "read_perm": ["user:*"],
        "updated_at": 1503904437,
        "write_perm": ["user:*"]
      }
    ]
  }
}
```

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因        |
|----------------|------------------|
| 400            | 1. 指定/过滤输出字段的字段名有误、2. GEO 查询参数有误、3. 查询语法错误 |
| 404            | 数据表不存在  |

## 比较查询

`query.compare(key, operator, value)`

operator 包含 =, !=, <, <=, >, >=

```js
query.compare('amount', '>',  1)
```


## 多个查询条件
当存在多个查询条件时，它们之间默认为 AND 关系，查询返回满足所有条件的记录，如下示例，

```js
// 查询满足 1 <= amount < 10 的记录
query.compare('amount', '>=', 1)
query.compare('amount', '<', 10)
```
多个查询条件之间需要更复杂的组合关系，可以查看以下 `复杂组合查询` 小节


## 字符串查询

```js
query.contains('name', 'apple')
```

也支持正则匹配

```js
query.matches('name', regExp)
```

构建一个 regExp 可通过以下两种方法之一:

- 使用正则表达式字面量
```js
const regExp = /^abc/i
```

- 调用 RegExp 对象的构造函数
```js
const regExp = new RegExp('^abc', 'i')
```

## 正则匹配示例

```js
/* 以查找手机号码为例，phoneNumber 字段必须为 string 类型 */

let regExp

// 查找 以 188 开头的手机号码
regExp = /^188/

// 查找 以 708 结尾的手机号码
regx = /708$/

// 查找 以 188 开头的手机号码，以 708 结尾的手机号码
regx = /^188\d+708$/

query.matches('phoneNumber', regx)
```


## 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个
```js
query.in(fieldName, array)
```

field 的类型不限制，field 的 value 不含有 array 中的任何一个
```js
query.notIn(fieldName, array)
```

field 的类型必须为数组, field 的 value 包含 array 中的每一个
```js
query.arrayContains(fieldName, array)
```

如果希望查找数组中只包含指定数组中所有的值的记录，可以使用比较查询
```js
query.compare(fieldName, '=', array)
```

**请求示例**
```js
/* color 是类型为字符串的字段，desc 是类型为数组的字段 */

// 查询 color 是 green 或 red 或 yellow 的记录
query.in('color', ['green', 'red', 'yellow'])

// 查询 desc 中包含 green 或 red 或 yellow 的记录
query.in('desc', ['green', 'red', 'yellow'])

// 查询 color 不是 green、red 和 yellow 的记录
query.notIn('color', ['green', 'red', 'yellow'])

// 查询 desc 中不包含 green、red 和 yellow 的记录
query.notIn('desc', ['green', 'red', 'yellow'])

// 查询 desc 中包含 green、red 和 yellow 的记录
query.arrayContains('desc', ['green', 'red', 'yellow'])

// 查询 desc 中只包含 green、red 和 yellow 的记录
query.compare('desc', '=', ['green', 'red', 'yellow'])
```

## 查询字段值为 null 或非 null 记录

```js
query.isNull('name')
query.isNull(['name', 'price'])

query.isNotNull('name')
query.isNotNull(['name', 'price'])
```

## 查询字段值为空或非空记录

```js
query.exists('name')
query.exists(['name', 'price'])

query.notExists('name')
query.notExists(['name', 'price'])
```

## hasKey 查询 （仅限 object 类型）

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | String              | 是  | 需要检测的属性名, 只能包含字母、数字和下划线，必须以字母开头 |

**示例代码**

假设数据表有如下数据行
```javascript
[
  {
    'id': '59a3c2b5afb7766a5ec6e84e',
    name: '战争与和平',
    publisherInfo: {
      name: 'abc出版社',
    },
  },
  {
    'id': '59a3c2b5afb7766a5ec6e84g',
    name: '西游记',
    publisherInfo: {
      name: 'efg出版社',
      location: '广东省广州市天河区五山路 100 号'
    },
  },
]
```

查询字段 publisherInfo 中存在 location 属性的数据行
```js
query.hasKey('publisherInfo', 'location')
```

查询结果
```javascript
[
  {
      'id': '59a3c2b5afb7766a5ec6e84g',
      name: '西游记',
      publisherInfo: {
        name: 'efg出版社',
        location: '广东省广州市天河区五山路 100 号'
      },
  }
]
```

注意：目前暂不支持查询内嵌属性

假设数据行如下
```javascript
[
  {
      'id': '59a3c2b5afb7766a5ec6e84g',
      name: '西游记',
      publisherInfo: {
        abc: {
          name: 'efg出版社',
          location: '广东省广州市天河区五山路 100 号'
        }
      },
  }
]
```

则下面的查询语句是非法的

```js
query.hasKey('publisherInfo', 'abc.location')
```


## pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**示例代码**

假设现在有两张表： order 表和 customer 表。

order 表部分字段结构如下：

| 字段名         | 字段类型         | 说明                     |
|----------------|------------------|--------------------------|
| customer       |  pointer         | 指向了 `customer` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表 |

现在需要查询 order 表中，同时满足以下条件的数据行：

- customer 字段指向 customer 表中 id 为 `5bad87ab0769797b4fb27a1b` 的数据行
- user 字段指向了 _userprofile 表中 id 为 `69147880` 的数据行

{% tabs queryPointerAsync="async/await", queryPointerPromise="promise" %}
{% content "queryPointerAsync" %}
```js
async function queryPointer() {
  try {
    var query = new wx.BaaS.Query()
    var Customer = new BaaS.TableObject('customer')
    var Order = new BaaS.TableObject('order')
    var User = new BaaS.User()

    query.compare('customer', '=', Customer.getWithoutData('5bad87ab0769797b4fb27a1b'))
    query.compare('user', '=', User.getWithoutData(69147880))

    let res = await Order.setQuery(query).expand(['customer', 'user']).find()
    // success
    return res
  } catch(err) {
    // error
    throw err

  }
}
```

{% content "queryPointerPromise" %}
```js
function queryPointer() {
  var query = new wx.BaaS.Query()
  var Customer = new BaaS.TableObject('customer')
  var Order = new BaaS.TableObject('order')
  var User = new BaaS.User()

  query.compare('customer', '=', Customer.getWithoutData('5bad87ab0769797b4fb27a1b'))
  query.compare('user', '=', User.getWithoutData(69147880))

  Order.setQuery(query).expand(['customer', 'user']).find().then(res => {
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

{% ifanrxfold summary="res 结构如下:" %}
```json
{
  "status": 200,
  "data": {
    "meta": {
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 1
    },
    "objects": [{
      "_id": "5be3f57840507204ce725fc7",
      "created_at": 1541666168,
      "created_by": 3,
      "id": "5be3f57840507204ce725fc7",
      "customer": {
        "_table": "customer",
        "avatar": "https://gravatar.ifanrx.com/avatar/3510eef2166f5015e5b5c744739f5b82?d=https%3A%2F%2Fcdn.ifanr.cn%2Fifanr%2Fdefault_avatar.png",
        "gender": 0,
        "id": "5bad87ab0769797b4fb27a1b",
        "is_authorized": true,
        "nickname": "qwESIbpm",
        "updated_at": 1535438854
      },
      "user": {
        "avatar": null,
        "created_by": 65816744,
        "id": 69147880,
        "openid": "oXUfx0FrNAvKUI0xxxxxx",
        "unionid": null,
        "_table": "_userprofile",
        "age": 110,
        "is_authorized": false,
        "created_at": 1532921460,
        "updated_at": 1539683851
      },
      "read_perm": ["user:*"],
      "updated_at": 1541666168,
      "write_perm": ["user:*"]
    }]
  }
}
```
{% endifanrxfold %}

**不使用 expand 方法的示例**
```js
// 不使用 expand() 方法， customer 字段不会扩展
Order.setQuery(query).find().then(res => {

})
```

返回示例：

```json
{
  "status": 200,
  "data": {
    "meta": {
      "limit": 20,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 1
    },
    "objects": [{
      "_id": "5be3f57840507204ce725fc7",
      "created_at": 1541666168,
      "created_by": 3,
      "id": "5be3f57840507204ce725fc7",
      "customer": {
        "_table": "customer",
        "id": "5bad87ab0769797b4fb27a1b"
      },
      "read_perm": ["user:*"],
      "updated_at": 1541666168,
      "write_perm": ["user:*"]
    }]
  }
}
```

**其他查询 pointer 示例**

```js
// in 查询
query.in('customer', [Customer.getWithoutData('5bad87ab0769797b4fb27a1b'), Customer.getWithoutData('5bad87ab0769797b4fb27a1f'), Customer.getWithoutData('5bad87ab0769797b4fb27a11')])

// 查询 user 字段是否存在
query.exist('customer')
```

pointer 类型支持的查询操作符请参考 [数据类型对应查询操作符表](#数据类型对应查询操作符表)

## 组合查询

```js
let query1 = new BaaS.Query()
query1.isNull('name')
let query2 = new BaaS.Query()
query2.compare('price', '>', 10)
...

// and 查询
let andQuery = BaaS.Query.and(query1, query2, ...)

// or 查询
let orQuery =  BaaS.Query.or(query1, query2, ...)
```


## 复杂组合查询

```js
let query1 = new BaaS.Query()
query1.isNull('name')
let query2 = new BaaS.Query()
query2.compare('price', '>', 10)
...

// and 查询
let andQuery = BaaS.Query.and(query1, query2)

// or 查询中包含 and 查询
let query3 = new BaaS.Query()
query3.compare('amount', '>', 3)
let orQuery = BaaS.Query.or(andQuery, query3)
```

## 获取符合筛选条件的数据总数
{% tabs queryTotalAsync="async/await", queryTotalPromise="promise" %}
{% content "queryTotalAsync" %}
```js
async function queryTotal() {
  try {
    let Product = new BaaS.TableObject(tableName)
    let query = new BaaS.Query()

    // 设置查询条件
    // ...

    let num = await Product.setQuery(query).count()
    // success
    console.log(num)  // 10
    return res
  } catch(err) {
    // error
    throw err
  }
}
```

{% content "queryTotalPromise" %}
```js
function queryTotal() {
  let Product = new BaaS.TableObject(tableName)
  let query = new BaaS.Query()

  // 设置查询条件
  // ...

  Product.setQuery(query).count().then(num => {
    // success
    console.log(num)  // 10
    callback(null, res)
  }, err => {
    // err
    callback(err)
  })
}
```
{% endtabs %}
