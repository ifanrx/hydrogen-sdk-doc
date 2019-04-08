# 分页和排序

## 分页

使用 limit 和 offset 来控制分页数据：

- `limit`  指定该请求返回的结果个数
- `offset`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let table = Table(name: "Book")
table.limit(100)
table.offset(400)
table.find { (result, error) in

}
```
{% content "oc1" %}
```
BAASTable *table = [[BAASTable alloc] initWithName:@"Book"];
[table limit:100];
[table offset:400];
[table find:^(NSArray<BAASTableRecord *> * _Nullable records, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

## 排序

使用 orderBy 来控制使用升序或降序获取数据列表。

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let table = Table(name: "Book")
// 升序
table.orderBy(['created_at'])

// 降序
table.orderBy(['-created_at'])

// 多重排序
table.orderBy(['created_at', 'created_by'])

table.find { (records, error) in

}
```
{% content "oc2" %}
```
BAASTable *table = [[BAASTable alloc] initWithName:@"Book"];
// 升序
[table orderBy:@[@"created_at"]];

// 降序
[table orderBy:@[@"-created_at"]];

// 多重排序
[table orderBy:@[@"created_at", @"created_by"]];

[table find:^(NSArray<BAASTableRecord *> * _Nullable records, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| records  | Array<TableTable>  | 是否新增数据成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)