# 查询

## 数据类型对应查询操作符表

| 数据类型 |                            可使用的查询操作                                             | 说明 |
|:---------|:--------------------------------------------------------------------------------------- |:-----|
| string   | =, in, notIn, !=, isNull, isNotNull, contains, matches, exists, notExists               |      |
| integer  | =, >, >=, <, <=, !=, in, notIn, isNull, isNotNull, exists, notExists                    |      |
| number   | =, >, >=, <, <=, !=, in, notIn, isNull, isNotNull, exists, notExists                    |      |
| array    | =, in, notIn, isNull, isNotNull, arrayContains, exists, notExists                       | file、geojson、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组 |
| boolean  | =, exists, notExists, isNull, isNotNull                                                 |      |
| date     | =, >, >=, <, <=,  exists, notExists, isNull, isNotNull                                  |      |
| file     | isNull, isNotNull, exists, notExists                                                    |      |
| geojson  | include, within, withinCircle, exists, notExists, isNull, isNotNull                     | 请参考地理位置操作章节 |
| object   | =, hasKey, isNull, isNotNull, exists, notExists                                         |      |
| pointer  | =, in, notIn, !=, isNull, isNotNull, exists, notExists                                  |      |

> **info**
> file、geojson、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组

## 操作步骤

1.通过 `tableName` 或 `tableId` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 通过 tableId 创建数据表实例 
let table = Table(tableId: 1236)

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
| tableId   | Int  | 是   | 数据表的 ID             |
| tableName | String |  是 | 数据表名 |

2. 创建 `Query` 对象，在该对象上添加查询条件

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let query = Query.contains(key: "color", value: "red")
```
{% content "oc2" %}
```
BAASQuery *query = [BAASQuery containsWithKey:@"color" value:@"red"];
```
{% endtabs %}

查看下面的文档，了解目前支持的查询条件

3.支持查询条件并执行查找操作

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
table.setQuery(query)
table.find { (result, error) in

}
```
{% content "oc3" %}
```
[table setQuery:query];
[table find:^(NSArray<BAASTableRecord *> * _Nullable records, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| records  | Array<TableTable> (Swift) / NSArray<BAASTableRecord *> (OC)  | 是否新增数据成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

> **info**
> 注意：知晓云的 api URL 长度限定为 16386，超出则返回 502，请在构造查询条件时注意长度控制，如 in 操作符后边的数组长度、match 操作符后边的字符串长度等。

## 示例

**示例代码**

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
// 设置查询条件
let query = Query.contains(key: "color", value: "red")

// 应用查询条件
table.setQuery(query)
table.find { (result, error) in

}

// 不应用查询条件
table.find { (result, error) in

}
```
{% content "oc4" %}
```
// 设置查询条件
BAASQuery *query = [BAASQuery icontainsWithKey:@"color" value:@"red"];

// 应用查询条件
[table setQuery:query];
[table find:^(NSArray<BAASTableRecord *> * _Nullable records, NSError * _Nullable error) {

}];

// 不应用查询条件
[table find:^(NSArray<BAASTableRecord *> * _Nullable records, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

err 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

常见错误：

| 错误码          | 可能的原因        |
|----------------|------------------|
| 400            | 1. 指定/过滤输出字段的字段名有误、2. GEO 查询参数有误、3. 查询语法错误 |
| 404            | 数据表不存在  |

## 比较查询

共有六种比较操作，用枚举来表示每种比较：

{% tabs swift5_1="Swift", oc5_1="Objective-C" %}
{% content "swift5_1" %}
```
public enum Operator: Int {
    case equalTo = 0
    case notEqualTo = 1
    case greaterThan
    case greaterThanOrEqualTo
    case lessThan
    case lessThanOrEqualTo
}
```
{% content "oc5_1" %}
```
typedef (NSInteger, BAASOperator) {
  BAASOperatorEqualTo = 0,
  BAASOperatorNotEqualTo = 1,
  BAASOperatorGreaterThan = 2,
  BAASOperatorGreaterThanOrEqualTo = 3,
  BAASOperatorLessThan = 4,
  BAASOperatorLessThanOrEqualTo = 5,
};

