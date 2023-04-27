# 删除数据项

删除单条数据：

`BaaS.TableObject#delete(recordID, options)`

删除多条数据：

`BaaS.TableObject#delete(query, options)`

**参数说明**

| 参数     | 类型   | 必填 | 说明               |
| :------- | :----- | :--- | :----------------- |
| recordId | string | 是   | 记录 ID            |
| query    | Query  | 是   | Query 查询条件对象 |

options（类型：Object，批量删除时需要设置），属性说明:

| 属性          | 类型    | 必填 | 默认    | 说明                 |
| :------------ | :------ | :--- | :------ | :------------------- |
| enableTrigger | boolean | 否   | true    | 是否触发触发器       |
| withCount     | boolean | 否   | false | 是否返回 total_count |

## 操作步骤

1.通过 `tableName` 或 `tableId` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`TableObject myTableObject = new TableObject(tableName)`

**参数说明**

tableName 和 tableID 二选一，不能同时存在

| 参数      | 类型   | 必填 | 说明                     |
| :-------- | :----- | :--- | :----------------------- |
| tableId   | String | 是   | 数据表的 ID              |
| tableName | String | 是   | 数据表名 |

**返回参数说明**

无数据返回

2.指定 recordID 执行删除操作

`MyTableObject.delete(recordId: recordId)`

**参数说明**

| 参数     | 类型   | 必填 | 说明    |
| :------- | :----- | :--- | :------ |
| recordId | String | 是   | 记录 ID |

## 示例

**请求示例**

```dart
// 删除 tableName 为 'product' 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
String tableName = 'product';
String recordId = '59897882ff650c0477f00485';

TableObject tableObject = new TableObject(tableName);
try {
  await tableObject.delete(recordId: recordId);
} catch (e) {
  print(e.toString());
}
```

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
| --------------- | ---------------- |
| 404             | 数据行不存在     |
| 403             | 没有权限删除数据 |

## 批量删除数据项

可以通过设置查询条件，将符合条件的数据进行批量删除操作。

其中：

- `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

- `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```dart
TableObject tableObject = new TableObject(tableName);

Query query = new Query();
query.limit(5);
query.offset(0);

try {
  await tableObject.delete(query: query);
} catch (e) {
  print(e.toString());
}
```

**返回示例**

then 回调中的 res 对象结构如下：

```json
{
  "succeed": 8, // 成功删除记录数
  "total_count": 10, // where 匹配的记录数，包括无权限操作记录
  "offset": 0,
  "limit": 10,
  "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
}
```

err 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
| --------------- | ---------------- |
| 404             | 数据行不存在     |
| 403             | 没有权限删除数据 |

### 批量删除时不触发触发器

支持批量删除数据项时不触发触发器。该模式在批量删除数据时，不会触发设置好的触发器，会对查询条件匹配的数据全部更新，没有最多 1000 条的限制。

在 enableTrigger 为 false 时，SDK 将不会设置默认的 limit （值为 20），如果用户没有设置 limit，则为全量删除。

批量删除不触发触发器的情况下会有以下的行为:

- 当删除命中总条目 <= 1000 时，无论 limit 设置为多少，均为同步删除，将返回删除结果，详见下方返回示例中同步执行部分。
- 当删除命中总条目 > 1000 时，根据设置 limit 的不同，将有下方两种行为：
  - limit <= 1000 时，操作记录为同步执行
  - limit > 1000 或未设置时，则会转为异步执行并移除 limit 限制，变成操作全部

```js
// 知晓云后台设置的触发器将不会被触发
await tableObject.delete(query: query, enableTrigger: false);
```

**返回示例**

同步操作时，then 回调中的 res 对象结构如下：

```json
{
  "succeed": 8, // 成功删除记录数
  "total_count": 10, // where 匹配的记录数，包括无权限操作记录
  "offset": 0,
  "limit": 10,
  "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
}
```