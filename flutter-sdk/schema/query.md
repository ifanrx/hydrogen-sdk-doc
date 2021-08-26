# 查询数据（Where）

`BaaS.TableObject#find(options)`

**参数说明**

options（类型：Object），属性说明：

| 属性      | 类型    | 必填 | 默认    | 说明                 |
| :-------- | :------ | :--- | :------ | :------------------- |
| withCount | boolean | 否   | `false` | 是否返回 total_count |

## 数据类型对应查询操作符表

| 数据类型 | 可使用的查询操作                                                                  | 说明                                                                                |
| :------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| string   | =, inList, notInList, !=, isNull, isNotNull, contains, matches, exists, notExists |                                                                                     |
| integer  | =, >, >=, <, <=, !=, inList, notInList, isNull, isNotNull, exists, notExists      |                                                                                     |
| number   | =, >, >=, <, <=, !=, inList, notInList, isNull, isNotNull, exists, notExists      |                                                                                     |
| array    | =, inList, notInList, isNull, isNotNull, arrayContains, exists, notExists         | file、geojson、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组 |
| boolean  | =, exists, notExists, isNull, isNotNull                                           |                                                                                     |
| date     | =, >, >=, <, <=, exists, notExists, isNull, isNotNull                             |                                                                                     |
| file     | isNull, isNotNull, exists, notExists                                              |                                                                                     |
| geojson  | include, within, withinCircle, exists, notExists, isNull, isNotNull               | 请参考[地理位置操作章节](/js-sdk/schema/geo.md)                                     |
| object   | =, hasKey, isNull, isNotNull, exists, notExists                                   |                                                                                     |
| pointer  | =, inList, notInList, !=, isNull, isNotNull, exists, notExists                    |                                                                                     |

> **info**
> file、geojson、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组

## 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

`TableObject myTableObject = new TableObject(tableName)`

**参数说明**

tableName 和 tableId 二选一，不能同时存在

| 参数      | 类型   | 必填 | 说明        |
| :-------- | :----- | :--- | :---------- |
| tableId   | String | 是   | 数据表的 ID |
| tableName | String | 是   | 数据表名    |

2.创建 `Where` 对象，在该对象上添加查询条件

```dart
Where where = Where.contains('color', 'red');
```

查看下面的文档，了解目前支持的查询条件

3.设置查询条件并执行查找操作

```dart
Query query = new Query();
query.where(where);
```

4.支持查询条件并执行查找操作

`myTableObject.find(query: query);`

> **info**
> 注意：知晓云的 api URL 长度限定为 16386，超出则返回 502，请在构造查询条件时注意长度控制，如 inList 操作符后边的数组长度、match 操作符后边的字符串长度等。

**返回结果**

返回 `TableRecordList` 类型，详见：[数据类型](/flutter-sdk/schema/data-type.md)

## 示例

**请求示例**

```dart
// 实例化查询对象
Query query = new Query();

// 设置查询条件
Where where = Where.compare('num', '>=', 100);
query.where(where);

// 应用查询对象
TableObject tableObject = new TableObject(tableName);

try {
  TableRecordList data = await tableObject.find(query: query);
} catch (e) {
  print(e.toString());
}

// 不应用查询条件
try {
  TableRecordList data = await tableObject.find();
} catch (e) {
  print(e.toString());
}
```

**返回结果**

返回 `TableRecordList` 类型，详见：[数据类型](/flutter-sdk/schema/data-type.md)

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因                                                             |
| --------------- | ---------------------------------------------------------------------- |
| 400             | 1. 指定/过滤输出字段的字段名有误、2. GEO 查询参数有误、3. 查询语法错误 |
| 404             | 数据表不存在                                                           |

## 比较查询

`Where where = Where.compare(key, operator, value);`

operator 包含 =, !=, <, <=, >, >=

```dart
Where where = Where.compare('amount', '>',  1);
```

## 字符串查询

查询返回满足包含相应字符串的记录，如下示例：

```dart
// 例：{"name": "apple"}
Where where = Where.contains('name', 'apple');  // 查询 name 字段包含 'apple' 的记录，能正确匹配
Where where = Where.contains('name', 'app');  // 查询 name 字段包含 'app' 的记录，能正确匹配
Where where = Where.contains('name', 'apple123');  // 查询 name 字段包含 'apple123' 的记录，不能正确匹配
```

也支持正则匹配 ( [正则表达式相关知识](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) )：

```dart
Where.matches('name', regExp);
```

构建一个 regExp 可通过以下方法，`i` 表示对大小写不敏感:

- 调用 RegExp 对象的构造函数

```dart
RegExp regExp = new RegExp(r'/^foo/i');
```

正则匹配示例

```dart
/* 以查找名字为例，name 字段必须为 string 类型 */

RegExp regExp = new RegExp(r'/^foo/i');

// 查找 以 foo 开头的名字，并且对大小写不敏感
Where where = Where.matches('name', regExp);
query.where(where);


/* 以查找手机号码为例，phoneNumber 字段必须为 string 类型 */

// 查找 以 188 开头的手机号码
RegExp regExp = new RegExp(r'/^188/');

// 查找 以 708 结尾的手机号码
RegExp regExp = new RegExp(r'/708$/');

// 查找 以 188 开头的手机号码，以 708 结尾的手机号码
RegExp regExp = new RegExp(r'/^188\d+708$/');

Where where = Where.matches('phoneNumber', regExp);
```

