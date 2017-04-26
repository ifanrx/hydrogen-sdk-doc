# 获取数据表详情

`wx.BaaS.getTable(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| tableID | Number | 是 | 数据表 ID |

##### 请求示例

```
// 获取 tableID 为 10 的数据表详情
let tableID = 10;
let objects = { tableID };
wx.BaaS.getTable(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
| id | Number | 数据表 ID |
| title | String | 标题 |
| created_at | Number | 创建时间 |
| acl_gid | Number | 权限组 |
| acl_permission | Number | 权限 |
| updated_at | Number | 更新时间 |
| name | String | 数据表名称 |
| schema | Object | 数据表结构 |
| version | String | 版本号 |


##### 返回示例

```
{
  "id": 10,
  "name": "hnEHNoslUbveSiHy",
  "title": "mjsdkqewrwekcd",
  "created_at": 1487055951,
  "acl_gid": 2,
  “acl_permission”: 4,
  "updated_at": 1463255951,
  “version”: "0.0.1"
  "schema": {
    "fields": [
      {
        "name": "string",
        "type": "integer"
      }
    ]
  }
}
```
