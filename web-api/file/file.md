# 文件操作

## 获取文件详情

> **info**
> v2.1 接口规范了返回参数的输出，使用更方便。原[获取文件详情 v1.3 接口](#获取文件列表-v13)已被废弃。

**接口**

`GET /hserve/v2.2/uploaded-file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/5cac3d2299ecae0c9e8aa3e6/
```

**返回示例**

```json
{
  "category": [
    {
      "id": "5cac3d2299ecae0c9e8aa3e6",
      "name": "Category",
    }
  ],
  "cdn_path": "1eJCS1MFGdvaaBoV.png",
  "created_at": 1511762369,
  "id": "5cac3d2299ecae0c9e8aa3e6",
  "mime_type": "image/png",
  "name": "box_close.png",
  "path": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eJCS1MFGdvaaBoV.png",
  "size": 3652,
}
```

## 获取文件列表

> **info**
> v2.2 接口规范了返回参数的输出，使用更方便。原[获取文件列表 v1.3 接口](#获取文件列表-v13)已被废弃。

**接口**

`GET /hserve/v2.2/uploaded-file/`

> **info**
> 该接口支持通过参数 return_total_count 指定是否返回查询对象总数，以协助不关心对象总数只关心查询结果列表的开发者提升接口响应速度。
同时，从 v2.2 版本开始该接口默认不返回查询对象总数，欲获取总数的开发者需要显式指定 return_total_count 参数。

**参数说明**

| 参数     | 类型     | 必填  | 说明 |
| :------- | :-----  | :--  | :-- |
| order_by | string  | Y    | 排序（支持 `created_at` 进行排序）|
| limit    | integer | N    | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | integer | N    | 设置返回资源的起始偏移值，默认为 0 |
| return_total_count   | integer | N   | 返回结果 meta 中是否返回 total_count，1 为返回，0 为不返回，默认不返回 |

若开发者只需要获取对象总数，则可以通过设置 `limit=1` 以及 `return_total_count=1` 来达到该效果，total_count 可从返回的 meta 中获取

请求示例：

```
https://{{服务器域名}}/hserve/v2.2/uploaded-file/?limit=1&return_total_count=1
```

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode  "order_by=-created_at" \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/
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
            "size": 27273,
            "cdn_path": "1gctR6qybW3irhEo.jpeg"
        },
        ......
    ]
}
```

## 删除文件

> **info**
> v2.1 接口规范了返回参数的输出，使用更方便。原[删除文件 v1.3 接口](#删除文件-v13)已被废弃。

**接口**

`DELETE https://{{服务器域名}}/hserve/v2.2/uploaded-file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/5a1ba9c1fff1d651135e5ff1/
```

**状态码说明**

`204` 删除成功

## 批量删除文件

> **info**
> v2.1 接口规范了返回参数的输出，使用更方便。原[批量删除文件 v1.3 接口](#批量删除文件-v13)已被废弃。

**接口**

`DELETE /hserve/v2.2/uploaded-file/`

**提交参数**

``id__in`` 包含多个文件 ID， ID 之间通过 `,` 分隔

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"id__in":["5c263d739a557716c96c6dc6","5c263d689a557718706c6e37"]}' \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/
```

**状态码说明**

`204` 删除成功

## 视频截图

**接口**

`POST /hserve/v1/media/video-snapshot/`

**请求参数说明**

|  参数  |  类型   | 必填 | 说明 |
| :----- | :-- -- | :-- | :-- |
| source | string |  Y  | 视频文件的 id |
| save_as | string |  Y  | 截图保存的文件名 |
| point | string |  Y  | 截图时间格式，格式：HH:MM:SS |
| category_id | string |  N  | 文件所属类别 ID |
| random_file_link | boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| size | string |  N  | 截图尺寸，格式为 宽 x 高，默认是视频尺寸 |
| format | string |  N  | 截图格式，可选值为 jpg，png, webp, 默认根据 save_as 的后缀生成 |

**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | integer | 创建时间 （格式为 unix 时间戳) |
| path   | string | 路径 |
| created_by   | integer | 创建者 id |
| mime_type   | string | mime_type 类型 |
| media_type   | string | 媒体类型 |
| size   | integer | 文件大小 |
| name   | string | 文件名 |
| status   | string | 文件状态 |
| reference   | object | 引用 |
| cdn_path   | string | cdn 中保存的路径 |
| updated_at   | integer | 更新时间 （格式为 unix 时间戳) |
| categories   | string | 文件所属类别 |
| id   | string | 本条记录 ID |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"source": "5cc577ec1466ec1a1b3f65bc", "save_as": "abc.png", "point": "00:00:10"}' \
  https://{{服务器域名}}/hserve/v1/media/video-snapshot/
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
| m3u8s | array |  Y  | 视频文件的 id 列表，按请求的顺序进行拼接 |
| save_as   | string |  Y  | 截图保存的文件名 |
| category_id   | string |  N  | 文件所属类别 ID |
| random_file_link   | boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |

