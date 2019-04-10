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

**参数说明**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| filePath | String |  Y  | 本地资源路径 |
| filename | String |  Y  |  文件名称|
| categoryName | String | N  | 文件分类  |

**返回结果**
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| file  |   File           | 已上传的文件，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

### 获取文件详情

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
let fileId = "5c98b065d575a97d5f878225"
let select = ["name", "created_by"]
let expand = ["created_by"]
FileManager.shared.get(fileId, select: select, expand: expand) { (result, error) in

}
```
{% content "oc3" %}
```
NString *fileId = @"5c98b065d575a97d5f878225";
NSArray *select = @[@"name", @"created_by"];
NSArray *expand = @[@"created_by"];
[BaaSFileManager.shared get:fileId select:select expand:expand completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| fileId | String |  Y  | 文件 id |
| select | Array<String> |  N  | 指定筛选的字段，详见[数据表 - 字段过滤](./select-and-expand.md)章节 |
| expand | Array<String> |  N  | 指定扩展的字段，详见[数据表 - 字段扩展](./select-and-expand.md)章节 |

**返回结果**
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| file  |   File           | 已上传的文件，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

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

**返回结果**
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  |   Bool           | 是否删除成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

### 删除多个文件

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
FileManager.shared.delete(["5c98aed0d575****5f878224", "5c98aed0d575****6e1ace9b"]) { (success, error) in

}
```
{% content "oc4" %}
```
[BaaSFileManager.shared delete:@[@"5c98aed0d5****7d5f878224", @"5c98aed0d575****6e1ace9b"] completion:^(BOOL success, NSError * _Nullable error) {

}];

```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileId | Array |  Y  | 需要删除的文件 id |

**返回结果**
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| success  |   Bool           | 是否删除成功 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

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

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | FileCategoryListResult | 文件分类列表结果，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

## 获取分类下的文件

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
FileManager.shared.getFileList(categoryId: "5ca489bb8c374f5039a8****") { (result, error) in

}
```
{% content "oc6" %}
```
[BaaSFileManager.shared getFileListWithCategoryId:@"5ca489bb8c374f5039a8****" query:nil completion:^(BaaSFileListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-------- |
| categoryID | String  | Y   | 文件分类 ID |
| query      | Query   |  N  | 查询条件 |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | FileListResult | 文件列表结果，详见 **数据类型** 小节 |
| error   |  HError(Swift) / NSError(OC) |  错误信息  |

error 对象结构请参考[错误处理和错误码](/ios-sdk/error-code.md)

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

## 数据类型

### File

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| id         |   String  | 文件 Id |
| mimeType |  String    | 文件类型 |
| name  |  String  | 文件名 |
| cdnPath  |  String | cdn 路径 |
| size  |  Int | 文件大小 |
| category |  FileCategory  | 文件分类 |
| localPath |  String   |   本地路径 |
| createdAt | TimeInterval  |   创建日期 | 

### FileCategory

`FileCategory` 表示文件所属的分类。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| categoryId  |   String  | 分类 Id |
| mimeType |  String    | 文件类型 |
| name  |  String  | 分类名 |
| files  |  Int | 该分类的文件数量 |
| updatedAt  |  TimeInterval | 更新日期 |
| createdAt | TimeInterval  |   创建日期 | 

### FileListResult

`FileListResult` 表示一次查询数据库所返回的文件列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回文件的最大个数   |
| offset    | Int  |    返回文件的起始偏移值 |
| totalCount   | Int   |   实际返回的文件总数 |
| files  |   Array<File> | 文件列表，每个元素为 File 类型   |

### FileCategoryListResult

`FileCategoryListResult` 表示一次查询数据库所返回的文件分类列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回文件分类的最大个数 |
| offset    | Int  |    返回文件分类的起始偏移值 |
| totalCount   | Int   |   实际返回的文件分类总数 |
| fileCategorys  |   Array<FileCategory> | 文件分类列表，每个元素为 FileCategory 类型   |