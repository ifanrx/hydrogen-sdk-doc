# 获取内容列表

`wx.BaaS.getContentList(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| contentGroupID | Number | 是 | 内容库 ID |
| categoryID | Number | 是 |分类 ID |

注意：contentGroupID 和 categoryID 两个参数只能选填一个，不能同时添加。

##### 请求示例

```
// 获取内容库 ID 为 10 内容库的内容列表
let contentGroupID = 10;
// let categoryID = 10;

let objects = { contentGroupID };
// let objects = { categoryID };

wx.BaaS.getContentList(objects).then( (res) => {
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
| id | Number | 分类 ID |
| title   | String     | 标题     |
| created_at   | Number      | 创建时间     |

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
      "created_at": 1486138010,
      "id": 8,
      "title": "wXTAuDctUBqPtQMi"
    }
  ]
}
```

### Tip

分页、查询和排序参考数据表中 [获取数据项列表](../../schema/get-record-list.md) 的操作