**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | integer | 创建时间 （格式为 unix 时间戳) |
| path   | string | 路径 |
| created_by   | integer | 创建者 id |
| mime_type   | string | mime_type 类型 |
| media_type   | string | 媒体类型 |
| size   | integer | 文件大小 |
| name   | string | 文件名 |
| status   | string | 文件状态 |
| reference   | object | 引用 |
| cdn_path   | string | cdn 中保存的路径 |
| updated_at   | integer | 更新时间 （格式为 unix 时间戳) |
| categories   | string | 文件所属类别 |
| id   | string | 本条记录 ID |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"m3u8s": ["5c453c7cfe10833f3178479e", "5c452bebfe10832bf97846c9"], "save_as": "abc.m3u8", "category_id": "5a377bcb09a8054139faaff1"}' \
  https://{{服务器域名}}/hserve/v1/media/m3u8-concat/
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
| m3u8 | string |  Y  | 视频文件的 id |
| save_as   | string |  Y  | 截图保存的文件名 |
| category_id   | string |  N  | 文件所属类别 ID |
| random_file_link   | boolean |  N  | 是否使用随机字符串作为文件的下载地址，不随机可能会覆盖之前的文件，默认为 true |
| include   | array |  N  | 包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| exclude   | array |  N  | 不包含某段内容的开始结束时间，单位是秒。当 index 为 false 时，为开始结束分片序号 |
| index   | boolean |  N  | include 或者 exclude 中的值是否为 ts 分片序号，默认为 false |

**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| created_at   | integer | 创建时间 （格式为 unix 时间戳) |
| path   | string | 文件访问完整 URL |
| created_by   | integer | 创建者 id |
| mime_type   | string | mime_type 类型 |
| media_type   | string | 媒体类型 |
| size   | integer | 文件大小 |
| name   | string | 文件名 |
| status   | string | 文件状态 |
| reference   | object | 引用 |
| cdn_path   | string | cdn 中保存的路径 |
| updated_at   | integer | 更新时间 （格式为 unix 时间戳) |
| categories   | string | 文件所属类别 |
| id   | string | 本条记录 ID |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"m3u8s": "5c452bebfe10832bf97846c9", "save_as": "abc.m3u8", "category_id": "5a377bcb09a8054139faaff1", "include": [0, 5]}' \
  https://{{服务器域名}}/hserve/v1/media/m3u8-clip/
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
| m3u8 | string |  Y  | 视频文件的 id |

**返回参数**

res:

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| status_code   | integer | 状态码 |
| message   | string | 返回信息 |
| meta   | object | 详见以下 |

meta 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| duartion   | integer | m3u8 时长 |
| points   | array | 时间点 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"m3u8s": "5c452bebfe10832bf97846c9"}' \
  https://{{服务器域名}}/hserve/v1/media/m3u8-meta/
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
| source   | string |  Y  | 文件的 id |


**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| format   | object | 音视频格式信息，详见以下 |
| streams   | array | stream 列表，详见以下 |

format 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| bitrate   | integer | 比特率 |
| duration   | integer | 时长 |
| format   | string | 容器格式 |
| fullname   | string | 容器格式全称 |

streams 参数说明：

| 参数        | 类型   | 说明 |
| :--------- | :----- | :------ |
| index   | integer | 表示第几路流 |
| type   | string | 一般情况下, video 或 audio |
| bitrate   | integer | 流码率 |
| codec   | string | 流编码 |
| codec_desc   | string | 流编码说明 |
| duration   | integer | 流时长 |
| video_fps   | integer | (视频流)视频帧数 |
| video_height   | integer | (视频流)视频高度 |
| video_width   | integer | (视频流)视频宽度 |
| audio_channels   | integer | (音频流)音频通道数 |
| audio_samplerate   | integer | (音频流)音频采样率 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"source": "5cc577ec1466ec1a1b3f65bc"}' \
  https://cloud.minapp.com/hserve/v1/media/audio-video-meta/
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

## 获取文件详情 v1.3

**接口**

`GET /hserve/v2.2/uploaded-file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/5cac3d2299ecae0c9e8aa3e6/
```

**返回示例**

```json
{
  "category": [
    {
      "id": "5cac3d2299ecae0c9e8aa3e6",
      "name": "Category",
    }
  ],
  "created_at": 1511762369,
  "id": "5cac3d2299ecae0c9e8aa3e6",
  "mime_type": "image/png",
  "name": "box_close.png",
  "path": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eJCS1MFGdvaaBoV.png",
  "size": 3652,
}
```

## 获取文件列表 v1.3

**接口**

`GET /hserve/v2.2/uploaded-file/`

**参数说明**

| 参数     | 类型    | 必填 | 说明 |
| :------- | :-----  | :--  | :-- |
| order_by  | string  | Y    | 排序（支持 `created_at` 进行排序）|
| limit    | integer | N    | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | integer | N    | 设置返回资源的起始偏移值，默认为 0 |

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -G \
  --data-urlencode  "order_by=-created_at" \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/
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

## 删除文件 v1.3

**接口**

`DELETE https://{{服务器域名}}/hserve/v2.2/uploaded-file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/5a1ba9c1fff1d651135e5ff1/
```

**状态码说明**

`204` 删除成功

## 批量删除文件 v1.3

**接口**

`DELETE /hserve/v2.2/uploaded-file/`

**提交参数**

``id__in`` 包含多个文件 ID， ID 之间通过 `,` 分隔

**请求示例**

```shell
curl -X DELETE \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"id__in":["5c263d739a557716c96c6dc6","5c263d689a557718706c6e37"]}' \
  https://{{服务器域名}}/hserve/v2.2/uploaded-file/
```

**状态码说明**

`204` 删除成功
