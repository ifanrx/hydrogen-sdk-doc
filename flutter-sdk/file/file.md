{% import "/js-sdk/macro/total_count.md" as totalCount %}

# 文件操作

## 文件上传

`FileManager.upload(File file, Map<String, dynamic> metaData)`

**metaData 参数说明（可选）**

| 参数                   |  类型  | 必填 | 说明 |
| :---------------------| :----- | :--- | :--- |
| categoryID            | String |  N  | 要上传的文件分类 ID |
| categoryName          | String |  N  | 要上传的文件分类名 |

> **info**
> 请勿同时填写 categoryID 和 categoryName，默认只使用 categoryID

**返回 `CloudFile` 对象**

| 参数           |  类型        | 说明 |
| :------------ | :-----       | :--- |
| id            | String       | 文件 id |
| name          | String       | 文件名 |
| size          | int          | 文件大小，以字节为单位 |
| category      | FileCategory | 文件归属的目录 |
| path          | String       | 上传成功后的访问地址 URL |
| cdn_path      | String       | 文件在 CDN 中的相对路径 |
| created_at    | int          | 创建时间 （格式为 unix 时间戳） |
| mime_type     | String       | 文件媒体类型 |
| media_type    | String       | 如果是视频/图片，表示文件的格式 |

**示例代码**

```Dart
import 'dart:io';
import 'package:file_picker/file_picker.dart';

try {
  Map<String, dynamic> metaData = {
    'categoryID': currentCate,
  };
  File file = await FilePicker.getFile();
  CloudFile cloudFile = await FileManager.upload(file, metaData);
  // 操作成功
} catch (e) {
  // 操作失败
}
```

## 获取文件详情

`FileManager.get(String fileID)`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| fileID | String |  Y  | 文件 id |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  CloudFile MyFile = await FileManager.get('5a2fe93308443e313a428c4f');
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

## 删除文件

`FileManager.delete(fileID)`

**参数说明**

| 参数    | 类型                   | 必填 | 说明 |
| :----- | :--------------------- | :-- | :-- |
| fileID | String or `List<String>` | Y   | 文件 id (可为数组) |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  await FileManager.delete('5a2fe93308443e313a428c4f');
  await FileManager.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件

## 文件列表

### 查询，获取文件列表

`FileManager.find([Query query])`

文件查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| id            | String | 文件 id |
| name          | String | 文件名 |
| size          | Integer| 文件大小，以字节为单位 |
| category_id   | String | 文件分类 id |
| category_name | String | 文件分类名 |
| created_at    | Integer| 创建时间 （格式为 unix 时间戳） |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  // 查找所有文件
  CloudFileList cloudFiles = await FileManager.find();

  Query query = new Query();
  // 查询某一文件分类下的所有文件
  Where where = Where.compare('category_name', '=', categoryName);
  // 查询文件名包含指定字符串的文件
  Where where = Where.contains('name', substr);

  query.where(where);
  CloudFileList cloudFiles = await FileManager.find(query);
  // 操作成功
} on HError catch (e) {
  // 操作失败
}
```

### 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| name          | String | 文件名 |
| size          | Number | 文件大小，以字节为单位 |
| created_at    | Number | 文件上传时间 |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Query query = Query();
  query.orderBy('-created_at');
  CloudFileList cloudFiles = await FileManager.find(query);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Query query = Query();
  query
    ..limit(10)
    ..offset(5);
  CloudFileList cloudFiles = await FileManager.find(query);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

## 文件分类

### 获取文件分类

`FileManager.getCategory(String cateID)`

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| cateID     | String | Y   | 文件分类 ID |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  FileCategory cate = await FileManager.getCategory('5a2fe91508443e3123dbe1cb');
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

### 查询指定分类下的文件

`FileManager.find([Query query])`

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Query query = Query();
  Where where = Where.compare('category_id', '=', '5a2fe91508443e3123dbe1cb');
  query.where(where);
  CloudFileList files = await FileManager.find(query);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| query      | Query  | N   | 查询条件，详见[数据表 - 查询](../schema/query.md) |

## 查询文件分类

`FileManager.getCategoryList([Query query])`

文件分类查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选：

```Dart
import 'package:minapp/minapp.dart';

