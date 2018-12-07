# 内容操作

以下操作都需指明操作的内容库，方法如下：

`let MyContent = new BaaS.Content(contentGroupID)`

**参数说明**

 | 参数           | 类型   | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| contentGroupID | Number | 是  | 内容库 ID |

## 创建内容

**创建步骤**

创建内容的步骤与[创建数据记录](../schema/create-record.md)的方法相同，这里只做简单说明。

1.本地创建一条空记录

`let content = MyContent.create()`

2.为上面创建的空记录赋值

`content.set(data)`

3.将创建的记录保存到服务器

`content.save()`

**参数说明**

|      参数    |    类型       | 必填 | 说明    |
| :---------- | :----------   | :-- | :----  |
| title       | String        | 是  | 内容标题 |
| content     | String        | 否  | 详细容 |
| cover       | File          | 否  | 封面图 |
| description | String        | 否  | 内容摘要 |
| categories  | Integer Array | 否  | 内容所属分类 |

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
| update_at   | Number       | 更新时间 |

> **info** 如果有自定义字段，则一并返回 

> 暂时不支持批量创建内容

**请求示例**

```js
let MyContent = new BaaS.Content(groupID)
let content = MyContent.create()
let data = {
  title: 'Test Title',
  content: 'test content'  
}
content.set(data).save().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
{
  "categories": [],
  "content": "test content",
  "created_at": 1536818888,
  "group_id": 1534478179506295,
  "id": 1536818888733676,
  "title": "Test Title",
  "updated_at": 1536818888
}
```

## 获取内容详情

`MyContent.get(richTextID)`

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
| update_at   | Number       | 更新时间 |

> **info**
> 如果有自定义字段，则一并返回

**请求示例**

```js
let richTextID = 1514529306082815
MyContent.get(richTextID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
```json
{
  "categories": [1513076252710475],
  "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
  "created_at": 1513076305,
  "created_by": 16042162,
  "description": "iphoneX 发布",
  "group_id": 1513076211190694,
  "id": 1513076305938456,
  "title": "iphone X",
  "updated_at": 1513076364
}
```

## 查询，获取内容列表

内容查询与[数据表查询](../schema/query.md)方法一致

**请求示例**

```js
// 查找该内容库下的所有内容
MyContent.find().then()

// 查找该内容库下在指定分类下的内容
let query = new BaaS.Query()
query.arrayContains('categories', [1513076252710475])
MyContent.setQuery(query).find().then(res => {
  // success
}, err => {
  // err
})
```

## 筛选字段 （SDK >= 1.12.1）

select 使用方法可以参考[数据表 - 字段过滤](../schema/select-and-expand.md)小节

## 扩展字段 （SDK >= 1.12.1）

expand 使用方法可以参考[数据表 - 字段扩展](../schema/select-and-expand.md)小节

假设 _richtextcontent 表中有一个类型为 pointer 的字段，名称为 `pointer_test_oder`, 指向了 test_order 表


**请求示例**

```js
let richTextID = 1514529306082815
MyContent.select(['content', 'pointer_test_order']).expand('pointer_test_order').get(richTextID).then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:

```json
{
  "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
  "pointer_test_order": {
    "created_at": 1538966895,
    "_table": "test_order",
    "id": "5bbac56fbd66033df7fd0aa2",
    "created_by": 61736923,
    "updated_at": 1538966895
  }    
}
```

**请求示例**

```js
let richTextID = 1514529306082815
MyContent.select(['content', 'pointer_test_order']).expand('pointer_test_order').find().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:

```json
{
    "meta": {
      "next": null,
      "offset": 0,
      "total_count": 1,
      "limit": 20,
      "previous": null
    },
    "objects": [
      {
        "content": "<p>\b 该片讲述了伊娅不满父亲的恶作剧</p>",
        "pointer_test_order": {
          "created_at": 1538966895,
          "_table": "test_order",
          "id": "5bbac56fbd66033df7fd0aa2",
          "created_by": 61736923,
          "updated_at": 1538966895
        }
      }
    ]
  }
```


## 更新内容


更新内容的步骤与[更新数据记录](../schema/update-record.md)的方法相同。

**请求示例**

```js
const content = MyContent.getWithoutData(richTextID)
content.set({
  title: 'update title'
})
content.update().then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

res.data:
``` js
{
  "categories": [],
  "content": "test content new 0001",
  "created_at": 1536826933,
  "group_id": 1534478179506295,
  "id": 1536826933728326,
  "title": "update title",
  "updated_at": 1536828592
}
```
> **info** 如果有自定义字段，则一并返回

> 暂时不支持批量更新内容

## 删除内容

`MyContent.delete()`

**创建步骤**

更新内容的步骤与[删除数据记录](../schema/delete-record.md)的方法相同。

**请求示例**

```js
MyContent.delete(richTextID).then(res => {
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
> **info** 
> 暂时不支持批量删除内容