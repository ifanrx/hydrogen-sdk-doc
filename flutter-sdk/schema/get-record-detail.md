# 获取单条数据

## 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

`TableObject myTableObject = new TableObject(tableName);`

**参数说明**

tableName 和 tableID 二选一，不能同时存在

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| tableId  | String | 是  | 数据表的 ID             |
| tableName | String |  是 | 数据表名|

2.指定 `recordId` 执行获取相应数据项操作

`myTableObject.get(recordId)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | 是  | 记录 ID |


## 示例

**请求示例**

```dart
String tableName = 'tableName';
String recordId = '5f4f8b77818361658051f504';
TableObject tableObject = new TableObject(tableName);

try {
  TableRecord data = await tableObject.get(recordId);
} catch (e) {
  print(e.toString());
}
```

**返回结果**

返回 `TableRecord` 示例，详见：[数据类型](/flutter-sdk/data-type.md)

err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |

## 字段过滤与扩展

请参考[字段过滤与扩展](./select-and-expand.md)章节
