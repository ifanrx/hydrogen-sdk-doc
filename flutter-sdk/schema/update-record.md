{% import "/js-sdk/macro/total_count.md" as totalCount %}

# 更新数据项

`BaaS.TableRecord#update(options)`

**参数说明**

options（批量更新时需要设置）:

| 参数          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| enableTrigger | bool |  否  | true | 是否触发触发器 |
| withCount     | bool |  否  | false | 是否返回 total_count |


## 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

```dart
TableObject myTableObject = new TableObject(tableId);
```

**参数说明**

tableName 和 tableID 二选一，不能同时存在


实例化 TableObject，如操作数据表名为 'product' 的数据表，可进行如下实例化：new BaaS.TableObject('product')

| 参数  | 类型              | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| tableID   | Number | 是  | 数据表的 ID |
| tableName | String |  是 | 数据表名 |

2.通过数据行 id（以下用 `recordId` 参数名表示） 设置指定数据行

`TableRecord product = myTableObject.getWithoutData(recordId: recordId);`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordId | String | 是  | 数据行 id |

3.调用 set 或 unset  修改指定记录的数据

a. set 操作

为某个字段赋值

`product.set(key, value)` 或 `product.set(obj)`

**参数说明**

| 参数  | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 需要更新的字段名 |
| value | any               | 是  | 与 key 字段的类型保持一致 |
| obj   | Map<String, dynamic>            | 是  | 一次性赋值的键值对对象, 如 `{a: 10, b: 20}` |

b. unset 操作

将某个字段的值清空

`product.unset(key)` 或 `product.unset(obj)`

**参数说明**

| 参数  | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 需要清空的字段名 |
| obj   | Map<String, dynamic>            | 是  | 一次性赋值的键值对对象, 如 `{a: '', b: ''}` |

set 和 unset 方法都支持两种类型的赋值操作：

a. 一次性赋值：

```dart
product.set({
  key1: value1,
  key2: value2
})
```

b. 逐个赋值：

```dart
product.set(key1, value1);
product.set(key2, value2);
```

> **info**
> 1.对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据
>
> 2.不可同时用 `set` 与 `unset` 操作同一字段，否则会报 605 错误
>
> 3.若更新数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终更新完成的数据中这几个字段将以更新数据中设置的字段值为准。

4.将修改后的记录保存到服务器

`product.update()`

通过上面的四个步骤，即完成了一条记录的更新，具体操作阅读以下内容。


## 普通数据更新

**请求示例**
```dart
// 更新 tableName 为 'product' 的数据表中 id 为 59897882ff650c0477f00485 的数据行的 price 字段
String tableName = 'product';
String recordId = '59897882ff650c0477f00485'; // 数据行 id

TableObject product = new TableObject(tableName);
TableRecord record = product.getWithoutData(recordId: recordId);

record.set('price', 11);
TableRecord response = await record.update();
```

**返回结果**

| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| response | TableRecord | 返回 TableRecord 类型，详见 [数据类型](/flutter-sdk/schema/data-type.md) |

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 400            | 1. 提交的数据不合法、2. 重复创建数据（设置了唯一索引）    |
| 403            | 没有权限更新数据    |
| 404            | 数据行不存在    |


## 更新 object 类型内的属性
```dart
product.patchObject('obj1', {'name': '123'});
```

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | Map              | 是  | 更新的对象 |

> **info**
> 该操作是浅合并，也就是只合并第一层，嵌套的属性仍然是被替换。
> 对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{'#ifanr.x': 123}` 和 `{'知晓云': 'test'}` 是错误的

**请求示例**
假设数据表 Product 中有数据行如下
```dart
[{
   id: "7",
   obj1: {a: [1, 2, 3], b: 666, c: {age: 100}}
}]
```

```dart
TableRecord record = Product.getWithoutData('7');

Map<String, dynamic> patch = {'a': [222], 'b': 555, 'd': 888};
record.patchObject('obj1', patch);

```
执行结果

```dart
[
  {
    id: '7',
    obj1: {a: [222], b: 555, c: {age: 100}, d: 888}
  }
]
```


## 更新 pointer 类型字段

假设有 product 表, product 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| customer       |  pointer         | 指向了 `customer` 表     |


现在需要更新 product 表中 id 为 `5f4f44b0818361584b51f799` 的数据行

**示例代码**

```dart
// product 表
TableObject product = new TableObject('product');
TableRecord productRecord = product.getWithoutData(recordId: '5f4f44b0818361584b51f799');

// customer 表
TableObject customer = new TableObject('jiajun_pointer');
TableRecord customerRecord = customer.getWithoutData(recordId: '5f3631ab6526327aa10373bc');

// 向 product 数据项更新 pointer
productRecord.set('customer', customerRecord);

