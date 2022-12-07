{% import "/js-sdk/macro/total_count.md" as totalCount %}

{% macro filter() %}
文件查询与[数据表查询](../schema/query.md)方法一致，但只支持以下指定字段的筛选

| 支持字段       |  类型  | 说明 |
| :------------ | :----- | :--- |
| id            | String | 文件 id |
| name          | String | 文件名 |
| size          | Number | 文件大小，以字节为单位 |
| category_id   | String | 文件分类 id |
| category_name | String | 文件分类名 |
| created_at    | Integer| 创建时间 （格式为 unix 时间戳） |
{% endmacro %}

# 文件操作

实例化一个 `BaaS.File` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

{% ifanrxCodeTabs %}
`let MyFile = new wx.BaaS.File()`
{% endifanrxCodeTabs %}

## 文件上传

`MyFile.upload(fileParams, metaData)`

**fileParams 参数说明（必须）**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| fileParams.filePath | String |  Y  | 本地资源路径 |
| fileParams.fileObj | String |  Y  | 文件对象（在 Web 端上传时提供该参数）|
| fileParams.fileType | String |  Y  | 文件类型，image / video / audio（在支付宝端上传时提供该参数）|
| fileParams.fileName | String | N | 文件名(v3.21.0 版本新增) |

**metaData 参数说明（可选）**

| 参数                   |  类型  | 必填 | 说明 |
| :---------------------| :----- | :--- | :--- |
| metaData.categoryID   | String |  N  | 要上传的文件分类 ID |
| metaData.categoryName | String |  N  | 要上传的文件分类名 |
| metaData.randomFileLink | String | N | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true(v3.21.0 版本新增) |

> **info**
> 1.请勿同时填写 categoryID 和 categoryName，默认只使用 categoryID

> 2.randomFileLink 举例说明：

> `metaData.randomFileLink` 为 `true` 时，如果 `fileParams.fileName` 为 `avatar.png`，
> 则返回值中 res.data.file.path 为 `https://cloud-minapp-xxx.cloud.ifanrusercontent.com/1j6ZGvnzSpJ7YBZ8.png`

> `metaData.randomFileLink` 为 `false` 时，如果 `fileParams.fileName` 为 `avatar.png`，
> 则返回值中 res.data.file.path 为 `https://cloud-minapp-xxx.cloud.ifanrusercontent.com/avatar.png`

**返回参数说明**

res.data:

|   参数  | 类型   | 说明 |
| :----- | :----- | :-- |
| status | String | 成功返回 'ok' |
| path   | String | 上传成功后的访问地址 URL |
| file   | Object | 包含文件详细信息，详见以下 |

file 参数说明：

| 参数        |  类型  | 说明 |
| :--------- | :----- | :------ |
| path       | String | 上传成功后的访问地址 URL (v2.2.0 版本新增) |
| cdn_path   | String | 文件在 CDN 中的相对路径 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| size       | Number | 以字节为单位 |

**示例代码**

{% tabs first="微信小程序", second="Web" , third="支付宝小程序" %}

{% content "first" %}
```js
wx.chooseImage({
  success: function(res) {
    let MyFile = new wx.BaaS.File()
    let fileParams = {filePath: res.tempFilePaths[0]}
    let metaData = {categoryName: 'SDK'}

    MyFile.upload(fileParams, metaData).then(res => {
      // 上传成功
      let data = res.data  // res.data 为 Object 类型
    }, err => {
      // HError 对象
    })
  }
})
```

