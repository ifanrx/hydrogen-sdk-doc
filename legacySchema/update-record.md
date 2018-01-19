# 更新数据项

<p style='color:red'>* 该写法在 sdk v2.0 前仍有效</p>

`wx.BaaS.updateRecord(OBJECT)`

##### OBJECT 参数说明

|   参数名    |   类型   |  必填  |    描述     |
| :------: | :----: | :--: | :-------: |
| tableID  | Number |  是   |  数据表 ID   |
| recordID | String |  是   |  数据项 ID   |
|   data   | Object |  是   | 待更新的自定义数据 |

##### 请求示例

```
// 更新 tableID 为 10 的数据表中 recordID 为 59897882ff650c0477f00485 的数据项的 name 字段
let tableID = 10;
let recordID = '59897882ff650c0477f00485';
let data = {
  name: "VwlPCaUJzxAyNUSNMgzikTQySFoaTZtm"
}
let objects = {
  tableID,
  recordID,
  data
};
wx.BaaS.updateRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

|    参数名     |   类型    |   描述   |
| :--------: | :-----: | :----: |
|     id     | String  | 数据项 ID |
| created_at | Number  |  创建时间  |
|  is_admin  | Boolean | 自定义字段  |
|    name    | String  | 自定义字段  |
|   price    | Number  | 自定义字段  |
|    tags    |  Array  | 自定义字段  |

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
