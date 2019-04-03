# 删除数据项

## 操作步骤

已经获取数据项的情况下，可以调用 delete 方法将记录项删除。

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
record.delete { (success, error) in
                    
}
```
{% content "oc1" %}
```
[record deleteWithCompletion:^(BOOL success, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**结果返回**

| 名称       | 类型           | 说明 |
| :-------- | :------------  | :------ |
| success   | Bool           | 是否删除成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息     |

## 批量删除数据项

可以通过设置查询条件，将符合条件的数据进行批量删除操作。

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

示例：删除价钱低于 15 的书。

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let query = Query.compare(key: "price", operator: .lessThanOrEqualTo value: 15)
table.setQuery(query)
table.delete() { (success, error) in
                
}
```
{% content "oc2" %}
```
BAASQuery *query = [BAASQuery compareWithKey:@"price" operator:BAASOperatorLessThanOrEqualTo value:@15];
[table setQuery:query];
[table deleteWithEnableTrigger:true completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名    | 类型    | 说明              |  必填  |
|-----------|---------|-------------------|--|
| enableTrigger | Bool    |   是否触发触发器  |  N

> Swift 默认会触发触发器。