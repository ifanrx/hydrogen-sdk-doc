# 查询

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

2.示例化一个 `Query` 对象，在该对象上添加查询条件

`let query = new wx.BaaS.Query()`

查看下面的文档，了解目前支持的查询条件

3.支持查询条件并执行查找操作

`MyTableObject.setQuery(query).find()`

### 示例

**请求示例**

```js
// 实例化查询对象
let query = new wx.BaaS.Query()

// 设置查询条件（比较、字符串包含、组合等）
...

// 应用查询对象
let Product = new wx.BaaS.TableObject(tableID)
Product.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})

// 不设置查询条件
Product.find().then()
```

**返回示例** (res.statusCode === 200)

res.data:
```js
{
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
      "desc": ["good", 'great'],
      "id": "59a3c2b5afb7766a5ec6e84e",
      "name": "apple",
      "price": 1.0,
      "read_perm": ["user:*"],
      "updated_at": 1503904437,
      "write_perm": ["user:*"]
    },
    ...
  ]
}
```


### 比较查询

`query.compare(key, operator, value)`

operator 包含 =, !=, <, <=, >, >=

```js
query.compare('amount', '>',  1)
```


### 多个查询条件

当存在多个查询条件时，它们之间默认为 AND 关系，查询返回满足所有条件的记录，如下示例：

```js
// 查询满足 1 <= amount < 10 的记录
query.compare('amount', '>=', 1)
query.compare('amount', '<', 10)
```
多个查询条件之间需要更复杂的组合关系，可以查看以下 `复杂组合查询` 小节。


### 字符串查询

```js
query.contains('name', 'apple')
```

也支持正则匹配 ( <span style='color:red'>* sdk version >= v1.1.1</span> )：

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

### 正则匹配示例

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


### 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个
```js
query.in(fieldName, array)
```

field 的类型不限制，field 的 value 不含有 array 中的任何一个
```js
query.notIn(fieldName, array)
```

field 的类型必须为数组, field 的 value 包含 array 中的每一个  ( <span style='color:red'>* sdk version >= v1.1.1</span> )
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

### null 或非 null 查询

查询字段值为 null 或非 null 记录

```js
query.isNull('name')
query.isNull(['name', 'price'])

query.isNotNull('name')
query.isNotNull(['name', 'price'])
```

### 空或非空查询

查询字段值为空或非空记录

<span style='color:red'>* sdk version >= v1.1.1</span>

```js
query.exists('name')
query.exists(['name', 'price'])

query.notExists('name')
query.notExists(['name', 'price'])
```

### 组合查询

```js
let query1 = new wx.BaaS.Query()
query1.isNull('name')
let query2 = new wx.BaaS.Query()
query1.compare('price', '>', 10)
...

// and 查询
let andQuery = wx.BaaS.Query.and(query1, query2, ...)

// or 查询
let orQuery =  wx.BaaS.Query.or(query1, query2, ...)
```


### 复杂组合查询

```js
let query1 = new wx.BaaS.Query()
query1.isNull('name')
let query2 = new wx.BaaS.Query()
query1.compare('price', '>', 10)
...

// and 查询
let andQuery = wx.BaaS.Query.and(query1, query2)

// or 查询中包含 and 查询
let query3 = new wx.BaaS.Query()
query3.compare('amount', '>', 3)
let orQuery = wx.BaaS.Query.or(andQuery, query3)
```

{% content "second" %}

## SDK 1.1.0 以下版本

> **info**
> 该写法在 sdk v2.0 前仍然有效

`wx.BaaS.getRecordList(OBJECT)`

### 普通查询

**OBJECT 参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :------ | :----- | :-- | :-- |
| tableID | Number | 是  | 数据表 ID |

**请求示例**

```js
// 获取 tableID 为 10 的数据表中的第一页(默认 20 条)的数据记录
let tableID = 10
let objects = { tableID }
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

**返回参数**

- meta: 元信息
- objects: 数据列表

列表项属性说明

| 参数名      | 类型     | 说明 |
| :--------- | :------ | :--: |
| id         | String  | 数据表 ID |
| created_at | Integer | 创建时间 |
| is_admin   | Boolean | 自定义字段 |
| name       | String  | 自定义字段 |
| price      | Integer | 自定义字段 |
| tags       | Array   | 自定义字段 |

**返回示例**

```js
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "created_at": 1487053095,
      "id": "7",
      "is_admin": false,
      "name": "JlpvHdheLh",
      "price": 89,
      "tags": ["xGHt", "hHqz"]
    }
  ]
}
```

### 条件查询

BaaS 提供的查询数据接口提供三种过滤查询方式：

- 精确查询
- 模糊查询
- 多项匹配

提供小于，小于等于，大于，大于等于，范围操作，而且可以组合使用。后缀的使用规则如： `price__range`，`name__contains`，`recordID__lte`

| 参数后缀  | 对应数据表类型    | 说明 |
| :------- | :------------- | :-- |
| lt       | Integer/String | 小于 |
| lte      | Integer/Sring  | 小于等于 |
| gt       | Integer/String | 大于 |
| gte      | Integer/String | 大于等于 |
| range    | Integer/Float  | 范围 |
| contains | String         | 包含 |

示例 1：查询创建者 `ID` 为 1，`name` 为 `知晓云` 的记录（精确查询）

```js
let objects = {
  tableID: 10,
  created_by: 1,
  name: '知晓云'
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

示例 2：查询 `name` 中包含 `知晓云` 字符串的记录（模糊查询）

```js
let objects = {
  tableID: 10,
  name__contains: '知晓云',
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

示例 3：查询创建者 ID 为在范围 [1, 3] 的记录（多项匹配）

```js
let objects = {
  tableID: 10,
  created_by__range: '1,3',
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

示例 4：查询创建者 recordID 大于等于 '5919eb015f281f2b321720be' 的记录

```js
let objects = {
  tableID: 10,
  recordID__gte: '5919eb015f281f2b321720be',
}
wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

示例 5：查询创建者 recordID 大于等于 '5919eb015f281f2b321720be'，且 price 小于 1000 的记录

```js
let objects = {
  tableID: 10,
  recordID__gte: '5919eb015f281f2b321720be',
  price__lt: 1000
}

wx.BaaS.getRecordList(objects).then(res => {
  // success
}, err => {
  // err
})
```

> **info**
> 加入查询的字段必须是 `FlexSchema` 定义过的字段。其中，`id` 和 `created_by`（创建者）字段默认支持; 模糊查询的字段不能是 `Array` 类型; 多项匹配的字段只能是 `Array` 类型

{% endtabs %}