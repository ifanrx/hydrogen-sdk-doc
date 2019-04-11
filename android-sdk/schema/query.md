# 查询

## 数据类型对应查询操作符表

| 数据类型 |                            可使用的查询操作                                             | 说明 |
|:---------|:--------------------------------------------------------------------------------------- |:-----|
| String    | =, in, notIn, !=, isNull, isNotNull, contains, matches, exists, notExists               |      |
| Number    | =, >, >=, <, <=, !=, in, notIn, isNull, isNotNull, exists, notExists                    |      |
| array     | =, in, notIn, isNull, isNotNull, arrayContains, exists, notExists                       | file、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组 |
| Boolean   | =, exists, notExists, isNull, isNotNull                                                 |      |
| Calendar  | =, >, >=, <, <=,  exists, notExists, isNull, isNotNull                                  |      |
| CloudFile | isNull, isNotNull, exists, notExists                                                    |      |
| Object    | =, hasKey, isNull, isNotNull, exists, notExists                                         |      |
| pointer   | =, in, notIn, !=, isNull, isNotNull, exists, notExists                                  |      |

> **info**
> file、object、date 类型的 array 不支持查询操作。如果进行查询，会返回空数组

## 操作步骤

1.通过 `tableName` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表

`Table table = new Table("tableName");`

2.示例化一个 `Query` 对象，在该对象上添加查询条件

`Query query = new Query();`

查看下面的文档，了解目前支持的查询条件

3.支持查询条件并执行查找操作

`PagedList<Record> records = table.query(query);`

> **info**
> 注意：知晓云的 api URL 长度限定为 16386，超出则返回 502，请在构造查询条件时注意长度控制，如 in 操作符后边的数组长度、match 操作符后边的字符串长度等。

## 示例

**请求示例**

```java
try {
    Table table = new Table("tableName");

    Query query = new Query();
    // 设置分页、排序等
    // query.put(Query.ORDER_BY, "create_at")

    Where where = new Where();
    // 设置查询条件（比较、字符串包含、组合等）
    // where.equalTo("key", "value")
    query.put(where);

    PagedList<Record> records = table.query(query);
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

异常请参考[异常](../error-code.md)


常见的 HttpException.code ：

| code | 可能的原因        |
|----------------|------------------|
| 400            | 1. 指定/过滤输出字段的字段名有误、2. GEO 查询参数有误、3. 查询语法错误 |
| 404            | 数据表不存在  |


## 比较查询

operator 包含 =, !=, <, <=, >, >=

```java
where.equalTo("key", "value");
where.lessThan("key", "value");
where.lessThanOrEqualTo("key", "value");
where.greaterThan("key", "value");
where.greaterThanOrEqualTo("key", "value");
where.notEqualTo("key", "value");
```


## 多个查询条件

当存在多个查询条件时，它们之间默认为 AND 关系，查询返回满足所有条件的记录，如下示例：

```java
// 查询满足 key >= 10 & key != 5 的记录
where.greaterThanOrEqualTo("key", 10);
where.notEqualTo("key", 5);
```
多个查询条件之间需要更复杂的组合关系，可以查看以下 `复杂组合查询` 小节。


## 字符串查询
查询返回满足包含相应字符串的记录，如下示例：
```java
// 例：{"name": "apple"}
where.contains("name", "apple")  // 查询name字段包含'apple'的记录，能正确匹配
where.contains("name", "app")  // 查询name字段包含'app'的记录，能正确匹配
where.contains("name", "apple123")  // 查询name字段包含'apple123'的记录，不能正确匹配
```


## 数组查询

field 的类型不限制，field 的 value 含有 array 中的一个或多个
```java
where.containedIn(fieldName, array)
```

field 的类型不限制，field 的 value 不含有 array 中的任何一个
```java
where.notContainedIn(fieldName, array)
```

field 的类型必须为数组, field 的 value 包含 array 中的每一个  ( <span style='color:red'>* sdk version >= v1.1.1</span> )
```java
where.contains(fieldName, array)
```

如果希望查找数组中只包含指定数组中所有的值的记录，可以使用比较查询
```java
where.equalTo(fieldName, array)
```

**请求示例**
```java
/* color 是类型为字符串的字段，desc 是类型为数组的字段 */
List<String> array = Arrays.asList('green', 'red', 'yellow');

// 查询 color 是 green 或 red 或 yellow 的记录
where.containedIn('color', array);

// 查询 desc 中包含 green 或 red 或 yellow 的记录
where.containedIn('desc', array);

// 查询 color 不是 green、red 和 yellow 的记录
where.notContainedIn('color', array);

// 查询 desc 中不包含 green、red 和 yellow 的记录
where.notContainedIn('desc', array);

// 查询 desc 中包含 green、red 和 yellow 的记录
where.contains('desc', array);

// 查询 desc 中只包含 green、red 和 yellow 的记录
where.equalTo('desc', array);
```

## null 和 exists 查询

```java
where.isNull('name');   // 查询字段值为 null 或非 null 记录
where.exists("name");   // 查询字段是否存在
```

## 组合查询

```java
Where where1 = new Where();
where1.isNull("name");
Where where2 = new Where();
where2.greaterThan("price", 10);

// and
Where where = Where.and(where1, where2);

// or
Where where = Where.or(where1, where2);
```
