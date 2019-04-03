# 新增数据记录

## 操作步骤

* 创建一个 `Table` 对象 `table`；
* 在 `table` 对象创建一条空记录；
* 为空记录赋值；
* 将创建的记录保存到服务器。

### 创建 `Table` 对象

通过 `tableName` 或 `tableID` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName。

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 通过 tableId 创建数据表实例 
let table = Table(tableId: 1236**)

// 通过 tablename 创建数据表实例
let table = Table(tableName: "Book")
```
{% content "oc1" %}
```
// 通过 tableId 创建数据表实例
BAASTable *table = [[BAASTable alloc] initWithTableId:1236**];

// 通过 tablename 创建数据表实例
BAASTable *table = [[BAASTable alloc] initWithTableName:@"Book"];
```
{% endtabs %}

**参数说明**

tableName 和 tableID 二选一

| 名称     | 类型   | 必填   | 说明                   |
| :-----  | :----- | :---- | :--- |
| tableId   | Int(Swift) / NSInteger(OC)  | 是   | 数据表的 ID             |
| tableName | String(Swift) / NSString(OC) |  是 | 数据表名 |

### 本地创建一条空记录

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let record = table.createRecord()
```
{% content "oc2" %}
```
BAASRecord *record = [table createRecord];
```
{% endtabs %}

### 为上面创建的空记录赋值

有两种类型的赋值操作：

a.一次性赋值：

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
record.set(record: ["name": "bookname", "color": "red", "price": 19])
```
**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| record    | Dictionary     | 记录信息，key 为字段名称   |
{% content "oc3" %}
```
[record setWithRecord:@{@"name": @"bookname", @"color": @"red", @"price": @10}];
```
**参数说明**

| 名称       | 类型           | 说明        |
| :-------- | :------------  | :------    |
| record    | NSDictionary   | 记录信息，key 为字段名称   |
{% endtabs %}

b.逐个赋值：

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
record .set(key: "color", value: "red")
record.set(key: "price", value: 10)
```
{% content "oc4" %}
```
[record setWithKey:@"color" value:@"red"];
[record setWithKey:@"price" value:@10];
```
{% endtabs %}

> **info**
> 对同一字段进行多次 `set` 操作，后面的数据会覆盖掉前面的数据

