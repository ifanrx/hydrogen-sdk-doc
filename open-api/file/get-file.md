# 上传文件的管理

OpenAPI 暂支持文件的创建和删除操作。

本文档所描述的接口均需要经认证授权后才可使用，认证授权请参考 [授权认证](../authentication.md)。

## 获取文件列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/file/`

**参数说明**

Content-Type: `application/json`

| 参数              | 类型   | 必填 | 说明 |
| :------------    | :----- | :-- | :-- |
| order_by         | String | Y   | 排序（支持 `created_at` 进行排序）|
| offset           | Number | N   | 返回资源的起始偏移值 |
| limit            | Number | N   | 返回资源的个数（默认为 *20*，最大可设置为 *1000*）|

**代码示例**

{% tabs getFileListCurl="Curl", getFileListNode="Node" %}

{% content "getFileListCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
-G \
-d order_by=-created_at \
-d category=5a1ba7b708443e7fc5f2fb18 \
https://cloud.minapp.com/oserve/v1/file/
```

{% content "getFileListNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file/',
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  },
  qs: {     // query string, 被附加到uri的参数
    offset: 0,     // 可选
    limit: 20,     // 可选
    order_by: 'created_at'  // 按照创建时间来排序，可选
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
    
```

{% endtabs %}

**返回示例**

```json
{
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 1
    },
    "objects": [
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
    ]
}
```

## 文件详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/file/:file_id/`

`file_id` 是文件的 ID

**代码示例**

{% tabs getFileDetailCurl="Curl", getFileDetailNode="Node" %}

{% content "getFileDetailCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/file/5a1ba9c1fff1d651135e5ff1/
```

{% content "getFileDetailNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file/5a2fe93308443e313a428cxx/',  // 5a6ad3cffff1d675b9e2cexx 对应 uri :file_id
  method: 'GET',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
    console.log(body)
})
    
```

{% endtabs %}

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

## 删除文件

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/file/:file_id/`

`file_id` 为文件 ID

**代码示例**

{% tabs deleteFileCurl="Curl", deleteFileNode="Node" %}

{% content "deleteFileCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/file/5a1ba9c1fff1d651135e5ff1/
```

{% content "deleteFileNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file/5a45f22bfff1d659681c87xx/',  // 5a6ad3cffff1d675b9e2cexx 对应 uri :file_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
    
```

{% endtabs %}

**状态码说明**

- `204` 删除成功

## 批量删除文件

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/file/?id__in=:file1_id,:file2_id`

**代码示例**

{% tabs patchDeleteCurl="Curl", patchDeleteNode="Node" %}

{% content "patchDeleteCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v1/file/?id__in=5a1ba9c1fff1d651135e5ff1,59ca3d275f281f58523fc47a
```

{% content "patchDeleteNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/file/?id__in=5a3b8e8908443e06aa6f0a99,5a3b673308443e643f1b0c47',  // id__in=:file1_id,:file2_id
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
    console.log(res.statusCode)
})
    
```

{% endtabs %}

**状态码说明**

- `204` 删除成功
