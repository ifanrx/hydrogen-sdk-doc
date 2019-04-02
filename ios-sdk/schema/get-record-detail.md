# 获取数据项详情

## 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 通过 tableId 创建数据表实例 
let table = Table(tableId: 1236**)

// 通过 tablename 创建数据表实例
let table = Table(tableName: "Book")
```
{% content "oc1" %}
```
// 通过 tableId 创建数据表实例
BAASTable *table = [[BAASTable alloc] initWithTableId:1236**];

// 通过 tablename 创建数据表实例
BAASTable *table = [[BAASTable alloc] initWithTableName:@"Book"];
```
{% endtabs %}

**参数说明**

tableName 和 tableID 二选一

| 名称     | 类型   | 必填   | 说明                   |
| :-----  | :----- | :---- | :--- |
| tableId   | Int  | 是   | 数据表的 ID             |
| tableName | String |  是 | 数据表名 |

2.指定 `recordID` 执行获取相应数据项操作

{% tabs swift2="Swift", oc2="Objective-c" %}
{% content "swift2" %}
```
table.get(recordId: "5c944a22d575a970a9b91c13") { (record, error) in

}
```
{% content "oc2" %}
```
[table getWithRecordId:@"5ca09074be20d67490232a28" completion:^(BAASTableRecord * _Nullable record, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | 是  | 记录 ID |


**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| record   | TableRecord     | 数据项实例 |
| error     | HError         | 错误信息   |

常见错误：

| 错误码            | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |

## 字段过滤与扩展

请参考[字段过滤与扩展](./select-and-expand.md)章节
