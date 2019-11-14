# 删除数据项

## 操作步骤

1.通过 `tableName` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表

`Table product = new Table("product");`

2.获取指定 recordID 的 `Record`

`Record record = product.fetchWithoutData(recordID)`

2.执行删除操作

`record.delete()`

## 示例

**请求示例**

```java
// 删除 tableName 为 'product' 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
Table product = new Table("product");
Record record = product.fetchWithoutData("59897882ff650c0477f00485");

// 同步版本
try {
    record.delete();
    // 操作成功
} catch (Exception e) {
    // 操作失败
}

// 异步版本
record.deleteInBackground(new Callback<Record>() {
    @Override
    public void onSuccess(@Nullable Record record) {
        // 删除成功
    }
    @Override
    public void onFailure(Exception e) {
        // 删除失败
    }
});
```

异常请参考[异常](../error-code.md)

常见 HttpException.code ：

| code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |
| 403            | 没有权限删除数据   |

## 批量删除数据项

其中：
 - `Query` 对象的使用请查看 [查询数据项](./query.md) 章节

 - `limit` 和 `offset` 的使用请查看 [分页和排序](./limit-and-order.md) 章节

**请求示例**

```java
Table product = new Table("product");

Query query = new Query().offset(0).limit(10);
Where where = new Where();
// 设置查询条件（比较、字符串包含、组合等）
// ...
query.put(where);

// 同步版本
try {
    BatchResult result = product.batchDelete(query);
    // 操作成功
} catch (Exception e) {
    // 操作失败
}

// 异步回调版本
product.batchDeleteInBackground(null, new Callback<BatchResult>() {
    @Override
    public void onSuccess(@Nullable BatchResult batchResult) {
        // 批量删除成功，这里拿到操作结果
    }
    
    @Override
    public void onFailure(Exception e) {
        // 批量删除失败了
    }
});
```

**返回示例**

BatchResult 结构如下：

```json
{
  "succeed": 8, // 成功删除记录数
  "total_count": 10, // where 匹配的记录数，包括无权限操作记录
  "offset": 0,
  "limit": 10,
  "next": null // 下一次删除 url，若为 null 则表示全部删除完毕
}
```

异常请参考[异常](../error-code.md)

常见错误 HttpException.code ：

| code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |
| 403            | 没有权限删除数据   |


### 批量删除时不触发触发器

```java
Table table = new Table("my_horses");

// 知晓云后台设置的触发器将不会被触发
Query query = new Query();
query.enableTrigger(false);


table.batchDeleteInBackground(query, new BaseCallback<BatchResult>() {
    @Override
    public void onSuccess(BatchResult batchResult) {
        // success
    }
    @Override
    public void onFailure(Throwable e) {
        // error
    }
});
```

