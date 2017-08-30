# 获取数据项详情

<p style='color:red'>* Deprecated</p>

`wx.BaaS.getRecord(OBJECT)`

##### OBJECT 参数说明

|   参数名    |   类型   |  必填  |   描述   |
| :------: | :----: | :--: | :----: |
| tableID  | Number |  是   | 数据表 ID |
| recordID | String |  是   | 数据项 ID |

##### 请求示例

```
let tableID = 10
let recordID = '59897882ff650c0477f00485'
let objects = {
  tableID,
  recordID
};
wx.BaaS.getRecord(objects).then( (res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回参数

|    参数名     |   类型    |   描述   |
| :--------: | :-----: | :----: |
|     id     | String  | 数据项 ID |
| created_at | Integer |  创建时间  |
|  is_admin  | Boolean | 自定义字段 |
|    name    | String  | 自定义字段 |
|   price    | Number  | 自定义字段 |
|    tags    |  Array  | 自定义字段 |

##### 返回示例

```
{
  "created_at": 1487053095,
  "id": "59897882ff650c0477f00485",
  "is_admin": false,
  "name": "JlpvHdheLh",
  "price": 89,
  "tags": [
    "xGHt",
    "hHqz"
  ]
}
```
