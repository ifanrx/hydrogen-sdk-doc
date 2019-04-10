# 查询 (Where)

## 数据类型对应查询操作符表

| 数据类型 |                            可使用的查询操作                            | 说明 |
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
> 
> 1. 使用查询时，字段必须满足相应的类型。（请先查阅上表）
> 2. file、geojson、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组

## 操作步骤

1.通过 `tableName` 或 `tableId` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

**示例代码**
{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
// 通过 tableId 创建数据表实例 
let table = Table(Id: 1236)

// 通过 tablename 创建数据表实例
let table = Table(name: "Book")
```
{% content "oc1" %}
```
// 通过 tableId 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithId:1236**];

// 通过 tablename 创建数据表实例
BaaSTable *table = [[BaaSTable alloc] initWithName:@"Book"];
```
{% endtabs %}

**参数说明**

tableName 和 tableID 二选一

| 名称     | 类型   | 说明  |
| :-----  | :----- | :--- |
| tableId   | Int  | 数据表的 ID |
| tableName | String |  数据表名 |

2. 创建 `Where` 对象，在该对象上添加查询条件

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let whereargs = Where.contains(key: "color", value: "red")
```
{% content "oc2" %}
```
BaaSWhere *where = [BaaSWhere containsWithKey:@"color" value:@"red"];
```
{% endtabs %}

查看下面的文档，了解目前支持的查询条件

3.支持查询条件并执行查找操作

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
let query = Query()
query.setWhere(whereargs)
table.find(query: query) { (listResult, error) in
                    
}
```
{% content "oc3" %}
```
BaaSQuery *query = [[BaaSQuery alloc] init];
[query setWhere:where];
[table findWithQuery:query completion:^(BaaSRecordListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | RecordListResult | 结果列表，详见 [数据类型](./data-type.md) 章节|
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

> **info**
> 注意：知晓云的 api URL 长度限定为 16386，超出则返回 502，请在构造查询条件时注意长度控制，如 in 操作符后边的数组长度、match 操作符后边的字符串长度等。

## 示例

**示例代码**

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
// 设置查询条件
let whereargs = Where.contains(key: "color", value: "red")

// 应用查询条件
let query = Query()
query.setWhere(whereargs)
table.find(query: query) { (listResult, error) in
                    
}
```
{% content "oc4" %}
```
// 设置查询条件
BaaSWhere *where = [BaaSWhere icontainsWithKey:@"color" value:@"red"];

BaaSQuery *query = [[BaaSQuery alloc] init];
[query setWhere:where];
[table findWithQuery:query completion:^(BaaSRecordListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

## 比较查询

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
// 价钱小于等于 10
let whereargs = Where.compare(key: "price", operator: .greaterThanOrEqualTo, value: 10)
```

operator 说明：
| 类型            | 说明      |
|----------------|-----------------|
| equalTo            | =      |
| notEqualTo         | !=      |
| greaterThan        | >    |
| greaterThanOrEqualTo | >=      |
| lessThan | <      |
| lessThanOrEqualTo  |  <=      |

{% content "oc5" %}
```
// 价钱小于等于 10
BaaSWhere *where = [BaaSWhere compareWithKey:@"price" operator: BaaSOperatorGreaterThanOrEqualTo value:@10];
```
operator 说明：

| 类型            | 说明      |
|----------------|-----------------|
| BaaSOperatorEqualTo            | =      |
| BaaSOperatorNotEqualTo         | !=      |
| BaaSOperatorGreaterThan        | >    |
| BaaSOperatorGreaterThanOrEqualTo | >=      |
| BaaSOperatorLessThan               | <      |
| BaaSOperatorLessThanOrEqualTo  |  <=      |
{% endtabs %}

## 字符串查询
查询返回满足包含相应字符串的记录，如下示例：

{% tabs swift7="Swift", oc7="Objective-C" %}
{% content "swift7" %}
```
// name 列包含 apple
let whereargs = Where.contains(key: "name", value: "apple")

// name 列不包含 app
let whereargs = Where.contains(key: "name", value: "app")
```
{% content "oc7" %}
```
// name 列包含 apple
BaaSWhere *where = [BaaSWhere containsWithKey:@"name" value:@"apple"];

// name 列不包含 app
BaaSWhere *where = [BaaSWhere containsWithKey:@"color" value:@"app"];
```
{% endtabs %}

## 正则匹配

构造正则表达式语法

```
regex = "/pattern/flags"
```

* pattern: 匹配模式
* flags: 修饰符，如下表介绍

| flag   | 介绍               | 
| :---- | :------------------|
| g   | global match; find all matches rather than stopping after the first match              |
| i | ignore case; if u flag is also enabled, use Unicode case folding  |
| m   | multiline; treat beginning and end characters (^ and $) as working over multiple lines (i.e., match the beginning or end of each line (delimited by \n or \r), not only the very beginning or end of the whole input string)|
| s | "dotAll"; allows . to match newlines|
| u   | Unicode; treat pattern as a sequence of Unicode code points|
| z | sticky; matches only from the index indicated by the lastIndex property of this regular expression in the target string (and does not attempt to match from any later indexes).|

> 正则表达式，使用的是 `JavaScript` 的语法规则，请参考 [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)。

**代码示例**

{% tabs swift8_1="Swift", oc8_1="Objective-C" %}
{% content "swift8_1" %}
```
/* 以查找名字为例，name 字段必须为 String 类型 */

// 查找 以 foo 开头的名字，并且对大小写不敏感
let regExp = "/^foo/i"

let whereargs = Where.matches(key: "name", regx: regExp)

/* 以查找手机号码为例，phoneNumber 字段必须为 string 类型 */

// 查找 以 188 开头的手机号码
let regx = "/^188/"

// 查找 以 708 结尾的手机号码
let regx = "/708$/"

// 查找 以 188 开头的手机号码，以 708 结尾的手机号码
let regx = "/^188\d+708$/"

let whereargs = Where.matches(key: 'phoneNumber', regx: regx)
```
{% content "oc8_1" %}
```
/* 以查找名字为例，name 字段必须为 NSString 类型 */

// 查找 以 foo 开头的名字，并且对大小写不敏感
NSString *regx = @"/^foo/i";

BaaSWhere *where = [BaaSWhere matchesWithKey:@"name" regx: regx];

/* 以查找手机号码为例，phoneNumber 字段必须为 NSString 类型 */

// 查找 以 188 开头的手机号码
NSString *regx = @"/^188/";

// 查找 以 708 结尾的手机号码
NSString *regx = @"/708$/";

// 查找 以 188 开头的手机号码，以 708 结尾的手机号码
NSString *regx = @"/^188\d+708$/";

BaaSWhere *where = [BaaSWhere matchesWithKey:@"phoneNumber" regx: regx];
```
{% endtabs %}

## 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个

{% tabs swift8="Swift", oc8="Objective-C" %}
{% content "swift8" %}
```
let whereargs = Where.inList(key: "fieldname", list: array)
```
{% content "oc8" %}
```
BaaSWhere *where = [BaaSWhere inListWithKey: @"fieldname" list: array];
```
{% endtabs %}

field 的类型不限制，field 的 value 不含有 array 中的任何一个
{% tabs swift9="Swift", oc9="Objective-C" %}
{% content "swift9" %}
```
let whereargs = Where.notInList(key: "fieldname", list: array)
```
{% content "oc9" %}
```
BaaSWhere *where = [BaaSWhere notInListWithKey: @"fieldname" list: array];
```
{% endtabs %}

field 的类型必须为数组, field 的 value 包含 array 中的每一个  
{% tabs swift10="Swift", oc10="Objective-C" %}
{% content "swift10" %}
```
let whereargs = Where.arrayContains(key: "fieldname", list: array)
```
{% content "oc10" %}
```
BaaSWhere *where = [BaaSWhere arrayContainsWithKey: @"fieldname" list: array];
```
{% endtabs %}

如果希望查找数组中只包含指定数组中所有的值的记录，可以使用比较查询
{% tabs swift11="Swift", oc11="Objective-C" %}
{% content "swift11" %}
```
let whereargs = Where.compare(key: "fieldname", operator: .equalTo, value: array)
```
{% content "oc11" %}
```
BaaSWhere *where = [BaaSWhere compareWithKey:@"keyname" operator:BaaSOperatorEqualTo value: array]
```
{% endtabs %}

## null 或非 null 查询

查询字段值为 null 或非 null 记录

{% tabs swift12="Swift", oc12="Objective-C" %}
{% content "swift12" %}
```
let whereargs = Where.isNull(key: "name")
let whereargs = Where.isNotNull(key: "name")
```
{% content "oc12" %}
```
BaaSWhere *where = [BaaSWhere isNullWithKey:@"name"];
BaaSWhere *where = [BaaSWhere isNotNullWithKey:@"name"];
```
{% endtabs %}

## 空或非空查询

查询字段值为空或非空记录

{% tabs swift13="Swift", oc13="Objective-C" %}
{% content "swift13" %}
```
let whereargs = Where.exists(key: "name")
let whereargs = Where.notExists(key: "name")
```
{% content "oc13" %}
```
BaaSWhere *where = [BaaSWhere existsWith:@"name"];
BaaSWhere *where = [BaaSWhere notExistsWithKey:@"name"];
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
let whereargs = Where.hasKey("publisherInfo", fieldName: "location")
```
{% content "oc14" %}
```
BaaSWhere *where = [BaaSWhere hasKey:@"publisherInfo" fieldName:@"location"];
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
let whereargs = Where.hasKey("publisherInfo", fieldName: "abc.location")
```
{% content "oc15" %}
```
BaaSWhere *where = [BaaSWhere hasKey:@"publisherInfo" fieldName:@"abc.location"];
```
{% endtabs %}

<!--
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
let Order = Table(name: "Book")
let query1 = Query.compare(key: "customer", operator: "=", value: "5bad87ab0769797b4fb27a1b")
let query2 = Query.compare(key: "user", operator: "=", value: 69147880)
let whereargs = Where.and(querys:[query1, query2])
Order.setQuery(query)
```
{% content "oc16" %}
```
// 通过 tableId 创建数据表实例
BaaSTable *Order = [[BaaSTable alloc] initWithId:1236**];
BaaSQuery *query1 = [BaaSQuery compareWithKey:@"customer" operator:@"=" value:@"5bad87ab0769797b4fb27a1b"];
BaaSQuery *query2 = [BaaSQuery compareWithKey:@"user" operator:@"=" value:@69147880];
BaaSWhere *where = [BaaSWhere andWithQuerys:@[query1, query2]];
[Order setQuery: query];
```
{% endtabs %}

-->

## 组合查询

当有多个查询时，可以使用 `and` 和 `or` 来组合查询查询条件。

{% tabs swift17="Swift", oc17="Objective-C" %}
{% content "swift17" %}
```
let args1 = Where.compare(key: "price", operator:.lessThan , value: 10)
let args2 = Where.isNull(key: "name")

// and 查询
let whereargs = Where.and(wheres: [args1, args2])

// or 查询
let whereargs.or(wheres: [args1, args2])

```
{% content "oc17" %}
```
BaaSWhere *args1 = [BaaSWhere isNullWithKey:@"name"];
BaaSWhere *args2 = [BaaSWhere compareWithKey:@"price" operator:BaaSOperatorLessThan value:@10];

// and 查询
BaaSWhere *where = [BaaSWhere andWithWheres:@[args1, args2]];

// or 查询
BaaSWhere *where = [BaaSWhere orWithWheres:@[args1, args2]];
```
{% endtabs %}