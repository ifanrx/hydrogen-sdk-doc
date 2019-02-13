# 内容分类操作

以下操作都需指明操作的内容库，方法如下：

`let MyContentCategory = new BaaS.ContentCategory(contentGroupID)`

**参数说明**

 | 参数           | 类型   | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| contentGroupID | Number | 是  | 内容库 ID |

## 创建内容分类

`MyContentCategory.create({name, parent})`

**参数说明**

|      参数    |    类型       | 必填 | 说明    |
| :---------- | :----------   | :-- | :----  |
| name       | String        | 是  | 内容分类名称 |
| parent     | Number        | 否  | 父分类 ID |

**返回参数**

| 参数         | 类型         | 说明 |
| :---------- | :----------- | :-- |
| subcategories  | Number Array | 子内容分类 |
| parent    | Object       | 父分类对象 |
| id          | Number       | 内容分类 ID |
| name       | String       | 内容分类名称 |
| created_at  | Number       | 创建时间 |
| update_at   | Number       | 更新时间 |


**请求示例**

```js
MyContentCategory.create({name: 'test category', parent: parentID}).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
{
  "created_at": 1536836590,
  "id": 1536836590938566,
  "name": "test catetory",
  "parent": {
    "id": 1536748828013607,
    "name": "name-fdsaer"
  },
  "subcategories": [],
  "updated_at": 1536836590
}
```

## 获取内容分类详情

`MyContentCategory.get(categoryID)`

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| categoryID | Number | 是   | 内容分类 ID |

**返回参数**

| 参数         | 类型         | 说明 |
| :---------- | :----------- | :-- |
| subcategories  | Number Array | 子内容分类 |
| created_at  | Number       | 创建时间 |
| parent    | Object       | 父分类对象 |
| id          | Number       | 内容分类 ID |
| name       | String       | 内容分类名称 |
| update_at   | Number       | 更新时间 |

**请求示例**

```js
MyContentCategory.get(categoryID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
{
  "created_at": 1536836590,
  "id": 1536836590938566,
  "name": "test catetory",
  "parent": {
    "id": 1536748828013607,
    "name": "name-fdsaer"
  },
  "subcategories": [],
  "updated_at": 1536836590
}
```

## 查询，获取内容分类列表

`MyContentCategory.find()`

**排序**

内容分类查询排序与[数据表排序](./schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序：

| 支持字段    | 描述        |
| :--------- | :--------- |
| created_at | 内容分类创建时间 |
| updated_at | 内容分类更新时间 |

**分页**

内容分类查询排序与[数据表分页](./schema/limit-and-order.md)方法一致。


**请求示例**

```js
MyContentCategory.offset(0).limit(10).orderBy('-created_at').find().then(res => {
  // success
}, err => {
  // err
})
```

## 更新内容分类

`MyContentCategory.update(categoryID, {name, parent})`

**参数说明**

|      参数    |    类型       | 必填 | 说明    |
| :---------- | :----------   | :-- | :----  |
| categoryID | Number | 是   | 内容分类 ID |
| name       | String        | 是  | 内容分类名称 |
| parent     | Number        | 否  | 父分类 ID |

**返回参数**

| 参数         | 类型         | 说明 |
| :---------- | :----------- | :-- |
| subcategories  | Number Array | 子内容分类 |
| parent    | Object       | 父分类对象 |
| id          | Number       | 内容分类 ID |
| name       | String       | 内容分类名称 |
| created_at  | Number       | 创建时间 |
| update_at   | Number       | 更新时间 |


**请求示例**

```js
MyContentCategory.update(categoryID, {
  name: 'category-name-new',
  parent: parentID,
}).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
{
  "created_at": 1536748828,
  "id": 1536748828013607,
  "name": "category-name-new",
  "parent": null,
  "subcategories": [],
  "updated_at": 1536844892
}
```

## 删除内容

`MyContentCategory.delete()`

**参数说明**

|      参数    |    类型       | 必填 | 说明    |
| :---------- | :----------   | :-- | :----  |
| categoryID | Number | 是   | 内容分类 ID |

**请求示例**

```js
MyContentCategory.delete(categoryID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
""
```