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

使用知晓云 Web API 上传文件需要以下两个步骤：

#### 1. 获取上传文件所需授权凭证和上传地址

> **info**
> v2.1 接口规范了返回参数的输出，使用更方便。原[获取上传文件所需授权凭证和上传地址 v1 接口](#获取上传文件所需授权凭证和上传地址-v1)已被废弃。

**接口**

`POST /hserve/v2.1/upload/`

**请求参数说明**

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| filename      | string | N   | 上传的文件名 |
| category_id   | string | N   | 上传文件的所属分类，格式为文件分类的 ID 数组 |
| category_name   | string | N   | 目录名，若同时指定 category_id 及 category_name ，将优先使用 category_id (可选) |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"filename": "test.jpg", "category_name": "cate"}' \
  https://{{服务器域名}}/hserve/v2.1/upload/
```

**返回参数**

| 参数           | 类型         | 说明 |
| :----------   | :----------- | :-- |
| id            | String       | 上传的文件 ID |
| policy        | String       | 文件上传配置 |
| authorization | String       | 文件上传凭证 |
| path          | String       | 上传成功后的访问地址 URL |
| upload_url    | String       | 上传文件的目标地址 |
| name          | String       | 文件名 |
| cdn_path      | String       | 文件在 CDN 中的相对路径 |
| created_at    | Integer      | 文件创建时间戳 |

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

`200` 获得授权凭证成功

#### 2. 使用上一步获取的授权凭证和上传地址，进行文件上传

**接口**

`POST {UPLOAD_URL}`

`UPLOAD_URL`  是调用上一步的接口所返回的字段 `upload_url` 的值，形如：

```
  https://v0.api.upyun.com/cloud-minapp-18****
```

**参数说明**

Content-Type: `multipart/form-data`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| authorization | string | Y   | 授权凭证 |
| file          | string | Y   | 上传的文件流 |
| policy        | string | Y   | 授权凭证 |

**请求示例**

```shell
curl \
 -F authorization="UPYUN allenzhang:aBIGd7s5Tjcc2khrnx2uxgjYuzw=" \
 -F file=@"/Users/hehehe/Downloads/test.jpg" \
 -F policy="eyJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTE4NjMwIiwgImRhdGUiOiAiVGh1LCAxOCBBcHIgMjAxOSAwODoyMTo0MSBHTVQiLCAibm90aWZ5LXVybCI6ICJodHRwczovL3Nzby5pZmFuci5jb20vZXh0YXBpL2h5ZHJvZ2VuL3VweXVuL2NhbGxiYWNrLzE4NjMwLzVjYjgzMzk1YWNjNzM5NDMxNzBjZWFkNS8iLCAic2F2ZS1rZXkiOiAiMWhIMklmWlgwUlIzc1dvSS5wbmciLCAiZXhwaXJhdGlvbiI6IDE1NTU1NzYwMDF9=" \
  https://v0.api.upyun.com/cloud-minapp-18630
```

**返回参数说明**


| 参数              | 类型      | 说明                       |
| :--------------- | :-------  | :-----------------------  |
| image-type        |  string   | 图片类型                   |
| image-height      |  integer  | 图片高度                   |
| image-width       |  integer  |  图片宽度                  |
| code              |  integer  |  响应码                    |
| time              |  array    |  上传时间                   |
| file_size         |  array    |  图片大小                   |
| url               |  integer  |  图片链接                   |
| message           |  integer  |  附加信息                   |
| mimetype          |  string   |  mime                     |


**返回示例**

```json
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

> **info**
> 如果需要获取文件上传成功后文件的完整 url，请使用步骤 1 接口返回的 file_link

#### 获取上传文件所需授权凭证和上传地址 v1

**接口**

`POST /hserve/v1/upload/`

**请求参数说明**

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| filename      | string | N   | 上传的文件名 |
| category_id   | string | N   | 上传文件的所属分类，格式为文件分类的 ID 数组 |
| category_name | string | N   | 目录名，若同时指定 category_id 及 category_name ，将优先使用 category_id (可选) |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: [[client_id]]" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"filename": "test.jpg", "category_name": "cate"}' \
  https://{{服务器域名}}/hserve/v1/upload/
```

**返回参数**

| 参数           | 类型         | 说明 |
| :----------   | :----------- | :-- |
| id            | string       | 上传的文件 ID |
| policy        | string       | 文件上传配置 |
| authorization | string       | 文件上传凭证 |
| file_link     | string       | 文件上传成功后的访问地址 |
| upload_url    | string       | 上传文件的目标地址 |

**返回示例**

```json
{
    "policy": "********eyJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTE4NjMwIiwgImRhdGUiOiAiVGh1LCAxOCBBcHIgMjAxOSAwODoyMTo0MSBHTVQiLCAibm90aWZ5LXVybCI6ICJodHRwczovL3Nzby5pZmFuci5jb20vZXh0YXBpL2h5ZHJvZ2VuL3VweXVuL2NhbGxiYWNrLzE4NjMwLzVjYjgzMzk1YWNjNzM5NDMxNzBjZWFkNS8iLCAic2F2ZS1rZXkiOiAiMWhIMklmWlgwUlIzc1dvSS5wbmciLCAiZXhwaXJhdGlvbiI6IDE1NTU1NzYwMDF9*********",
    "authorization": "UPYUN allenzhang:aBIGd7s5Tjcc2khrnx2uxgjYuzw=",
    "upload_url": "https://v0.api.upyun.com/cloud-minapp-18****",
    "id": "5cac3d2299ecae0c9e8****6",
    "file_link": "https://cloud-minapp-18630.cloud.ifanrusercontent.com/1hDkLip5hcxdQpl5.jpg"
}
```

**状态码说明**

`200` 获得授权凭证成功

`400` 参数错误（不支持上传的文件格式)

`404` 找不到文件分类 ID

