{% import "/cloud-function/node-sdk/macro/total_count.md" as totalCount %}

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

`let MyFile = new BaaS.File()`

## 上传文件

`MyFile.upload(uploadFile, fileMeta)`

**参数说明**

| 参数        | 类型                   | 必填 | 说明               | 默认值 |
| :--------- | :--------------------- | :--- | :---------------- | ---- |
| uploadFile | String or Buffer       |  Y   | 需要上传的文件      | 无 |
| fileMeta   | Object                 |  N   | 文件 meta 信息，如文件名，分类 ID 等 | `FileMeta对象` |

**FileMeta对象说明**

| 字段名           | 类型    | 必填 | 说明            | 默认值 |
| :--------------- | :------ | :--- | :-------------- | :---- |
| category_id      | String  |  N   | 文件分类 ID     | ''    |
| random_file_link | Boolean |  N   | 是否使用随机的文件存储路径，值为 `false` 则使用 `filename` 作为文件存储路径，详见下文举例说明      | true    |
| filename         | String  |  N   | 文件名          | file.bin |
| filepath         | String  |  N   | 文件路径        | /tmp/file.bin |
| contentType      | String  |  N   | 文件 MIME 类型  | application/octet-stream |

> **info**
> **`random_file_link` 举例说明：**

> `fileMeta.random_file_link` 为 `true` 时，如果 `fileMeta.filename` 为 `avatar.png`，
> 则返回值中 res.data.file.path 为 `https://cloud-minapp-xxx.cloud.ifanrusercontent.com/1j6ZGvnzSpJ7YBZ8.png`

> `fileMeta.random_file_link` 为 `false` 时，如果 `fileMeta.filename` 为 `avatar.png`，
> 则返回值中 res.data.file.path 为 `https://cloud-minapp-xxx.cloud.ifanrusercontent.com/avatar.png`

**示例代码**

```js
let MyFile = new BaaS.File()

// 指定文件名上传
MyFile.upload('/var/log/test.log').then()

// 使用 Buffer 构建文件内容
MyFile.upload(Buffer.from('this is file content'), {filename: 'test.txt'}).then()

// 上传到指定目录
MyFile.upload('/var/log/test.log', {category_id: 1}).then()
```

**返回参数说明**

res.data:

|   参数  | 类型   | 说明 |
| :----- | :----- | :-- |
| path   | String | 上传成功后的访问地址 URL |
| file   | Object | 包含文件详细信息，详见以下 |

file 参数说明：

| 参数        |  类型  | 说明 |
| :--------- | :----- | :------ |
| path       | String | 上传成功后的访问地址 URL |
| cdn_path   | String | 文件在 CDN 中的相对路径 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| size       | Number | 以字节为单位 |


## 文件云下载

### 创建下载任务

`MyFile.createDownloadTask({originalUrl, filename, categoryName})`

**参数说明**

| 参数         | 类型    | 必填 | 说明              |
| :----------- | :------ | :--- | :---------------- |
| originalUrl  | String  |  Y   | 需要下载的文件 URL      |
| filename     | String  |  Y   | 文件名 |
| categoryName | String  |  N   | 文件分类名 |

**示例代码**

```js
let MyFile = new BaaS.File()

const res = await MyFile.createDownloadTask({
  originalUrl: 'https://***.jpg',
  filename: '***.jpg',
  categoryName: '文件云下载',
})
return res.data
```

**返回示例**

```json
{
  "id": 1
}
```

### 获取下载结果

`MyFile.getDownloadTaskResult(id)`

**参数说明**

| 参数         | 类型    | 必填 | 说明             |
| :----------- | :------ | :--- | :--------------- |
| id           | Integer |  Y   | 下载任务 ID      |

**示例代码**

```js
let MyFile = new BaaS.File()
const res = await MyFile.getDownloadTaskResult(1)
return res.data
```

**返回示例**

下载中：

```json
{
  "category_name": "文件云下载",
  "created_at": 1587545049,
  "error_message": null,
  "file_path": "https://***.jpg",
  "filename": "***.jpg",
  "id": 5,
  "original_url": "https://***.jpg",
  "status": "pending",
}
```

下载失败：

```json
{
  "category_name": "文件云下载",
  "created_at": 1587545049,
  "error_message": null,
  "file_path": "https://***.jpg",
  "filename": "***.jpg",
  "id": 5,
  "original_url": "https://***.jpg",
  "status": "failed",
}
```

下载成功：

