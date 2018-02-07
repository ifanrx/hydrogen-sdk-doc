# 获取数据项详情

## 操作步骤

1.通过 tableID 实例化一个 TableObject 对象，操作该对象即相当于操作对应的数据表

`let MyTableObject = new wx.BaaS.TableObject(tableID)`

**参数说明**

| 参数     | 类型   | 必填 | 说明 |
| :-----  | :----- | :-- | :-- |
| tableID | Number |  是 | 数据表 ID |

**返回参数说明**
无数据返回

2.指定 recordID 执行删除操作

`MyTableObject.delete(recordID)`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :---|
| recordID | String | 是  | 数据表 ID |


## 示例

**请求示例**

```js
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)

Product.get(recordID).then( (res) => {
  // success
}, (err) => {
  // err
})
```

**返回示例** (res.statusCode === 200)

res.data:
```js
{
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
```
