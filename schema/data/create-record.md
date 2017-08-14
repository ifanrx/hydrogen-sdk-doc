# 新增数据记录

`wx.BaaS.createRecord(OBJECT)`

##### OBJECT 参数说明

|   参数名   |   类型   |  必填  |    描述     |
| :-----: | :----: | :--: | :-------: |
| tableID | Number |  是   |  数据表 ID   |
|  data   | Object |  是   | 待插入的自定义数据 |

##### 请求示例

```
// 向 tableID 为 10 的数据表插入一条记录
let tableID = 10
let data = {
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": [
    "LRpq",
    "HGLa"
  ]
}
let objects = {
  tableID,
  data
}
wx.BaaS.createRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回参数

|    参数名     |   类型    |   描述   |
| :--------: | :-----: | :----: |
|     id     | String  | 数据表 ID |
| created_at | Integer  |  创建时间  |
|  is_admin  | Boolean | 自定义字段 |
|    name    | String  | 自定义字段 |
|   price    | Number  | 自定义字段 |
|    tags    |  Array  | 自定义字段 |

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "7",
  "is_admin": false,
  "name": "OSfvvQFoNm",
  "price": 99,
  "tags": [
    "LRpq",
    "HGLa"
  ]
}
```

### Tip

- 插入的数据要与预先在知晓云平台设定的数据类型一致