## 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个

```dart
Where where = Where.inList(fieldName, array);
```

field 的类型不限制，field 的 value 不含有 array 中的任何一个

```dart
Where where = Where.notInList(fieldName, array);
```

field 的类型必须为  数组, field 的 value 包含 array 中的  每一个

```dart
Where where = Where.arrayContains(fieldName, array);
```

如果希望查找数组中只包含指定数组中所有的值的记录，可以使用比较查询

```dart
Where where = Where.compare(fieldName, '=', array);
```

**请求示例**

```dart
/* color 是类型为字符串的字段，desc 是类型为数组的字段 */

// 查询 color 是 green 或 red 或 yellow 的记录
Where.inList('color', ['green', 'red', 'yellow']);

// 查询 desc 中包含 green 或 red 或 yellow 的记录
Where.inList('desc', ['green', 'red', 'yellow']);

// 查询 color 不是 green、red 和 yellow 的记录
Where.notInList('color', ['green', 'red', 'yellow']);

// 查询 desc 中不包含 green、red 和 yellow 的记录
Where.notInList('desc', ['green', 'red', 'yellow']);

// 查询 desc 中包含 green、red 和 yellow 的记录
Where.arrayContains('desc', ['green', 'red', 'yellow']);

// 查询 desc 中只包含 green、red 和 yellow 的记录
Where.compare('desc', '=', ['green', 'red', 'yellow']);
```

## null 或非 null 查询

查询字段值为 null 或非 null 记录

```dart
Where.isNull('name');
Where.isNull(['name', 'price']);

Where.isNotNull('name');
Where.isNotNull(['name', 'price']);
```

## 空或非空查询

查询字段值为空或非空记录

```dart
Where.exists('name');
Where.exists(['name', 'price']);

Where.notExists('name');
Where.notExists(['name', 'price']);
```

## hasKey 查询 （仅限 object 类型）

**参数说明**

| 参数      | 类型   | 必填 | 说明                                                         |
| :-------- | :----- | :--- | :----------------------------------------------------------- |
| key       | String | 是   | 在数据表中的类型必须是 Object                                |
| filedName | String | 是   | 需要检测的属性名, 只能包含字母、数字和下划线，必须以字母开头 |

**示例代码**

假设数据表有如下数据行

```dart
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

```dart
Where where = Where.hasKey('publisherInfo', 'location')
```

查询结果

```dart
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

```dart
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

```dart
Where where = Where.hasKey('publisherInfo', 'abc.location')
```

## pointer 查询

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**示例代码**

假设现在有两张表： order 表和 customer 表。

order 表部分字段结构如下：

| 字段名   | 字段类型 | 说明                 |
| -------- | -------- | -------------------- |
| customer | pointer  | 指向了 `customer` 表 |

现在需要查询 order 表中，同时满足以下条件的数据行：

- customer 字段指向 customer 表中 id 为 `5bad87ab0769797b4fb27a1b` 的数据行

```dart
TableObject order = new TableObject('order');
TableObject customer = new TableObject('customer');
Query query = new Query();
Where where = Where.compare('customer', '=', customer.getWithoutData(recordId: '5bad87ab0769797b4fb27a1b'));
query.where(where);
query.expand(['customer']);

try {
  TableRecordList data = await order.find(query: query);
} catch (e) {
  print(e.toString());
}
```

**返回示例**

返回 `TableRecordList` 类型，详见：[数据类型](/flutter-sdk/schema/data-type.md)

**不使用 expand 方法的示例**

```dart
// 不使用 expand() 方法， customer 字段不会扩展
try {
  TableRecordList data = await order.find(query: query);
} catch (e) {
  print(e.toString());
}
```

**其他查询 pointer 示例**

```dart
// inList 查询
Where where = Where.inList('customer', [Customer.getWithoutData('5bad87ab0769797b4fb27a1b'), Customer.getWithoutData('5bad87ab0769797b4fb27a1f'), Customer.getWithoutData('5bad87ab0769797b4fb27a11')]);

// 查询 user 字段是否存在
Where where = Where.exist('customer')
```

pointer 类型支持的查询操作符请参考 [数据类型对应查询操作符表](#数据类型对应查询操作符表)

## 组合查询

```dart
Where where1 = Where.isNull('name');
Where where2 = Where.compare('price', '>', 2);

// and 查询
Where andWhere = Where.and([where1, where2]);
// or 查询
Where orWhere = Where.or([where1, where2]);
```

## 复杂组合查询

```dart
Where where1 = Where.isNull('name');
Where where2 = Where.compare('price', '>', 2);
//...

// and 查询
Where andWhere = Where.and([where1, where2]);

// or 查询中包含 and 查询
Where where3 = Where.compare('amount', '>', 3);
Where orWhere = Where.or([andWhere, where3]);
```

## 获取符合筛选条件的数据总数

`BaaS.TableObject#count()`

```dart
TableObject tableObject = new TableObject(tableName);
Query query = new Query();

// 设置查询条件
// ...

try {
  int count = await tableObject.count(query: query);
  print(count);
} catch (e) {
  print(e.toString());
}
```
