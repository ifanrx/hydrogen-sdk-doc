# 获取数据项详情

`wx.BaaS.getRecord(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| tableID | Number | 是 | 数据表 ID |
| recordID | Number | 是 | 数据项 ID |

##### 请求示例

```
let tableID = 10;
let recordID = 20;
let objects = {
  tableID,
  recordID
};
wx.BaaS.getRecord(objects).then( (res) => {
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
  "created_at": 1487053095,
  "id": 20,
  "response": {
    "is_admin": false,
    "name": "JlpvHdheLh",
    "price": 89,
    "tags": [
      "xGHt",
      "hHqz"
    ]
  }
}
```
