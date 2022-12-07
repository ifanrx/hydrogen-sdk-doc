{% include "/cloud-function/node-sdk/schema/data-type.md" %}

## TableRecord 类型

`TableRecord` 表示数据库中的一条记录，包括 `id`、创建时间等，其中 `recordInfo` 包含该记录的所有信息。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| id         |   String  |记录项 Id |
| created_by_map|  Map    | 创建者信息，只有才查询设置 expand 时才有值。详见[过滤与扩展](./select-and-expand.md) |
| created_by  |  int  | 创建者 Id |
| created_at  |  int | 时间戳，创建日期 |
| updated_at  |  int | 时间戳，更新日期  |
| recordInfo |  Map  | 该记录项的所有信息 |

## RecordList 类型

`RecordList` 表示一次查询数据库所返回的数据列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  int  |  返回记录的最大个数   |
| offset    | int  |    返回记录的起始偏移值 |
| total_count  | int   |   记录总数，默认为 -1，表示该属性无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| records  |   List<TableRecord> | 记录数组，每个元素为 TableRecord 类型   |

> **info**
> 查询结果默认不包含 total_count，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.withTotalCount(true)` 来获取 total_count。详见[获取记录总数](./limit-and-order.md)

## TableRecordOperationList 类型

| 名称  | 类型 | 说明 |
| :----- | :----- | :----- |
| succeed | int | 成功插入记录数 |
| total_count | int | 总的待插入记录数 |
| operation_result | List | TableRecordOperation 数组，包含每条数据是否成功被创建等信息 |

## TableRecordOperation 类型

| 名称  | 类型 | 说明 |
| :----- | :----- | :----- |
| success | Map | 记录创建成功信息 |
| error | Map | 记录创建失败信息 |