# 文件操作

实例化一个 `FileManager` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

{% tabs swift1="Swift", oc1="Objective-C" %}
{% content "swift1" %}
```
let fileManager = FileManager()
```
{% content "oc1" %}
```
BAASFileManager *fileManager = [[BAAFileManager alloc] init];
```
{% endtabs %}

### 文件上传

`MyFile.upload(fileParams, metaData)`

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let filePath = Bundle.main.path(forResource: "1", ofType: "png")!
                fileManager.upload(filename: "datasource", localPath: filePath, categoryName: "Book", progressBlock: {
                    progress in
                    
    }) { (file, error) in

}
```
{% content "oc2" %}
```
[fileManager uploadWithFilename:@"cover" localPath:filePath categoryName:@"Book" progressBlock:^(NSProgress * _Nullable progress) {

    } completion:^(BAASFile * _Nullable file, NSError * _Nullable error) {

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
fileManager.get(fileId: fileId) { (result, error) in

}
```
{% content "oc3" %}
```
[fileManager getWithFileId:@"" completion:^(BAASFile * _Nullable file, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileId | String |  Y  | 文件 id |

### 删除文件

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
fileManager.delete(fileIds: ["5c98aed0d575a97d5f878224", "5c98aed0d575a97d6e1ace9b"]) { (success, error) in

}
```
{% content "oc4" %}
```
[fileManager deleteWithFileIds:@[@"5c98aed0d575a97d5f878224", @"5c98aed0d575a97d6e1ace9b"] completion:^(BOOL success, NSError * _Nullable error) {

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
| size          | Number | 文件大小，以字节为单位 |
| created_at    | Number | 文件上传时间 |

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

### 获取文件分类列表

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
fileManager.getCategoryList { (categorys, error) in

}
```
{% content "oc5" %}
```
[fileManager getCategoryList:^(NSArray<ContentCategory *> * _Nullable categorys, NSError * _Nullable error) {

}];
```
{% endtabs %}

## 获取分类下的所有文件

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
fileManager.getFileList(categoryId: "435345342345345") { (categorys, error) in

}
```
{% content "oc6" %}
```
[fileManager getFileListWithCategoryId:@"435345342345345" completion:^(NSArray<BAASFile *> * _Nullable files, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-------- |
| categoryID | String  | Y   | 文件分类 ID |

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