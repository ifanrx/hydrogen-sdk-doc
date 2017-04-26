# 获取内容库详情

`wx.BaaS.getContentGroup(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填 |描述 |
| :---:  | :----: | :----: | :----: |
| contentGroupID | Number | 是 | 内容库 ID |

##### 请求示例

```
// 获取 contentGroupID 为 10 内容库详情
let contentGroupID = 10;
let objects = { contentGroupID };
wx.BaaS.getContentGroup(objects).then( (res) => {
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
| have_children | Boolean | 是否含有子分类 |
| id | Number | 内容/分类 ID |
| name   | String     | 内容/分类名称    |

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
       "have_children": true,
       "id": 9,
       "name": "zvYMFumJSMYoaiVn"
     }
  ]
}
```

### Tip

- 一个内容库里会有分类，会有内容，但不会出现同时存在的情况
- 分类里可能会有分类，也就是子分类，通过 have_children 可以判定
