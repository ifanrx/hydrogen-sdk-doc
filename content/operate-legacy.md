# 内容操作

### 获取内容详情

`wx.BaaS.getContent(OBJECT)`

##### OBJECT 参数说明

| 参数名 | 类型   | 必填 | 描述 |
| :---:  | :----: | :----: |:----: |
| richTextID | Number | 是 | 内容 ID |

##### 请求示例

```
// 获取 内容ID 为 10 的内容详情
let richTextID = 10;
let objects = { richTextID };
wx.BaaS.getContent(objects).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
|  content  |  String  |  内容详情  |
|  cover  |  String  |  封面图 url  |
|  created_at  |  Number  |  创建时间  |
|  description  |  String  |  摘要  |
|  id  |  Number  |  内容 ID  |
|  title  |  String  |  内容标题  |

##### 返回示例

```
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

##### OBJECT 参数说明

| 参数名 | 类型   | 必填| 描述 |
| :---:  | :----: | :----: | :----: |
| contentGroupID | Number | 是 | 内容库 ID |
| categoryID | Number | 是 |分类 ID |

注意：contentGroupID 和 categoryID 两个参数只能选填一个，不能同时添加。

##### 请求示例

```
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

##### 返回参数

- meta: 元信息
- objects：分类列表

列表项属性说明

| 参数名 | 类型   | 描述 |
| :---:  | :----: | :----: |
| id | Number | 分类 ID |
| title   | String     | 标题     |
| created_at   | Number      | 创建时间     |

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
      "created_at": 1486138010,
      "id": 8,
      "title": "wXTAuDctUBqPtQMi"
    }
  ]
}
```

##### Tip

分页、查询和排序参考数据表中 [获取数据项列表](../../legacySchema/get-record-list.md) 的操作


### 获取内容库详情

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

##### Tip

- 一个内容库里会有分类，会有内容，但不会出现同时存在的情况
- 分类里可能会有分类，也就是子分类，通过 have_children 可以判定

### 获取内容库列表

`wx.BaaS.getContentGroupList()`

##### 请求示例

```
wx.BaaS.getContentGroupList().then( (res) => {
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
| id | Number | 内容库 ID |
| name   | String     | 内容库名称    |

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
       "id": 9,
       "name": "zvYMFumJSMYoaiVn"
     }
  ]
}
```

##### Tip

分页、查询和排序参考数据表中 [获取数据项列表](../../schema/get-record-list.md) 的操作

### 获取分类详情

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

##### Tip

- 分类里可以存在分类，也就是嵌套的分类， 当 `have_children` 为 true 时，说明有子分类，`children` 里存放的就是子分类。
