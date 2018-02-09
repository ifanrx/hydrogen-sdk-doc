# 删除数据项

## 操作步骤

1.通过 `tableID` 实例化一个 `TableObject` 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new wx.BaaS.TableObject(tableID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :---|
| tableID | Number |  是 | 数据表 ID |

**返回参数说明**

无数据返回

2.指定 `recordID` 执行删除操作

`MyTableObject.delete(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据表 ID |


## 示例

**请求示例**
```js
// 删除 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)
Product.delete(recordID).then(res => {
  // success
}, err => {
  // err
})
```