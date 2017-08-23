# 获取数据项详情

##### 请求示例

```
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = wx.BaaS.TableObject(tableID)

product.get(recordID).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "7",
  "name": "fushi",
  "price": 10,
  "desc": [
    "sweet",
    "red"
  ],
  amount: 2
}
```