```json
{
  "category_name": "文件云下载",
  "created_at": 1587545049,
  "error_message": null,
  "file_path": "https://***.jpg",
  "filename": "***.jpg",
  "id": 5,
  "original_url": "https://***.jpg",
  "status": "success",
  "uploaded_file": {
    "categories": [
      {
        "id": "5ea003ca2dc6106f4f0b441f",
        "name": "文件云下载",
        "parent": null
      }
    ],
    "cdn_path": "***.jpg",
    "created_at": 1587545051,
    "created_by": 1091431,
    "id": "5ea003db2dc6106fcfd3cf62",
    "media_type": null,
    "mime_type": null,
    "name": "***.jpg",
    "path": "https://***.jpg",
    "reference": {},
    "size": 7755,
    "status": "success",
    "updated_at": 1587545051
  }
}
```


## 获取文件详情

`MyFile.get(fileID)`

**参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| fileID | String | Y   | 文件 id |

**返回参数说明**

res.data:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| category   | Object | 包含文件分类信息，详见以下 |
| created_at | String | 文件上传时间 |
| id         | Object | 文件 ID |
| mime_type  | String | 文件媒体类型 |
| name       | String | 文件名 |
| path       | String | 文件路径 |
| size       | Number | 以字节为单位 |

category 参数说明：

| 参数  | 类型   | 说明 |
| :--- | :----- | :-- |
| id   | String | 分类 ID |
| name | String | 分类名 |

**示例代码**

```js
let MyFile = new BaaS.File()
MyFile.get('5a2fe93308443e313a428c4f').then(res => {
  // success
}, err => {
  // err
})
```

**返回示例**

```json
{
  "category": {
    "id": "5a2fe91508443e3123dbe1cb",
    "name": "科技"
  },
  "created_at": 1507822469,
  "id": "5a2fe93308443e313a428c4f",
  "mime_type": "text/plain; charset=utf-8",
  "name": "tmp_262601706o6zAJs-pmaywKzqHIvzwU97rtiGIe4dd39171563993cf10b12bae2ac30ec.svg",
  "path": "https://baas-hello-world.cloud.ifanrusercontent.com/1fQTn8UCwQYlGFrv.txt",
  "size": 3879
}
```


## 删除文件

`MyFile.delete(fileID)`

**参数说明**

| 参数    | 类型                   | 必填 | 说明 |
| :----- | :--------------------- | :-- | :-- |
| fileID | String or String Array |  Y  | 文件 id (可为数组) |

**示例代码**

```js
let MyFile = new BaaS.File()

MyFile.delete('5a2fe93308443e313a428c4f').then()

MyFile.delete(['5a2fe93308443e313a428c4c', '5a2fe93308443e313a428c4d']).then()
```

> **info**
> 删除单个文件，如果权限不足，会返回 401；删除多个文件，如果权限不足，则直接跳过该文件

## 获取符合条件的文件总数

`BaaS.File#count()`

{{filter()}}

{% tabs getFileCountAsync="async/await", getFileCountPromise="promise" %}
{% content "getFileCountAsync" %}
```js
let MyFile = new BaaS.File()
let query = new BaaS.Query()
query.compare('category_name', '=', categoryName)
query.contains('name', substr)
let num = await MyFile.setQuery(query).count()
console.log(num)  // 10
```

{% content "getFileCountPromise" %}
```js
let MyFile = new BaaS.File()
let query = new BaaS.Query()
query.compare('category_name', '=', categoryName)
query.contains('name', substr)
MyFile.setQuery(query).count().then(num => {
  // success
  console.log(num)  // 10
  callback(null, res)
}, err => {
  // err
  callback(err)
})
```
{% endtabs %}


## 查询，获取文件列表

`BaaS.File#find(options)`

**参数说明**

options:

| 参数          | 类型    | 必填 | 默认 | 说明 |
| :------------ | :------ | :--- | :--- |:--- |
| withCount     | boolean |  否  | true | 是否返回 total_count |

{{totalCount.withCountTips()}}

{{filter()}}

**示例代码**

```js
let MyFile = new BaaS.File()

// 查找所有文件
MyFile.find()

let query = new BaaS.Query()
// 查询某一文件分类下的所有文件
query.compare('category_name', '=', categoryName)
// 查询文件名包含指定字符串的文件
query.contains('name', substr)
MyFile.setQuery(query).find()
```

