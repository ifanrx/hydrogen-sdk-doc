# 分页和排序

## 分页

使用 limit 和 offset 来控制分页数据：

- `limit`  指定该请求返回的结果个数
- `offset`  偏移量，指定该请求返回的结果的起始位置

默认 limit 为 20, offset 为 0，我们也可以手动指定 limit 和 offset 来控制。例如，每页展示 100 条数据，需要获取第五页的数据，将 limit 设置为 100、offset 设置为 400 即可。limit 最大可设置为 1000。

```dart
TableObject tableObject = new TableObject(tableName);
Query query = new Query();
query.limit(10);
query.offset(0);
Where where = Where.compare('key', '=', 'value');
query.where(where);

try {
  TableRecordList data = await tableObject.find(query: query);
} catch (e) {
  print(e.toString());
}
```

## 排序

使用 orderBy 来控制使用升序或降序获取数据列表。

```dart
TableObject tableObject = new TableObject(tableName);

Query query = new Query();
Where where = Where.compare('key', '=', 'value');
query.where(where);

// 升序
query.orderBy('created_at');
// or
query.orderBy(['created_at']);

// 降序
query.orderBy('-created_at');
// or
query.orderBy(['-created_at']);

// 多重排序
query.orderBy(['-created_at', 'created_by']);
// 👆先按照 created_at 降序，再按照 created_by 升序排列

try {
  TableRecordList data = await tableObject.find(query: query);
} catch (e) {
  print(e.toString());
}
```