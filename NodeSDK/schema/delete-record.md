# 删除数据项

##### 请求示例

```
// 删除 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new BaaS.TableObject(tableID)
Product.delete(recordID).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回参数 (res.statusCode = 204)

res.data
无
