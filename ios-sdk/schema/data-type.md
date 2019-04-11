{% include "/cloud-function/node-sdk/schema/data-type.md" %}

## TableRecord 类型

`TableRecord` 表示数据库中的一条记录，包括 id、创建时间等，其中 recordInfo 包含该记录的所有信息。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| id         |   String  |记录项 Id |
| createdById|  Int64    | 创建者 Id |
| createdBy  |  Dictionary  | 创建者信息 |
| createdAt  |  TimeInterval | 创建日期 |
| updatedAt  |  TimeInterval | 更新日期 |
| recordInfo |  Dictionary  | 该记录项的所有信息 |

## RecordListResult 类型

`RecordListResult` 表示一次查询数据库所返回的数据列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回记录的最大个数   |
| offset    | Int  |    返回记录的起始偏移值 |
| totalCount   | Int   |   实际返回的记录总数 |
| records  |   Array<TableRecord> | 记录列表，每个元素为 TableRecord 类型   |