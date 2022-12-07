# 字段过滤与扩展

## 字段过滤

1. ** 使用 select 来控制请求返回的字段 **

  例如：

  `query.select('created_by')`

  `query.select(['pointer', 'created_by'])`

2. ** 通过 `select('pointer.attr')` 指定 pointer 展开后只返回 pointer 中的某些字段 **

  > **info**
  > `pointer` 字段已经设置了 `expand`，该操作才生效，否则会被忽略。
  >
  > `expand` 的使用请参照下文「字段扩展」章节

  例如：

  ```dart
  query.limit(1);
  query.select(['created_by.nickname', 'pointer.count']);
  query.expand(['created_by', 'pointer']);
  ```

> **info**
> `select('field')` `select(['field_a', 'field_b'])` 为“规定返回”，
>
> `select('-field')` `select(['-field_a', '-field_b'])` 为“规定不返回”，
>
> “规定返回”和“规定不返回”不能同时使用，否则该操作不生效，接口将会直接返回所有字段。


**在 get 方法中使用**

```dart
TableObject product = new TableObject(tableName);
String recordId = 'xxxxxxxx' // 数据行 id

// 规定返回特定字段
product.get(recordId, select: 'created_at');
// or
product.get(recordId, select: ['created_at', 'created_by']);

// 规定不返回特定字段
product.get(recordId, select: '-created_at');
// or
product.get(recordId, select: ['-created_at', '-created_by']);
```

**在 find 方法中使用**

```dart
TableObject product = new TableObject(tableName);

Query query = new Query();
query.where(Where.compare('amount', '>', 0));

// 规定返回特定字段
query.select('created_at');
product.find(query: query);
// or
query.select(['created_at', 'created_by']);
product.find(query: query);

// 规定不返回特定字段
query.select('-created_at');
product.find(query: query);
// or
query.select(['-created_at', '-created_by']);
product.find(query: query);
```


## 字段扩展

开发者可以通过 expand pointer 来查询该字段的更多信息,返回结果中的 pointer 字段会被替换为这个字段对应的完整的数据行对象。

  使用 expand 来控制 pointer 展开

  例如：

  `query.expand('created_by')`

  `query.expand(['pointer', 'created_by'])`

> **info**
> created_by 字段是一个特殊的 pointer，开发者无需配置，默认指向了 _userpofile 表
>
> 用户自定义 pointer
>
> 使用 expand 方法会增加一次数据表查询，api call 计费 +1

### expand 返回结果示例

`pointer_value` 为指向其他表的 pointer 类型字段

> **info**
> 未 expand 的情况下，created_by 的值是 int 类型，而其他 pointer 的值是 object

不使用 expand
```json
{
  "created_at": 1516118400,
  "created_by": 62536607,
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199,
  "pointer_value": {
    "id": "5a2fa9xxxxxxxxxxxxxx",
    "_table": "table-name"
  }
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
    "id": "5a2fa9xxxxxxxxxxxxxx",
    "_table": "table-name"
  },
  "id": "5a2fa9b008443e59e0e67829",
  "name": "小米无线耳机",
  "price": 199
}
```

### 使用方法
**在 get 方法中使用**
```dart
TableObject product = new TableObject(tableName);
product.get('5acc2904da6b737322a82f78', expand: ['created_by', 'pointer_value']);
```

**在 find 方法中使用**
```dart
TableObject product = new TableObject(tableName);

Query query = new Query();
query.where(Where.compare('amount', '>', 0));

// 扩展特定字段
query.expand(['-created_at', '-created_by']);
product.find(query: query);
```