#### 监听上传进度变化事件和中断上传任务 (仅限微信小程序)
在 1.1.2 版本的基础上，1.8.0 版本中增加了对 [UploadTask](https://developers.weixin.qq.com/miniprogram/dev/api/UploadTask.html) 的支持， `upload` API 返回的 Promise 对象上增加了 `onProgressUpdate` 和 `abort` 方法，使文件上传增加了以下两个特性：

- 监听上传进度：`onProgressUpdate(callback)`
- 中断上传任务：`abort()`

callback 接收一个对象类型的参数，其结构如下：

| 参数                     |  类型  | 说明 |
| :------------------------| :----- | :------ |
| progress                 | Number | 上传进度百分比	 |
| totalBytesSent           | Number | 已经上传的数据长度，单位 Bytes	|
| totalBytesExpectedToSend | Number | 预期需要上传的数据总长度，单位 Bytes |


**示例代码**

```js
wx.chooseImage({
  success: function(res) {
    let MyFile = new wx.BaaS.File()
    let fileParams = {filePath: res.tempFilePaths[0]}
    let metaData = {categoryName: 'SDK'}

    // upload API 返回一个 Promise，1.8.0 后返回值增加了 onProgressUpdate 和 abort 方法
    let uploadTask =  MyFile.upload(fileParams, metaData)

    // 文件成功上传的回调
    uploadTask.then(res=>{

    })

    // 监听上传进度
    uploadTask.onProgressUpdate(e => {
      console.log(e)
    })

    // 600 毫秒后中断上传
    setTimeout(()=> uploadTask.abort(), 600)
  }
})
```

**onProgressUpdate 接收参数示例**

```json
{
  "progress":80,
  "totalBytesSent":1507328,
  "totalBytesExpectedToSend":1883803
}
```


{% content "second" %}

```html
<input type="file" id="file">
```
```javascript
var f = document.getElementById('file')

f.addEventListener('change', function(e) {
   let File = new BaaS.File()
   let fileParams = {fileObj: e.target.files[0]}

   File.upload(fileParams).then(res => {
     console.log(res)
   }, err => {
   // HError
   })
})
```


{% content "third" %}

```js
my.chooseImage({
  success: function(res) {
    let MyFile = new wx.BaaS.File()
    let fileParams = {
      filePath: res.apFilePaths[0],
      fileType: 'image',
    }
    let metaData = {categoryName: 'SDK'}

    MyFile.upload(fileParams, metaData).then(res => {
      // 上传成功
      let data = res.data  // res.data 为 Object 类型
    }, err => {
      // HError 对象
    })
  }
})
```

{% endtabs %}


HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

> **info**
> file 字段可用于含有 file 类型的数据表的数据操作，详细见 [新增数据项](../schema/create-record.md)


## 获取文件详情

`MyFile.get(fileID)`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileID | String |  Y  | 文件 id |

**返回参数说明**

res.data:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| category   | Object | 包含文件分类信息，详见以下 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| path       | String | 上传成功后的访问地址 URL |
| cdn_path   | String | 文件在 CDN 中的相对路径 (v2.2.0 新增) |
| size       | Number | 以字节为单位 |

category 参数说明：

| 参数  | 类型   | 说明 |
| :--- | :----- | :-- |
| id   | String | 分类 ID |
| name | String | 分类名 |

**示例代码**

{% ifanrxCodeTabs %}
```js
let MyFile = new wx.BaaS.File()
MyFile.get('5a2fe93308443e313a428c4f').then((res) => {
  // success
}, err => {
  // HError 对象
})
```
{% endifanrxCodeTabs %}

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

**返回示例**

```json
{
  "category": {
    "id": "5a2fe91508443e3123dbe1cb",
    "name": "科技"
  },
  "created_at": 1507822469,
  "id": "5a2fe93308443e313a428c4f",
  "mime_type": "image/png",
  "name": "sdk-test-minapp2.png",
  "path": "https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eOledhCbvjgaCSE.png",
  "size": 3879
}
```


## 删除文件

`MyFile.delete(fileID)`

**参数说明**

| 参数    | 类型                   | 必填 | 说明 |
| :----- | :--------------------- | :-- | :-- |
| fileID | String or String Array | Y   | 文件 id (可为数组) |

**示例代码**

{% ifanrxCodeTabs %}
```js
let MyFile = new wx.BaaS.File()

MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```
{% endifanrxCodeTabs %}

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件

## 获取符合条件的文件总数

`BaaS.File#count()`

> **info**
> SDK v3.0 新增

{{filter()}}

{% ifanrxCodeTabs comment="目前会自动将 wx.BaaS 替换为 window 和 my"  %}
```js
let MyFile = new wx.BaaS.File()
let query = new wx.BaaS.Query()
query.compare('category_name', '=', categoryName)
query.contains('name', substr)
MyFile.setQuery(query).count().then(num => {
  // success
  console.log(num)  // 10
}, err => {
  // err
})
```
{% endifanrxCodeTabs %}

## 查询，获取文件列表

`BaaS.File#find(options)`

**参数说明**

options:

| 参数          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| withCount     | boolean |  否  | `false` (SDK v3.x) / `true` (SDK v2.x) | 是否返回 total_count |

{{totalCount.withCountTips()}}

{{filter()}}

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

{% ifanrxCodeTabs %}
```js
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
{% endifanrxCodeTabs %}

{% ifanrxCodeTabs %}
```js
let MyFile = new wx.BaaS.File()

// 查找所有文件
MyFile.find()

// 按创建时间范围查询: 2018年10月24日17时10分57秒 至今上传的文件
let query = wx.BaaS.Query.and(new wx.BaaS.Query().compare('created_at', '<=', Math.ceil(Date.now() / 1000)), new wx.BaaS.Query().compare('created_at', '>=', 1540372257))

MyFile.setQuery(query).find()
```
{% endifanrxCodeTabs %}


### 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| name          | String | 文件名 |
| size          | Number | 文件大小，以字节为单位 |
| created_at    | Number | 文件上传时间 |

**示例代码**

{% ifanrxCodeTabs %}
```js
let MyFile = new wx.BaaS.File()
MyFile.orderBy('-created_at').find().then()
```
{% endifanrxCodeTabs %}

### 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

**示例代码**

{% ifanrxCodeTabs %}
```js
let MyFile = new wx.BaaS.File()
MyFile.limit(10).offset(5).find().then()
```
{% endifanrxCodeTabs %}

**返回示例**

成功时 res 结构如下
```json
 {
  "meta": {
    "limit": 20,
    "next": "/dserve/v1.3/uploaded-file/?limit=20&offset=20&where=%7B%22%24and%22%3A%5B%7B%22category_name%22%3A%7B%22%24eq%22%3A%22%E5%9B%BE%E7%89%87%22%7D%7D%5D%7D",
    "offset": 0,
    "previous": null,
    "total_count": 36
  },
  "objects": [{
    "category": {"id": "5b73f36f2a4f56246e76b7b3", "name": "图片"},
    "created_at": 1534823603,
    "id": "5b7b8cb3839c611ab4eb2599",
    "mime_type": "image/jpeg",
    "name": "wxc6b86e382a1e3294.o6zAJs5dCuYRqqJOq0MwNPlGiFVM.CGLDGRT03IsI7fa51717abe74ed34e0c9cc77dbe7079.jpg",
    "path": "https://cloud-minapp-11033.cloud.ifanrusercontent.com/1frxjPBNFAOrQtOS.jpg",
    "size": 11189
  }]
}
```

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

`MyFile.genVideoSnapshot(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
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

```js
let MyFile = new wx.BaaS.File()
let params = {
  "source": "xxxxxxxxxx",
  "save_as": "hello.png",
  "point": "00:00:10",
  "category_id": "5c18bc794e1e8d20dbfcddcc",
  "random_file_link": false
}
MyFile.genVideoSnapshot(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

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

> **info**
> SDK 版本要求 >= 1.16.0


`MyFile.videoConcat(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8s | Array |  Y  | 视频文件的 id 列表，按提交的顺序进行拼接 |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

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

```js
let MyFile = new wx.BaaS.File()
let params = {
  "m3u8s": ["xxxxxxxxxx", "xxxxxxxxxx"],
  "save_as": "hello.m3u8",
  "category_id": "5c18bc794e1e8d20dbfcddcc",
  "random_file_link": false,
}
MyFile.videoConcat(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

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

> **info**
> SDK 版本要求 >= 1.16.0


`MyFile.videoClip(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| include   | Array |  N  | 包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| exclude   | Array |  N  | 不包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| index   | Boolean |  N  | include 或者 exclude 中的值是否为 ts 分片序号，默认为 false |


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

```js
let MyFile = new wx.BaaS.File()
let params = {
  "m3u8": "xxxxxxxxxx",
  "include": [0, 20],
  "save_as": "0s_20s.m3u8",
  "category_id": "5c18bc794e1e8d20dbfcddcc",
  "random_file_link": false
}
MyFile.videoClip(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

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

> **info**
> SDK 版本要求 >= 1.16.0


`MyFile.videoMeta(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |

**返回参数说明**

res:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| status_code   | Integer | 状态码 |
| message   | String | 返回信息 |
| meta   | Object | 详见以下 |

meta 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| duartion   | Number | m3u8 时长 |
| points   | Array | 时间点 |

**示例代码**

```js
let MyFile = new wx.BaaS.File()
let params = {
  "m3u8": "xxxxxxxxxx"
}
MyFile.videoMeta(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

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

> **info**
> SDK 版本要求 >= 1.16.0


`MyFile.videoAudioMeta(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source   | String |  Y  | 文件的 id |

**返回参数说明**

res:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| format   | Object | 音视频格式信息，详见以下 |
| streams   | Array | stream 列表，详见以下 |

format 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| bitrate   | Integer | 比特率 |
| duration   | Number | 时长 |
| format   | String | 容器格式 |
| fullname   | String | 容器格式全称 |

streams 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| index   | Integer | 表示第几路流 |
| type   | String | 一般情况下, video 或 audio |
| bitrate   | Integer | 流码率 |
| codec   | String | 流编码 |
| codec_desc   | String | 流编码说明 |
| duration   | Number | 流时长 |
| video_fps   | Number | (视频流)视频帧数 |
| video_height   | Integer | (视频流)视频高度 |
| video_width   | Integer | (视频流)视频宽度 |
| audio_channels   | Integer | (音频流)音频通道数 |
| audio_samplerate   | Integer | (音频流)音频采样率 |


**示例代码**

```js
let MyFile = new wx.BaaS.File()
let params = {
  "source": "xxxxxxxxxx"
}
MyFile.videoAudioMeta(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

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
