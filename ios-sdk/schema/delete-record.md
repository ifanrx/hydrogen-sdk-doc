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

 - `limit`：设置一次删除符合条件记录的数量

 - `offset`：待删除记录的起始偏移量

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let whereArgs = Where.contains("color", value: "brown")
let query = Query()
query.where = whereArgs
query.limit = 10
query.offset = 0
let options = ["enable_trigger": true]
table.delete(query: query, options:  completion: { (result, error) in

})
```
{% content "oc2" %}
```
BaaSWhere *where = [BaaSWhere contains:@"color" value:@"brown"];
BaaSQuery *query = [[BaaSQuery alloc] init];
query.where = where;
query.limit = 10;
[query.offset = 0;
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

| 参数 | 类型 | 说明  |
| :---- | :----- | :----- |
| succeed | Int  | 成功创建记录数 |
| total_count | Int  | 总的删除记录数 |
| offset | Int  | 与传入参数 `offset` 一致 |
| limit | Int  | 与传入参数 `limit` 一致 |
| next | String  | 下一页待删除记录地址，若值为 `null`，表示已删除完成 |

**常见错误码**
* `201`：成功写入
* `400`：非法数据

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.returnTotalCount(true)` 来获取 totalCount。详见[获取记录总数](./limit-and-order.md)