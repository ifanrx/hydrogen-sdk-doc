# 获取内容库列表

`wx.BaaS.getContentGroupList()`

##### 请求示例

```
wx.BaaS.getContentGroupList().then( (res) => {
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
| id | Number | 内容库 ID |
| name   | String     | 内容库名称    |

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
       "id": 9,
       "name": "zvYMFumJSMYoaiVn"
     }
  ]
}
```

### Tip

分页、查询和排序参考数据表中 [获取数据项列表](../../schema/get-record-list.md) 的操作
