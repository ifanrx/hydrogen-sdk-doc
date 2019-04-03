# 内容操作

以下操作都需指明操作的内容库，方法如下：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let contentGroup = ContentGroup(contentGroupId: "1553312765380156")
```
{% content "oc1" %}
```
BAASContentGroup *contentGroup = [[BAASContentGroup alloc] initWithContentGroupId: @"1553312765380156"];
```
{% endtabs %}

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------- | :----- | :-- | :-- |
| contentGroupID | String | 是  | 内容库 ID |

### 获取内容详情

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let contentId = "1553329603126641"
contentGroup.get(contentId: contentId) { (result, error) in

}
```
{% content "oc2" %}
```
NSString *contentId = @"1553329603126641";
[_contentGroup getWithContentId:contentId completion:^(BAASContent * _Nullable content, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数名      | 类型   | 必填  | 说明 |
| :--------- | :----- | :--- | :-- |
| contentId | String | 是   | 内容 ID |

### 查询，获取内容列表

内容查询与[数据表查询](../schema/query.md)方法一致。

#### 筛选字段 

select 使用方法可以参考[数据表 - 字段过滤](/ios-sdk/schema/select-and-expand.md)小节

#### 扩展字段 

expand 使用方法可以参考[数据表 - 字段扩展](/ios-sdk/schema/select-and-expand.md)小节

### 获取分类详情

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
contentGroup.getCategory(Id: categoryId) { (result, error) in

}
```
{% content "oc3" %}
```
[contentGroup getCategoryWithId:categoryId completion:^(ContentCategory * _Nullable category, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----  | :-- | :-- |
| categoryID | String |  是 | 分类 ID |

### 获取内容库分类列表

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
contentGroup.getCategoryList { (result, error) in

}
```
{% content "oc4" %}
```
[contentGroup getCategoryList:^(NSArray<ContentCategory *> * _Nullable categorys, NSError * _Nullable error) {

}];
```
{% endtabs %}

### 分页与排序
内容查询的分页与排序操作和[数据表分页与排序](../schema/limit-and-order.md)方法一致。
