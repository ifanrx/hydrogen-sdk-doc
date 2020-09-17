# 内容库操作

## 获取内容库列表

`ContentGroup.find(options)`

**参数说明**

options:

| 参数      | 类型    | 必填 | 默认  | 说明                 |
| :-------- | :------ | :--- | :---- | :------------------- |
| withCount | bool | 否   | false | 是否返回 total_count |
| offset    | int  | 否   | 0     | 偏移量               |
| limit     | int  | 否   | 20    | 最大返回条数         |

**请求示例**

```dart
try {
  ContentList data = await ContentGroup.find(withCount: true, offset: 0, limit: 20);
} catch (e) {
  // 操作失败
}
```

**返回示例**

返回 `ContentList` 类型。详见数据类型章节。

## 获取内容库详情

`ContentGroup.get(contentGroupID)`

**参数说明**

| 参数           | 类型   | 必填 | 说明      |
| :------------- | :----- | :--- | :-------- |
| contentGroupID | int | 是   | 内容库 ID |

**请求示例**


```dart
try {
  int contentGroupID = 1513076211190694;
  ContentGroup data = await ContentGroup.get(contentGroupID);
  print(data.id);
} catch (e) {
  // 操作失败
}
```

**返回示例**

返回 `ContentGroup` 类型。详见数据类型章节。

# 内容操作

以下操作都需指明操作的内容库，方法如下：

`ContentGroup myContentGroup = new ContentGroup(contentGroupID)`

**参数说明**

| 参数           | 类型   | 必填 | 说明      |
| :------------- | :----- | :--- | :-------- |
| contentGroupID | int | 是   | 内容库 ID |

## 获取内容详情

`myContentGroup.getContent(richTextID, select: select, expand: expand)`

**参数说明**

| 参数名     | 类型   | 必填 | 说明    |
| :--------- | :----- | :--- | :------ |
| richTextID | int | 是   | 内容 ID |
| select | String or List<String> | 否   | 指定返回字段 |
| expand | String or List<String> | 否   | 展开字段 |

> **info**
> 如果有自定义字段，则一并返回。

> visit_count 字段，只有在已经开通了[“文章统计”（“阅读数支持”）功能](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/info/)，且该文章的阅读数大于 0 时，才会返回。

> “文章阅读数统计”是一个异步的操作，统计结果略有延迟。

**请求示例**

```dart
try {
  int contentGroupID = 1513076211190694;
  int richTextID = 1514529306082815;
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  Content data = await contentGroup.getContent(richTextID);
} catch (e) {
  // 操作失败
}
```

**返回示例**

返回 `Content` 类型。详见数据类型章节。

## 获取符合筛选条件的内容总数

`myContentGroup.count()`

```dart
try {
  int contentGroupID = 1513076211190694;
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  Query query = new Query();
  query.where(Where.arrayContains('categories', [1513076252710475]));
  int data = await contentGroup.count(query: query);
} catch (e) {
  // 操作失败
}
```

## 查询，获取内容列表

`myContentGroup.query(options)`

**参数说明**

options:

| 参数      | 类型    | 必填 | 默认    | 说明                 |
| :-------- | :------ | :--- | :------ | :------------------- |
| query | Query | 否   | null | 查询条件 |
| withCount | bool | 否   | `false` | 是否返回 total_count |

内容查询与[数据表查询](../schema/query.md)方法一致。

> **info** > `myContentGroup.query()` 接口返回的内容中，不包含 `content` 字段。

**请求示例**

```dart
// 查找该内容库下的所有内容
contentGroup.query();

// 查找该内容库下在指定分类下的内容
try {
  int contentGroupID = 1513076211190694;
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  Query query = new Query();
  query.where(Where.arrayContains('categories', [1513076252710475]));
  ContentList data = await contentGroup.query(query: query);
  print(data.contents);
} catch (e) {
  // 操作失败
}
```

### 筛选字段

select 使用方法可以参考[数据表 - 字段过滤](/flutter-sdk/schema/select-and-expand.md)小节

### 扩展字段

expand 使用方法可以参考[数据表 - 字段扩展](/flutter-sdk/schema/select-and-expand.md)小节

假设 \_richtextcontent 表中有一个类型为 pointer 的字段，名称为 `pointer_test_oder`, 指向了 test_order 表

**请求示例 1**

```dart
try {
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  Content data = await contentGroup.getContent(1513076305938456, expand: 'pointer_test_oder');
  print(data.content);
} catch (e) {
  // 操作失败
}
```

**请求示例 2**

```dart
try {
  int contentGroupID = 1513076211190694;
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  Content data = await contentGroup.getContent(1513076305938456, expand: 'pointer_test_oder', select: ['title', 'pointer_test_oder']);
  print(data.content);
} catch (e) {
  // 操作失败
}
```

## 获取分类详情

`myContentGroup.getCategory(categoryID)`

**OBJECT 参数说明**

| 参数       | 类型   | 必填 | 说明    |
| :--------- | :----- | :--- | :------ |
| categoryID | int | 是   | 分类 ID |

**返回参数**

| 参数          | 类型    | 说明           |
| :------------ | :------ | :------------- |
| children      | List   | 子分类列表     |
| have_children | bool | 是否含有子分类 |
| id            | int  | 分类 ID        |
| name          | String  | 分类名称       |

**请求示例**

```dart
try {
  int contentGroupID = 1513076211190694;
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  ContentCategory data = await contentGroup.getCategory(1513076252710475);
} catch (e) {
  // 操作失败
}
```

**返回示例**

返回 `ContentCategory` 类型。详见数据类型章节。

## 获取内容库分类列表

`myContentGroup.getCategoryList()`

**请求示例**

```dart
try {
  int contentGroupID = 1513076211190694;
  ContentGroup contentGroup = new ContentGroup(contentGroupID);
  ContentCategoryList data = await contentGroup.getCategoryList();
  print(data);
} catch (e) {
  // 操作失败
}
```

## 分页与排序

内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致。


## 数据类型

### Content

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| id         |   int  | 内容 Id |
| title |  String    | 名称 |
| description  |  String  | 描述 |
| cover  |  String | 封面 路径 |
| content  |  String | 实际内容 |
| group_id |  int   |   分组 Id |
| categories | List  |  子类 | 
| visit_count | int  |  阅读数 | 
| updated_at  |  int | 更新日期 |
| created_at | int  |   创建日期 | 
| created_by |  int    | 创建者 Id |
| name |  String   | 列表名称，仅在 find 时有值 |


### ContentCategory

`ContentCategory` 表示内容所属的分类。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| id  |   int  | 分类 Id |
| name  |  String  | 分类名 |
| haveChildren  |  bool | 是否有子类 |
| children | List  |   子类列表，元素类型为 ContentCategory  | 


### ContentList

`ContentList` 表示一次查询数据库所返回的内容列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  int  |  返回内容的最大个数   |
| offset    | int  |    返回内容的起始偏移值 |
| totalCount   | int   |   内容总数，默认为 -1，表示该字段无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| contents  |   List<Content> | 内容列表，每个元素为 Content 类型   |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.withTotalCount(true)` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)


### ContentCategoryList

`ContentCategoryList` 表示一次查询数据库所返回的内容分类列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  int  |  返回内容分类的最大个数   |
| offset    | int  |    返回内容分类的起始偏移值 |
| totalCount   | int   |   内容分类总数，默认为 -1，表示该字段无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| contents  |   List<ContentCategory> | 内容分类列表，每个元素为 `ContentCategory` 类型  |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.withTotalCount(true)` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)