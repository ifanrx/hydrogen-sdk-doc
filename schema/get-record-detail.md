# 获取数据项详情

##### 请求示例

```
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Obj = wx.BaaS.TableObject(tableID)

Obj.get(recordID).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "59897882ff650c0477f00485",
  "is_admin": false,
  "name": "JlpvHdheLh",
  "price": 89,
  "tags": [
    "xGHt",
    "hHqz"
  ]
}
```
