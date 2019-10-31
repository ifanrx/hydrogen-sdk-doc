# 更新数据项

## 操作步骤

1.通过 `tableName` 或 `tableId` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 `tableName`

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 通过 `tableId` 创建数据表实例 
let table = Table(Id: "1236")

// 通过 tablename 创建数据表实例
let table = Table(name: "Book")
```
{% content "oc1" %}
```
// 通过 `tableId` 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithId: @"1236"];

// 通过 tablename 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithName:@"Book"];
```
{% endtabs %}

**参数说明**

`tableName` 和 `tableId` 二选一

| 名称     | 类型   | 说明 |
| :-----  | :-----  | :--- |
| tableId   | String   | 数据表的 Id|
| tableName | String  | 数据表名 |

2.通过数据行 `id`（以下用 `recordId` 参数名表示） 设置指定数据行

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let record = table.getWithoutData(recordId: "5c944a10d575a970a9b91c12")
```
{% content "oc2" %}
```
BaaSRecord *record = [table getWithoutDataWithRecordId:@"5c944a10d575a970a9b91c12"];
```
{% endtabs %}

3.为记录项赋值

有两种类型的赋值操作：

a.一次性赋值：

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
record.set(["name": "bookname", "color": "red", "price": 19])
```
{% content "oc3" %}
```
[record set:@{@"name": @"bookname", @"color": @"red", @"price": @10}];
```
{% endtabs %}

**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| record    | Dictionary     | 记录信息，key 为字段名称   |


b.逐个赋值：

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
record.set("color", value: "red")
record.set("price", value: 10)
```
{% content "oc4" %}
```
[record set:@"color" value:@"red"];
[record set:@"price" value:@10];
```
{% endtabs %}

> **info**
> 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据
>
> 在通过 `set(key:value:)` 和 `set(record: )` 设置数据时，value 支持的类型包括 `Int`、`String`、`Array`、`Dictionary` 等基本数据类型，同时也支持 `GeoPoint` 、`GeoPolygon`、`User`、`Record`。

c. unset 操作

将某个字段的值清空

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
book.unset("color")
```
{% content "oc5" %}
```
[record unset:@"color"];
```
{% endtabs %}

4.将数据更新保存到服务器

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
record.update { (success, error) in

}
```
{% content "oc6" %}
```
[record update:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  | Bool           | 是否新增数据成功 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

> **info**
> 若 `success` 为 `true`，本地记录实例 `record` 的数据将被更新。

通过上面的四个步骤，即完成了一条记录的更新，具体操作阅读以下内容。

## 更新普通数据

请参考 [新增数据项](/ios-sdk/schema/create-record.md) 的添加普通数据

## 更新日期时间 Date 类型的数据

请参考 [新增数据项](/ios-sdk/schema/create-record.md) 的添加日期时间 Date 类型的数据

## 更新 file 类型数据

请参考 [新增数据项](/ios-sdk/schema/create-record.md) 的添加 file 类型数据

## 更新 geojson 类型数据

详见 [地理位置操作](./geo.md) 设置地理信息小节

## 更新 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的。

**示例**

Book 表中的 publish_info 为 object 类型，表示出版商，其中有两个字段信息：name 表示出版商名称，location 为出版商地址。

{% tabs swift6_1="Swift", oc6_1="Objective-C" %}
{% content "swift6_1" %}
```
book.updateObject("publish_info", value: ["name": "efg出版社", "location": "广东省广州市天河区五山路 100 号"])
```
{% content "oc6_1" %}
```
[book updateObject:@"publish_info" value: @{@"name": @"efg出版社", @"location": @"广东省广州市天河区五山路 100 号"}];
```
{% endtabs %}

## 更新 array 类型数据

请参考 [新增数据项](/ios-sdk/schema/create-record.md) 的添加 array 类型数据

## 更新 pointer 类型数据 

请参考 [新增数据项](/ios-sdk/schema/create-record.md) 的添加 pointer 类型数据 

## 计数器原子性更新

对数字类型的字段进行原子性增减操作。当请求同时对一个数据进行增减时，原子性使得冲突和覆盖导致的数据不正确的情况不会出现。

假如 `Book` 表有一个价钱字段 `price`，通过原子性增加价钱：

{% tabs swift7="Swift", oc7="Objective-C" %}
{% content "swift7" %}
```
book.incrementBy("price", value: 10.5)
```
{% content "oc7" %}
```
[book incrementBy:@"price" value:@10.5];
```
{% endtabs %}

**参数说明**

| 参数   | 类型              | 必填 | 说明 |
| :---- | :---------------- | :-- | :-- |
| key   | String            | 是  | 在数据表中的类型必须是 Number 或 Integer |
| value | Double             | 是  | 与 key 的类型保持一致 |

## 数组原子性更新

### 将 _待插入的数组_ 加到原数组末尾

假设 `Book` 表中有一个字段 `recommender`，表示推荐者，类型是数组，可以有多个推荐者。假如数据表中 `recommender` 为 `["xiaohua", "xiaohong"]`，现增加一个推荐者：

{% tabs swift8="Swift", oc8="Objective-C" %}
{% content "swift8" %}
```
book.append("recommender", value: ["xiaoming"])
```
{% content "oc8" %}
```
[book append:@"recommender" value:@[@"xiaoming"]];
```
{% endtabs %}

此时，数据表的 `recommender` 值为 `["xiaohua", "xiaohong", "xiaoming"]`。

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :--- |
| key   | String             | 是  | 在数据表中的类型必须是 Array |
| value | Array               | 是  | 将该数组的元素插入到数据表中 |

### 将 _待插入的数组_ 中不包含在原数组的数据加到原数组末尾

假设 `Book` 表中有一个字段 `recommender`，表示推荐者，类型是数组，可以有多个推荐者。假如数据表中 `recommender` 为 `["xiaohua", "xiaohong"]`，现增加两个推荐者：

{% tabs swift9="Swift", oc9="Objective-C" %}
{% content "swift9" %}
```
book.uAppend(@"author", value: ["xiaoming", "xiaohong"])
```
{% content "oc9" %}
```
[book uAppeng:"author" value:@[@"xiaoming", @"xiaohong"]];
```
{% endtabs %}

此时，数据表的 `recommender` 值为 `["xiaohua", "xiaohong", "xiaoming"]`。

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-- | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Array |
| value | Array               | 是   | 将该数组的元素插入到数据表中 |

### 从原数组中删除指定的值

假设 `Book` 表中有一个字段 `recommender`，表示推荐者，类型是数组，可以有多个推荐者。假如数据表中 `recommender` 为 `["xiaohua", "xiaohong"]`，现删除一个推荐者：

{% tabs swift10="Swift", oc10="Objective-C" %}
{% content "swift10" %}
```
book.remove("author", value: ["xiaohong"])
```
{% content "oc10" %}
```
[book remove:@"author" value:@[@"xiaohong"]];
```
{% endtabs %}

此时，数据表的 `recommender` 值为 `["xiaohua"]`。
**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String               | 是  | 在数据表中的类型必须是 Array |
| value | Array               | 是  | 如果元素类型是 geojson、object、file，则只能是 length 为 1 的 Array |


## 按条件批量更新数据项

可以通过设置自定义查询条件 `Query`，将符合条件的数据进行批量更新操作，同时根据需要是否设置触发触发器。下面示例代码将价格小于 `15` 的书籍的价格加 `1`。

> 注意：由于条件查询可能命中非常多的数据，默认情况下，限制为最多更新前 `1000` 条数据。
> 如需要一次性更新更多数据，请参考下一个小节：不触发触发器的更新，或者通过维护分页来进行。

其中：
 - `Where` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

 **实例代码**

{% tabs swift11="Swift", oc11="Objective-C" %}
{% content "swift11" %}
```
// 设置查询条件
let whereArgs = Where.compare("price", operator: .lessThan, value: 15)
let query = Query()
query.where = whereArgs

