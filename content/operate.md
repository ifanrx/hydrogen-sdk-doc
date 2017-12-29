# 内容操作

<p style='color:red'>* sdk version >= v1.1.3</p>

`let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)`

##### 参数说明

|      参数名     |  类型   |  必填  |   描述   |
| :------------: | :----: | :----: | :-----: |
| contentGroupID | Number |   是   | 内容库 ID |

### 获取内容详情

`MyContentGroup.get(richTextID)`

##### 参数说明

|   参数名    |   类型  |  必填  |   描述  |
| :--------: | :----: | :----: | :----: |
| richTextID | Number |   是   | 内容 ID |

注：获取内容详情支持通过 id 或 contentID 查找

##### 请求示例

```
// 获取指定内容库中 id 为 111 的内容的详细信息
let contentGroupID = 10
let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)

let richTextID = 111
MyContentGroup.get(richTextID).then((res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

|    参数名    |      类型      |     描述    |
| :--------:  | :-----------: | :---------: |
| categories  |  String Array |   内容详情   |
|   content   |     String    |   内容详情   |
|    cover    |     String    |  封面图 url  |
| created_at  |     Number    |   创建时间  |
| created_by  |     Number    |   user ID   |
| description |     String    |     摘要    |
|  group_id   |     String    |  内容库 ID  |
|     id      |     Number    |   内容 ID  |
|    title    |     String    |   内容标题  |
|  update_at  |     Number    |   更新时间  |

注：如果有自定义字段，则一并返回

##### 返回示例

```
{
  categories: ["5a2fb61c09a8051e1b53d7c1"],
  content: "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  cover: "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
  created_at: 1513076305,
  created_by: 16042162,
  description: "iphoneX 发布",
  group_id: "5a2fb5f3fff1d64cbb982099",
  id: 1513076305938456,
  title: "iphone X",
  updated_at: 1513076364
}
```

### 查询，获取内容列表

内容查询与[数据表查询](../schema/query.md)方法一致

##### 请求示例

```
let contentGroupID = 10
let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)

// 查找该内容库下的所有内容
MyContentGroup.find().then()

// 查找该内容库下分类 ID 为 200 的内容
let query = new wx.BaaS.Query()
query.compare('categories', '=', ['200'])
MyContentGroup.setQuery(query).find().then((res) => {
  // success
}, (err) => {
  // err
});
```

### 获取分类详情

`MyContentGroup.getCategory(categoryID)`

##### OBJECT 参数说明

|    参数名   |   类型  |  必填  |   描述  |
| :--------: | :----: | :----: | :----: |
| categoryID | Number |   是   | 分类 ID |

##### 请求示例

```
let contentGroupID = 10
let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)

let categoryID = 100
MyContentGroup.getCategory(categoryID).then( (res) => {
  // success
}, (err) => {
  // err
});
```

##### 返回参数

| 参数名 |  类型  |   描述  |
| :---: | :----: | :-----: |
|  id   | Number | 分类 ID |
| name  | String | 分类名称 |


### 获取内容库分类列表

`MyContentGroup.getCategoryList()`

##### 请求示例

```
let contentGroupID = 10
let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)

MyContentGroup.getCategoryList().then( (res) => {
  // success
}, (err) => {
  // err
});
```


### 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致