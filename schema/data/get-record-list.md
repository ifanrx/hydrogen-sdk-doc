# 获取数据项列表

`wx.BaaS.getRecordList(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| tableID | Number | 是 | 数据表 ID |

##### 请求示例

```
// 获取 tableID 为 10 的数据表中的所有数据项
let tableID = 10;
let objects = { tableID };
wx.BaaS.getRecordList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

- meta: 元信息
- objects：分类列表

列表项属性说明

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
| id | Number | 数据表 ID |
| created_at | Number | 创建时间 |
| response | Object | 自定义数据内容 |

##### 返回示例

```
{
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "created_at": 1487053095,
      "id": 7,
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
  ]
}
```
