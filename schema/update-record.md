# 更新数据项

##### 请求示例

- 普通数据更新

```
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 price 字段
let tableID = 10
let recordID = '59897882ff650c0477f00485'

let Product = wx.BaaS.TableObject(tableID)
let product = Obj.getWithoutData(recordID)

obj.set('price', 11)
obj.update().then( (res) => {
  // success
}, (err) => {
  // err
})
```

- 计数器更新（对数字类型的字段进行原子性增减操作）

```

```

##### 返回示例

```
{
  "created_at": 1487055951,
  "id": "59897882ff650c0477f00485",
  "is_admin": false,
  "name": "VwlPCaUJzxAyNUSNMgzikTQySFoaTZtm",
  "price": 10,
  "tags": [
    "UZbJ",
    "eSYo"
  ]
}
```

### Tip

- 本方法支持部分更新和全量更新
