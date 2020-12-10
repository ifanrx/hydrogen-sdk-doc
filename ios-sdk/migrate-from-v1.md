# v1.x -> v2.x 迁移指南

> **info**
> 目前 SDK 2.x 版本改动如下:
> 1. 废弃 Record 固有属性
> 2. 新增回调函数所在执行队列
> 3. 升级 Moya 以及 Alamofire
> 4. 实时数据库（WebSocket）

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

## 新增回调函数所在执行队列

1. `Table`，`ContentGroup`，`FileManager`，`File`，`Pay` 提供了 `callBackQueue`，类型为 DispatchQueue，默认为 .main。通过提供 `callBackQueue`，为所有回调函数在指定的队列执行。

2. `User`，`Auth`，`CurrentUser`，`BaaS` 的所有方法通过方法参数指定 `callBackQueue`。

## 升级 Moya 以及 Alamofire

Moya: ~> 14.0.0

Alamofire: ~> 5.0.0

## 实时数据库（WebSocket）

详细请参考[实时数据库](./schema/websocket.md)章节。