# 获取数据项详情

### 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

{% ifanrxCodeTabs %}
`let MyTableObject = new wx.BaaS.TableObject(tableName)`
{% endifanrxCodeTabs %}

**参数说明**

tableName 和 tableID 二选一，不能同时存在

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| tableID   | Number | 是  | 数据表的 ID             |
| tableName | String |  是 | 数据表名（SDK >= 1.2.0） |

2.指定 `recordID` 执行获取相应数据项操作

`MyTableObject.get(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| recordID | String | 是  | 记录 ID |


### 示例

**请求示例**

{% ifanrxCodeTabs %}
```js
let tableName = 'product'
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)

Product.get(recordID).then(res => {
  // success
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

**返回示例**

res 结构如下:
```json
{
  "statusCode": 200,
  "data": {
    "_id": "59a3c2b5afb7766a5ec6e84e",
    "amount": 0,
    "created_at": 1503904437,
    "created_by": 36395395,
    "desc": ["good"],
    "id": "59a3c2b5afb7766a5ec6e84e",
    "name": "apple",
    "price": 1.0,
    "read_perm": ["user:*"],
    "updated_at": 1503904437,
    "write_perm": ["user:*"]
  }
}
```
err 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |

### 字段过滤与扩展

请参考[字段过滤与扩展](./select-and-expand.md)章节
