# 文件操作

<p style='color:red'>* sdk version >= v1.1.2</p>

`let MyFile = new wx.BaaS.File()`

### 文件上传

`MyFile.upload(fileParams, metaData)`

##### fileParams 参数说明（必须）

| 参数名    | 类型    | 是否必填 | 参数描述      |
| :------- | :----- | :-----: | :------------|
| filePath | String |    Y    | 本地资源路径   |

##### metaData 参数说明 (可选)

| 参数名      | 类型     | 是否必填 | 参数描述      |
| :--------  | :------ | :-----: | :------------|
| categoryID | String |    N    | 要上传的文件分类 ID |
| categoryName | String |    N    | 要上传的文件分类名 |

注： 请勿同时填写 categoryID 和 categoryName，默认只使用 categoryID

##### 示例代码

```
wx.chooseImage({
  success: function(res) {
    let MyFile = new wx.BaaS.File()
    let fileParams = {filePath: res.tempFilePaths[0]}
    let metaData = {categoryName: 'SDK'}

    MyFile.upload(fileParams, metaData).then((res) => {
      /*
       * 注: 只要是服务器有响应的情况都会进入 success, 即便是 4xx，5xx 都会进入这里
       * 如果上传成功则会返回资源远程地址,如果上传失败则会返回失败信息
       */

      let data = res.data  // res.data 为 Object 类型
    }, (err) => {

    })
  }
})
```
注：使用 `wx.uploadFile` 以及 `SDK v.1.1.2` 之前版本的 `wx.BaaS.uploadFile` 返回的 res.data 是 json string 类型，而这里的 res.data 是 Object 类型，因此不需要再做类型转换了

##### 返回示例

res.data
```
{
  status: "ok",
  path: "https://cloud-minapp-1131.cloud.ifanrusercontent.com/1e2fVFaWoaoAZPyr.svg",
  file: {
    cdn_path: "1e2fVFaWoaoAZPyr.svg",
    created_at: 1507822469,
    id: "59df8b852ab80e3656cf8783",
    mime_type: "text/plain; charset=utf-8",
    name: "tmp_262601706o6zAJs-pmaywKzqHIvzwU97rtiGIe4dd39171563993cf10b12bae2ac30ec.svg",
    size: 3879
  }
}
```

注：file 字段可用于含有 file 类型的数据表的数据操作，详细见 [新增数据项](../schema/create-record.md)


### 对图片文件进行缩放、裁切、打水印等操作
利用 CDN 图片云处理，可以快速便捷地完成以上需求，具体看这里：[如何通过图片 URL 进行图片云处理？](http://support.minapp.com/hc/kb/article/1082737/)

##### 特别注意
微信开发者工具**录音**结束后生成的是 base64 格式文本文件，而在真机上生成的是正常的 buffer。如果在开发者工具里上传录音文件，实际上传的会是一个 base64 格式的文本文件。因此，如果你在使用知晓云上传录音文件，请在真机上调试。
该问题微信团队已知，并在修复当中。


### 获取文件详情

`MyFile.get(fileID)`

##### 参数说明

| 参数名  | 类型    | 是否必填 | 参数描述   |
| :----- | :----- | :-----: | :------- |
| fileID | Number |    Y    |  文件 id  |

##### 示例代码

```
let MyFile = new wx.BaaS.File()
MyFile.get('5a2fe93308443e313a428c4f').then((res) => {
  // success
}, (err) => {
  // err
})
```

##### 返回示例

res.data
```
{
  category: {
    id: '5a2fe91508443e3123dbe1cb',
    name: '科技'
  },
  cdn_path: "1e2fVFaWoaoAZPyr.svg",
  created_at: 1507822469,
  id: "5a2fe93308443e313a428c4f",
  mime_type: "text/plain; charset=utf-8",
  name: "tmp_262601706o6zAJs-pmaywKzqHIvzwU97rtiGIe4dd39171563993cf10b12bae2ac30ec.svg",
  size: 3879
}
```


### 删除文件

`MyFile.delete(fileID)`

##### 参数说明

| 参数名    | 类型                    | 是否必填 | 参数描述           |
| :------- | :--------------------  | :-----: | :----------------|
| fileID   | Number or Number Array |    Y    | 文件 id (可为数组) |

##### 示例代码

```
let MyFile = new wx.BaaS.File()

MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```

注：删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件

### 查询，获取文件列表

文件查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

| 支持字段       | 类型    | 描述      |
| :-----------  | :----- | :------------------- |
| id            | String | 文件 id               |
| name          | String | 文件名                |
| size          | Number | 文件大小 (以字节为单位) |
| category_id   | String | 文件分类 id           |
| category_name | String | 文件分类名            |

##### 示例代码

```
let MyFile = new wx.BaaS.File()

// 查找所有文件
MyFile.find()

let query = new wx.BaaS.Query()
// 查询某一文件分类下的所有文件
query.compare('category_name', '=', categoryName)
// 查询文件名包含指定字符串的文件
query.contains('name', substr)
MyFile.setQuery(query).find()
```

### 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段    | 描述      |
| :--------- | :------------------- |
| name       | 文件名                |
| size       | 文件大小 (以字节为单位) |
| created_at | 文件分类 id           |

##### 示例代码

```
let MyFile = new wx.BaaS.File()

MyFile.orderBy('-created_at').find().then()
```

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

##### 示例代码

```
let MyFile = new wx.BaaS.File()

MyFile.limit(10).offset(5).find().then()
```