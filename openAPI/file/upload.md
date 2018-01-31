# 上传文件操作

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](./authentication.md)。

## 上传文件流程

```

      +-----------------+ +-----------------+ +-----------------+
      | Client/Browser  | |    FORM API     | |     知晓云       |
      +-----------------+ +-----------------+ +-----------------+
              |                   |                   |
              |                   |                   |
             +++        Request authorization        +++
             |-|====================================>|-|
             |-|                  |                  |-|
             |-|                  |                  |-|
             |-|        Response authorization       |-|
             |-|<====================================|-|
             +++                  |                  +++
              |                   |                   |
              |                   |                   |
              |                   |                   |
             +++     Upload      +++                 +++
             |-|================>|-|                 |-|
             |-|                 |-|                 |-|
             |-|                 |-|                 |-|
             |-|     Response    |-|                 |-|
             |-|<================|-|                 |-|
             +++                 +++                 +++
              |                   |                   |
              |                   |                   |  

```

1. 开发者请求知晓云，生成、获取上传所需的 policy、authorization 等授权凭证；
2. 开发者通过 FORM API 上传文件，返回上传结果信息；


## 获取上传的文件的授权凭证

### 接口地址

`https://cloud.minapp.com/oserve/v1/upload/`

### 请求方法

`POST`

### 提交参数

- `filename` 上传的文件名（可选）
- `categories` 上传文件的所属分类，格式为文件分类的 ID 数组（可选）

### 请求示例

```
curl -X POST \
-H "Authorization: Bearer 52ce223c5adbb66fa188a959a8b08889adb3580c" \
-H "Content-Type: application/json" \
-d '{
      "filename":"crop.gif",
      "categories":["5a1ba7b708443e7fc5f2fb18"]
    }' \
https://cloud.minapp.com/oserve/v1/upload/
```

### 返回示例

```
{
    "policy": "eyJkYXRlIjogIldlZCwgMDYgRGVjIDIwMTcgMDM6MzI6MzMgR01UIiwgIm5vdGlmeS11cmwiOiAiaHR0cHM6Ly9zc28uaWZhbnIuY29tL2V4dGFwaS9oeWRyb2dlbi91cHl1bi9jYWxsYmFjay8yODcvNWEyNzY0ZDFmZmYxZDYxYWQwZWNhMjQ1LyIsICJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTI4NyIsICJzYXZlLWtleSI6ICIxZU1RUmxrSndoZ2FNaUNnLmdpZiIsICJleHBpcmF0aW9uIjogMTUxMjUzMTQ1M30=",
    "upload_url": "https://v0.api.upyun.com/cloud-minapp-287",
    "file_link": "https://cloud-minapp-287.cloud.ifanrusercontent.com/1eMQRlkJwhgaMiCg.gif",
    "id": "5a2764d1fff1d61ad0eca245",
    "authorization": "UPYUN allenzhang:MzmYCcWVjrWoeovC4+tM5Bgwusg="
}
```

### 状态码说明

- `200` 获得授权凭证成功
- `400` 参数错误（不支持上传的文件格式)
- `404` 找不到文件分类 ID

### 返回参数说明

  - `id`            上传的文件 ID
  - `policy`        文件上传配置
  - `authorization` 文件上传凭证
  - `file_link`     文件上传成功后的访问地址
  - `upload_url`    上传文件的目标地址

### 代码示例

nodejs 版本

```
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/upload/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {
    filename: 'aTest.xlsm',
    categories: '5a3b569109a80579061d63xx'
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode, body)
})
```

## 上传文件

开发者需要先调用授权凭证接口，拿到凭证后才能上传文件。

### 接口地址

`https://v0.api.upyun.com/:bucket`

这里的接口地址是调用获取上传的文件的授权凭证接口返回的字段 `upload_url`

### 请求方法

`POST`

### 提交参数

- `authorization` 授权凭证接口返回的字段 `authorization` 的值
- `file` 上传的文件流
- `policy` 授权凭证接口返回的字段 `policy` 的值

### 请求示例

```
curl -X POST \
-H "Authorization: Bearer 52ce223c5adbb66fa188a959a8b08889adb3580c" \
-H "Content-Type: multipart/form-data" \
-F authorization="UPYUN allenzhang:MzmYCcWVjrWoeovC4+tM5Bgwusg=" \
-F file=@"filename" \
-F policy="eyJkYXRlIjogIldlZCwgMDYgRGVjIDIwMTcgMDM6MzI6MzMgR01UIiwgIm5vdGlmeS11cmwiOiAiaHR0cHM6Ly9zc28uaWZhbnIuY29tL2V4dGFwaS9oeWRyb2dlbi91cHl1bi9jYWxsYmFjay8yODcvNWEyNzY0ZDFmZmYxZDYxYWQwZWNhMjQ1LyIsICJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTI4NyIsICJzYXZlLWtleSI6ICIxZU1RUmxrSndoZ2FNaUNnLmdpZiIsICJleHBpcmF0aW9uIjogMTUxMjUzMTQ1M30=" \
https://v0.api.upyun.com/cloud-minapp-287
```

调用接口是通过 `FORM` 表单的形式传输数据

### 返回示例

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

### 状态码说明

- `200` 上传成功

### 代码示例

nodejs 版本

```
var request = require('request');
var fs = require('fs');

var opt = {
  uri: upload_url,  // 获取上传文件的授权凭证成功返回的 upload_url
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data"    // 传数据的格式
  },
  formData: {
    authorization,
    policy,
    file: fs.createReadStream(__dirname + '/demo.js')   // 参数需为文件流
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode, body)
})
```
  