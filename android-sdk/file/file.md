# 文件操作

### 文件上传

`Storage.uploadFile(filename, bytes)`

`Storage.uploadFile(filename, categoryId, bytes)`

**参数说明**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| filename   | String |  Y  | 文件名径 |
| bytes      | String |  Y  | 文件内容 |
| categoryId | String |  N  | 文件归属目录 |

**返回 `CloudFile` 的属性**

| 参数        |  类型  | 说明 |
| :--------- | :----- | :------ |
| path          | String       | 文件的访问路径 |
| mimeType      | String       | 文件媒体类型 |
| name          | String       | 文件名 |
| mediaType     | String       | 如果文件是视频/图片，表示文件的格式 |
| cdnPath       | String       | 文件在 path 上的名字 |
| category      | FileCategory | 文件归属的目录 |

**示例代码**

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

异常请参考[异常](../error-code.md)

> **info**
> CloudFile 可用于含有 file 类型的数据表的数据操作，详细见 [新增数据项](../schema/create-record.md)


### 获取文件详情

`Storage.file(fileId);`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileId | String |  Y  | 文件 id |

**示例代码**

```java
try {
  CloudFile avatar = Storage.file("user_avatar_123");
  avatar...
  // 操作成功
} catch (Exception e) {
  Log.d(TAG, e.getMessage(), e);
  // 操作失败
}
```

异常请参考[异常](../error-code.md)


### 删除文件

`Storage.deleteFiles(fileIds)`

**参数说明**

| 参数    | 类型                   | 必填 | 说明 |
| :----- | :--------------------- | :-- | :-- |
| fileIds | String Collection | Y   | 要删除的文件 id 列表 |

**示例代码**

```java
try {
  Storage.deleteFiles(Arrays.asList("avatar1", "avatar2", "avatar3"));
  // 操作成功
} catch (Exception e) {
  // 操作失败
}
```

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件


### 查询，获取文件列表

文件查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| CloudFile.ID                  | String | 文件 id |
| CloudFile.NAME                | String | 文件名 |
| CloudFile.SIZE                | Long   | 文件大小，以字节为单位 |
| CloudFile.QUERY_CATEGORY_ID   | String | 文件分类 id |
| CloudFile.QUERY_CATEGORY_NAME | String | 文件分类名 |
| CloudFile.CREATED_AT          | Long   | 创建时间 （格式为 unix 时间戳） |

**示例代码**

```java
try {
    // 查找所有文件
    PagedList<CloudFile> all = Storage.files(null);

    Where where = new Where();
    // 查询某一文件分类下的所有文件
    where.equalTo(CloudFile.QUERY_CATEGORY_NAME, "avatars");
    // 查询文件名包含指定字符串的文件
    where.contains(CloudFile.NAME, "_middle");
    Query query = new Query();
    query.put(where);

    PagedList<CloudFile> middleAvatars = Storage.files(query);
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

### 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| CloudFile.NAME          | String | 文件名 |
| CloudFile.SIZE          | Long | 文件大小，以字节为单位 |
| CloudFile.CREATED_AT    | Long | 文件上传时间 |

**示例代码**

```java
try {
    // 查找所有文件
    Query query = new Query().orderBy(CloudFile.CREATED_AT);
    PagedList<CloudFile> all = Storage.files(query);
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

**示例代码**

```java
try {
    // 查找所有文件
    Query query = new Query().offset(10).limit(20);
    PagedList<CloudFile> pageTwo = Storage.files(query);
    
    // 操作成功
} catch (Exception e) {
    // 操作失败
}
```


### 图片云处理

利用 CDN 图片云处理，可以快速便捷地完成图片缩放、裁切、打水印等操作，示例如下：

```
// 缩放图片至 400x400
https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eRuaPvwdleauqyZ.jpg!/both/400x400

// 在图片右下角添加 “知晓云” 文字水印
https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eiuEUuISgOstoVZ.png!/watermark/align/southeast/text/55+l5pmT5LqRCg==
```

具体用法和更多功能可查看文档：[如何通过图片 URL 进行图片云处理？](http://support.minapp.com/hc/kb/article/1082737/)
