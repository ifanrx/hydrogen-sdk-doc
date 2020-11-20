# 实时数据库（WebSocket）

该功能可实现订阅数据表的数据增删改变化，当表数据改变时，app 可以实时接收到数据的变化。

## 操作步骤
1. 实例化 `Table` 对象
2. 发起订阅，接收事件
3. 取消订阅

> **info**
> 使用实时数据库功能前需要先进行[登录操作](/ios-sdk/user/auth.md#登录)


## 通过 `tableName` 或 `tableId` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表。

**示例代码**

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}

```
// 通过 tableId 创建数据表实例 
let table = Table(Id: "1236")

// 通过 tablename 创建数据表实例
let table = Table(name: "danmu")
```
{% content "oc1" %}
```
// 通过 tableId 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initId:@"1236"];

// 通过 tablename 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithName:@"danmu"];
```
{% endtabs %}

**参数说明**

`tableName` 和 `tableId` 二选一

| 名称     | 类型   |说明    |
| :-----  | :----- | :--- |
| Id   | String  |  数据表的 Id |
| name | String |   数据表名 |

> **info**
> 实时数据库功能无法订阅内置数据表，如 _userprofile 表、_richtextcontent 表等

## 发起数据表订阅操作

订阅数据表的事件，同时可以指定事件的查询条件，当满足条件的事件发生时，app 将会收到事件回调。

```
public func subscribe(event:where:onInit:onError:onEvent:)
```

**示例代码**

弹幕表 danmu，其中一个字段 type 表示弹幕类型：system 为系统弹幕，user 为用户弹幕，app 订阅新建一个类型为 user 的记录的事件，即每当有类型为 user 的记录创建时，app 将会收到事件回调。

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let danmuTable = Table(name: "danmu")

// 给事件添加条件
let typeWhere = Where.compare("type", operator: .equalTo, value: "user")

// 发起订阅
danmuTable.subscribe(.onUpdate, where: typeWhere) { [weak self] (subscription) in
    // 订阅成功，
    // 获得订阅对象 subscription，可通过 subscription 对象的 unsubscribe 方法取消该订阅。
    self?.subscription = subscription
} onError: { error in
    print("订阅失败: \(error?.localizedDescription ?? "")")
} onEvent: { (result) in
    print("事件触发 result: \(result ?? [:])")
}
```
{% content "oc2" %}

```
BaaSSubscription *subscription = nil;
BaaSTable *table = [[BaaSTable alloc] initWithName:@"danmu"];

// 给事件添加条件
BaaSWhere *where = [BaaSWhere compare:@"type" operator:BaaSOperatorEqualTo value:@"user"];

// 发起订阅
[table subscribe:BaaSSubscriptionEventOnCreate where:where onInit:^(BaaSSubscription * _Nonnull subscription) {
    // 订阅成功，
    // 获得订阅对象 subscription，可通过 subscription 对象的 unsubscribe 方法取消该订阅。
    self.subscription = subscription;
} onError:^(NSError * _Nullable error) {
    NSLog(@"订阅错误：%@", error.localizedDescription);
} onEvent:^(NSDictionary<NSString *,id> * _Nullable result) {
    NSLog(@"事件触发：%@", result);
}];

