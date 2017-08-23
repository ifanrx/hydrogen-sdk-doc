# 删除数据项

##### 请求示例

```
// 删除 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Obj = wx.BaaS.TableObject(tableID)
let obj = Obj.getWithoutData(recordID)

obj.delete().then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回参数

无
