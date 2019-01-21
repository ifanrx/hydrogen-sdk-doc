# 文件操作

实例化一个 `BaaS.File` 对象，以下操作都是在该对象上进行操作，如下进行实例化：

{% ifanrxCodeTabs %}
`let MyFile = new wx.BaaS.File()`
{% endifanrxCodeTabs %}

### 文件上传

`MyFile.upload(fileParams, metaData)`

**fileParams 参数说明（必须）**

| 参数                 |  类型   | 必填 | 说明 |
| :-------------------| :----- | :--- | :--------- |
| fileParams.filePath | String |  Y  | 本地资源路径 |
| fileParams.fileObj | String |  Y  | 文件对象（在 WEB 端上传时提供该参数） |

**metaData 参数说明（可选）**

| 参数                   |  类型  | 必填 | 说明 |
| :---------------------| :----- | :--- | :--- |
| metaData.categoryID   | String |  N  | 要上传的文件分类 ID |
| metaData.categoryName | String |  N  | 要上传的文件分类名 |

> **info**
> 请勿同时填写 categoryID 和 categoryName，默认只使用 categoryID

**返回参数说明**

res.data:

|   参数  | 类型   | 说明 |
| :----- | :----- | :-- |
| status | String | 成功返回 'ok' |
| path   | String | 上传后的文件地址 |
| file   | Object | 包含文件详细信息，详见以下 |

file 参数说明：

| 参数        |  类型  | 说明 |
| :--------- | :----- | :------ |
| cdn_path   | String | 文件在 cdn 上的路径 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| size       | Number | 以字节为单位 |

**示例代码**

{% tabs first="微信小程序", second="WEB" , third="支付宝小程序" %}

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


{% endtabs %}


HError 对象结构请参考[错误码和 HError 对象](/js-sdk/error-code.md)

> **info**
> file 字段可用于含有 file 类型的数据表的数据操作，详细见 [新增数据项](../schema/create-record.md)


### 获取文件详情

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
| path       | String | 文件在 cdn 上的路径 |
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


### 删除文件

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


### 查询，获取文件列表

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

### 图片云处理

利用 CDN 图片云处理，可以快速便捷地完成图片缩放、裁切、打水印等操作，示例如下：

```
// 缩放图片至 400x400
https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eRuaPvwdleauqyZ.jpg!/both/400x400

// 在图片右下角添加 “知晓云” 文字水印
https://cloud-minapp-7894.cloud.ifanrusercontent.com/1eiuEUuISgOstoVZ.png!/watermark/align/southeast/text/55+l5pmT5LqRCg==
```

具体用法和更多功能可查看文档：[如何通过图片 URL 进行图片云处理？](http://support.minapp.com/hc/kb/article/1082737/)