```
{% endtabs %}

**参数说明**

| 名称     | 类型   | 必填   | 说明                                          |
| :-----  | :----- | :---- | :--- |
| event    | SubscriptionEvent | 是  | 表数据变化的类型，参考 [SubscriptionEvent](#SubscriptionEvent)   |
| where    |  Where? |  否   | 按查询条件订阅，默认为 nil，表示订阅事件所有的操作都会触发回调。参考数据表[查询](/ios-sdk/schema/query.md) |
| onInit | SubscribeCallback |  是 | 订阅成功回调函数，参考 [SubscribeCallback](#SubscribeCallback) |
| onError | ErrorSubscribeCallback | 是 | 订阅失败回调函数，参考 [ErrorSubscribeCallback](#ErrorSubscribeCallback) |
| onEvent  | EventCallback    | 是  | 事件发生时的回调函数，参考 [EventCallback](#EventCallback)  |

> **info**
> SDK 自动管理 WebSocket 的连接，当发起第一个订阅时，SDK 将建立连接，之后的订阅/接收事件/删除订阅，都使用该连接。
> 若 WebSocket 连接意外断开，比如 app 挂起，无网络等，当 app 恢复正常时，SDK 自动重连。

另外，在知晓云控制台中手动删除数据时，如需触发删除数据动作的订阅通知，需要勾上「删除动作触发触发器」设置，如下图

![删除数据触发 WebSocket](/images/websocket/dashboard-delete-data.png)

## 取消订阅

当实时数据库功能连接成功后，会一直保持订阅状态。如需断开连接，比如退出发起订阅的页面时，可根据需要主动发起取消订阅。

`Subscription` 表示一个订阅对象，在订阅成功的回调函数获取，并保存，当需要取消订阅 时调用`unsubscribe` 方法。

```
func unsubscribe(onSuccess:onError:)
```

| 名称     | 类型   | 必填   | 说明  |
| :-----  | :----- | :---- | :--- |
| onSuccess | UnsubscribeCallback |  是 | 取消订阅成功回调函数，参考 [UnsubscribeCallback](#SubscriptionEvent) |
| onError | ErrorUnsubscribeCallback | 是 | 取消订阅失败回调函数，参考 [ErrorUnsubscribeCallback](#ErrorUnsubscribeCallback) |

**代码示例**

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
var subscription: Subscription?

let danmuTable = Table(name: "danmu")
danmuTable.subscribe(.onCreate) { [weak self] (subscription) in
    // 订阅成功
    // 获取订阅对象
     self?.subscription = subscription
} onError: { error in
    print("error: \(error?.localizedDescription ?? "")")
} onEvent: { (result) in
    print("result: \(result ?? [:])")
}
...

// 取消订阅
subscription?.unsubscribe(onSuccess: {
    print("取消订阅成功")
}, onError: { (error) in
    print("error: \(error?.localizedDescription ?? "")")
})
```
{% content "oc3" %}
```

BaaSSubscription *subscription = nil;
BaaSTable *table = [[BaaSTable alloc] initWithName:@"danmu"];

[table subscribe:BaaSSubscriptionEventOnCreate where:nil onInit:^(BaaSSubscription * _Nonnull subscription) {
    // 订阅成功，
    // 获得订阅对象 subscription
    self.subscription = subscription;
} onError:^(NSError * _Nullable error) {
    NSLog(@"订阅错误：%@", error.localizedDescription);
} onEvent:^(NSDictionary<NSString *,id> * _Nullable result) {
    NSLog(@"事件触发：%@", result);
}];

... 

// 取消订阅
[subscription unsubscribeOnSuccess:^{
    NSLog(@"取消订阅成功");
} onError:^(NSError * _Nullable error) {
    NSLog(@"取消订阅错误：%@", error.localizedDescription);
}];
```
{% endtabs %}

## 数据类型

### SubscriptionEvent

enum 类型，表示可订阅的事件类型，目前支持的类型有：

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
SubscriptionEvent

| 名称  | 说明  | 
| :---- | :---- |
| onCreate | 当数据表中有新的满足条件的记录被创建时，create 事件会被触发 |
| onUpdate | 当数据表中有满足条件的记录被更新时，update 事件会被触发 |
| onDelete | 当数据表中有新的满足条件的记录被删除时，delete 事件会被触发 |
```
{% content "oc4" %}
```
BaaSSubscriptionEvent

