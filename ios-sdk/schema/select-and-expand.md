# 字段过滤与扩展

## 字段过滤

使用 select 来筛选请求返回的字段，设置需要返回的字段名，不需要返回的字段名前加 "-"。

**在 get 方法中使用**

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 返回特定字段
let select = ["created_at", "created_by"]

// 不返回特定字段
let select = ["-created_at", "-created_by"]

let recordId = "5c944a10d575a970a9b9****"
table.get(recordId, select: select) { (record, error) in

}
```
{% content "oc1" %}
```
// 返回特定字段
NSArray *select = @[@"created_at", @"created_by"];

// 不返回特定字段
NSArray *select = @[@"-created_at", @"-created_by"];

[table get:@"5ca47715d625d8370597****" select:select expand:nil completion:^(BaaSRecord * _Nullable record, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | Y  | 记录 ID |
| select | Array<String> |  N  | 指定筛选的字段 |
| expand | Array<String> |  N  | 指定扩展的字段 |

**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| record   | Record     | 数据项实例, 关于 `Record` 类型查看 [数据类型](./data-type.md) 章节|
| error     | HError(Swift) / NSError(OC) | 错误信息   |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

**在 find 方法中使用**

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let query = Query()

// 返回特定字段
query.select(["created_at", "created_by"])

// 返回特定字段
query.select(["-created_at", "-created_by"])

table.find(query: query) { (listResult, error) in
                    
}
```
{% content "oc2" %}
```
BaaSQuery *query = [[BaaSQuery alloc] init];

// 返回特定字段
[query select:@[@"created_at", @"created_by"]];

// 不返回特定字段
[query select:@[@"-created_at", @"-created_by"]];

[_table findWithQuery:query completion:^(BaaSRecordListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 设置筛选字段 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | RecordListResult | 结果列表，详见 [数据类型](./data-type.md) 章节|
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

<span class="attention">注：</span>

通过数组控制请求返回字段时，若数组内元素同时存在“规定返回”和“规定不返回”的字段，如：`['-created_at', 'created_by']`。后端服务会忽略掉此次操作，直接返回所有字段。

## 字段扩展

开发者可以通过 expand pointer 来查询该字段的更多信息,返回结果中的 pointer 字段会被替换为这个字段对应的完整的数据行对象。

> **info**
> created_by 字段是一个特殊的 pointer，开发者无需配置，默认指向了 _userpofile 表。
> 使用 expand 方法会增加一次数据表查询，api call 计费 +1

### expand 返回结果示例

注：`pointer_value` 为指向其他表的 pointer 类型字段

不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 1234,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer_value": "5a2fa9xxxxxxxxxxxxxx"
}
```

使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": {
    "avatar": "https://media.ifanrusercontent.com/tavatar/fb/cd/xxxx.jpg",
    "id": 62536607,
    "nickname": "Larry。"
  },
  "pointer_value": {
    "created_at": 1516118400,
    "name": "123",
    "id": "5a2fa9xxxxxxxxxxxxxx"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199
}
```

### 使用方法
**在 get 方法中使用**

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
// 扩展的字段
let expand = ["created_by", "pointer_value"]

let recordId = "5c944a10d575a970a9b9****"
table.get(recordId, expand: expand) { (record, error) in

}
```
{% content "oc3" %}
```
// 扩展的字段
NSArray *expand = @[@"created_by", @"pointer_value"];

NSString *recordId = @"5ca09074be20d6749023****";
[_table get:recordId select:nil expand:expand completion:^(BaaSRecord * _Nullable record, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordId | String | Y  | 记录 ID |
| select | Array<String> |  N  | 指定筛选的字段 |
| expand | Array<String> |  N  | 指定扩展的字段 |

**返回结果**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| record   | Record     | 数据项实例, 关于 `Record` 类型查看 [数据类型](./data-type.md) 章节|
| error     | HError(Swift) / NSError(OC) | 错误信息   |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

**在 find 方法中使用**

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
let query = Query()

// 扩展的字段
table.expand(["created_by", "pointer_value"])

table.find(query: query) { (listResult, error) in
                    
}
```
{% content "oc4" %}
```
BaaSQuery *query = [[BaaSQuery alloc] init];

// 返回特定字段
[query expand:@[@"created_by", @"pointer_value"]];

[_table findWithQuery:query completion:^(BaaSRecordListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 设置扩展字段 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | RecordListResult | 结果列表，详见 [数据类型](./data-type.md) 章节|
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)