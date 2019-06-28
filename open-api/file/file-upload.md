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
> v2.1 接口规范了返回参数的输出，使用更方便。不推荐使用 v1 接口 [获取上传文件所需授权凭证和上传地址 v1](#获取上传文件所需授权凭证和上传地址-v1)

**接口**

`POST https://cloud.minapp.com/oserve/v2.1/upload/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| filename      | String | N   | 上传的文件名 |
| category_id   | String | N   | 上传文件的所属分类，格式为文件分类的 ID 数组 |

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

{% tabs getTokenV21Curl="Curl", getTokenV21Node="Node", getTokenV21PHP="PHP" %}

{% content "getTokenV21Curl"%}

```
curl -X POST \
-H "Authorization: Bearer 52ce223c5adbb66fa188a959a8b08889adb3580c" \
-H "Content-Type: application/json" \
-d '{
      "filename":"crop.gif",
      "category_id":"5a1ba7b708443e7fc5f2fb18"
    }' \
https://cloud.minapp.com/oserve/v2.1/upload/
```

{% content "getTokenV21Node"%}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.1/upload/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    filename: 'aTest.xlsm',
    category_id: '5a3b569109a80579061d63xx'
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode, body)
})
```

{% content "getTokenV21PHP"%}

```php
<?php
$param = array(
  'filename' =>'aTest.xlsm',
  'category_id'=> '5a3b569109a80579061d63xx'
);
$url = 'https://cloud.minapp.com/oserve/v2.1/upload/';

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

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

*#### 2. 使用上一步获取的授权凭证和上传地址，进行文件上传

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

{% tabs uploadFileCurl="Curl", uploadFileNode="Node", uploadFilePHP="PHP" %}

{% content "uploadFileCurl" %}

```
curl -X POST \
-H "Authorization: Bearer 52ce223c5adbb66fa188a959a8b08889adb3580c" \
-H "Content-Type: multipart/form-data" \
-F authorization="UPYUN allenzhang:MzmYCcWVjrWoeovC4+tM5Bgwusg=" \
-F file=@"filename" \
-F policy="eyJkYXRlIjogIldlZCwgMDYgRGVjIDIwMTcgMDM6MzI6MzMgR01UIiwgIm5vdGlmeS11cmwiOiAiaHR0cHM6Ly9zc28uaWZhbnIuY29tL2V4dGFwaS9oeWRyb2dlbi91cHl1bi9jYWxsYmFjay8yODcvNWEyNzY0ZDFmZmYxZDYxYWQwZWNhMjQ1LyIsICJidWNrZXQiOiAiY2xvdWQtbWluYXBwLTI4NyIsICJzYXZlLWtleSI6ICIxZU1RUmxrSndoZ2FNaUNnLmdpZiIsICJleHBpcmF0aW9uIjogMTUxMjUzMTQ1M30=" \
https://v0.api.upyun.com/cloud-minapp-287
```

{% content "uploadFileNode" %}

```js
var request = require('request');
var fs = require('fs');

var opt = {
  uri: upload_url,  // 获取上传文件的授权凭证成功返回的 upload_url
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  formData: {   // 指定 data 以 "Content-Type": "multipart/form-data" 传送
    authorization,
    policy,
    file: fs.createReadStream(__dirname + '/demo.js')   // 参数需为文件流
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode, body)
})
```

{% content "uploadFilePHP"%}

```php
<?php
// 兼容 PHP 版本
if (class_exists('CURLFile')) {
    $param = array(
      'file' => new \CURLFile(realpath( __DIR__.'/demo.gif'),'gif','demo.gif')
    );
} else {
    $param = array(
      'file'=>'@'.realpath( __DIR__.'/demo.gif')
    );
}
$param['authorization'] = {$authorization};//获取上传文件的授权凭证成功返回的 authorization
$param['policy'] = {$policy};//获取上传文件的授权凭证成功返回的 policy
$url = {$upload_url}; //获取上传文件的授权凭证成功返回的 upload_url

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: multipart/form-data; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $param);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```
{% endtabs %}

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

> **info**
> 如果需要获取文件上传成功后文件的完整 url，请使用步骤 1 接口返回的 file_link

#### 获取上传文件所需授权凭证和上传地址 v1

*接口**

`POST https://cloud.minapp.com/oserve/v1/upload/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| filename      | String | N   | 上传的文件名 |
| category_id   | String | N   | 上传文件的所属分类，格式为文件分类的 ID 数组 |

**返回参数**

| 参数           | 类型         | 说明 |
| :----------   | :----------- | :-- |
| id            | String       | 上传的文件 ID |
| policy        | String       | 文件上传配置 |
| authorization | String       | 文件上传凭证 |
| file_link     | String       | 文件上传成功后的访问地址 |
| upload_url    | String       | 上传文件的目标地址 |

**代码示例**

{% tabs getTokenCurl="Curl", getTokenNode="Node", getTokenPHP="PHP" %}

{% content "getTokenCurl"%}

```
curl -X POST \
-H "Authorization: Bearer 52ce223c5adbb66fa188a959a8b08889adb3580c" \
-H "Content-Type: application/json" \
-d '{
      "filename":"crop.gif",
      "category_id":"5a1ba7b708443e7fc5f2fb18"
    }' \
https://cloud.minapp.com/oserve/v1/upload/
```

{% content "getTokenNode"%}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/upload/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    filename: 'aTest.xlsm',
    category_id: '5a3b569109a80579061d63xx'
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode, body)
})
```

{% content "getTokenPHP"%}

```php
<?php
$param = array(
  'filename' =>'aTest.xlsm',
  'category_id'=> '5a3b569109a80579061d63xx'
);
$url = 'https://cloud.minapp.com/oserve/v1/upload/';

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

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
