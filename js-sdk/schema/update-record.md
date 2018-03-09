# 更新数据项

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

2.通过 `recordID` 设置指定记录

`let MyRecord = MyTableObject.getWithoutData(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据表 ID |

3.修改指定记录的数据

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

4.将修改后的记录保存到服务器

`MyRecord.update()`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。


### 普通数据更新

**请求示例**

```js
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 price 字段
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)
let product = Product.getWithoutData(recordID)

product.set('price', 11)
product.update().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data
```js
{
  "created_at": 1487053095,
  "id": "7",
  "name": "fushi",
  "price": 11,
  "desc": ["sweet", "red"],
  amount: 2
}
```


### 计数器原子性更新

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


### 数组原子性更新

#### 将 _待插入的数组_ 加到原数组末尾

`product.append(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :--- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |

**请求示例**

```js
product.append('desc', ['big'])
// or
product.append('desc, 'big')
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
product.uAppend('desc, 'sweet')
```

#### 从原数组中删除指定的值

`product.remove(key, value)`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array 或 Array item | 是  | - |

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

{% content "second" %}

## SDK 1.1.0 以下版本

> **info**
> 该写法在 sdk v2.0 前仍然有效

`wx.BaaS.updateRecord(OBJECT)`

**OBJECT 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------  | :----  | :-- | :-- |
| tableID  | Number | 是  | 数据表 ID |
| recordID | String | 是  | 数据项 ID |
| data     | Object | 是  | 待更新的自定义数据 |

**请求示例**

```js
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 name 字段
let tableID = 10
let recordID = '59897882ff650c0477f00485'
let data = {
  name: "VwlPCaUJzxAyNUSNMgzikTQySFoaTZtm"
}
let objects = {
  tableID,
  recordID,
  data
}

wx.BaaS.updateRecord(objects).then(res => {
  // success
}, err => {
  // err
})
```

**返回参数**

| 参数        |   类型  | 说明 |
| :--------- | :------ | :-- |
| id         | String  | 数据项 ID |
| created_at | Number  | 创建时间 |
| is_admin   | Boolean | 自定义字段 |
| name       | String  | 自定义字段 |
| price      | Number  | 自定义字段 |
| tags       |  Array  | 自定义字段 |

**返回示例**

res.data:
```js
{
  "created_at": 1487055951,
  "id": "59897882ff650c0477f00485",
  "is_admin": false,
  "name": "VwlPCaUJzxAyNUSNMgzikTQySFoaTZtm",
  "price": 10,
  "tags": ["UZbJ", "eSYo"]
}
```

> **info**
> 本方法支持部分更新和全量更新

{% endtabs %}