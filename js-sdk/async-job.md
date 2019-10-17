# 获取异步任务结果

由于批量操作数据表时，后端有可能以异步任务的形式执行，
该接口用来获取执行结果。

`BaaS.getAsyncJobResult(operationID)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| operationID | number | 提交批量操作任务后返回的 ID |

{% ifanrxCodeTabs %}
```javascript
wx.BaaS.getAsyncJobResult(1).then(res => {
  // success
}).catch(e=>{
  // HError 对象
})
```
{% endifanrxCodeTabs %}

**返回值说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| operationID | number | 提交批量操作任务后返回的 ID |

**返回示例**

| 属性   | 类型   | 说明     |
|----------|--------|----------|
| id | number | ID |
| schema_id | number | 数据表名称 |
| schema_name | string | 数据表名称 |
| operation | string | `update`（更新）/ `delete`（删除） |
| status | string | `pending`（等待执行）/ `success`（已完成） |
| created_at | number | 创建时间 |
| updated_at | number | 更新时间 |
| deleted_count | number | 删除记录行数量（operation=delete 时返回） |
| matched_count | number | 符合更新查询条件数量（operation=update 时返回） |
| modified_count | number | 已更新记录行数量（operation=update 时返回） |

成功时 res 对象结构如下

```json
{
  "data": {
    "id": 1,
    "schema_id": 1,
    "schema_name": "test",
    "operation": "update",
    "status": "success",
    "created_at": 1571047763,
    "updated_at": 1571047763,
    "matched_count": 1,
    "modified_count": 1
  },
  "status": 200
}
```

err 对象结构请参考[错误码和 HError 对象](./error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 401            | 没有权限读取   |
| 404            | 没有找到对应的记录      |
