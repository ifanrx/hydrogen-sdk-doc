# 分页和排序

## 分页

使用 `Query.OFFSET` 和 `Query.LIMIT` 来控制分页数据：

- `Query.LIMIT`    指定该请求返回的结果个数
- `Query.OFFSET`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

```java
Table table = new Table("product");
try {
    Query query = new Query();
    query.put(Query.OFFSET, 0);
    query.put(Query.LIMIT, 15);

    PagedList<Record> records = table.query(query);
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

## 排序

使用 `Query.ORDER_BY` 来控制使用升序或降序获取数据列表。

```java
Table table = new Table("product");
try {
    Query query = new Query();
    // 升序
    query.orderBy("created_at");
    // 降序
    query.orderBy("-created_at");
    // 先按照 created_at 降序，再按照 created_by 升序排列
    query.orderBy("-created_at", "created_by");
    PagedList<Record> records = table.query(query);
    
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```