// 设置选项
let options = ["enable_trigger": true]

// 创建一个空记录，用于设置需要更新的操作
let record = table.createRecord()
record.incrementBy("price", value: 1)

// 更新操作
table.update(record: record, query: query, options: options) { (result, error) in

}
```
{% content "oc11" %}
```
// 设置查询条件
BaaSWhere *where = [BaaSWhere compare:@"price" operator:BaaSOperatorLessThan value:@15];
BaaSQuery *query = [[BaaSQuery alloc] init];
query.where = where;

// 设置选项
NSDictionary *options = @{@"enable_trigger": @YES};

// 创建一个空记录，用于设置需要更新的操作
BaaSRecord *record = [_table createRecord];
[record incrementBy:@"price" value:@1];

// 更新操作
[_table updateWithRecord:record query:query options: options completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名    | 类型    | 说明              |  必须  |
|-----------|---------|-------------------|-------|
| record   | Record  |   需要被更新的信息|  Y |
| query | Query | 设置扩展字段 |  N  | 
| options | Dictionary    |   批量操作选项 ，目前支持支持 enable_trigger, true 为触发触发器 |  N |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| result  | Dictionary           | 更新的数据结果 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md) |

> 说明
 `error` 为 `nil` 不说明批量更新数据完全成功，仅代表服务端已收到并处理了这个请求，只有当返回的结果中 `operation_result` 列表中不存在 `error` 元素时，才可以认为所有数据均更新成功。

 **返回示例**
 ```
 {
  "operation_result": [
    {"success": {"id": "5bfe000ce74243582bf2979f", "updated_at": "1543459089"}},
    {
       "error": {
         "code": 16837,
         "err_msg": "数据更新失败，具体错误信息可联系知晓云微信客服：minsupport3 获取。"
       }
    }
  ],
  "succeed": 8,
  "total_count": 10,
  "offset": 0,
  "limit": 10,
  "next": null
}
 ```

**返回参数**

| 参数 | 类型 | 说明  |
| :---- | :----- | :----- |
| succeed | Int  | 成功创建记录数 |
| total_count | Int  | 总的待创建记录数 |
| offset | Int  | 与传入参数 `offset` 一致 |
| limit | Int  | 与传入参数 `limit` 一致 |
| next | String  | 下一页待更新记录地址，若值为 `null`，表示已更新完成 |
| operation_result | Int  | 批量写入每一条数据的结果 |

**常见错误码**
* `201`：成功写入
* `400`：非法数据

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.returnTotalCount = true` 来获取 totalCount。详见[获取记录总数](./limit-and-order.md)