# 文件操作

## 获取文件详情

**接口**

`GET https://cloud.minapp.com/userve/v2.2/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.2/file/5a1ba9c1fff1d651135e5ff1/').then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
  "categories": [
    {
      "id": "5a1ba7b708443e7fc5f2fb18",
      "name": "Category",
    }
  ],
  "cdn_path": "1eJCS1MFGdvaaBoV.png",
  "created_at": 1511762369,
  "id": "5a1ba9c1fff1d651135e5ff1",
  "media_type": "image",
  "mime_type": "image/png",
  "name": "box_close.png",
  "path": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eJCS1MFGdvaaBoV.png",
  "size": 3652,
  "status": "success"
}
```


## 获取文件列表

**接口**

`GET https://cloud.minapp.com/userve/v2.2/file/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | Y   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | Number | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://cloud.minapp.com/userve/v2.2/file/?limit=1&return_total_count=1
```

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.get('https://cloud.minapp.com/userve/v2.2/file/', {
  params: {
    order_by: '-created_at',
    category: '5a1ba7b708443e7fc5f2fb18'
  }
}).then(res => {
  console.log(res.data)
})
```

## 删除文件

**接口**

`DELETE https://cloud.minapp.com/userve/v2.2/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v2.2/file/5a1ba9c1fff1d651135e5ff1/').then(res => {
  console.log(res.data)
})
```
**状态码说明**

`204` 删除成功


## 批量删除文件

**接口**

`DELETE https://cloud.minapp.com/userve/v2.2/file/?id__in=:file1_id,:file2_id`

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.delete('https://cloud.minapp.com/userve/v2.2/file/', {
  params: {
    id__in: '5a1ba9c1fff1d651135e5ff1,59ca3d275f281f58523fc47a'
  }
}).then(res => {
  console.log(res.data)
})
```

**状态码说明**

`204` 删除成功

## 视频截图

**接口**

`POST https://cloud.minapp.com/userve/v1/media/video-snapshot/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source | String |  Y  | 视频文件的 id |
| save_as | String |  Y  | 截图保存的文件名 |
| point | String |  Y  | 截图时间格式，格式：HH:MM:SS |
| category_id | String |  N  | 文件所属类别 ID |
| random_file_link | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| size | String |  N  | 截图尺寸，格式为 宽 x 高，默认是视频尺寸 |
| format | String |  N  | 截图格式，可选值为 jpg，png, webp, 默认根据 save_as 的后缀生成 |

**返回参数**

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
| reference   | Object | 引用 |
| cdn_path   | String | 文件在 CDN 中的相对路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| id   | String | 本条记录 ID |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/media/video-snapshot/', {
  params: {
    "source": "xxxxxxxxxx",
    "save_as": "hello.png",
    "point": "00:00:10",
    "category_id": "5c18bc794e1e8d20dbfcddcc",
    "random_file_link": false
  }
}).then(res => {
  console.log(res.data)
})
```

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
  "reference": {},
  "cdn_path": "1gizRRRdklnf7gCD.png",
  "updated_at": 1547461561,
  "categories": [],
  "id": "5c3c63b9d1606e0b3fc7acb7"
}
```

**状态码说明**

`200` 成功

`400` 请求参数错误

`404` 文件不存在

## M3U8 视频拼接

**接口**

`POST https://cloud.minapp.com/userve/v1/media/m3u8-concat/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8s | Array |  Y  | 视频文件的 id 列表，按提交的顺序进行拼接 |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

**返回参数**

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
| reference   | Object | 引用 |
| cdn_path   | String | 文件在 CDN 中的相对路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| id   | String | 本条记录 ID |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/media/m3u8-concat/', {
  params: {
    "m3u8s": ["xxxxxxxxxx", "xxxxxxxxxx"],
    "save_as": "hello.m3u8",
    "category_id": "5c18bc794e1e8d20dbfcddcc",
    "random_file_link": false,
  }
}).then(res => {
  console.log(res.data)
})
```

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
  "id": "5c3c63b9d1606e0b3fc7acb7"
}
```

**状态码说明**

`200` 成功

`400` 请求参数错误

`404` 文件不存在

## M3U8 视频剪辑

**接口**

`POST https://cloud.minapp.com/userve/v1/media/m3u8-clip/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| include   | Array |  N  | 包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| exclude   | Array |  N  | 不包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| index   | Boolean |  N  | include 或者 exclude 中的值是否为 ts 分片序号，默认为 false |

**返回参数**

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
| reference   | Object | 引用 |
| cdn_path   | String | 文件在 CDN 中的相对路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| id   | String | 本条记录 ID |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/media/m3u8-clip/', {
  params: {
    "m3u8": "xxxxxxxxxx",
    "include": [0, 20],
    "save_as": "0s_20s.m3u8",
    "category_id": "5c18bc794e1e8d20dbfcddcc",
    "random_file_link": false
  }
}).then(res => {
  console.log(res.data)
})
```

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

**状态码说明**

`200` 成功

`400` 请求参数错误

`404` 文件不存在

## M3U8 时长和分片信息

**接口**

`POST https://cloud.minapp.com/userve/v1/media/m3u8-meta/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8 | String |  Y  | 视频文件的 id |

**返回参数**

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

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/media/m3u8-meta/', {
  params: {
    "m3u8": "xxxxxxxxxx"
  }
}).then(res => {
  console.log(res.data)
})
```

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

**状态码说明**

`200` 成功

`400` 请求参数错误

`404` 文件不存在


## 音视频的元信息

**接口**

`POST https://cloud.minapp.com/userve/v1/media/audio-video-meta/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source   | String |  Y  | 文件的 id |


**返回参数**

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

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/media/audio-video-meta/', {
  params: {
    "source": "xxxxxxxxxx"
  }
}).then(res => {
  console.log(res.data)
})
```

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

**状态码说明**

`200` 成功

`400` 请求参数错误

`404` 文件不存在
