# 获取数据项详情

{% tabs first="SDK 1.1.0 及以上版本", second="SDK 1.1.0 以下版本" %}

{% content "first" %}

## SDK 1.1.0 及以上版本

### 操作步骤

1.通过 `tableName` 或 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表，这里推荐用 tableName

`let MyTableObject = new wx.BaaS.TableObject(tableName | tableID)`

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

{% content "second" %}

## SDK 1.1.0 以下版本

> **info**
> 该写法在 sdk v2.0 前仍然有效

`wx.BaaS.getRecord(OBJECT)`

**OBJECT 参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------  | :----- | :-- | :-- |
| tableID  | Number | 是  | 数据表 ID |
| recordID | String | 是  | 数据行 id |

**请求示例**

```js
let tableID = 10
let recordID = '59897882ff650c0477f00485'
let objects = {
  tableID,
  recordID
}

wx.BaaS.getRecord(objects).then(res => {
  // success
}, err => {
  // err
})
```

**返回参数**

res.data:

| 参数        | 类型    | 说明 |
| :--------- | :------ | :-- |
| id         | String  | 数据行 id |
| created_at | Integer | 创建时间 |
| is_admin   | Boolean | 自定义字段 |
| name       | String  | 自定义字段 |
| price      | Number  | 自定义字段 |
| tags       |  Array  | 自定义字段 |

**返回示例**

res.data:
```json
{
  "created_at": 1487053095,
  "id": "59897882ff650c0477f00485",
  "is_admin": false,
  "name": "JlpvHdheLh",
  "price": 89,
  "tags": ["xGHt", "hHqz"]
}
```

{% endtabs %}