| 名称  | 说明  | 
| :---- | :---- |
| BaaSOnCreate | 当数据表中有新的满足条件的记录被创建时，create 事件会被触发 |
| BaaSOnUpdate | 当数据表中有满足条件的记录被更新时，update 事件会被触发 |
| BaaSOnDelete | 当数据表中有新的满足条件的记录被删除时，delete 事件会被触发 |
```
{% endtabs %}


### SubscribeCallback 

订阅成功回调函数 

```
public typealias SubscribeCallback = (_ subscription: Subscription) -> Void
```

| 名称  | 类型  | 说明 |
| :---- | :---- | :---- | 
| subscription | Subscription | 表示一个订阅，可用于取消订阅 |

### ErrorSubscribeCallback 

订阅失败回调函数

```
public typealias ErrorSubscribeCallback = (_ error: NSError?) -> Void
```

| 名称  | 类型  | 说明 |
| :---- | :---- | :---- | 
| error | NSError | 订阅失败的错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)及[订阅错误信息](#订阅错误信息) |

### EventCallback 

事件发生时的回调函数

```
public typealias EventCallback = (_ result: [String: Any]?) -> Void
```

| 名称  | 类型  | 说明 |
| :---- | :---- | :---- | 
| result | [String: Any]? | 回调信息 |

回调信息根据事件类型不同而不同，具体如下：

`onCreate` 事件类型得到的对象：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_create"   |
| schema_id   | Number  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 新增的数据行的 ID            |
| after       | Object  | 新增的数据行对象              |
| before      | Object  | 空对象                      |

**示例**
```json
{
  "after": {
    "text": "123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265027,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "before": {},
  "event": "on_create",
  "schema_id": 968,
  "schema_name": "product",
  "id": "5f068dc32dc610747781efcc"
}
```

`onUpdate` 事件类型得到的对象：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_update"   |
| schema_id   | Number  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 更新的数据行的 ID            |
| after       | Object  | 更新后的数据行对象            |
| before      | Object  | 更新前的数据行对象            |

**示例**
```json
{
  "after": {
    "text": "123123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265113,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "before": {
    "text": "123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265027,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "event": "on_update",
  "schema_id": 968,
  "schema_name": "product",
  "id": "5f068dc32dc610747781efcc"
}
```

`onDelete` 事件类型得到的对象：

| 名称        | 类型     | 说明                        |
| :-----     | :---     | :---    |
| event       | String  | 事件类型，返回 "on_delete"   |
| schema_id   | Number  | 订阅的数据表的 ID            |
| schema_name | String  | 订阅的数据表的表名            |
| id          | String  | 删除的数据行的 ID            |
| after       | Object  | 空对象                      |
| before      | Object  | 删除前的数据行对象            |

**示例**

```json
{
  "after": {},
  "before": {
    "text": "123123",
    "_read_perm": ["user:anonymous"],
    "_write_perm": ["user:anonymous"],
    "created_at": 1594265027,
    "updated_at": 1594265113,
    "created_by": 195448780235670,
    "id": "5f068dc32dc610747781efcc"
  },
  "event": "on_delete",
  "schema_id": 968,
  "schema_name": "product",
  "id": "5f068dc32dc610747781efcc"
}
```

### UnsubscribeCallback 

取消订阅事件成功时的回调函数

```
public typealias UnsubscribeCallback = () -> Void
```

### ErrorUnsubscribeCallback 

取消订阅事件失败时的回调函数

```
public typealias ErrorUnsubscribeCallback = (_ error: NSError?) -> Void
```

| 名称  | 类型  | 说明 |
| :---- | :---- | :---- | 
| error | NSError? | 取消订阅失败的错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)及[订阅错误信息](#订阅错误信息) |

## 订阅错误信息

| 错误码 | 错误描述  |  说明   | 
| :---  | :--- |  :--- |
| 401  |  unauthorized | 未登录  |
| 400  |  duplicate subscription   |  重复订阅 |
| 400  |  not allow to subscribe builtin schema | 不允许订阅内置表  |
| 400  | invalid options | 订阅的字段或值类型错误  |
| 400 | schema does not exists | 订阅的数据表不存在  |
| 402 | payment required    | 应用欠费 |
| 500  |  internal server error | 服务器错误 |