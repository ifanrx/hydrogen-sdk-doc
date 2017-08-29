# 获取数据项详情

##### 请求示例

```
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = new wx.BaaS.TableObject(tableID)

product.get(recordID).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例 (res.statusCode === 200)

res.data:
```
{
  "_id": "59a3c2b5afb7766a5ec6e84e",
  "acl_gid": null,
  "acl_permission": 7,
  "amount": 0,
  "created_at": 1503904437,
  "created_by": 36395395,
  "desc": ["good"],
  "id": "59a3c2b5afb7766a5ec6e84e",
  "name": "apple",
  "price": 1.0,
  "updated_at": 1503904437
}
```
