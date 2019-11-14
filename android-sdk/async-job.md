# 获取异步任务结果

由于批量操作数据表时，后端有可能以异步任务的形式执行，
该接口用来获取执行结果。

`BaaS.queryBatchOperation(id)/BaaS.queryBatchOperationInBackground(id, callback)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| id | number | 提交批量操作任务后返回的 ID |
| callback | BaseCallback | 异步操作的回调 |


```java
BaaS.queryBatchOperationInBackground(1, new BaseCallback<BatchOperationResp>() {
  @Override
  public void onSuccess(BatchOperationResp batchOperationResp) {
    // 操作成功，拿到结果
  }

  @Override
  public void onFailure(Throwable e) {
    // 异常
  }
});
```

**返回值说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| id | number | 提交批量操作任务后返回的 ID |

**BatchOperationResp 结构**

| 属性   | 类型   | 说明     |
|----------|--------|----------|
| id | number | ID |
| schemaId | number | 数据表名称 |
| schemaName | string | 数据表名称 |
| operation | string | `update`（更新）/ `delete`（删除） |
| status | string | `pending`（等待执行）/ `success`（已完成） |
| createdAt | number | 创建时间 |
| updatedAt | number | 更新时间 |
| deletedCount | number | 删除记录行数量（operation=delete 时返回） |
| matchedCount | number | 符合更新查询条件数量（operation=update 时返回） |
| modifiedCount | number | 已更新记录行数量（operation=update 时返回） |

成功时对应的 json 结构如下

```json
{
    "id": 1,
    "schema_id": 1,
    "schema_name": "test",
    "operation": "update",
    "status": "success",
    "created_at": 1571047763,
    "updated_at": 1571047763,
    "matched_count": 1,
    "modified_count": 1
}
```

onFailure 中的常见异常请参考[异常](/android-sdk/error-code.md)