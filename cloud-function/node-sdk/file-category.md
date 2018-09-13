# 文件分类操作

实例化一个 `BaaS.FileCategory` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

`let MyFileCategory = new BaaS.FileCategory()`

## 创建文件分类

`MyFileCategory.create({name})`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| name | String | Y   | 文件分类名称 |

**返回参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| created_at | Number | Y   | 分类创建时间 |
| files      | Number | Y   | 分类下的文件数 |
| parent     | Number | Y   | 父分类 ID |
| id         | String | Y   | 分类 ID |
| name       | String | Y   | 分类名 |
| subcategories | Array | Y   | 子分类列表 |

**示例代码**

```js
let MyFileCategory = new BaaS.FileCategory()
MyFileCategory.create({name: 'test-file-category'}).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```js
{
  "created_at": 1536810022,
  "files": 0,
  "id": "5b99dc2652f76d7246298257",
  "name": "test-file-category",
  "parent": null,
  "subcategories": [],
}
```


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
| updated_at | Number | Y   | 分类更新时间 |

**示例代码**

```js
let MyFileCategory = new BaaS.FileCategory()
MyFileCategory.get('5a2fe91508443e3123dbe1cb').then(res => {
  // success
}, err => {
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

## 更新文件分类

`MyFileCategory.update(categoryID, {name})`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| categoryID | String | Y   | 文件分类 ID |
| name | String | Y   | 文件分类名称 |

**返回参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| created_at | Number | Y   | 分类创建时间 |
| files      | Number | Y   | 分类下的文件数 |
| parent     | Number | Y   | 父分类 ID |
| id         | String | Y   | 分类 ID |
| name       | String | Y   | 分类名 |
| subcategories | Array | Y   | 子分类列表 |
| updated_at | Number | Y   | 分类更新时间 |

**示例代码**

```js
let MyFileCategory = new BaaS.FileCategory()
MyFileCategory.update(categoryID, {name: 'file-category'}).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```js
{
  "created_at": 1536810022,
  "files": 0,
  "id": "5b99dc2652f76d7246298257",
  "name": "file-category",
  "parent": null,
  "subcategories": [],
  "updated_at": 1536810664
}
```

## 删除文件分类

`MyFileCategory.delete(categoryID)`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| categoryID | String | Y   | 文件分类 ID |

**示例代码**

```js
let MyFileCategory = new BaaS.FileCategory()
MyFileCategory.delete(categoryID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```js
""
```

## 查询，获取分类列表

文件分类查询与[数据表查询](./schema/query.md)方法一致，但只支持以下指定字段的筛选：

| 支持字段 | 类型   | 说明 |
| :----- | :----- | :-- |
| id     | String | 文件分类 ID |
| name   | String | 文件分类名 |

**示例代码**

```js
let MyFileCategory = new BaaS.FileCategory()

// 查找所有文件分类
MyFileCategory.find()

// 设置查询条件
let query = new BaaS.Query()
query.contains('name', substr)
MyFileCategory.setQuery(query).find()
```

## 排序

文件分类查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序：

| 支持字段    | 描述        |
| :--------- | :--------- |
| name       | 文件名      |
| created_at | 文件创建时间 |

## 分页
文件分类查询排序与[数据表分页](./schema/limit-and-order.md)方法一致。