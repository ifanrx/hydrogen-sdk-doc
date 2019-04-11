<!-- ex_nonav -->

# 文件

知晓云不仅在数据存储中允许你存储文件，同时也单独提供了文件存储功能，帮助你对多种类型媒体文件进行存储和管理。
你可以在控制台上传、归类和删除文件，也可以通过 SDK 完成以上操作，以下是在拿到图片文件后上传至服务器，然后作为用户的头像使用的例子，
然后你可以通过 File 类的其他接口来查找获取该文件，示例代码如下：

**上传文件**

```java
try {
  CloudFile avatar = Storage.uploadFile(file.getName(), "gallery", Files.readAllBytes(file.toPath()));
  user.put(User.AVATAR, avatar.getPath());
  user.save();
  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

**通过 ID 获取某个文件详情**

```java
try {
  Storage.file(avatar.getId());
  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

同时，知晓云提供能一个功能强大，但操作简单的图片处理功能，方便你对图片进行缩放、裁切、打水印等功能。如下，通过在图片 url 后面加上 `!/both/400x400` 即可缩放图片至 400x400 大小

![{{book.imgURLClipDemo}}]({{book.imgURLClipDemo}})

阅读以下章节，了解更多文件操作接口：

* [文件操作](./file.md)
* [文件分类操作](./category.md)