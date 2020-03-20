# 文件

## 文件操作

### 文件上传

文件上传支持两种方式：

1. 指定文件的本地路径
2. 指定文件的内容数据 

#### 指定文件的本地路径

{% tabs swift2="Swift", oc2="Objective-C" %}
{% content "swift2" %}
```
let localPath = Bundle.main.path(forResource: "cover", ofType: "png")!
FileManager.upload(filename: "datasource", localPath: filePath, categoryName: "Book", progressBlock: { progress in
                    
    }) { (file, error) in

}
```
{% content "oc2" %}
```
[BaaSFileManager uploadWithFilename:@"cover" localPath:localPath categoryName:@"Book" progressBlock:^(NSProgress * _Nullable progress) {

    } completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| filename | String |  Y  |  文件名称|
| localPath | String |  Y  | 本地资源路径 |
| categoryName | String | N  | 文件分类  |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| file  |   File           | 已上传的文件，详见 **数据类型** 小节 |
| progress  |   Progress    | 上传进度，详见[文档](https://developer.apple.com/documentation/foundation/progress) |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

#### 指定文件的本地路径及文件类型

{% tabs swift2_1="Swift", oc2_1="Objective-C" %}
{% content "swift2_1" %}
```
let localPath = Bundle.main.path(forResource: "cover", ofType: "png")!
FileManager.upload(filename: "cover", localPath: filePath, mimeType: "image/png", categoryName: "book", progressBlock: { progress in
                                
    }, completion: {file, error in

})
```
{% content "oc2_1" %}
```
[BaaSFileManager uploadWithFilename:@"cover" localPath:filePath mimeType:@"image/png" categoryName:@"book" categoryId:nil progressBlock:^(NSProgress * _Nullable progess) {
                        
    } completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| filename | String |  Y  |  文件名称|
| localPath | String |  Y  | 本地资源路径 |
| categoryName | String | N  | 文件分类名称  |
| categoryId | String | N  | 文件分类 Id  |
| mimeType  | String | N   | 文件类型  |

若同时指定 categoryId 及 categoryName ，将优先使用 categoryId。

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| file  |   File           | 已上传的文件，详见 **数据类型** 小节 |
| progress  |   Progress    | 上传进度 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

#### 指定文件数据及文件类型

{% tabs swift2_2="Swift", oc2_2="Objective-C" %}
{% content "swift2" %}
```
FileManager.upload(filename: "cover", fileData: fileData, categoryName: "book", progressBlock: { (progress) in
                
    }) { (file, error) in
                
}
```
{% content "oc2_2" %}
```
[BaaSFileManager uploadWithFilename:@"cover" fileData:fileData mimeType:@"image/png" categoryName:@"book" categoryId:nil progressBlock:^(NSProgress * _Nullable progress) {
                        
    } completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {
                        
}];
```
{% endtabs %}

**参数说明**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| filename | String |  Y  |  文件名称|
| fileData | Data |  Y  | 文件的内容数据 |
| categoryName | String | N  | 文件分类名称  |
| categoryId | String | N  | 文件分类 Id  |
| mimeType  | String | N   | 文件类型  |

若同时指定 categoryId 及 categoryName ，将优先使用 categoryId。

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| file  |   File           | 已上传的文件，详见 **数据类型** 小节 |
| progress  |   Progress    | 上传进度 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

### 获取文件详情

{% tabs swift3="Swift", oc3="Objective-C" %}
{% content "swift3" %}
```
let fileId = "5c98b065d575a97d5f878225"
FileManager.get(fileId) { (result, error) in

}
```
{% content "oc3" %}
```
NString *fileId = @"5c98b065d575a97d5f878225";
[BaaSFileManager get:fileId, completion:^(BaaSFile * _Nullable file, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| fileId | String |  Y  | 文件 id |

**返回结果**

| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| file  |   File           | 已上传的文件，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

### 删除本文件

> **info**
> 获取一个 File 对象实例后，该实例可以删除对应的文件，在知晓云服务器删除成功后，该本地实例并没有被 SDK 清除，建议开发自行清除。

{% tabs swift4_1="Swift", oc4_1="Objective-C" %}
{% content "swift4_1" %}
```
file.delete() { (success, error) in

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

### 删除多个文件

{% tabs swift4="Swift", oc4="Objective-C" %}
{% content "swift4" %}
```
FileManager.delete(["5c98aed0d575****5f878224", "5c98aed0d575****6e1ace9b"]) { (success, error) in

}
```
{% content "oc4" %}
```
[BaaSFileManager delete:@[@"5c98aed0d5****7d5f878224", @"5c98aed0d575****6e1ace9b"] completion:^(BOOL success, NSError * _Nullable error) {

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
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

## 文件列表

### 查询文件

文件查询与[数据表-查询](../schema/query.md)方法一致，但只支持对以下指定字段进行查询。

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| id            | String | 文件 id |
| name          | String | 文件名 |
| size          | Int| 文件大小，以字节为单位 |
| category_id   | String | 文件分类 id |
| category_name | String | 文件分类名 |
| created_at    | TimeInterval| 创建时间 （格式为 unix 时间戳） |

{% tabs swift5_0="Swift", oc5_0="Objective-C" %}
{% content "swift5_0" %}
```
FileManager.find(completion: { (listResult, error) in

})
```
{% content "oc5_0" %}
```
[BaaSFileManager findWithQuery:nil completion:^(BaaSContentList * _Nullable listResult, NSError * _Nullable error) {

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
| listResult  | FileList | 文件列表，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

### 排序

文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| name          | String | 文件名 |
| size          | Int | 文件大小，以字节为单位 |
| created_at    | TimeInterval | 文件上传时间 |

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

## 文件分类

### 获取文件分类

{% tabs swift5_1="Swift", oc5_1="Objective-C" %}
{% content "swift5_1" %}
```
FileManager.getCategory("5ca489bb8c374f5039a8062b") {category, error in

}
```
{% content "oc5_1" %}
```
[BaaSFileManager getCategory:@"5ca489bb8c374f5039a8062b" completion:^(BaaSFileCategory * _Nullable category, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| id | String |  Y  | 分类 id |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| category  | FileCategory | 文件分类，详见**数据类型** 小节|
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

### 查询指定分类下的文件

{% tabs swift6="Swift", oc6="Objective-C" %}
{% content "swift6" %}
```
FileManager.find(categoryId: "5ca489bb8c374f5039a8****") { (result, error) in

}
```
{% content "oc6" %}
```
[BaaSFileManager findWithCategoryId:@"5ca489bb8c374f5039a8****" query:nil completion:^(BaaSFileListResult * _Nullable listResult, NSError * _Nullable error) {

}];
```
{% endtabs %}

**参数说明**

| 参数        | 类型    | 必填 | 说明 |
| :--------- | :------ | :-- | :-------- |
| categoryID | String  | Y   | 文件分类 ID |
| query      | Query   |  N  | 查询条件，详见[数据表 - 查询](/ios-sdk/schema/query.md) |

**返回结果**
 
| 名称      | 类型           | 说明 |
| :------- | :------------  | :------ |
| listResult  | FileList | 文件列表结果，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，详见[错误处理和错误码](/ios-sdk/error-code.md)  |

### 查询文件分类

文件分类查询与[数据表查询](../schema/query.md)方法一致，但只支持对以下指定字段进行查询：

| 支持字段 | 类型   | 说明 |
| :----- | :----- | :-- |
| id     | String | 文件分类 ID |
| name   | String | 文件分类名 |

{% tabs swift5="Swift", oc5="Objective-C" %}
{% content "swift5" %}
```
FileManager.getCategoryList() { (result, error) in

}
```
{% content "oc5" %}
```
[BaaSFileManager getCategoryListWithQuery:nil completion:^(BaaSFileCategoryList * _Nullable listResult, NSError * _Nullable) {

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
| listResult  | FileCategoryList | 文件分类列表结果，详见 **数据类型** 小节 |
| error   |  NSError |  错误信息，参考[错误处理和错误码](/ios-sdk/error-code.md)  |

### 排序

文件分类查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序：

| 支持字段    | 描述        |
| :--------- | :--------- |
| name       | 文件名      |
| created_at | 文件创建时间 |

### 分页
文件分类列表分页与[数据表分页](../schema/limit-and-order.md)方法一致。

## 图片云处理

利用 CDN 图片云处理，可以快速便捷地完成图片缩放、裁切、打水印等操作，示例如下：

```
// 缩放图片至 400x400
https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eRuaPvwdleauqyZ.jpg!/both/400x400

// 在图片右下角添加 “知晓云” 文字水印
https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eiuEUuISgOstoVZ.png!/watermark/align/southeast/text/55+l5pmT5LqRCg==
```

具体用法和更多功能可查看文档：[如何通过图片 URL 进行图片云处理？](http://support.minapp.com/hc/kb/article/1082737/)

## 视频截图

{% tabs swift7="Swift", oc7="Objective-C" %}
{% content "swift7" %}
```
let params: [String: Any] = ["source": "5c4a6db320fa9c2e054c6c36",
                             "save_as": "ios_snapshot.png",
                             "point": "00:00:10",
                             "category_id": "5d89b531619f0641755294b1",
                             "random_file_link": false]
FileManager.genVideoSnapshot(params) { (result, error) in

}
```
{% content "oc7" %}
```
NSDictionary *params = @{
                        @"source": @"5c4a6db320fa9c2e054c6c36",
                        @"save_as": @"ios_snapshot.png",
                        @"point": @"00:00:10",
                        @"category_id": @"5d89b531619f0641755294b1",
                        @"random_file_link": @NO };
[BaaSFileManager genVideoSnapshot:params completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| source | String |  Y  | 视频文件的 id |
| save_as | String |  Y  | 截图保存的文件名 |
| point | String |  Y  | 截图时间格式，格式：HH:MM:SS |
| category_id | String |  N  | 文件所属类别 ID |
| random_file_link | Bool |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| size | String |  N  | 截图尺寸，格式为 宽 x 高，默认是视频尺寸 |
| format | String |  N  | 截图格式，可选值为 jpg，png, webp, 默认根据 save_as 的后缀生成 |

**返回参数说明**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   |  | 创建时间 （格式为 unix 时间戳) |
| path   | String | 路径 |
| created_by   | String | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Int | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | String | 引用 |
| cdn_path   | String | cdn 中保存的路径 |
| updated_at   | TimeInterval | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| _id   | String | 本条记录 ID |

## M3U8 视频拼接

{% tabs swift8="Swift", oc8="Objective-C" %}
{% content "swift8" %}
```
let params: [String: Any] = ["m3u8s": ["5c4a699820fa9c27f14c6ddd", "5c4a685520fa9c27f14c6d48"],
                             "save_as": "ios_concat.m3u8",
                             "category_id": "5d89b531619f0641755294b1",
                             "random_file_link": false]
FileManager.videoConcat(params) { (result, error) in

}
```
{% content "oc8" %}
```
NSDictionary *params = @{
                        @"m3u8s": @[@"5c4a699820fa9c27f14c6ddd", @"5c4a685520fa9c27f14c6d48"],
                        @"save_as": @"ios_concat.m3u8",
                        @"category_id": @"5d89b531619f0641755294b1",
                        @"random_file_link": @NO, };
[BaaSFileManager videoConcat:params completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| m3u8s | Array<String> |  Y  | 视频文件的 id 列表，按提交的顺序进行拼接 |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Bool |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

**返回参数说明**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | TimeInterval | 创建时间 （格式为 unix 时间戳) |
| path   | String | 路径 |
| created_by   | String | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Int | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | String | 引用 |
| cdn_path   | String | cdn 中保存的路径 |
| updated_at   | TimeInterval | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| _id   | String | 本条记录 ID |

## M3U8 视频剪辑

{% tabs swift9="Swift", oc9="Objective-C" %}
{% content "swift9" %}
```
let params: [String: Any] = ["m3u8": "5c452bebfe10832bf97846c9",
                             "include": [0, 20],
                             "save_as": "ios_0s_20s.m3u8",
                             "category_id": "5d89b531619f0641755294b1",
                             "random_file_link": false]
FileManager.videoClip(params) { (result, error) in
}
```
{% content "oc9" %}
```
NSDictionary *params = @{
                        @"m3u8": @"5c452bebfe10832bf97846c9",
                        @"include": @[@0, @20],
                        @"save_as": @"0s_20s.m3u8",
                        @"category_id": @"5d89b531619f0641755294b1",
                        @"random_file_link": @NO };
[BaaSFileManager videoClip:params completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Bool |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| include   | Array |  N  | 包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| exclude   | Array |  N  | 不包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| index   | Bool |  N  | include 或者 exclude 中的值是否为 ts 分片序号，默认为 false |


**返回参数说明**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | TimeInterval | 创建时间 （格式为 unix 时间戳) |
| path   | String | 路径 |
| created_by   | Int64 | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Int | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | String | 引用 |
| cdn_path   | String | cdn 中保存的路径 |
| updated_at   | TimeInterval | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| _id   | String | 本条记录 ID |

## M3U8 时长和分片信息

{% tabs swift10="Swift", oc10="Objective-C" %}
{% content "swift10" %}
```
FileManager.videoMeta("5c452bebfe10832bf97846c9") { (result, error) in

}
```
{% content "oc10" %}
```
[BaaSFileManager videoMeta:@"5c452bebfe10832bf97846c9" completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |

**返回参数说明**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| status_code   | Integer | 状态码 |
| message   | String | 返回信息 |
| meta   | Object | 详见以下 |

meta 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| duartion   | Float | m3u8 时长 |
| points   | Array | 时间点 |


## 音视频的元信息

{% tabs swift11="Swift", oc11="Objective-C" %}
{% content "swift11" %}
```
FileManager.videoAudioMeta("5c452bd5fe10832af07846f1") { (result, error) in

}
```
{% content "oc11" %}
```
[BaaSFileManager videoAudioMeta:@"5c452bd5fe10832af07846f1" completion:^(NSDictionary<NSString *,id> * _Nullable result, NSError * _Nullable error) {

}];
```
{% endtabs %}

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source   | String |  Y  | 文件的 id |

**返回参数说明**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| format   | Dictionary | 音视频格式信息，详见以下 |
| streams   | Array | stream 列表，详见以下 |

format 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| bitrate   | Int | 比特率 |
| duration   | Float | 时长 |
| format   | String | 容器格式 |
| fullname   | String | 容器格式全称 |

streams 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| index   | Int | 表示第几路流 |
| type   | String | 一般情况下, video 或 audio |
| bitrate   | Int | 流码率 |
| codec   | String | 流编码 |
| codec_desc   | String | 流编码说明 |
| duration   | Float | 流时长 |
| video_fps   | Float | (视频流)视频帧数 |
| video_height   | Int | (视频流)视频高度 |
| video_width   | Int | (视频流)视频宽度 |
| audio_channels   | Int | (音频流)音频通道数 |
| audio_samplerate   | Int | (音频流)音频采样率 |

## 数据类型

### File

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| id         |   String  | 文件 Id |
| mimeType |  String    | 文件类型 |
| name  |  String  | 文件名 |
| cdnPath  |  String | 文件在 CDN 中的路径 |
| path  |  String | 文件上传成功后的访问地址 |
| size  |  Int | 文件大小 |
| category |  FileCategory  | 文件分类 |
| localPath |  String   |   本地路径 |
| createdAt | TimeInterval  |   创建日期 | 

### FileCategory

`FileCategory` 表示文件所属的分类。

| 属性         |  类型   | 说明 |
| :--------- | :---     | :--- |
| Id  |   String  | 分类 Id |
| mimeType |  String    | 文件类型 |
| name  |  String  | 分类名 |
| files  |  Int | 该分类的文件数量 |
| updatedAt  |  TimeInterval | 更新日期 |
| createdAt | TimeInterval  |   创建日期 | 

### FileList

`FileList` 表示一次查询数据库所返回的文件列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回文件的最大个数   |
| offset    | Int  |    返回文件的起始偏移值 |
| totalCount   | Int   |   文件总数，默认为 -1，表示该属性无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| files  |   Array<File> | 文件列表，每个元素为 File 类型   |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.returnTotalCount = true` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)

### FileCategoryList

`FileCategoryList` 表示一次查询数据库所返回的文件分类列表以及元数据。

| 属性       |  类型    |  说明 |
| :--------- | :--- | :----   |
| limit     |  Int  |  返回文件分类的最大个数 |
| offset    | Int  |    返回文件分类的起始偏移值 |
| totalCount   | Int   |   文件分类总数，默认为 -1，表示该属性无效 |
| next      | String  |   下一页地址，若值为 `null`，表示当前为最后一页 |
| previous  | String  |    上一页地址，若值为 `null`，表示当前为第一页 |
| fileCategorys  |   Array<FileCategory> | 文件分类列表，每个元素为 FileCategory 类型  |

> **info**
> 返回结果默认不包含 totalCount，如需获取该值可以在设置查询条件 `Query` 时，通过设置 `query.returnTotalCount true` 来获取 totalCount。详见[获取记录总数](../schema/limit-and-order.md)