```
{% endtabs %}

具体使用如下：

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
// 价钱小于等于 10
let query = Query.compare(key: "price", operator: .greaterThanOrEqualTo, value: 10)
```
{% content "oc5" %}
```
// 价钱小于等于 10
BAASQuery *query = [BAASQuery compareWithKey:@"price" operator:BAASOperatorGreaterThanOrEqualTo value:@10];
```
{% endtabs %}

operator 包含 =, !=, <, <=, >, >=

## 多个查询条件

当存在多个查询条件时，它们之间默认为 AND 关系，查询返回满足所有条件的记录，如下示例：

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
let query = Query.compare(key: "price", operator: .lessThan, value: 10)
let query = Query.compare(key: "price", operator: .greaterThanOrEqualTo, value: 1)
```
{% content "oc6" %}
```
BAASQuery *query = [BAASQuery compareWithKey:@"price" operator:BAASOperatorLessThan value:@10];
BAASQuery *query = [BAASQuery compareWithKey:@"price" operator:BAASOperatorGreaterThanOrEqualTo value:@1];
```
{% endtabs %}

多个查询条件之间需要更复杂的组合关系，可以查看以下 `复杂组合查询` 小节。


## 字符串查询
查询返回满足包含相应字符串的记录，如下示例：

{% tabs swift7="Swift", oc7="Objective-C" %}
{% content "swift7" %}
```
// name 列包含 apple
let query = Query.contains(key: "name", value: "apple")

// name 列不包含 app
let query = Query.contains(key: "name", value: "app")
```
{% content "oc7" %}
```
// name 列包含 apple
BAASQuery *query = [BAASQuery containsWithKey:@"name" value:@"apple"];

