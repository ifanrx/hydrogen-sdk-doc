# 内容库操作

以下操作都需指明操作的内容库，方法如下：

`let MyContentGroup = new BaaS.ContentGroup(contentGroupID)`

**参数说明**

 | 参数           | 类型   | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| contentGroupID | Number | 是  | 内容库 ID |

## 获取内容详情（已废弃，请查看[内容操作](./content.md#获取内容详情)）

`MyContentGroup.getContent(richTextID)`

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| richTextID | Number | 是   | 内容 ID |

**返回参数**

| 参数         | 类型         | 说明 |
| :---------- | :----------- | :-- |
| categories  | Number Array | 内容分类 |
| content     | String       | 内容详情 |
| cover       | String       | 封面图 url |
| created_at  | Number       | 创建时间 |
| created_by  | Number       | user ID |
| description | String       | 摘要 |
| group_id    | Number       | 内容库 ID |
| id          | Number       | 内容 ID |
| title       | String       | 内容标题 |
|  update_at  | Number       | 更新时间 |

> **info**
> 如果有自定义字段，则一并返回

**请求示例**

```js
let richTextID = 1514529306082815
MyContentGroup.getContent(richTextID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
{
  categories: [1513076252710475],
  content: "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  cover: "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
  created_at: 1513076305,
  created_by: 16042162,
  description: "iphoneX 发布",
  group_id: 1513076211190694,
  id: 1513076305938456,
  title: "iphone X",
  updated_at: 1513076364
}
```

## 查询，获取内容列表（已废弃，请查看[内容操作](./content.md#查询，获取内容列表)）

内容查询与[数据表查询](../schema/query.md)方法一致

**请求示例**

```js
// 查找该内容库下的所有内容
MyContentGroup.find().then()

// 查找该内容库下在指定分类下的内容
let query = new BaaS.Query()
query.arrayContains('categories', [1513076252710475])
MyContentGroup.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})
```

## 获取分类详情（已废弃，请查看[内容分类操作](./content-category.md#获取内容分类详情)）

`MyContentGroup.getCategory(categoryID)`

**OBJECT 参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----  | :-- | :-- |
| categoryID | Number |  是 | 分类 ID |

**返回参数**

|  参数          | 类型    | 说明 |
| :------------ | :------ | :-- |
| children      |  Array  | 子分类列表 |
| have_children | Boolean | 是否含有子分类 |
| id            | Number  | 分类 ID |
| name          | String  | 分类名称 |

**请求示例**

```js
let categoryID = 1513076252710475
MyContentGroup.getCategory(categoryID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
```js
{
  have_children: true,
  id: 1513076252710475,
  name: "科技",
  children: [
    {
      have_children: false,
      id: 1514515552050186,
      name: "评测"
    }
  ]
}
```


## 获取内容库分类列表（已废弃，请查看[内容分类操作](./content-category.md#查询，获取内容分类列表)）

`MyContentGroup.getCategoryList()`

**请求示例**

```js
MyContentGroup.getCategoryList().then(res => {
  // success
}, err => {
  // err
})
```


## 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致

**请求示例**

```js
MyContentGroup.orderBy('-created_by').limit(5).offset(10).find().then()
```
