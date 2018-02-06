# 内容操作

{% tabs first="SDK 1.1.3 及以上版本", second="SDK 1.1.3 以下版本" %}

{% content "first" %}

## SDK 1.1.3 及以上版本

以下操作都需指明操作的内容库，方法如下：

`let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)`

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------: | :----- | :-- | :-- |
| contentGroupID | Number | 是  | 内容库 ID |

### 获取内容详情

`MyContentGroup.getContent(richTextID)`

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-: |
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
MyContentGroup.getContent(richTextID).then((res) => {
  // success
}, (err) => {
  // err
});
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

### 查询，获取内容列表

内容查询与[数据表查询](../schema/query.md)方法一致

**请求示例**

```js
// 查找该内容库下的所有内容
MyContentGroup.find().then()

// 查找该内容库下在指定分类下的内容
let query = new wx.BaaS.Query()
query.arrayContains('categories', [1513076252710475])
MyContentGroup.setQuery(query).find().then((res) => {
  // success
}, (err) => {
  // err
});
```

### 获取分类详情

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
MyContentGroup.getCategory(categoryID).then( (res) => {
  // success
}, (err) => {
  // err
});
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


### 获取内容库分类列表

`MyContentGroup.getCategoryList()`

**请求示例**

```js
MyContentGroup.getCategoryList().then( (res) => {
  // success
}, (err) => {
  // err
});
```


### 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致

**请求示例**

```js
MyContentGroup.orderBy('-created_by').limit(5).offset(10).find().then()
```

{% content "second" %}

## SDK 1.1.3 以下版本

### 获取内容详情

`wx.BaaS.getContent(OBJECT)`

**OBJECT 参数说明**

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :----- | :--- | :-- |
| richTextID | Number |  是  | 内容 ID |

**返回参数**

| 参数         | 类型   | 说明 |
| :---------- | :----- | :-- |
| content     | String | 内容详情 |
| cover       | String | 封面图 url |
| created_at  | Number | 创建时间 |
| description | String | 摘要 |
| id          | Number | 内容 ID |
| title       | String | 内容标题 |

**请求示例**

```js
// 获取 内容ID 为 10 的内容详情
let richTextID = 10;
let objects = { richTextID };
wx.BaaS.getContent(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

**返回示例**

```js
{
  "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
  "created_at": 1504152062,
  "description": "超新约全书摘要",
  "id": 1680,
  "title": "超新约全书"
}
```

### 查询，获取内容列表

`wx.BaaS.getContentList(OBJECT)`

**OBJECT 参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------- | :----- | :-- | :---- |
| contentGroupID | Number | 是  | 内容库 ID |
| categoryID     | Number | 是  | 分类 ID |

> **info**
> contentGroupID 和 categoryID 两个参数只能选填一个，不能同时添加。

**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :-- |
| id         | Number | 分类 ID |
| title      | String | 标题 |
| created_at | Number | 创建时间 |

**请求示例**

```js
// 获取内容库 ID 为 10 内容库的内容列表
let contentGroupID = 10;
// let categoryID = 10;

let objects = { contentGroupID };
// let objects = { categoryID };

wx.BaaS.getContentList(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

**返回示例**

```js
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
      "created_at": 1486138010,
      "id": 8,
      "title": "wXTAuDctUBqPtQMi"
    }
  ]
}
```

> **info**
> 分页、查询和排序参考数据表中 [获取数据项列表](../../legacySchema/get-record-list.md) 的操作


### 获取内容库详情

`wx.BaaS.getContentGroup(OBJECT)`

**OBJECT 参数说明**

| 参数            | 类型   | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| contentGroupID | Number |  是 | 内容库 ID |

**返回参数**

| 参数           | 类型    | 说明 |
| :------------ | :------ | :-- |
| have_children | Boolean | 是否含有子分类 |
| id            | Number  | 内容/分类 ID |
| name          | String  | 内容/分类名称 |

**请求示例**

```js
// 获取 contentGroupID 为 10 内容库详情
let contentGroupID = 10;
let objects = { contentGroupID };
wx.BaaS.getContentGroup(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

**返回示例**

```js
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

> **info**
> 一个内容库里会有分类，会有内容，但不会出现同时存在的情况; 分类里可能会有分类，也就是子分类，通过 have_children 可以判定

### 获取内容库列表

`wx.BaaS.getContentGroupList()`

**请求示例**

```js
wx.BaaS.getContentGroupList().then( (res) => {
  // success
}, (err) => {
  // err
});
```

**返回参数**

| 参数  | 类型   | 说明 |
| :--- | :----- | :-- |
| id   | Number | 内容库 ID |
| name | String | 内容库名称 |

**返回示例**

```js
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

> **info**
> 分页、查询和排序参考数据表中 [获取数据项列表](../../schema/get-record-list.md) 的操作


### 获取分类详情

`wx.BaaS.getContentCategory(OBJECT)`

**OBJECT 参数说明**

| 参数       | 类型    | 必填 | 说明 |
| :--------  | :----- | :-- | :-- |
| categoryID | Number | 是  | 分类 ID |

**返回参数**

| 参数           | 类型    | 描述 |
| :------------ | :------ | :-- |
| id            | Number  | 分类 ID |
| name          | String  | 分类名称 |
| have_children | Boolean | 是否包含子分类 |
| children      | Array   | 子分类列表，见 Tip |

**请求示例**

```js
// 获取 categoryID 为 10 的分类详情
let categoryID = 10;
let objects = { categoryID };
wx.BaaS.getContentCategory(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

**返回示例**

```js
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

> **info**
> 分类里可以存在分类，也就是嵌套的分类， 当 `have_children` 为 true 时，说明有子分类，`children` 里存放的就是子分类。

{% endtabs %}