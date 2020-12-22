# 内容操作

### 获取内容详情

`Content article = Contents.content(contentId)`

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| contentId | String | 是   | 内容 ID |

**返回参数**

| 参数         | 类型         | 说明 |
| :---------- | :----------- | :-- |
| Content.CATEGORIES  | Number Array | 内容分类 |
| Content.CONTENT     | String       | 内容详情 |
| Content.COVER       | String       | 封面图 url |
| Content.CREATED_AT  | Number       | 创建时间 |
| Content.CREATED_BY  | Number       | user ID |
| Content.DESCRIPTION | String       | 摘要 |
| Content.GROUP_ID    | Number       | 内容库 ID |
| Content.ID          | Number       | 内容 ID |
| Content.TITLE       | String       | 内容标题 |
| Content.UPDATE_AT   | Number       | 更新时间 |

> **info**
> 如果有自定义字段，则一并返回。

**请求示例**

```java
Content article = Contents.content("1514529306082815");
```

**返回示例**

```json
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

内容查询与[数据表查询](../schema/query.md)方法一致。

**请求示例**

```java
// 查找内容库 groupId 下的所有内容
Query query = new Query();
query.put(Content.QUERY_CONTENT_GROUP_ID, "groupId");
PagedList<Content> contents = Contents.contents(query);

// 查找该内容库下在指定分类下的内容
Query query = new Query();
query.put(Content.QUERY_CONTENT_GROUP_ID, "groupId");
Where where = new Where();
where.containedIn(Content.CATEGORIES, Arrays.asList("1513076252710475"));
PagedList<Content> contents = Contents.contents(query);
```

#### 筛选字段 

select 使用方法可以参考[数据表 - 字段过滤](../schema/select-and-expand.md)小节

#### 扩展字段 

expand 使用方法可以参考[数据表 - 字段扩展](../schema/select-and-expand.md)小节

假设 _richtextcontent 表中有一个类型为 pointer 的字段，名称为 `pointer_test_oder`, 指向了 test_order 表

**请求示例 1**
```java
Where where = new Where();
where.equalTo(Content.ID, "1513076305938456");

Query query = new Query()
  .select("-title", "-content")
  .expand("pointer_test_oder")
  .put(where);
Content content = Contents.contents(query).getObjects().get(0);
```

**请求结果 1**

```json
{
    "categories": [
      1513076252710475
    ],
    "cover": "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1donykIpnuvcRiAX.jpg",
    "created_at": 1513076305,
    "created_by": 16042162,
    "description": "iphoneX 发布",
    "group_id": 1513076211190694,
    "id": 1513076305938456,
    "updated_at": 1513076364,
    "pointer_test_order": {
      "created_at": 1538966895,
      "_table": "test_order",
      "id": "5bbac56fbd66033df7fd0aa2",
      "created_by": 61736923,
      "updated_at": 1538966895
    }
}

```


**请求示例 2**
```java
Query query = new Query()
  .select("title", "content", "pointer_test_oder")
  .expand("pointer_test_oder")
  .put(where);
PagedList<Content> contents = Contents.contents(query);
```

**请求结果 2**

```json
{
  "data": {
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
        "title": "iphone X",
        "pointer_test_order": {
          "created_at": 1538966895,
          "_table": "test_order",
          "id": "5bbac56fbd66033df7fd0aa2",
          "created_by": 61736923,
          "updated_at": 1538966895,
          "pointer_test_order": {
            "created_at": 1538966895,
            "_table": "test_order",
            "id": "5bbac56fbd66033df7fd0aa2",
            "created_by": 61736923,
            "updated_at": 1538966895
          }
        }
      }
    ]
  }
}

```

### 获取分类详情

`Contents.contentCategory(id)`

**`ContentCategory` 结构**

|  参数          | 类型    | 说明 |
| :------------ | :------ | :-- |
| ContentCategory.CHILDREN      |  Array  | 子分类列表 |
| ContentCategory.HAVE_CHILDREN | Boolean | 是否含有子分类 |
| ContentCategory.ID            | String  | 分类 ID |
| ContentCategory.NAME          | String  | 分类名称 |

**ContentCategory请求示例**

```java
Contents.contentCategory("1513076252710475");
```

**返回示例**
```json
{
  "have_children": true,
  "id": 1513076252710475,
  "name": "科技",
  "children": [
    {
      "have_children": false,
      "id": 1514515552050186,
      "name": "评测"
    }
  ]
}
```


### 获取内容库分类列表

`Contents.contentGroups(query)`

**请求示例**

```java
PagedList<ContentGroup> groups = Contents.contentGroups(null);
```


### 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致。

**请求示例**

```java
Query query = new Query().offset(10).limit(5).orderBy("-created_by")
PagedList<ContentGroup> groups = Contents.contentGroups(query);
```