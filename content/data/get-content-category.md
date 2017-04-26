# 获取分类详情

`wx.BaaS.getContentCategory(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填 |描述 |
| :---:  | :----: | :----: |:----: |
| categoryID | Number |是| 分类 ID |

##### 请求示例

```
// 获取 categoryID 为 10 的分类详情
let categoryID = 10;
let objects = { categoryID };
wx.BaaS.getContentCategory(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

| 参数名 | 类型   |  描述 |
| :---:  | :----: | :----: |
| id | Number | 分类 ID |
| name   | String     | 分类名称     |
| have_children   | Boolean      | 是否包含子分类     |
| children   | Array      | 子分类列表，见 Tip     |

##### 返回示例

```
{
  "have_children": true,
  "id": 7,
  "name": "sOjPLsIfGhfrdtIU",
  "children": [
    {
      "have_children": false,
      "id": 8,
      "name": "KdaPCuwRAKrGdsPS"
    }
  ]
}
```

### Tip

- 分类里可以存在分类，也就是嵌套的分类， 当 `have_children` 为 true 时，说明有子分类，`children` 里存放的就是子分类。