```js
let MyFile = new BaaS.File()

// 查找所有文件
MyFile.find()

// 按创建时间范围查询: 2018年10月24日17时10分57秒 至今上传的文件
let query = BaaS.Query.and(new BaaS.Query().compare('created_at', '<=', Math.ceil(Date.now() / 1000)), new BaaS.Query().compare('created_at', '>=', 1540372257)),

MyFile.setQuery(query).find()
```

## 排序
文件查询排序与[数据表排序](../schema/limit-and-order.md)方法一致，但只支持对以下指定字段进行排序

| 支持字段       |  类型   | 说明 |
| :-----------  | :----- | :--- |
| name          | String | 文件名 |
| size          | Number | 文件大小，以字节为单位 |
| created_at    | Number | 文件上传时间 |

**示例代码**

```js
let MyFile = new BaaS.File()
MyFile.orderBy('-created_at').find().then()
```

## 分页
文件查询排序与[数据表分页](../schema/limit-and-order.md)方法一致

## 视频截图

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

res.data:

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
| id   | String | 本条记录 ID |

**示例代码**

```js
let MyFile = new BaaS.File()
let params = {
  "source": "asjgernaskasdewk",
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

HError 对象结构请参考[错误码和 HError 对象](../error.md)

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

`MyFile.videoConcat(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8s | Array |  Y  | 视频文件的 id 列表，按提交的顺序进行拼接 |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

**返回参数说明**

res.data:

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
let MyFile = new BaaS.File()
let params = {
  "m3u8s": ["xxxxxxxxxxx", "xxxxxxxxxxx"],
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

HError 对象结构请参考[错误码和 HError 对象](../error.md)

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

res.data:

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
let MyFile = new BaaS.File()
let params = {
  "m3u8": "xxxxxxxxxxx",
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

HError 对象结构请参考[错误码和 HError 对象](../error.md)

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

`MyFile.videoMeta(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |

**返回参数说明**

res.data:

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
let MyFile = new BaaS.File()
let params = {
  "m3u8": "xxxxxxxxxxx"
}
MyFile.videoMeta(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](../error.md)

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

`MyFile.videoAudioMeta(params)`

**params参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source   | String |  Y  | 文件的 id |

**返回参数说明**

res.data:

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
let MyFile = new BaaS.File()
let params = {
  "source": "xxxxxxxxxxx"
}
MyFile.videoAudioMeta(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](../error.md)

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

## 刷新 CDN 缓存

`MyFile.purgeCache(operationType, content)`

**参数说明**

| 参数          | 类型   | 必填| 说明 |
| :------------ | :----- | :-- | :--- |
| operationType | String |  Y  | 操作类型，包括：`exact`(URL 刷新)、`path_prefix`(目录刷新) |
| content       | Array  |  Y  | 操作的 URL 列表 |

**示例代码**

```js
let MyFile = new BaaS.File()
MyFile.purgeCache('exact', ['https://***']).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](../error.md)

**返回示例**

```json
{
  "status": "ok"
}
```

## 获取 CDN 缓存刷新操作记录

`MyFile.getPurgeCacheHistory(params)`

**params 参数说明**

| 参数                   | 类型   | 必填| 说明 |
| :--------------------- | :----- | :-- | :--- |
| params.limit           | Number |  N  | 数量限制 |
| params.offset          | Number |  N  | 偏移量 |
| params.operationType   | String |  N  | 操作类型，包括：`exact`(URL 刷新)、`path_prefix`(目录刷新) |
| params.created_at__gte | Number |  N  | 创建时间区间的开始时间（时间戳） |
| params.created_at__lte | Number |  N  | 创建时间区间的结束时间（时间戳） |

**示例代码**

```js
let MyFile = new BaaS.File()
let params = {
  offset: 0,
  limit: 10,
  operationType: 'exact',
  created_at__gte: 1548744906,
  created_at__lte: 1548917706,
}
MyFile.getPurgeCacheHistory(params).then((res) => {
  // success
}, err => {
  // HError 对象
})
```

HError 对象结构请参考[错误码和 HError 对象](../error.md)

**返回示例**

```json
{
  "meta": {
      "limit": 10,
      "next": null,
      "offset": 0,
      "previous": null,
      "total_count": 1
  },
  "objects": [
      {
          "content": "https://***",
          "created_at": 1548830917,
          "error_message": null,
          "id": "5c5148c57032fce4f73e6ef6",
          "operation_type": "exact",
          "status": "in_progress",
          "updated_at": 1548830917
      }
  ]
}
```