// name 列不包含 app
BAASQuery *query = [BAASQuery containsWithKey:@"color" value:@"app"];
```
{% endtabs %}

## 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个

{% tabs swift8="Swift", oc8="Objective-C" %}
{% content "swift8" %}
```
let query = Query.inList(key: "fieldname", list: array)
```
{% content "oc8" %}
```
BAASQuery *query = [BAASQuery inListWithKey: @"fieldname" list: array];
```
{% endtabs %}

field 的类型不限制，field 的 value 不含有 array 中的任何一个
{% tabs swift9="Swift", oc9="Objective-C" %}
{% content "swift9" %}
```
let query = Query.notInList(key: "fieldname", list: array)
```
{% content "oc9" %}
```
BAASQuery *query = [BAASQuery notInListWithKey: @"fieldname" list: array];
```
{% endtabs %}

field 的类型必须为数组, field 的 value 包含 array 中的每一个  
{% tabs swift10="Swift", oc10="Objective-C" %}
{% content "swift10" %}
```
let query = Query.arrayContains(key: "fieldname", list: array)
```
{% content "oc10" %}
```
BAASQuery *query = [BAASQuery arrayContainsWithKey: @"fieldname" list: array];
```
{% endtabs %}

如果希望查找数组中只包含指定数组中所有的值的记录，可以使用比较查询
{% tabs swift11="Swift", oc11="Objective-C" %}
{% content "swift11" %}
```
let query = Query.compare(key: "fieldname", operator: .equalTo, value: array)
```
{% content "oc11" %}
```
BAASQuery *query = [BAASQuery compareWithKey:@"keyname" operator:BAASOperatorEqualTo value: array]
```
{% endtabs %}

## null 或非 null 查询

查询字段值为 null 或非 null 记录

{% tabs swift12="Swift", oc12="Objective-C" %}
{% content "swift12" %}
```
let query = Query.isNull(key: "name")
let query = Query.isNotNull(key: "name")
```
{% content "oc12" %}
```
BAASQuery *query = [BAASQuery isNullWithKey:@"name"];
BAASQuery *query = [BAASQuery isNotNullWithKey:@"name"];
```
{% endtabs %}

## 空或非空查询

查询字段值为空或非空记录

{% tabs swift13="Swift", oc13="Objective-C" %}
{% content "swift13" %}
```
let query = Query.exists(key: "name")
let query = Query.notExists(key: "name")
```
{% content "oc13" %}
```
BAASQuery *query = [BAASQuery existsWith:@"name"];
BAASQuery *query = [BAASQuery notExistsWithKey:@"name"];
```
{% endtabs %}

## hasKey 查询 （仅限 object 类型）

**参数说明**

| 参数   | 类型                | 必填 | 说明 |
| :---- | :------------------ | :-  | :-- |
| key   | String              | 是  | 在数据表中的类型必须是 Object |
| value | String              | 是  | 需要检测的属性名, 只能包含字母、数字和下划线，必须以字母开头 |

**示例代码**

假设数据表有如下数据行
```javascript
[
  {
    'id': '59a3c2b5afb7766a5ec6e84e',
    name: '战争与和平',
    publisherInfo: {
      name: 'abc出版社',
    },
  },
  {
    'id': '59a3c2b5afb7766a5ec6e84g',
    name: '西游记',
    publisherInfo: {
      name: 'efg出版社',
      location: '广东省广州市天河区五山路 100 号'
    },
  },
]
```

查询字段 publisherInfo 中存在 location 属性的数据行

{% tabs swift14="Swift", oc14="Objective-C" %}
{% content "swift14" %}
```
let query = Query.hasKey("publisherInfo", fieldName: "location")
```
{% content "oc14" %}
```
BAASQuery *query = [BAASQuery hasKey:@"publisherInfo" fieldName:@"location"];
```
{% endtabs %}

注意：目前暂不支持查询内嵌属性

假设数据行如下
```javascript
[
  {
      'id': '59a3c2b5afb7766a5ec6e84g',
      name: '西游记',
      publisherInfo: {
        abc: {
          name: 'efg出版社',
          location: '广东省广州市天河区五山路 100 号'
        }
      },
  }
]
```

则下面的查询语句是非法的

{% tabs swift15="Swift", oc15="Objective-C" %}
{% content "swift15" %}
```
let query = Query.hasKey("publisherInfo", fieldName: "abc.location")
```
{% content "oc15" %}
```
BAASQuery *query = [BAASQuery hasKey:@"publisherInfo" fieldName:@"abc.location"];
```
{% endtabs %}

## pointer 查询 

> **info**
> 目前 pointer 仅支持针对 pointer 本身的查询，不支持嵌套查询（即查询 pointer 指向的数据行的字段）

**示例代码**

假设现在有两张表： order 表和 customer 表。

order 表部分字段结构如下：

| 字段名          | 字段类型          | 说明                 |
|----------------|------------------|----------------------|
| customer       |  pointer         | 指向了 `customer` 表     |
| user           |  pointer         | 指向了 `_userprofile` 表     |

现在需要查询 order 表中，同时满足以下条件的数据行：

- customer 字段指向 customer 表中 id 为 `5bad87ab0769797b4fb27a1b` 的数据行 
- user 字段指向了 _userprofile 表中 id 为 `69147880` 的数据行

{% tabs swift16="Swift", oc16="Objective-C" %}
{% content "swift16" %}
```
let Order = Table(tableName: "Book")
let query1 = Query.compare(key: "customer", operator: "=", value: "5bad87ab0769797b4fb27a1b")
let query2 = Query.compare(key: "user", operator: "=", value: 69147880)
let query = Query.and(querys:[query1, query2])
Order.setQuery(query)
```
{% content "oc16" %}
```
// 通过 tableId 创建数据表实例
BAASTable *Order = [[BAASTable alloc] initWithTableId:1236**];
BAASQuery *query1 = [BAASQuery compareWithKey:@"customer" operator:@"=" value:@"5bad87ab0769797b4fb27a1b"];
BAASQuery *query2 = [BAASQuery compareWithKey:@"user" operator:@"=" value:@69147880];
BAASQuery *query = [BAASQuery andWithQuerys:@[query1, query2]];
[Order setQuery: query];
```
{% endtabs %}

## 组合查询

{% tabs swift17="Swift", oc17="Objective-C" %}
{% content "swift17" %}
```
let query1 = Query.compare(key: "price", operator: "<", value: 10)
let query2 = Query.isNull(key: "name")

// and 查询
let query = Query.and(querys: [query1, query2])

// or 查询
let query = Query.or(querys: [query1, query2])

```
{% content "oc17" %}
```
BAASQuery *query1 = [BAASQuery isNullWithKey:@"name"];
BAASQuery *query2 = [BAASQuery compareWithKey:@"price" operator:@"<" value:@10];

// and 查询
BAASQuery *query = [BAASQuery andWithQuerys:@[query1, query2]];

// or 查询
BAASQuery *query = [BAASQuery orWithQuerys:@[query1, query2]];
```
{% endtabs %}