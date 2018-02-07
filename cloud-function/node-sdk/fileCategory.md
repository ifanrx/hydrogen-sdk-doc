# 文件分类操作

`let MyFileCategory = new BaaS.FileCategory()`

实例化一个 wx.BaaS.FileCategory 对象，以下操作都是在该对象上进行操作，如下进行实例化：

`let MyFileCategory = new wx.BaaS.FileCategory()`

## 获取文件分类详情

`MyFileCategory.get(categoryID)`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| categoryID | String | Y   | 文件分类 ID |

**返回参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| created_at | Number | Y   | 分类创建时间 |
| files      | Number | Y   | 分类下的文件数 |
| id         | String | Y   | 分类 ID |
| name       | String | Y   | 分类名 |
| updated_at | Number | Y   | 分裂更新时间 |

**示例代码**

```js
MyFileCategory.get('5a2fe91508443e3123dbe1cb').then((res) => {
  // success
}, (err) => {
  // err
})
```

**返回示例**

```js
{
  created_at: 1513089301,
  files: 2,
  id: "5a2fe91508443e3123dbe1cb",
  name: "重要",
  updated_at: 1513089306
}
```