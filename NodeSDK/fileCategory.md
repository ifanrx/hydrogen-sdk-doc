# 文件分类操作

`let MyFileCategory = new BaaS.FileCategory()`

### 获取文件分类详情

`MyFileCategory.get(categoryID)`

##### 参数说明

| 参数名      | 类型     | 是否必填 | 参数描述    |
| :--------  | :------ | :-----: | :--------- |
| categoryID | String  |    Y    | 文件分类 ID |

##### 示例代码

```
let MyFileCategory = new BaaS.FileCategory()

MyFileCategory.get('5a2fe91508443e3123dbe1cb').then((res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例
res.data
```
{
  created_at: 1513089301,
  files: 2,
  id: "5a2fe91508443e3123dbe1cb",
  name: "重要",
  updated_at: 1513089306
}
```
files 为文件分类下的文件数