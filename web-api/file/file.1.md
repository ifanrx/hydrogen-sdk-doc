# 文件操作

## 获取文件详情

**接口**

`GET /hserve/v1.3/uploaded-file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v1.3/uploaded-file/5cac3d2299ecae0c9e8aa3e6/
```

**返回示例**

```json
{
  "categories": [
    {
      "id": "5cac3d2299ecae0c9e8aa3e6",
      "name": "Category",
    }
  ],
  "cdn_path": "1eJCS1MFGdvaaBoV.png",
  "created_at": 1511762369,
  "id": "5cac3d2299ecae0c9e8aa3e6",
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

`GET /hserve/v1.3/uploaded-file/`

**参数说明**

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | Y   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode  "order_by=-created_at" \
  https://{{服务器域名}}/hserve/v1.3/uploaded-file/
```

**返回示例**

```json
{
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 5
    },
    "objects": [
        {
            "category": null,
            "created_at": 1546008508,
            "id": "5cac3d2299ecae0c9e8aa3e6",
            "mime_type": "image/jpeg",
            "name": "test.jpeg",
            "path": "https://cloud-minapp-18630.cloud.ifanrusercontent.com/1gctR6qybW3irhEo.jpeg",
            "size": 27273
        },
        ......
    ]
}
```

## 删除文件

**接口**

`DELETE https://{{服务器域名}}/hserve/v1.3/uploaded-file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v1.3/uploaded-file/5a1ba9c1fff1d651135e5ff1/
```

**状态码说明**

`204` 删除成功


## 批量删除文件

**接口**

`DELETE /hserve/v1.3/uploaded-file/?id__in=:file1_id,:file2_id`

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: {{Client ID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode  "id__in=-5a1ba9c1fff1d651135e5ff1, 59ca3d275f281f58523fc47a" \
  https://{{服务器域名}}/hserve/v1.3/uploaded-file/
```

**状态码说明**

`204` 删除成功


## 视频截图

**接口**

`POST /hserve/v1/media/video-snapshot/`

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
| path   | String | 路径 |
| created_by   | Integer | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Integer | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | Object | 引用 |
| cdn_path   | String | cdn 中保存的路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| id   | String | 本条记录 ID |

**请求示例**

```shell
curl --request POST \
  --url https://{{服务器域名}}/hserve/v1/media/video-snapshot/ \
  --header 'Authorization: Hydrogen-r1 {{AccessToken}}' \
  --header 'Content-Type: application/json' \
  --data '{\n	"source": "5c4a6db320fa9c2e054c6c36",\n	"save_as": "1-25-test.png",\n	"point": "00:00:50",\n	"category_id": "5a377bb009a8054139faafed"\n}'
```

**返回示例**

```json
{
  "status": "success",
  "id": "5c4a6dcc20fa9c2e054c6c3b",
  "created_at": 1548381644,
  "updated_at": 1548381644,
  "media_type": "image",
  "mime_type": "image/png",
  "size": 1122460,
  "reference": {},
  "name": "1-25-test.png",
  "path": "https://cloud-minapp-7894.cloud.ifanrusercontent.com/1gmqnUzZx1gNpp78.png",
  "cdn_path": "1gmqnUzZx1gNpp78.png",
  "categories": [
    {
      "id": "5a377bb009a8054139faafed",
      "parent": null,
      "name": "图片"
    }
  ],
  "created_by": 2176
}
```

**状态码说明**

`200` 截图成功

`400` 参数错误

`404` 文件不存在

## M3U8 视频拼接

**接口**

`POST /hserve/v1/media/m3u8-concat/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| m3u8s | Array |  Y  | 视频文件的 id 列表，按请求的顺序进行拼接 |
| save_as   | String |  Y  | 截图保存的文件名 |
| category_id   | String |  N  | 文件所属类别 ID |
| random_file_link   | Boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | Integer | 创建时间 （格式为 unix 时间戳) |
| path   | String | 路径 |
| created_by   | Integer | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Integer | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | Object | 引用 |
| cdn_path   | String | cdn 中保存的路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| id   | String | 本条记录 ID |

**请求示例**

```shell
curl --request POST \
  --url https://{{服务器域名}}/hserve/v1/media/m3u8-concat/ \
  --header 'Authorization: Hydrogen-r1 {{AccessToken}}' \
  --header 'Content-Type: application/json' \
  --data '{\n	"m3u8s": ["5c453c7cfe10833f3178479e", "5c452bebfe10832bf97846c9"],\n	"save_as": "1-25-test.m3u8",\n	"category_id": "5a377bcb09a8054139faaff1"\n}'
```

**返回示例**

```json
{
  "status": "pending",
  "id": "5c4a699820fa9c27f14c6ddd",
  "created_at": 1548380568,
  "updated_at": 1548380568,
  "media_type": "other",
  "mime_type": null,
  "size": 0,
  "reference": {},
  "name": "1-25-test.m3u8",
  "path": "https://cloud-minapp-7894.cloud.ifanrusercontent.com/1gmqW8egmWLqY4Q1.m3u8",
  "cdn_path": "1gmqW8egmWLqY4Q1.m3u8",
  "categories": [
    {
      "id": "5a377bcb09a8054139faaff1",
      "parent": null,
      "name": "视频"
    }
  ],
  "created_by": 2176
}
```

**状态码说明**

`200` 成功

`400` 参数错误

`404` 文件不存在

## M3U8 视频剪辑

**接口**

`POST /hserve/v1/media/video-clip/`

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
| path   | String | 文件访问完整 URL |
| created_by   | Integer | 创建者 id |
| mime_type   | String | mime_type 类型 |
| media_type   | String | 媒体类型 |
| size   | Integer | 文件大小 |
| name   | String | 文件名 |
| status   | String | 文件状态 |
| reference   | Object | 引用 |
| cdn_path   | String | cdn 中保存的路径 |
| updated_at   | Integer | 更新时间 （格式为 unix 时间戳) |
| categories   | String | 文件所属类别 |
| id   | String | 本条记录 ID |

