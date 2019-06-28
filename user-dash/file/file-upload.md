<!-- ex_nonav -->

# 上传文件

**上传流程图**

```
      +-----------------+ +-----------------+ +-----------------+
      | Client/Browser  | |    FORM API     | |     知晓云       |
      +-----------------+ +-----------------+ +-----------------+
              |                   |                   |
             +++        Request authorization        +++
             |-|====================================>|-|
             |-|                  |                  |-|
             |-|        Response authorization       |-|
             |-|<====================================|-|
             +++                  |                  +++
              |                   |                   |
             +++     Upload      +++                 +++
             |-|================>|-|                 |-|
             |-|                 |-|                 |-|
             |-|     Response    |-|                 |-|
             |-|<================|-|                 |-|
             +++                 +++                 +++
              |                   |                   |
```

使用知晓云开放 API 上传文件需要以下两个步骤：

#### 1. 获取上传文件所需授权凭证和上传地址
  
> **info**
> v2.1 接口规范了返回参数的输出，使用更方便。原[获取上传文件所需授权凭证和上传地址 v1 接口](#获取上传文件所需授权凭证和上传地址-v1)已被废弃。

**接口**

`POST https://cloud.minapp.com/userve/v2.1/upload/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| filename      | String | N   | 上传的文件名 |
| category_id    | String | N   | 文件分类 ID |

**返回参数**

| 参数           | 类型         | 说明 |
| :----------   | :----------- | :-- |
| id            | String       | 上传的文件 ID |
| policy        | String       | 文件上传配置 |
| authorization | String       | 文件上传凭证 |
| path          | String       | 文件上传成功后的访问地址 |
| upload_url    | String       | 上传文件的目标地址 |
| name          | String       | 文件名 |
| cdn_path      | String       | 文件在 CDN 中保存的路径 |
| created_at    | Integer      | 文件创建时间戳 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v2.1/upload/', {
  filename: 'crop.gif',
  category_id: '5a1ba7b708443e7fc5f2fb18'
}).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
    "policy": "eyJkYXRlIjogIldlZCwgMDYgRGVjIDIwMTcgMDM6MzI6MzMgR01UIiwgIm5vdGlmeS11cmwiOiAiaHR0cHM6Ly9zc28uaWZhbnIuY29tL2V4dGFwaS9oeWRyb2dlbi91cHl1bi9jYWxsYmFjay8yODcvNWEyNzY0ZDFmZmYxZDYxYWQwZWNhMjQ1LyIsICJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTI4NyIsICJzYXZlLWtleSI6ICIxZU1RUmxrSndoZ2FNaUNnLmdpZiIsICJleHBpcmF0aW9uIjogMTUxMjUzMTQ1M30=",
    "upload_url": "https://v0.api.upyun.com/cloud-minapp-287",
    "path": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eMQRlkJwhgaMiCg.gif",
    "id": "5a2764d1fff1d61ad0eca245",
    "authorization": "UPYUN allenzhang:MzmYCcWVjrWoeovC4+tM5Bgwusg=",
    "name": "1eMQRlkJwhgaMiCg.gif",
    "cdn_path": "1eMQRlkJwhgaMiCg.gif",
    "created_at": 12344566
}
```

**状态码说明**

`200` 获得授权凭证成功，`400` 参数错误（不支持上传的文件格式)，`404` 找不到文件分类 ID

#### 2. 使用上一步获取的授权凭证和上传地址，进行文件上传

**接口**

`POST {UPLOAD_URL}`

`UPLOAD_URL`  是调用上一步的接口所返回的字段 `upload_url` 的值，形如：

```
  https://v0.api.upyun.com/cloud-minapp-287
```

**参数说明**

Content-Type: `multipart/form-data`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| authorization | String | Y   | 授权凭证 |
| file          | String | Y   | 上传的文件流 |
| policy        | String | Y   | 授权凭证 |

**代码示例**

```js
// 注意这里不能使用 withCredentials: true
// var axios = require('axios').create({
//  withCredentials: true
// })

let formData = new FormData()
formData.append('file', fileObj)
formData.append('policy', 'eyJkYXRlIjogIldlZCwgMDYgRGVjIDIwMTcgMDM6MzI6MzMgR01UIiwgIm5vdGlmeS11cmwiOiAiaHR0cHM6Ly9zc28uaWZhbnIuY29tL2V4dGFwaS9oeWRyb2dlbi91cHl1bi9jYWxsYmFjay8yODcvNWEyNzY0ZDFmZmYxZDYxYWQwZWNhMjQ1LyIsICJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTI4NyIsICJzYXZlLWtleSI6ICIxZU1RUmxrSndoZ2FNaUNnLmdpZiIsICJleHBpcmF0aW9uIjogMTUxMjUzMTQ1M30')
formData.append('authorization', 'UPYUN allenzhang:MzmYCcWVjrWoeovC4+tM5Bgwusg=')

axios.post('https://v0.api.upyun.com/cloud-minapp-287', formData, {
  'headers': {'Content-Type': 'multipart/form-data'},
})
```

**返回示例**

```
{
    "image-type": "GIF",
    "image-frames": 8,
    "image-height": 8,
    "code": 200,
    "file_size": 329,
    "image-width": 8,
    "url": "1eMQRlkJwhgaMiCg.gif",
    "time": 1512531154,
    "message": "ok",
    "mimetype": "image/gif"
}
```

**状态码说明**

`200` 上传成功

#### 获取上传文件所需授权凭证和上传地址 v1

**接口**

`POST https://cloud.minapp.com/userve/v1/upload/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| filename      | String | N   | 上传的文件名 |
| category_id    | String | N   | 文件分类 ID |

**返回参数**

| 参数           | 类型         | 说明 |
| :----------   | :----------- | :-- |
| id            | String       | 上传的文件 ID |
| policy        | String       | 文件上传配置 |
| authorization | String       | 文件上传凭证 |
| file_link     | String       | 文件上传成功后的访问地址 |
| upload_url    | String       | 上传文件的目标地址 |

**代码示例**

```js
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1/upload/', {
  filename: 'crop.gif',
  category_id: '5a1ba7b708443e7fc5f2fb18'
}).then(res => {
  console.log(res.data)
})
```

**返回示例**

```json
{
    "policy": "eyJkYXRlIjogIldlZCwgMDYgRGVjIDIwMTcgMDM6MzI6MzMgR01UIiwgIm5vdGlmeS11cmwiOiAiaHR0cHM6Ly9zc28uaWZhbnIuY29tL2V4dGFwaS9oeWRyb2dlbi91cHl1bi9jYWxsYmFjay8yODcvNWEyNzY0ZDFmZmYxZDYxYWQwZWNhMjQ1LyIsICJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTI4NyIsICJzYXZlLWtleSI6ICIxZU1RUmxrSndoZ2FNaUNnLmdpZiIsICJleHBpcmF0aW9uIjogMTUxMjUzMTQ1M30=",
    "upload_url": "https://v0.api.upyun.com/cloud-minapp-287",
    "file_link": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eMQRlkJwhgaMiCg.gif",
    "id": "5a2764d1fff1d61ad0eca245",
    "authorization": "UPYUN allenzhang:MzmYCcWVjrWoeovC4+tM5Bgwusg="
}
```

**状态码说明**

`200` 获得授权凭证成功，`400` 参数错误（不支持上传的文件格式)，`404` 找不到文件分类 ID

