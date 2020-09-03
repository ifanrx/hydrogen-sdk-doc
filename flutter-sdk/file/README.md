<!-- ex_nonav -->

# 文件

知晓云不仅在数据存储中允许你存储文件，同时也单独提供了文件存储功能，帮助你对多种类型媒体文件进行存储和管理。
你可以在控制台上传、归类和删除文件，也可以通过 SDK 完成以上操作。以下是在拿到图片文件后上传至服务器的例子，
然后你可以通过 FileManager 类的其他接口来查找获取该文件，示例代码如下：

**上传文件**

```Dart
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

**通过 ID 获取某个文件详情**

```Dart
CloudFile file = await CloudFile.get('5a2fe93308443e313a428c4f');
```

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

同时，知晓云提供能一个功能强大，但操作简单的图片处理功能，方便你对图片进行缩放、裁切、打水印等功能。如下，通过在图片 url 后面加上 `!/both/400x400` 即可缩放图片至 400x400 大小

![{{book.imgURLClipDemo}}]({{book.imgURLClipDemo}})

阅读以下章节，了解更多文件操作接口：

* [文件操作](./file.md)