TableRecord response = await productRecord.update();
```

## 计数器原子性更新

对数字类型的字段进行原子性增减操作。当请求同时对一个数据进行增减时，原子性使得冲突和覆盖导致的数据不正确的情况不会出现。

`product.incrementBy(key, value);`

**参数说明**

| 参数   | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | num 或 int | 是  | 与 key 的类型保持一致 |

**请求示例**

```dart
product.incrementBy('amount', 1);
await product.update();
```


## 数组原子性更新

### 将 _待插入的数组_ 加到原数组末尾

`product.append(key, value);`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :--- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | List 或 List item | 是  | - |

**请求示例**

```dart
product.append('desc', ['big']);
// or
product.append('desc', 'big');
```

### 将 _待插入的数组_ 中不包含在原数组的数据加到原数组末尾

`product.uAppend(key, value);`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | List 或 List item | 是   | - |

**请求示例**

```dart
product.uAppend('desc', ['sweet']);
// or
product.uAppend('desc', 'sweet');
```

### 从原数组中删除指定的值

`product.remove(key, value);`

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | List 或 List item | 是  | 如果元素类型是 geojson、object、file，则只能是 List item，或 length 为 1 的 List |

> **info**
> 如果 array 类型字段的子元素类型是 geojson、object 或 file，则 value 只能是 Array item,
> value 数组中多余的项，将会被忽略。

> 下面的操作是能按预期执行的:

> `product.remove('array_obj', {a: 10});`

> `product.remove('array_obj', [{a: 10}]);`

**请求示例**

```dart
product.remove('desc', ['sweet']);
// or
product.remove('desc', 'sweet');
```

> **info**
> 对**同一字段**设置多次 `append` 或 `remove` 操作后进行 `update` 操作，则只有最后一次进行的 `append` 或 `remove` 是有效的；如果同时对**同一字段**进行 `set`、`remove` 和 `append` 操作，则只有最后执行的操作是有效的。

<span class="attention">注：</span> 设置的数据要与预先在知晓云平台设定的数据类型一致，当仅更新一个字段，并且数据不合法时，将无法成功保存。如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存，如下示例：

```dart
/*
* 同时设置 amount 和 date 字段，其中 date 为日期类型，这里为其赋了一个字符串类型的值，
* 该请求会返回 200，但只有 amount 被成功设置为 10
*/

TableRecord record = order.getWithoutData(orderID);
record.set('amount', 10);
record.set('date', 'abc');
record.update();
```

## 按条件批量更新数据项

> 注意：由于条件查询可能命中非常多的数据，默认情况下，限制为最多更新前 1000 条数据。
> 如需要一次性更新更多数据，请参考下一个章节：不触发触发器的更新，或者通过维护分页来进行。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```dart
TableObject tableObject = new TableObject(tableName);
Query query = new Query();

// 设置查询条件（比较、字符串包含、组合等）
//...

// limit、offset 可以指定按条件查询命中的数据分页
query.limit(10);
query.offset(0);
TableRecord record = tableObject.getWithoutData(query: query);

// 与更新特定记录一致
record.set(key1, value1);
record.incrementBy(key2, value2);
record.append(key3, value3);

TableRecordOperationList response = await record.update();
```

**返回结果**

| 名称  | 类型 | 说明 |
| ----- | ----- | ----- |
| succeed | int | 成功插入记录数 |
| total_count | int | 总的待插入记录数 |
| operation_result | List | TableRecordOperation 数组，包含每条数据是否成功被创建等信息 |

TableRecordOperation 类型具体请参考：[数据类型](/flutter-sdk/schema/data-type.md)

catch 回调中的 err 对象:

请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**状态码说明**

200 更新成功，400 请求数据非法

### 批量更新时不触发触发器

支持批量更新数据项时不触发触发器。该模式在批量更新数据时，不会触发设置好的触发器，会对查询条件匹配的数据全部更新，没有最多 1000 条的限制。

在 enableTrigger 为 false 时，SDK 将不会设置默认的 limit （值为 20），如果用户没有设置 limit，则为全量更新。

不触发触发器的情况下会有以下的行为:

- 当更新命中总条目 <= 1000 时，无论 limit 设置为多少，均为同步更新，将返回每一条更新的 id 和更新结果，详见下方返回示例中同步执行部分。
- 当更新命中总条目 > 1000 时，根据设置 limit 的不同，将有下方两种行为：
  - limit <= 1000 时，操作记录为同步执行
  - limit > 1000 或未设置时，则会转为异步执行并移除 limit 限制，变成操作全部

```dart
TableObject tableObject = new TableObject(tableName);
Query query = new Query();

// 设置查询条件（比较、字符串包含、组合等）
//...

// limit、offset 可以指定按条件查询命中的数据分页
query.limit(10);
query.offset(0);
TableRecord record = tableObject.getWithoutData(query: query);

// 与更新特定记录一致
// 设置更新内容 ...

TableRecordOperationList response = await record.update(enableTrigger: false);
```