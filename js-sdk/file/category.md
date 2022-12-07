{% import "/js-sdk/macro/total_count.md" as totalCount %}

# 文件分类操作

实例化一个 `BaaS.FileCategory` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

{% ifanrxCodeTabs %}
`let MyFileCategory = new wx.BaaS.FileCategory()`
{% endifanrxCodeTabs %}

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


## 获取分类下的所有文件

`MyFileCategory.getFileList(categoryID)`

**参数说明**

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-------- |
| categoryID | String  | Y   | 文件分类 ID |

**示例代码**

{% ifanrxCodeTabs %}
```js
let MyFileCategory = new wx.BaaS.FileCategory()

MyFileCategory.getFileList('5a2fe91508443e3123dbe1cb').then(res => {
  // success
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

> **info**
> 如需对分类下的文件进行更多条件的筛选，可使用 [File](./file.md) 的查询接口

## 获取符合条件的文件分类总数

`MyFileCategory.count()`

> **info**
> SDK v3.0 新增

{% ifanrxCodeTabs %}
```js
let MyFileCategory = new wx.BaaS.FileCategory()

let query = new wx.BaaS.Query()
query.contains('name', substr)
let num = MyFileCategory.setQuery(query).count().then(num => {
  // success
  console.log(num)  // 10
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

## 查询，获取分类列表

`MyFileCategory.find(options)`

**参数说明**

options:

| 参数          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| withCount     | boolean |  否  | `false` | 是否返回 total_count |

{{totalCount.withCountTips()}}

文件分类查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选：

| 支持字段 | 类型   | 说明 |
| :----- | :----- | :-- |
| id     | String | 文件分类 ID |
| name   | String | 文件分类名 |

**示例代码**

{% ifanrxCodeTabs %}
```js
let MyFileCategory = new wx.BaaS.FileCategory()

// 查找所有文件分类
MyFileCategory.find()

// 设置查询条件
let query = new wx.BaaS.Query()
query.contains('name', substr)
MyFileCategory.setQuery(query).find()
```
{% endifanrxCodeTabs %}

## 排序

文件分类查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序：

| 支持字段    | 描述        |
| :--------- | :--------- |
| name       | 文件名      |
| created_at | 文件创建时间 |

## 分页
文件分类查询排序与[数据表分页](../schema/limit-and-order.md)方法一致。
