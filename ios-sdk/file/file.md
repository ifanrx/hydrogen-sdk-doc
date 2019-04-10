# 文件操作

实例化一个 `FileManager` 对象，以下操作都是在该对象上进行操作。获取一个单例对象：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
FileManager.shared
```
{% content "oc1" %}
```
BaaSFileManager.shared
```
{% endtabs %}

### 文件上传

`MyFile.upload(fileParams, metaData)`

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let filePath = Bundle.main.path(forResource: "1", ofType: "png")!
FileManager.shared.upload(filename: "datasource", localPath: filePath, categoryName: "Book", progressBlock: { progress in
                    
    }) { (file, error) in

}
```
{% content "oc2" %}
```
[BaaSFileManager.shared uploadWithFilename:@"cover" localPath:filePath categoryName:@"Book" progressBlock:^(NSProgress * _Nullable progress) {

    } completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {

}];
```
{% endtabs %}

**fileParams 参数说明（必须）**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| filePath | String |  Y  | 本地资源路径 |
| filename | String |  Y  |  文件名称|
| categoryName | String | N  | 文件分类  |

### 获取文件详情

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
let fileId = "5c98b065d575a97d5f878225"
FileManager.shared.get(fileId) { (result, error) in

}
```
{% content "oc3" %}
```
NString *fileId = @"5c98b065d575a97d5f878225";
[BaaSFileManager.shared get:fileId query:nil completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileId | String |  Y  | 文件 id |
| query | Query |  N  | 设置过滤字段 |

### 删除一个文件

> 获取一个 File 对象实例后，该实例可以删除对应的文件，在知晓云服务器删除成功后，该实例并没有被 SDK 清除，建议开发自行清除。

{% tabs swift4_1="Swift", oc4_1="Objective-C" %}
{% content "swift4_1" %}
```
file.delete() { (result, error) in

}
```
{% content "oc4_1" %}
```
[file delete:^(BOOL success, NSError * _Nullable error) {

}];
```
{% endtabs %}

### 删除多个文件

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
FileManager.shared.delete(["5c98aed0d575a97d5f878224", "5c98aed0d575a97d6e1ace9b"]) { (success, error) in

}
```
{% content "oc4" %}
```
[BaaSFileManager.shared delete:@[@"5c98aed0d575a97d5f878224", @"5c98aed0d575a97d6e1ace9b"] completion:^(BOOL success, NSError * _Nullable error) {

}];

```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileId | Array |  Y  | 需要删除的文件 id |

### 查询，获取文件列表

文件查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

### 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| name          | String | 文件名 |
| size          | Int | 文件大小，以字节为单位 |
| created_at    | TimeInterval | 文件上传时间 |

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

### 获取文件分类列表

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
FileManager.shared.getCategoryList() { (result, error) in

                }
```
{% content "oc5" %}
```
[BaaSFileManager.shared getCategoryListWithQuery:nil completion:^(BaaSFileCategoryListResult * _Nullable listResult, NSError * _Nullable) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| query | Query |  N  | 查询条件 |

## 获取分类下的文件

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
FileManager.shared.getFileList(categoryId: "5ca489bb8c374f5039a8062b") { (result, error) in

}
```
{% content "oc6" %}
```
[BaaSFileManager.shared getFileListWithCategoryId:@"5ca489bb8c374f5039a8062b" query:nil completion:^(BaaSFileListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-------- |
| categoryID | String  | Y   | 文件分类 ID |
| query      | Query   |  N  | 查询条件 |

> **info**
> 如需对分类下的文件进行更多条件的筛选，可使用 [File](./file.md) 的查询接口

## 查询，获取分类列表

文件分类查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选：

| 支持字段 | 类型   | 说明 |
| :----- | :----- | :-- |
| id     | String | 文件分类 ID |
| name   | String | 文件分类名 |

## 排序

文件分类查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序：

| 支持字段    | 描述        |
| :--------- | :--------- |
| name       | 文件名      |
| created_at | 文件创建时间 |

## 分页
文件分类查询排序与[数据表分页](../schema/limit-and-order.md)方法一致。