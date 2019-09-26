# 删除记录项

## 删除本记录项

通过调用 `Record` 实例的 `delete` 方法将该记录项删除。

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)     |

## 批量删除数据项

可以通过设置查询条件，将符合条件的数据进行批量删除操作，同时可以根据需要是否设置触发触发器。下面示例代码删除所有 `color` 为 `brown` 的记录。

其中：
 - `Where` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let whereArgs = Where.contains(key: "color", value: "brown")
let query = Query()
query.setWhere(whereArgs)
let options = ["enable_trigger": true]
table.delete(query: query, options:  completion: { (result, error) in

})
```
{% content "oc2" %}
```
BaaSWhere *where = [BaaSWhere containsWithKey:@"color" value:@"brown"];
BaaSQuery *query = [[BaaSQuery alloc] init];
[query setWhere:where];
NSDictionary *options = @{@"enable_trigger": @true};
[table deleteWithQuery:query options:options completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名    | 类型    | 必填              |  说明  |
|-----------|---------|-------------------|--|
| query | Query |  N  |  查询条件，详见[数据表 - 查询](./query.md)  | 
| options | Dictionary |  N  | 批量操作选项 ，目前支持支持 enable_trigger, true 为触发触发器|

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| result  |  Dictionary           | 删除的数据结果 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

 **返回示例**
 ```
 {
  "succeed": 8,
  "total_count": 10,
  "offset": 0,
  "limit": 10,
  "next": null
}
 ```

**参数说明**
* `succeed`:	成功删除记录数
* `total_count`:	query 条件匹配的记录数，包括无权限操作记录
* `offset`: 与传入参数 offset 一致
* `limit`: 与传入参数 limit 一致
* `next`: 下一次的更新链接，若待更新记录数超过上限，可通过该链接继续更新