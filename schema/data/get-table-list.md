# 获取数据表列表

`wx.BaaS.getTableList()`

##### 请求示例

```
wx.BaaS.getTableList().then((res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

- meta：元信息
- objects：数据表列表

列表项属性说明

| 参数名 | 类型 | 说明 |
| :-: | :-: | :-: |
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
  "meta": {
    "limit": 20,
    "next": null,
    "offset": 0,
    "previous": null,
    "total_count": 1
  },
  "objects": [
    {
      "id": 4,
      "name": "hnEHNoslUbveSiHy",
      "title": "mjsdkqewrwekcd",
      "created_at": 1487055951,
      "acl_gid": 2,
      “acl_permission”: 4,
      "updated_at": 1463255951,
      “version”: "0.0.1"
        "fields": [
          {
            "name": "id",
            "type": "integer"
          }
        ]
      }
    }
  ]
}

```