**请求示例**

```shell
curl --request POST \
  --url https://{{服务器域名}}/hserve/v1/media/m3u8-clip/ \
  --header 'Authorization: Hydrogen-r1 {{AccessToken}}' \
  --header 'Content-Type: application/json' \
  --data '{\n	"m3u8": "5c452bebfe10832bf97846c9",\n	"save_as": "1-25-test.m3u8",\n	"include": [0, 5],\n	"category_id": "5a377bcb09a8054139faaff1"\n}'
```

**返回示例**

```json
{
  "status": "pending",
  "id": "5c4a685520fa9c27f14c6d48",
  "created_at": 1548380245,
  "updated_at": 1548380245,
  "media_type": "other",
  "mime_type": null,
  "size": 0,
  "reference": {},
  "name": "1-25-test.m3u8",
  "path": "https://cloud-minapp-7894.cloud.ifanrusercontent.com/1gmqQuVchCjctKhe.m3u8",
  "cdn_path": "1gmqQuVchCjctKhe.m3u8",
  "categories": [
    {
      "id": "5a377bcb09a8054139faaff1",
      "parent": null,
      "name": "视频"
    }
  ],
  "created_by": 2176
}
```

**状态码说明**

`200` 成功

`400` 参数错误

`404` 文件不存在

## M3U8 时长和分片信息

**接口**

`POST /hserve/v1/media/m3u8-meta/`

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

**请求示例**

```shell
curl --request POST \
  --url https://{{服务器域名}}/hserve/v1/media/m3u8-meta/ \
  --header 'Authorization: Hydrogen-r1 {{AccessToken}}' \
  --header 'Content-Type: application/json' \
  --data '{\n	"m3u8": "5c452bebfe10832bf97846c9"\n}'
```

**返回示例**

```json
{
  "message": "ok",
  "status_code": 200,
  "meta": {
    "duration": 1769.2619999999997,
    "points": [
      20.44,
      40,
      60.92,
      80.68,
      100.16000000000001,
      120.08000000000001,
      1581.5839999999998,
      1600.9429999999998,
      1620.9429999999998,
      1640.9429999999998,
      1660.6629999999998,
      1680.6629999999998,
      1700.6629999999998,
      1720.6629999999998,
      1740.6629999999998,
      1760.6629999999998,
      1769.2619999999997
    ]
  }
}
```

**状态码说明**

`200` 成功

`400` 参数错误

`404` 文件不存在

## 音视频原信息

**接口**

`POST /hserve/v1/media/audio-video-meta/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source   | String |  Y  | 文件的 id |


**返回参数**

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

**请求示例**

```shell
curl --request POST \
  --url https://{{服务器域名}}/hserve/v1/media/audio-video-meta/ \
  --header 'Authorization: Hydrogen-r1 {{AccessToken}}' \
  --header 'Content-Type: application/json' \
  --data '{\n	"source": "5c3421788318ed7f50e5ea8b"\n}'
```

**返回示例**

```json
{
  "format": {
    "format": "mov,mp4,m4a,3gp,3g2,mj2",
    "filesize": 91427419,
    "duration": 43.451667,
    "fullname": "QuickTime / MOV",
    "bitrate": 16832941
  },
  "streams": [
    {
      "index": 0,
      "duration": 43.451667,
      "bitrate": 16762715,
      "video_fps": 24,
      "codec_desc": "H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10",
      "metadata": {
        "creation_time": "2016-01-17T02:58:26.000000Z",
        "encoder": "H.264",
        "language": "und",
        "rotate": "90",
        "handler_name": "Core Media Data Handler"
      },
      "video_height": 1080,
      "video_width": 1920,
      "type": "video",
      "codec": "h264"
    },
    {
      "index": 1,
      "duration": 43.451678,
      "bitrate": 62934,
      "codec_desc": "AAC (Advanced Audio Coding)",
      "metadata": {
        "creation_time": "2016-01-17T02:58:26.000000Z",
        "language": "und",
        "handler_name": "Core Media Data Handler"
      },
      "audio_samplerate": 44100,
      "audio_channels": 1,
      "type": "audio",
      "codec": "aac"
    }
  ]
}
```

**状态码说明**

`200` 成功

`400` 参数错误

`404` 文件不存在