#文件分类操作

<p style='color:red'>* sdk version >= v1.1.2</p>
`let FileCategory = new wx.BaaS.FileCategory()`

### 获取文件分类详情

`FileCategory.get(categoryID)`

##### 参数说明

| 参数名      | 类型     | 是否必填 | 参数描述      |
| :--------  | :------ | :-----: | :------------|
| categoryID | String  |    Y    | 文件分类 ID |

##### 示例代码

```
let FileCategory = new wx.BaaS.FileCategory()

FileCategory.get('5a2fe91508443e3123dbe1cb').then((res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

res.data
```
```


### 获取分类下的所有文件

`FileCategory.getFileList(categoryID)`

##### 参数说明

| 参数名      | 类型     | 是否必填 | 参数描述      |
| :--------  | :------ | :-----: | :------------|
| categoryID | String  |    Y    | 文件分类 ID |

##### 示例代码

```
let FileCategory = new wx.BaaS.FileCategory()

FileCategory.getFileList('5a2fe91508443e3123dbe1cb').then((res) => {
  // success
}, (err) => {
  // err
})
```
注：如需对分类下的文件进行更多条件的筛选，可使用 [File](./file.md) 的查询接口

### 查询，获取分类列表

文件分类查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

| 支持字段 | 类型    | 描述       |
| :------ | :----- | :-------- |
| id      | String | 文件分类 id |
| name    | String | 文件分类名  |

##### 示例代码

```
let FileCategory = new wx.BaaS.FileCategory()

// 查找所有文件分类
FileCategory.find()

// 设置查询条件
let query = new wx.BaaS.Query()
query.contains('name', substr)
File.setQuery(query).find()
```

### 排序
文件分类查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段    | 描述      |
| :--------- | :------------------- |
| name       | 文件名                |
| created_at | 文件分类 id           |

### 分页
文件分类查询排序与[数据表分页](../schema/limit-and-order.md)方法一致