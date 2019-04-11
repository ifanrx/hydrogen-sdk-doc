# 内容操作

以下操作都需指明操作的内容库，方法如下：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let contentGroup = ContentGroup(Id: 155331****380156)
```
{% content "oc1" %}
```
BaaSContentGroup *contentGroup = [[BaaSContentGroup alloc] initId: 155331****380156];
```
{% endtabs %}

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| Id | Int64 | 是  | 内容库 ID |

## 获取内容详情

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let contentId = 155332****126641
let select = ["title", "name", "created_by"]
let expand = ["created_by"]
contentGroup.get(contentId, select: select, expand: expand) { (content, error) in

}
```
{% content "oc2" %}
```
long long = 155332****126641;
NSArray *select = @[@"title", @"created_by"];
NSArray *expand = @[@"created_by"];
[contentGroup get:contentId select:select expand:expand completion:^(BaaSContent * _Nullable content, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| Id | Int64 | 是   | 内容 ID |
| select | Array<String> |  N  | 指定筛选的字段，详见[数据表 - 字段过滤](../schema/select-and-expand.md)章节 |
| expand | Array<String> |  N  | 指定扩展的字段，详见[数据表 - 字段扩展](../schema/select-and-expand.md)章节 |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| content  |   Content           | 内容详情，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 查询，获取内容列表

内容查询与[数据表查询](../schema/query.md)方法一致。

## 获取分类详情

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
contentGroup.getCategory(Id: categoryId) { (category, error) in

}
```
{% content "oc3" %}
```
[contentGroup getCategoryWithId:categoryId completion:^(BaaSContentCategory * _Nullable category, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----  | :-- | :-- |
| categoryID | Int64 |  是 | 分类 ID |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| contentCategory  |   ContentCategory           | 内容分类详情，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 获取内容库分类列表

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
contentGroup.getCategoryList { (listResult, error) in

}
```
{% content "oc4" %}
```
[contentGroup getCategoryListWithQuery:nil completion:^(BaaSContentCategoryListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| query | Query |  N  | 设置过滤字段 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | ContentCategoryListResult | 内容分类列表结果，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致。

## 数据类型

### Content

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| Id         |   Int64  | 内容 Id |
| title |  String    | 名称 |
| desc  |  String  | 描述 |
| cover  |  String | 封面 路径 |
| content  |  String | 实际内容 |
| category |  FileCategory  | 文件分类 |
| groupId |  Int64   |   分组 Id |
| categories | Array  |  子类 | 
| readCount | Int  |  阅读数 | 
| updatedAt  |  TimeInterval | 更新日期 |
| createdAt | TimeInterval  |   创建日期 | 
| createdById|  Int64    | 创建者 Id |
| createdBy  |  Dictionary  | 创建者信息 |

### ContentCategory

`ContentCategory` 表示内容所属的分类。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| Id  |   Int64  | 分类 Id |
| name  |  String  | 分类名 |
| haveChildren  |  Bool | 是否有子类 |
| children | Array  |   子类列表，元素类型为 ContentCategory  | 

### ContentListResult

`ContentListResult` 表示一次查询数据库所返回的内容列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回内容的最大个数   |
| offset    | Int  |    返回内容的起始偏移值 |
| totalCount   | Int   |   实际返回的内容总数 |
| contents  |   Array<Content> | 内容列表，每个元素为 Content 类型   |

### ConetentCategoryListResult

`ContentCategoryListResult` 表示一次查询数据库所返回的内容分类列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回内容分类的最大个数   |
| offset    | Int  |    返回内容分类的起始偏移值 |
| totalCount   | Int   |   实际返回的内容分类总数 |
| contentCategorys  |   Array<ContentCategory> | 内容分类列表，每个元素为 ContentCategory 类型   |