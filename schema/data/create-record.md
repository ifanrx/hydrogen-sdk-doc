# 新增数据项

`wx.BaaS.createRecord(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| tableID | Number | 是 | 数据表 ID |
| data | Object | 是 | 待插入的自定义数据 |

##### 请求示例

```
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10;
let data = {
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": [
    "LRpq",
    "HGLa"
  ]
};
let objects = {
  tableID,
  data
};
wx.BaaS.createRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
| id | Number | 数据表 ID |
| created_at | Number | 创建时间 |
| response | Object | 自定义数据内容 |

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": 7,
  "response": {
    "is_admin": false,
    "name": "OSfvvQFoNm",
    "price": 99,
    "tags": [
      "LRpq",
      "HGLa"
    ]
  }
}
```

### Tip

- 插入的数据要与预先在知晓云平台设定的数据类型一致