4.将创建的记录保存到服务器

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
record.save { (success, error) in

}
```
{% content "oc5" %}
```
[record save:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  | Bool           | 是否新增数据成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

success 写入数据成功后，记录对象 record 的数据将被更新。

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

通过上面的四个步骤，即完成了一条记录的插入，具体操作阅读以下内容。

## 添加普通数据

假设有一个 `Book` 表，包括 `name`、`author`、`price` 等字段，表示书名、作者、价格。

**请求示例**

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
// 创建 `Table` 对象
let bookTable = Table(tableName: "Book")

// 创建一条空的记录
let book = bookTable.createRecord()

// 设置方式一
book.set(record: ["name": "老人与海", "author": "海明威", "price": 49])

// 设置方式二
book.set(key: "name", value: "老人与海");
book.set(key: "author", value: "海明威")
book.set(key: "price", value: 49)

book.save { (success, error) in

}
```
{% content "oc6" %}
```
// 创建 `Table` 对象
BAASTable *bookTable = [[BAASTable alloc] initWithTableName:@"Book"];

// 创建一条空记录
BAASTableRecord *book = [bookTable createRecord];

// 设置方式一
[book setWithRecord:@{@"name": @"老人与海", @"author": @"海明威" @"price": 49}];

// 设置方式二
[book setWithKey:@"name" value:@"老人与海"];
[book setWithKey:@"author" value:@"海明威"];
[book setWithKey:@"price" value:49];

[book save:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

## 添加日期时间 Date 类型的数据

数据表允许添加时间日期类型的列，为该类型的记录赋值，需要使用 ISO Date 格式的字符串，如 Book 表定义一个时间日期类型的列 publish_date，创建一条记录时，该字段的赋值操作如下：

{% tabs swift7="Swift", oc7="Objective-C" %}
{% content "swift7" %}
```
let dateISO = ISO8601DateFormatter().string(from: Date())
book.set(key: "publish_date", value: dateISO)
```
{% content "oc7" %}
```
NSISO8601DateFormatter *dateFormatter = [[NSISO8601DateFormatter alloc] init];
NSString *dateISO = [dateFormatter stringFromDate:[NSDate date]];
[book setWithKey:@"publish_date" value:dateISO];
```
{% endtabs %}

## 添加 file 类型数据

如 Book 表定义 file 类型的列 cover，表示书的封面：

{% tabs swift8="Swift", oc8="Objective-C" %}
{% content "swift8" %}
```
let filePath = Bundle.main.path(forResource: "cover", ofType: "png")!
fileManager.upload(filename: "cover", localPath: filePath, categoryName: "Book", progressBlock: { progress in
                
    }) { (file, error) in
    book.set(key: "cover", value: file?.fileInfo)
}
```
{% content "oc8" %}
```
NSString *filePath = [[NSBundle mainBundle] pathForResource:@"cover" ofType:@"png"];
[fileManager uploadWithFilename:@"cover" localPath:filePath categoryName:@"Book" progressBlock:^(NSProgress * _Nullable progress) {

    } completion:^(BAASFile * _Nullable file, NSError * _Nullable error) {
        [book setWithKey:@"cover" value:file.fileInfo];
}];
```
{% endtabs %}

## 添加 geojson 类型数据

表中有名称为 location，polygon 的两列，类型都为 geojson。

{% tabs swift8_1="Swift", oc8_1="Objective-C" %}
{% content "swift8_1" %}
```
// Point 类型
let point = GeoPoint(latitude: 2, longitude: 10)
record.set(key: "location", value: point.geoJson)

// GeoPolygon
let polygon = GeoPolygon(coordinates: [[30, 10], [40, 40], [20, 40], [10, 20], [30, 10]])
record.set(key: "polygon", value: polygon.geoJson)
```
{% content "oc8_1" %}
```
// Point类型
BAASGeoPoint *point = [[BAASGeoPoint alloc] initWithLatitude:10 longitude:2];
[record setWithKey:@"location" value:point.geoJson];

// GeoPolygon
BAASGeoPolygon *polygon = [[BAASGeoPolygon alloc] initWithCoordinates:@[@[30, 10], @[40, 40], @[20, 40], @[10, 20], @[30, 10]]];
[record setWithKey:@"polygon" value:polygon.geoJson];
```
{% endtabs %}

关于 geojson 类型查看 [地理位置操作](./geo.md) 章节

## 添加 object 类型数据

对象内的属性名只能包含字母、数字和下划线，必须以字母开头，比如 `{$ifanr.x: 123}` 和 `{知晓云: "test"}` 是错误的

## 添加 array 类型数据

添加 array 类型数据的方法与添加其他类型数据的方法基本一致。区别在于，array 类型数据是将一个的数组赋值给某个字段。

array 类型数据中的元素类型，要与预先在知晓云平台设定的字段类型一致。否则创建的数据将不包含该 array 类型的字段。

## 添加 pointer 类型数据 

> **info**
> 每张表最多能建立 3 个 pointer 类型的字段。如有更多需求，请提交工单说明  
> pointer 指向的数据表，不能改名或删除

假设现在有一张 Book 表, Book 表部分字段如下:

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| comment        |  pointer         | 指向了 `Comment` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |

现在在 Book 表中新增一条数据，其中: 

comment 字段指向了 Comment 表中 id 为 5bad87ab0769797b4fb27a1b 的数据行

user 字段指向了 _userprofile 表中 id 为 69147880 的数据行

{% tabs swift9="Swift", oc9="Objective-C" %}
{% content "swift9" %}
```
book.set(key: "comment", value: "5bad87ab0769797b4fb27a1b")
book.set(key: "user", value: "69147880")
}
```
{% content "oc9" %}
```
[book setWithKey:@"comment" value:@"5bad87ab0769797b4fb27a1b"];
[book setWithKey:@"user" value:@"69147880"];
```
{% endtabs %}

## 批量新增数据项

{% tabs swift10="Swift", oc10="Objective-C" %}
{% content "swift10" %}
```
table.create(records: [["name": "老人与海", "author": "海明威", "price": 10], ["name": "麦田", "author": "塞林格", "price": 10]]) { (success, error) in

}
```
{% content "oc10" %}
```
[table createWithRecords:@[@{@"name": @"老人与海", @"author": @"海明威", @"price": @10}, @{@"name": @"麦田", @"author": @"塞林格" @"price": @11}] enableTrigger:true completion:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名    | 类型    | 说明              |
|-----------|---------|-------------------|
| records   | Dictionary(Swift) / NSDictionary(OC)  |   符合表结构的对象|
| enableTrigger | Bool    |   是否触发触发器  |

> Swift 默认会触发触发器。

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  | Bool           | 是否新增数据成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)