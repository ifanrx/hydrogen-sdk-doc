# 分页和排序

## 分页

使用 limit 和 offset 来控制分页数据：

- `limit`  指定该请求返回的结果个数
- `offset`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let query = Query()
query.limit(1)
query.offset(10)
table.find(query: query) { (listResult, error) in
                    
}
```
{% content "oc1" %}
```
BaaSQuery *query = [[BaaSQuery alloc] init];
[query offset:1];
[query limit:10];
[table findWithQuery:query completion:^(BaaSRecordListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 查询条件 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | RecordListResult | 结果列表，详见 [数据类型](./data-type.md) 章节|
| error   |  NSError |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 排序

使用 orderBy 来控制使用升序或降序获取数据列表。

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let query = Query()
// 升序
query.orderBy(['created_at'])

// 降序
query.orderBy(['-created_at'])

// 多重排序
query.orderBy(['created_at', 'created_by'])

table.find(query: query) { (listResult, error) in
                    
}
```
{% content "oc2" %}
```
BaaSQuery *query = [[BaaSQuery alloc] init];
// 升序
[query orderBy:@[@"created_at"]];

// 降序
[query orderBy:@[@"-created_at"]];

// 多重排序
[query orderBy:@[@"created_at", @"created_by"]];

[table findWithQuery:query completion:^(BaaSRecordListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 查询条件 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | RecordListResult | ，详见 [数据类型](./data-type.md) 章节 |
| error   |  NSError |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)