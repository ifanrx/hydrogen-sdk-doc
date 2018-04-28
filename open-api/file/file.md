# 文件操作

## 获取文件详情

**接口**

`GET https://cloud.minapp.com/oserve/v1/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

{% tabs getFileDetailCurl="Curl", getFileDetailNode="Node", getFileDetailPHP="PHP" %}

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

{% content "getFileDetailPHP" %}

```php
<?php
$file_id = '5a2fe93308443e313a428cxx'; // 文件 ID
$url = "https://cloud.minapp.com/oserve/v1/file/{$file_id}/";
$ch = curl_init();
curl_setopt($ch,CURLOPT_TIMEOUT, 30);

// 设置头部
$header =
  [
    'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
    'Content-Type: application/json; charset=utf-8',
  ];
curl_setopt($ch,CURLOPT_HTTPHEADER, $header);

curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST, 'GET');
// 要求结果为字符串且输出到屏幕上
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, true);
$res = curl_exec($ch);
curl_close ($ch);
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


## 获取文件列表

**接口**

`GET https://cloud.minapp.com/oserve/v1/file/`

**参数说明**

Content-Type: `application/json`

| 参数      | 类型   | 必填 | 说明 |
| :------- | :----- | :-- | :-- |
| order_by | String | Y   | 排序（支持 `created_at` 进行排序）|
| limit    | Number | N   | 限制返回资源的个数，默认为 20 条，最大可设置为 1000 |
| offset   | Number | N   | 设置返回资源的起始偏移值，默认为 0 |

**代码示例**

{% tabs getFileListCurl="Curl", getFileListNode="Node", getFileListPHP="PHP" %}

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

{% content "getFileListPHP" %}

```php
<?php
$url = "https://cloud.minapp.com/oserve/v1/file/";
$ch = curl_init();
curl_setopt($ch,CURLOPT_TIMEOUT, 30);

// 设置头部
$header =
  [
    'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
    'Content-Type: application/json; charset=utf-8',
  ];
curl_setopt($ch,CURLOPT_HTTPHEADER, $header);

curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST, 'GET');
// 要求结果为字符串且输出到屏幕上
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, true);
$res = curl_exec($ch);
curl_close ($ch);
```

{% endtabs %}


## 删除文件

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

{% tabs deleteFileCurl="Curl", deleteFileNode="Node", deleteFilePHP="PHP" %}

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

{% content "deleteFilePHP" %}

```php
<?php
$file_id = '5a45f22bfff1d659681c87xx'; // 文件 ID
$url = "https://cloud.minapp.com/oserve/v1/file/{$file_id}/";
$ch = curl_init();
curl_setopt($ch,CURLOPT_TIMEOUT, 30);
// 设置头部
$header =
  [
    'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
    'Content-Type: application/json; charset=utf-8',
  ];
curl_setopt($ch,CURLOPT_HTTPHEADER, $header);
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST, 'DELETE');
// 要求结果为字符串且输出到屏幕上
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, true);
$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch,CURLINFO_HTTP_CODE); // 请求状态码
curl_close ($ch);
```

{% endtabs %}

**状态码说明**

`204` 删除成功


## 批量删除文件

**接口**

`DELETE https://cloud.minapp.com/oserve/v1/file/?id__in=:file1_id,:file2_id`

**代码示例**

{% tabs patchDeleteCurl="Curl", patchDeleteNode="Node", patchDeletePHP="PHP" %}

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
  uri: 'https://cloud.minapp.com/oserve/v1/file/?id__in=5a3b8e8908443e06aa6f0a99,5a3b673308443e643f1b0c47',
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${token}`
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode)
})
```

{% content "patchDeletePHP" %}

```php
<?php
$file_id[] = '5a45f22bfff1d659681c87xx'; // 表 ID
$file_id[] = '5a3b673308443e643f1b0c47'; // 表 ID
$url = "https://cloud.minapp.com/oserve/v1/file/?id__in=".implode(',',$file_id);
$ch = curl_init();
curl_setopt($ch,CURLOPT_TIMEOUT, 30);
// 设置头部
$header =
  [
    'Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4',
    'Content-Type: application/json; charset=utf-8',
  ];
curl_setopt($ch,CURLOPT_HTTPHEADER, $header);
curl_setopt($ch,CURLOPT_URL, $url);
curl_setopt($ch,CURLOPT_CUSTOMREQUEST, 'DELETE');
// 要求结果为字符串且输出到屏幕上
curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_SSL_VERIFYPEER, true);
$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch,CURLINFO_HTTP_CODE); // 请求状态码
curl_close ($ch);
```

{% endtabs %}

**状态码说明**

`204` 删除成功