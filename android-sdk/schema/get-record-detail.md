# 获取数据项详情

## 操作步骤

1.通过 `tableName` 实例化一个 `Table` 对象，操作该对象即相当于操作对应的数据表

`Table product = new Table("product");`

2.指定 `recordID` 执行获取相应数据项操作

`product.fetchRecord(recordID)` or `product.fetchRecord(recordID, expands, keys)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordID | String              | 是  | 记录 ID |
| expand   | Collection<String>  | 否  | 设置展开对象，里面是需展开的字段列表 |
| keys     | Collection<String>  | 否  | 过滤/不过滤字段，里面是需过滤/不过滤的字段列表 |


## 示例

**请求示例**

```java
Table product = new Table("product");

// 同步版本
try {
    Record record = product.fetchRecord("59897882ff650c0477f00485");
    // 操作成功
} catch (Exception e) {
    // 操作失败
}

// 异步版本
product.fetchRecordInBackground("59897882ff650c0477f00485", new Callback<Record>() {
    @Override
    public void onSuccess(@Nullable Record record) {
        // 拿到数据
    }
    @Override
    public void onFailure(Exception e) {
        // 获取数据失败了
    }
});
```

异常请参考[异常](../error-code.md)

常见错误 HttpException.code ：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |

## 字段过滤与扩展

请参考[字段过滤与扩展](./select-and-expand.md)章节
