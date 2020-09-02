# 新增数据记录

## 操作步骤

1.通过 `tableName` 或 `tableId` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表。

```dart
TableObject myTableObject = new TableObject(tableId);
```

**参数说明**

tableName 和 tableId 二选一，不能同时存在

| 名称      | 类型   | 必填 | 说明        |
| :-------- | :----- | :--- | :---------- |
| tableId   | String | 是   | 数据表的 ID |
| tableName | String | 是   | 数据表名    |

2.本地创建一条空记录

`TableRecord myRecord = myTableObject.create();`

3.为上面创建的空记录赋值

`myRecord.set(data);`

该方法支持两种类型的赋值操作：

a.一次性赋值：

```dart
myRecord.set({
  key1: value1,
  key2: value2,
});
```

b.逐个赋值

```dart
myRecord.set(key1, value1);
myRecord.set(key2, value2);
```

> **info**
>
> - 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据
> - 若插入数据中包含 `created_by, created_at, updated_at` 这几个字段，则最终生成的数据中这几个字段将以插入数据中设置的字段值为准。

4.将创建的记录保存到服务器

`myRecord.save();`

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。

## 添加普通数据

**请求示例**

```dart
// 向 tableName 为 'product' 的数据表插入一条记录
String tableName = 'product';
TableObject product = new TableObject(tableName);
TableRecord record = product.create();

// 设置方式一
Map apple = {
  'name': 'apple',
  'price': 1,
  'desc': ['good'],
  'amount': 0,
};

record.set(apple);

try {
  TableRecord data = await record.save();
  print(data.recordInfo);
} catch(e) {
  // err 为 HError 对象
}

// 设置方式二
record.set('name', 'apple');
record.set('price', 1);
record.set('desc', ['good']);
record.set('amount', 0);

try {
  TableRecord data = await record.save();
  print(data.recordInfo);
} catch(e) {
  // err 为 HError 对象
}
```

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 400             | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403             | 没有权限写入数据                                                                                                           |
| 404             | 写入的数据表不存在                                                                                                         |

> **info**
> 对于不合法的数据，知晓云会进行过滤。比如开发者尝试在 integer 类型的字段写入 string 类型的数据，该操作不会报错而是会忽略对该字段的修改。
> 因此可以检查 data.recordInfo 中对应的字段来判断某些字段是否添加成功。

## 添加日期时间 Date 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 ISO Date 格式的字符串，如 Product 表定义一个时间日期类型的列 expiration_time，创建一条记录时，该字段的赋值操作如下：

```dart
String isoStr = DateTime.now().toIso8601String();
record.set('expiration_time', isoStr);
```

## 添加 file 类型数据

请求示例：

```dart
File file = await FilePicker.getFile();
CloudFile data = await FileManager.upload(file); // 具体操作查看「文件操作」章节
record.set('cover', data);

try {
  TableRecord data = await record.save();
  print(data.recordInfo);
} catch (e) {
  // err 为 HError 对象
}
```

<span class="attention">注：</span> 添加记录时为字段设置的数据，要与预先在知晓云平台设定的字段的数据类型一致，当仅更新一个字段，并且使用的数据不合法时，将无法成功保存。如果更新多个字段，其中有一个或一个以上字段数据合法，则请求成功，但其中数据不合法的字段将不会成功保存。

## 添加 geojson 类型数据

查看 [地理位置操作](./geo.md) 章节

## 添加 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{'#ifanr.x': 123}` 和 `{'知晓云': 'test'}` 是错误的

## 添加 array 类型数据

添加 array 类型数据的方法与添加其他类型数据的方法基本一致。区别在于，array 类型数据是将一个的数组赋值给某个字段。

array 类型数据中的元素类型，要与预先在知晓云平台设定的字段类型一致。否则创建的数据将不包含该 array 类型的字段。

```dart
// 元素类型为 integer
TableObject table = new TableObject(tableName);
TableRecord record = table.create();
record.set('array_i', [1, 2, 3]);
await record.save();
```

```dart
// 元素类型为 string
TableObject table = new TableObject(tableName);
TableRecord record = table.create();
record.set('array_s', ['a', 'b', 'c']);
await record.save();
```

```dart
// 元素类型为 object
TableObject table = new TableObject(tableName);
TableRecord record = table.create();
Map obj1 = {'a': 10};
Map obj2 = {'b': 20};
record.set('array_o', [obj1, obj2]);
await record.save();
```

```dart
// 元素类型为 geojson
TableObject table = new TableObject(tableName);
TableRecord record = table.create();
GeoPoint point = new GeoPoint(10, 20);
record.set('array_geo', [point]);
await record.save();
```

```dart
// 元素类型为 file
TableObject table = new TableObject(tableName);
TableRecord record = table.create();
File file = await FilePicker.getFile();
CloudFile data = await FileManager.upload(file);
record.set('cover', data);
await record.save();
```

```dart
// 元素类型为 date
TableObject table = new TableObject(tableName);
TableRecord record = table.create();
String date = DateTime.now().toIso8601String();
record.set('array_d', [date]);
await record.save();
```

## 添加 pointer 类型数据

> **info**
> 每张表最多能建立 3 个 pointer 类型的字段。如有更多需求，请提交工单说明
> pointer 指向的数据表，不能改名或删除

假设现在有一张 Article 表, Article 表部分字段如下:

| 字段名  | 字段类型 | 说明                     |
| ------- | -------- | ------------------------ |
| comment | pointer  | 指向了 `Comment` 表      |

现在在 Article 表中新增一条数据，其中:

comment 字段指向了 Comment 表中 id 为 5bad87ab0769797b4fb27a1b 的数据行

```dart
// 获取一个 tableObject 实例
TableObject commentTable = new TableObject('Comment');
// 5bad87ab0769797b4fb27a1b 为 Comment 表中某行数据的 id
TableRecord comment =
commentTable.getWithoutData(recordId: '5bad87ab0769797b4fb27a1b');

// 在 Article 表中创建一行数据
TableObject articleTable = new TableObject('Article');
TableRecord record = articleTable.create();

// 给 pointer 字段赋值
record.set('comment', comment);
await record.save();
```

## 批量新增数据项

`tableObject.createMany([item,...])`

> **info**
> 批量创建记录的数量，最大限制为 1000

**参数说明**

| 参数名 | 类型   | 说明             |
| ------ | ------ | ---------------- |
| item   | Map | 符合表结构的对象 |

**请求示例**

```dart
TableObject tableObject = new TableObject(tableName);
List data = [
  {'num': 1, 'str': 'a'},
  {'num': 2, 'str': 'b'},
  {'num': 3, 'str': 'c'},
];

TableRecordOperationList response = await tableObject.createMany(data);
```

**返回结果**

| 名称  | 类型 | 说明 |
| ----- | ----- | ----- |
| succeed | int | 成功插入记录数 |
| total_count | int | 总的待插入记录数 |
| operation_result | List | TableRecordOperation 数组，包含每条数据是否成功被创建等信息 |

TableRecordOperation 类型具体请参考：[数据类型](/flutter-sdk/data-type.md)

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 400             | 1. 提交的 ACL 权限不合法 、2. 提交的数据的字段类型不匹配、 3. 提交的数据中没有包含必填项 4. 重复创建数据（设置了唯一索引） |
| 403             | 没有权限写入数据                                                                                                           |
| 404             | 写入的数据表不存在                                                                                                         |

### 批量创建时不触发触发器

> **info**
> 批量创建记录的数量，最大限制为 1000

```dart
// 知晓云后台设置的触发器将不会被触发
await tableObject.createMany(data, enableTrigger: false);
```