# 获取数据项详情

## 操作步骤

1.通过 `数据表 ID` 或 `数据表名` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new BaaS.TableObject(tableID | tableName)`

**参数说明**

tableID 和 tableName 二选一，不能同时存在

| 参数名    | 类型    | 说明                                 |
|-----------|---------|--------------------------------------|
| tableID   | integer | 数据表的 ID                          |
| tableName | string  | 数据表名                             |

2.指定数据行 id（以下用 `recordID` 参数名表示）执行获取相应数据项操作

`MyTableObject.get(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据行 id |


## 示例

**请求示例**

```js
let tableName = 'product'
let recordID = '59897882ff650c0477f00485'

let Product = new BaaS.TableObject(tableName)

Product.get(recordID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例** 

res 结构如下:
```json
{
  "status": 200,
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

err 对象结构请参考[错误码和 HError 对象](../error.md)

常见错误：

| 错误码 err.code | 可能的原因       |
|----------------|-----------------|
| 404            | 数据行不存在      |

## 字段过滤与扩展

请参考[字段过滤与扩展](./select-and-expand.md)章节
