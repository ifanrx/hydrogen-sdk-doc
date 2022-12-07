# 字段过滤与扩展

## 字段过滤

1. 使用 `Query.select(...)` 来控制请求返回的字段

  例如：

  `Query.select("created_by")`

  `Query.select("pointer", "created_by")`

2. 通过 `select("pointer.attr")` 指定 pointer 展开后只返回 pointer 中的某些字段

  > **info**
  > `pointer` 字段已经设置了 `expand`，该操作才生效，否则会被忽略。
  >
  > `expand` 的使用请参照下文「字段扩展」章节

  例如：

  `Query.expand("created_by", "pointer").select("created_by.nickname", "pointer.count")`

> **info**
> `select("field")` `select("field_a", "field_b")` 为“规定返回”，
>
> `select("-field")` `select("-field_a", "-field_b")` 为“规定不返回”，
>
> “规定返回”和“规定不返回”不能同时使用，否则该操作不生效，接口将会直接返回所有字段。

**在 `Table.fetchRecord` 方法中使用**

```java
Table table = new Table("product");
String id = "990ads2849nafakl3ur";
try {
    Query query = new Query();

    // 规定返回特定字段
    query.select("created_at", "created_by");

    // 规定不返回特定字段
    query.select("-created_at", "-created_by");
    Record record = table.fetchRecord(id, query);

    // 或者使用便利方法
    Record record = table.fetchRecord(id, null, Arrays.asList("created_at", "created_by"));

    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

**在 `Table.query` 方法中使用**

```java
Table table = new Table("product");
try {
    Query query = new Query().offset(0).limit(15);

    // 规定返回特定字段
    query.select(Record.CREATED_AT, Record.CREATED_BY);

    // 规定不返回特定字段
    query.select("-created_at", "-created_by");
    PagedList<Record> records = table.query(query);

    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```


## 字段扩展

开发者可以通过 expand pointer 来查询该字段的更多信息,返回结果中的 pointer 字段会被替换为这个字段对应的完整的数据行对象。

> **info**
> created_by 字段是一个特殊的 pointer，开发者无需配置，默认指向了 _userpofile 表
> 使用 expand 方法会增加一次数据表查询，api call 计费 +1

### expand 返回结果示例

注：`pointer_value` 为指向其他表的 pointer 类型字段

不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 1234,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer_value": "5a2fa9xxxxxxxxxxxxxx"
}
```

使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": {
    "avatar": "https://media.ifanrusercontent.com/tavatar/fb/cd/xxxx.jpg",
    "id": 62536607,
    "nickname": "Larry。"
  },
  "pointer_value": {
    "created_at": 1516118400,
    "name": "123",
    "id": "5a2fa9xxxxxxxxxxxxxx"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199
}
```

### 使用方法

**在 fetchRecord 方法中使用**

```java
Table table = new Table("product");
String id = "990ads2849nafakl3ur";
try {
    Query query = new Query();
    // 设置需要展开的字段
    query.expand("created_by", "pointer_value");
    Record record = table.fetchRecord(id, query);

    // 或者使用便利方法
    Record record = table.fetchRecord(id, Arrays.asList("created_by", "pointer_value"), null);

    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

**在 query 方法中使用**

```java
Table table = new Table("product");
try {
    Query query = new Query().offset(0).limit(15);

    // 设置需要展开的字段
    query.expand("created_by", "pointer_value");
    PagedList<Record> records = table.query(query);

    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```