try {
  FileCategoryList cates = await FileManager.getCategoryList();
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

**参数说明**

| 参数        | 类型   | 必填 | 说明 |
| :--------- | :----- | :-- | :-- |
| query      | Query  | N   | 查询条件，详见[数据表 - 查询](../schema/query.md) |

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

> **info**
> SDK 版本要求 >= 1.16.0

`FileManager.genVideoSnapshot(Map<String, dynamic> params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| source | String |  Y  | 视频文件的 id |
| save_as | String |  Y  | 截图保存的文件名 |
| point | String |  Y  | 截图时间格式，格式：HH:MM:SS |
| category_id | String |  N  | 文件所属类别 ID |
| random_file_link | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| size | String |  N  | 截图尺寸，格式为 宽 x 高，默认是视频尺寸 |
| format | String |  N  | 截图格式，可选值为 jpg，png, webp, 默认根据 save_as 的后缀生成 |

**返回参数说明**

res:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | Integer | 创建时间 （格式为 unix 时间戳) |
| path   | String | 上传成功后的访问地址 URL |
| created_by   | Integer | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Integer | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | String | 引用 |
| cdn_path   | String | 文件在 CDN 中的相对路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| _id   | String | 本条记录 ID |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Map<String, dynamic> params = {
    "source": "xxxxxxxxxx",
    "save_as": "hello.png",
    "point": "00:00:10",
    "category_id": "5c18bc794e1e8d20dbfcddcc",
    "random_file_link": false
  };
  Map<String, dynamic> cover = await FileManager.genVideoSnapshot(params)
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**返回示例**

```json
{
  "created_at": 1547461561,
  "path": null,
  "created_by_id": 16042162,
  "mime_type": "image/png",
  "media_type": "image",
  "size": 99391,
  "name": "1gizRRuY71ZUcSZX.png",
  "status": "success",
  "reference": "",
  "cdn_path": "1gizRRRdklnf7gCD.png",
  "updated_at": 1547461561,
  "categories": [],
  "_id": "5c3c63b9d1606e0b3fc7acb7"
}
```

## M3U8 视频拼接

`FileManager.videoConcat(Map<String, dynamic> params)`

**params参数说明**

|  参数               |  类型   | 必填 | 说明 |
| :-----             | :----   | :-- | :-- |
| m3u8s              | Array   |  Y  | 视频文件的 id 列表，按提交的顺序进行拼接 |
| save_as            | String  |  Y  | 截图保存的文件名 |
| category_id        | String  |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

**返回参数说明**

Map<String, dynamic> res:

| 参数          | 类型      | 说明 |
| :---------   | :-----    | :------ |
| created_at   | Integer   | 创建时间 （格式为 unix 时间戳) |
| path         | String    | 上传成功后的访问地址 URL |
| created_by   | Integer   | 创建者 id |
| mime_type    | String    | mime_type 类型 |
| media_type   | String    | 媒体类型 |
| size         | Integer   | 文件大小 |
| name         | String    | 文件名 |
| status       | String    | 文件状态 |
| reference    | String    | 引用 |
| cdn_path     | String    | 文件在 CDN 中的相对路径 |
| updated_at   | Integer   | 更新时间 （格式为 unix 时间戳) |
| categories   | String    | 文件所属类别 |
| _id          | String    | 本条记录 ID |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Map<String, dynamic> params = {
    "m3u8s": ["xxxxxxxxxx", "xxxxxxxxxx"],
    "save_as": "hello.m3u8",
    "category_id": "5c18bc794e1e8d20dbfcddcc",
    "random_file_link": false,
  };
  Map<String, dynamic> result = await FileManager.videoConcat(params);
  // 操作成功
} on HError catch (e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**返回示例**

```json
{
  "created_at": 1547461561,
  "path": null,
  "created_by_id": 16042162,
  "mime_type": "",
  "media_type": "",
  "size": "",
  "name": "hello.m3u8",
  "status": "pengding",
  "reference": "",
  "cdn_path": "1gizRRRdklnf7gCD.m3u8",
  "updated_at": 1547461561,
  "categories": [],
  "_id": "5c3c63b9d1606e0b3fc7acb7"
}
```

## M3U8 视频剪辑

`FileManager.videoClip(Map<String, dynamic> params)`

**params参数说明**

|  参数               |  类型       | 必填 | 说明 |
| :-----             | :----       | :-- | :-- |
| m3u8               | String      |  Y  | 视频文件的 id |
| save_as            | String      |  Y  | 截图保存的文件名 |
| category_id        | String      |  N  | 文件所属类别 ID |
| random_file_link   | Boolean     |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| include            | Array       |  N  | 包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| exclude            | Array       |  N  | 不包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| index              | Boolean     |  N  | include 或者 exclude 中的值是否为 ts 分片序号，默认为 false |


**返回参数说明**

res:

| 参数              | 类型              | 说明 |
| :---------       | :-----            | :------ |
| created_at       | Integer           | 创建时间 （格式为 unix 时间戳) |
| path             | String            | 上传成功后的访问地址 URL |
| created_by       | Integer           | 创建者 id |
| mime_type        | String            | mime_type 类型 |
| media_type       | String            | 媒体类型 |
| size             | Integer           | 文件大小 |
| name             | String            | 文件名 |
| status           | String            | 文件状态 |
| reference        | String            | 引用 |
| cdn_path         | String            | 文件在 CDN 中的相对路径 |
| updated_at       | Integer           | 更新时间 （格式为 unix 时间戳) |
| categories       | String            | 文件所属类别 |
| _id              | String            | 本条记录 ID |


**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Map<String, dynamic> params = {
    "m3u8": "xxxxxxxxxx",
    "include": [0, 20],
    "save_as": "0s_20s.m3u8",
    "category_id": "5c18bc794e1e8d20dbfcddcc",
    "random_file_link": false
  };
  Map<String, dynamic> video = await FileManager.videoConcat(params);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**返回示例**

```json
{
  "created_at": 1547461561,
  "path": null,
  "created_by_id": 16042162,
  "mime_type": "",
  "media_type": "",
  "size": "",
  "name": "hello.m3u8",
  "status": "pending",
  "reference": "",
  "cdn_path": "1gizRRRdklnf7gCD.m3u8",
  "updated_at": 1547461561,
  "categories": [],
  "_id": "5c3c63b9d1606e0b3fc7acb7"
}
```

## M3U8 时长和分片信息

`FileManager.videoMeta(Map<String, dynamic> params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |

**返回参数说明**

res:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| status_code   | Integer | 状态码 |
| message   | String | 返回信息 |
| meta   | `Map<String, dynamic>` | 详见以下 |

meta 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| duartion   | Number | m3u8 时长 |
| points   | `List<num>` | 时间点 |

**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Map<String, dynamic> params = {
    "m3u8": "xxxxxxxxxx"
  };
  Map<String, dynamic> meta = await FileManager.videoMeta(params);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**返回示例**

```json
{
  "status_code": 200,
  "message": "ok",
  "meta": {
    "duration": 2850.2974559999984,
    "points": [
      11.277933,
      23.7237,
      34.6346,
      42.008632999999996,
      50.483765999999996,
      64.764699,
      70.80406599999999,
      82.31556599999999,
      92.892799,
      100.200099,
      114.74796599999999,
      123.92379899999999,
      131.09763199999998,
      140.97416499999997,
      158.32483199999996,
      160.05989899999994,
      172.70586599999996,
      181.04753299999996,
      191.79159999999996
    ]
  }
}
```

## 音视频的元信息

`FileManager.videoAudioMeta(Map<String, dynamic> params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :---- | :-- | :-- |
| source   | String |  Y  | 文件的 id |

**返回参数说明**

res:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| format   | Map<String, dynamic> | 音视频格式信息，详见以下 |
| streams   | `List<Map<String, dynamic>>` | stream 列表，详见以下 |

format 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| bitrate   | int | 比特率 |
| duration   | num | 时长 |
| format   | String | 容器格式 |
| fullname   | String | 容器格式全称 |

streams 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| index   | int | 表示第几路流 |
| type   | String | 一般情况下, video 或 audio |
| bitrate   | int | 流码率 |
| codec   | String | 流编码 |
| codec_desc   | String | 流编码说明 |
| duration   | num | 流时长 |
| video_fps   | num | (视频流)视频帧数 |
| video_height   | int | (视频流)视频高度 |
| video_width   | int | (视频流)视频宽度 |
| audio_channels   | int | (音频流)音频通道数 |
| audio_samplerate   | int | (音频流)音频采样率 |


**示例代码**

```Dart
import 'package:minapp/minapp.dart';

try {
  Map<String, dynamic> params = {
    "source": "xxxxxxxxxx"
  };
  FileManager.videoAudioMeta(params);
  // 操作成功
} on HError catch(e) {
  // 操作失败
}
```

HError 对象结构请参考[错误码和 HError 对象](/flutter-sdk/error-code.md)

**返回示例**

```json
{
  "streams": [
    {
      "index": 0,
      "type": "video",
      "video_fps": 25,
      "video_height": 236,
      "video_width": 426,
      "codec_desc": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
      "codec": "h264",
      "bitrate": 99608,
      "duration": 184.8,
      "metadata": {
        "handler_name": "VideoHandler",
        "language": "und"
      }
    },
    {
      "index": 1,
      "type": "audio",
      "audio_channels": 2,
      "audio_samplerate": 44100,
      "codec_desc": "AAC (Advanced Audio Coding)",
      "codec": "aac",
      "bitrate": 48005,
      "duration": 184.855011,
      "metadata": {
        "handler_name": "SoundHandler",
        "language": "und"
      }
    }
  ],
  "format": {
    "duration": 184.902,
    "fullname": "QuickTime / MOV",
    "bitrate": 154062,
    "filesize": 3560797,
    "format": "mov,mp4,m4a,3gp,3g2,mj2"
  }
}
```

## 数据对象

### CloudFile

| 参数           | 类型         | 说明 |
| :------------ | :-----       | :--- |
| id            | String       | 文件 id |
| name          | String       | 文件名 |
| size          | int          | 文件大小，以字节为单位 |
| category      | FileCategory | 文件归属的目录 |
| path          | String       | 上传成功后的访问地址 URL |
| cdn_path      | String       | 文件在 CDN 中的相对路径 |
| created_at    | int          | 创建时间 （格式为 unix 时间戳） |
| mime_type     | String       | 文件媒体类型 |
| media_type    | String       | 如果是视频/图片，表示文件的格式 |

### CloudFileList

| 参数           | 类型                  | 说明 |
| :------------ | :-----                | :--- |
| limit         | int                   | 返回文件的最大个数 |
| offset        | int                   | 返回文件的起始偏移值 |
| total_count   | int                   | 文件总数 |
| next          | String                | 下一页地址，若为 null ，表示当前为最后一页 |
| previous      | String                | 上一页地址，若为 null ，表示当前为第一页 |
| files         | `List<CloudFile>`       | 文件列表，每个元素为 CloudFile 类型 |

### FileCategory

| 参数           | 类型         | 说明 |
| :------------ | :-----       | :--- |
| id            | String       | 分类 id |
| name          | String       | 分类名称 |
| files         | int          | 文件数量 |
| created_at    | int          | 创建时间 （格式为 unix 时间戳） |
| updated_at    | int          | 更新日期 （格式为 unix 时间戳） |

### FileCategoryList

| 参数                    | 类型                     | 说明 |
| :------------          | :-----                   | :--- |
| limit                  | int                      | 返回文件的最大个数 |
| offset                 | int                      | 返回文件的起始偏移值 |
| total_count            | int                      | 文件总数 |
| next                   | String                   | 下一页地址，若为 null ，表示当前为最后一页 |
| previous               | String                   | 上一页地址，若为 null ，表示当前为第一页 |
| fileCategories         | `List<FileCategory>`       | 分类列表，每个元素为 FileCategory 类型 |
