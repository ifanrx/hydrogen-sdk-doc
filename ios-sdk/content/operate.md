# 内容操作

以下操作都需指明操作的内容库，方法如下：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let contentGroup = ContentGroup(Id: "155331****380156")
```
{% content "oc1" %}
```
BaaSContentGroup *contentGroup = [[BaaSContentGroup alloc] initId: @"155331****380156"];
```
{% endtabs %}

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| Id | String | 是  | 内容库 ID |

## 获取内容详情

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let contentId = “155332****126641”
contentGroup.get(contentId) { (content, error) in

}
```
{% content "oc2" %}
```
NSString *contentId = @"155332****126641";
NSArray *select = @[@"title", @"created_by"];
[contentGroup get:contentId completion:^(BaaSContent * _Nullable content, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| Id | String | 是   | 内容 ID |
| select | Array<String> |  N  | 指定筛选的字段，详见[数据表 - 字段过滤](../schema/select-and-expand.md)章节 |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| content  |   Content           | 内容详情，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

## 查询内容

{% tabs swift3_0="Swift", oc3_0="Objective-C" %}
{% content "swift3_0" %}
```
contentGroup.find(completion: { (listResult, error) in

})
```
{% content "oc3_0" %}
```
[_contentGroup findWithQuery:nil completion:^(BaaSContentList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 查询条件，详见[数据表 - 查询](/ios-sdk/schema/query.md) |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | ContentList | 内容列表，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

## 获取指定分类下的内容

{% tabs swift2_1="Swift", oc2_1="Objective-C" %}
{% content "swift2_1" %}
```
contentGroup.find(categoryId: "5cb43f3f66e4804bb158bc4f", completion: { (listResult, error) in

})
```
{% content "oc2_1" %}
```
[_contentGroup findWithCategoryId: @"5cb43f3f66e4804bb158bc4f", query:nil completion:^(BaaSContentList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| categoryId | String | Y  | 内容库 Id |
| query | Query |  N  | 查询条件，详见[数据表 - 查询](/ios-sdk/schema/query.md) |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | ContentList | 内容列表，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

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
| categoryID | String |  是 | 分类 ID |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| contentCategory  |   ContentCategory           | 内容分类详情，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

## 获取内容库分类

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
contentGroup.getCategoryList { (listResult, error) in

}
```
{% content "oc4" %}
```
[contentGroup getCategoryListWithQuery:nil completion:^(BaaSContentCategoryList * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| query | Query |  N  | 查询条件，详见[数据表 - 查询](/ios-sdk/schema/query.md) |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | ContentCategoryList | 内容分类列表结果，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

## 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致。

## 数据类型

### Content

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| Id         |   String  | 内容 Id |
| title |  String    | 名称 |
| desc  |  String  | 描述 |
| cover  |  String | 封面 路径 |
| content  |  String | 实际内容 |
| category |  FileCategory  | 文件分类 |
| groupId |  String   |   分组 Id |
| categories | Array  |  子类 | 
| readCount | Int  |  阅读数 | 
| updatedAt  |  TimeInterval | 更新日期 |
| createdAt | TimeInterval  |   创建日期 | 
| createdById|  String    | 创建者 Id |
| createdBy  |  Dictionary  | 创建者信息 |

### ContentCategory

`ContentCategory` 表示内容所属的分类。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| Id  |   String  | 分类 Id |
| name  |  String  | 分类名 |
| haveChildren  |  Bool | 是否有子类 |
| children | Array  |   子类列表，元素类型为 ContentCategory  | 

### ContentList

`ContentList` 表示一次查询数据库所返回的内容列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回内容的最大个数   |
| offset    | Int  |    返回内容的起始偏移值 |
| totalCount   | Int   |   内容总数，默认为 -1，表示该字段无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| contents  |   Array<Content> | 内容列表，每个元素为 Content 类型   |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.returnTotalCount = true` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)

### ConetentCategoryList

`ContentCategoryList` 表示一次查询数据库所返回的内容分类列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回内容分类的最大个数   |
| offset    | Int  |    返回内容分类的起始偏移值 |
| totalCount   | Int   |   内容分类总数，默认为 -1，表示该字段无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| contentCategorys  |   Array<ContentCategory> | 内容分类列表，每个元素为 `ContentCategory` 类型  |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.returnTotalCount = true` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)