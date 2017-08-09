# 删除数据项

`wx.BaaS.deleteRecord(OBJECT)`

##### OBJECT 参数说明

|   参数名    |   类型   |  必填  |   描述   |
| :------: | :----: | :--: | :----: |
| tableID  | Number |  是   | 数据表 ID |
| recordID | String |  是   | 数据项 ID |

##### 请求示例

```
// 删除 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项
let tableID = 10
let recordID = '59897882ff650c0477f00485'
let objects = {
  tableID,
  recordID
}
wx.BaaS.deleteRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回参数

无
