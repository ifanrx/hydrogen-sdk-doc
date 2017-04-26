# 更新数据项

`wx.BaaS.updateRecord(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| tableID | Number | 是 | 数据表 ID |
| recordID | Number | 是 | 数据项 ID |
| data | Object | 是 | 待更新的自定义数据 |

##### 请求示例

```
// 更新 tableID 为 10 的数据表中 recordID 为 20 的数据项的 name 字段
let tableID = 10;
let recordID = 20;
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

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
| id | Number | 数据项 ID |
| created_at | Number | 创建时间 |
| response | Object | 自定义数据内容 |

##### 返回示例

```
{
  "created_at": 1487055951,
  "id": 20,
  "response": {
    "is_admin": false,
    "name": "VwlPCaUJzxAyNUSNMgzikTQySFoaTZtm",
    "price": 10,
    "tags": [
      "UZbJ",
      "eSYo"
    ]
  }
}
```

### Tip

- 本方法支持部分更新和全量更新
