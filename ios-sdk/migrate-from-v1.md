# v1.x -> v2.x 迁移指南

> **info**
> 目前 SDK 2.x 版本改动如下:
> 1. 废弃 Record 固有属性
> 2. 新增回调函数所在执行队列
> 3. Record 类型的 save/update 方法增加 query 参数
> 4. Record 类型的 save/update/delete 方法增加 options 参数
> 5. 升级 Moya 以及 Alamofire
> 6. 实时数据库（WebSocket）

## 废弃 Record 固有属性

已废弃 `Record` 以下属性：

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| createdById|  String    | 创建者 Id |
| createdBy  |  Dictionary  | 创建者信息|
| createdAt  |  TimeInterval | 时间戳，创建日期 |
| updatedAt  |  TimeInterval | 时间戳，更新日期  |

如需获取上述数据，可以通过访问 `recordInfo` 或者通过 `get(_ key:)` 获取相应数据。

## 废弃 Content 部分固有属性

已废弃 `Content` 一下属性：

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| createdById|  String    | 创建者 Id |
| createdBy  |  Dictionary  | 创建者信息|
| createdAt  |  TimeInterval | 时间戳，创建日期 |
| updatedAt  |  TimeInterval | 时间戳，更新日期  |

如需获取上述数据，可以通过访问 `contentInfo` 或者通过 `get(_ key:)` 获取相应数据。

## Record 类型的 save 和 update 方法增加 Query 参数

在创建或者更新记录时，通过 Query 设置需要扩展的 pointer 的字段，参考[创建记录项](/ios-sdk/schema/create-record.md)，[更新记录项](/ios-sdk/schema/update-record.md)，[字段过滤与扩展](/ios-sdk/schema/select-and-expand.md#字段扩展)

## Record 类型的 save/update/delete 方法增加 [RecordOption: Any] 参数

通过设置 options 可以在记录的新增/更新/删除操作时，附带一些选项，比如是否触发触发器。具体参考 [新增数据记录](/ios-sdk/schema/create-record.md)、[更新数据记录](/ios-sdk/schema/update-record.md)、[删除记录项](/ios-sdk/schema/delete-record.md)

## 新增回调函数所在执行队列

1. `Table`，`ContentGroup`，`FileManager`，`File`，`Pay` 提供了 `callBackQueue`，类型为 DispatchQueue，默认为 .main。通过提供 `callBackQueue`，为所有回调函数在指定的队列执行。

2. `User`，`Auth`，`CurrentUser`，`BaaS` 的所有方法通过方法参数指定 `callBackQueue`。

## 升级 Moya 以及 Alamofire

Moya: ~> 14.0.0

Alamofire: ~> 5.0.0

## 实时数据库（WebSocket）

详细请参考[实时数据库](./schema/websocket.md)章节。