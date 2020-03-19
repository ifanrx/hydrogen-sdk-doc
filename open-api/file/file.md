# 文件操作

## 获取文件详情

**接口**

`GET https://cloud.minapp.com/oserve/v2.2/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

{% tabs getFileDetailCurl="Curl", getFileDetailNode="Node", getFileDetailPHP="PHP" %}

{% content "getFileDetailCurl" %}

```
curl -X GET \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/file/5a1ba9c1fff1d651135e5ff1/
```

{% content "getFileDetailNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/file/5a2fe93308443e313a428cxx/',  // 5a6ad3cffff1d675b9e2cexx 对应 uri :file_id
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
$url = "https://cloud.minapp.com/oserve/v2.2/file/{$file_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res = curl_exec($ch);
curl_close($ch);
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

`GET https://cloud.minapp.com/oserve/v2.2/file/`

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
https://cloud.minapp.com/oserve/v2.2/file/?limit=1&return_total_count=1
```

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
https://cloud.minapp.com/oserve/v2.2/file/
```

{% content "getFileListNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/file/',
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
$url = "https://cloud.minapp.com/oserve/v2.2/file/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res = curl_exec($ch);
curl_close($ch);
```

{% endtabs %}


## 删除文件

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.2/file/:file_id/`

其中 `:file_id` 需替换为你的文件 ID

**代码示例**

{% tabs deleteFileCurl="Curl", deleteFileNode="Node", deleteFilePHP="PHP" %}

{% content "deleteFileCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/file/5a1ba9c1fff1d651135e5ff1/
```

{% content "deleteFileNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/file/5a45f22bfff1d659681c87xx/',  // 5a6ad3cffff1d675b9e2cexx 对应 uri :file_id
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
$url = "https://cloud.minapp.com/oserve/v2.2/file/{$file_id}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

**状态码说明**

`204` 删除成功


## 批量删除文件

**接口**

`DELETE https://cloud.minapp.com/oserve/v2.2/file/?id__in=:file1_id,:file2_id`

**代码示例**

{% tabs patchDeleteCurl="Curl", patchDeleteNode="Node", patchDeletePHP="PHP" %}

{% content "patchDeleteCurl" %}

```
curl -X DELETE \
-H "Authorization: Bearer 58f6cd9f84b1b0c04941fbd4d87bc5f14a785107" \
-H "Content-Type: application/json" \
https://cloud.minapp.com/oserve/v2.2/file/?id__in=5a1ba9c1fff1d651135e5ff1,59ca3d275f281f58523fc47a
```

{% content "patchDeleteNode" %}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.2/file/?id__in=5a3b8e8908443e06aa6f0a99,5a3b673308443e643f1b0c47',
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
$file_id[] = '5a45f22bfff1d659681cxxxx'; // 文件 ID
$file_id[] = '5a3b673308443e643f1bxxxx'; // 文件 ID
$url = "https://cloud.minapp.com/oserve/v2.2/file/?id__in=".implode(',',$file_id);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

**状态码说明**

`204` 删除成功


## 视频截图

**接口**

`POST https://cloud.minapp.com/oserve/v1/media/video-snapshot/`

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

{% tabs videoSnapshotCurl="Curl", videoSnapshotNode="Node", videoSnapshotPHP="PHP" %}

{% content "videoSnapshotCurl" %}

```curl
curl --request POST \
  --url https://cloud.minapp.com/oserve/v1/media/video-snapshot/ \
  --header 'Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc77' \
  --header 'Content-Type: application/json' \
  --data '{\n	"source": "5c4a6db320fa9c2e054c6c36",\n	"save_as": "1-25-test.png",\n	"point": "00:00:50",\n	"category_id": "5a377bb009a8054139faafed"\n}'
```

{% content "videoSnapshotNode" %}

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1/media/video-snapshot/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 2323d124881bd3d63c9bb78458252454f80a676b'
  },
  body:
  {
    source: "5c453c7cfe10833f3178479e",
    save_as: "1-25-test.png",
    point: "00:00:50",
    category_id: "5a377bcb09a8054139faaff1"
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "videoSnapshotPHP" %}

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://cloud.minapp.com/oserve/v1/media/video-snapshot/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"source\": \"5c4a6db320fa9c2e054c6c36\",\n\t\"save_as\": \"1-25-test.png\",\n\t\"point\": \"00:00:50\",\n\t\"category_id\": \"5a377bb009a8054139faafed\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db",
    "Content-Type: application/json",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```javascript
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

`POST https://cloud.minapp.com/oserve/v1/media/m3u8-concat/`

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

{% tabs m3u8ConcatCurl="Curl", m3u8ConcatNode="Node", m3u8ConcatPHP="PHP" %}

{% content "m3u8ConcatCurl" %}

```curl
curl --request POST \
  --url https://cloud.minapp.com/oserve/v1/media/m3u8-concat/ \
  --header 'Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db' \
  --header 'Content-Type: application/json' \
  --data '{\n	"m3u8s": ["5c453c7cfe10833f3178479e", "5c452bebfe10832bf97846c9"],\n	"save_as": "1-25-test.m3u8",\n	"category_id": "5a377bcb09a8054139faaff1"\n}'
```

{% content "m3u8ConcatNode" %}

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1/media/m3u8-concat/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 2323d124881bd3d63c9bb78458252454f80a676b'
  },
  body:
  {
    m3u8s: ["5c453c7cfe10833f3178479e", "5c452bebfe10832bf97846c9"],
    save_as: "1-25-test.m3u8",
    category_id: "5a377bcb09a8054139faaff1"
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "m3u8ConcatPHP" %}

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://cloud.minapp.com/oserve/v1/media/m3u8-concat/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"m3u8s\": [\"5c453c7cfe10833f3178479e\", \"5c452bebfe10832bf97846c9\"],\n\t\"save_as\": \"1-25-test.m3u8\",\n\t\"category_id\": \"5a377bcb09a8054139faaff1\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db",
    "Content-Type: application/json",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```javascript
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

`POST https://cloud.minapp.com/oserve/v1/media/video-clip/`

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

{% tabs m3u8ClipCurl="Curl", m3u8ClipNode="Node", m3u8ClipPHP="PHP" %}

{% content "m3u8ClipCurl" %}

```curl
curl --request POST \
  --url https://cloud.minapp.com/oserve/v1/media/m3u8-clip/ \
  --header 'Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db' \
  --header 'Content-Type: application/json' \
  --data '{\n	"m3u8": "5c452bebfe10832bf97846c9",\n	"save_as": "1-25-test.m3u8",\n	"include": [0, 5],\n	"category_id": "5a377bcb09a8054139faaff1"\n}'
```

{% content "m3u8ClipNode" %}

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1/media/m3u8-clip/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 2323d124881bd3d63c9bb78458252454f80a676b'
  },
  body:
  {
    m3u8: "5c3421788318ed7f50e5ea8b",
    save_as: "1-25-test.m3u8",
    include: [0, 5],
    category_id: "5a377bcb09a8054139faaff1"
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "m3u8ClipPHP" %}

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://cloud.minapp.com/oserve/v1/media/m3u8-clip/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"m3u8\": \"5c452bebfe10832bf97846c9\",\n\t\"save_as\": \"1-25-test.m3u8\",\n\t\"include\": [0, 5],\n\t\"category_id\": \"5a377bcb09a8054139faaff1\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db",
    "Content-Type: application/json",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```javascript
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

`POST https://cloud.minapp.com/oserve/v1/media/m3u8-meta/`

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

{% tabs m3u8MetaCurl="Curl", m3u8MetaNode="Node", m3u8MetaPHP="PHP" %}

{% content "m3u8MetaCurl" %}

```curl
curl --request POST \
  --url https://cloud.minapp.com/oserve/v1/media/m3u8-meta/ \
  --header 'Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db' \
  --header 'Content-Type: application/json' \
  --data '{\n	"m3u8": "5c452bebfe10832bf97846c9"\n}'
```

{% content "m3u8MetaNode" %}

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1/media/m3u8-meta/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 2323d124881bd3d63c9bb78458252454f80a676b'
  },
  body:
  {
    m3u8: "5c3421788318ed7f50e5ea8b"
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "m3u8MetaPHP" %}

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://cloud.minapp.com/oserve/v1/media/m3u8-meta/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"m3u8\": \"5c452bebfe10832bf97846c9\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db",
    "Content-Type: application/json",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```javascript
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

`POST https://cloud.minapp.com/oserve/v1/media/audio-video-meta/`

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

{% tabs audioVideoMetaCurl="Curl", audioVideoMetaNode="Node", audioVideoMetaPHP="PHP" %}

{% content "audioVideoMetaCurl" %}

```curl
curl --request POST \
  --url https://cloud.minapp.com/oserve/v1/media/audio-video-meta/ \
  --header 'Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db' \
  --header 'Content-Type: application/json' \
  --data '{\n	"source": "5c3421788318ed7f50e5ea8b"\n}'
```

{% content "audioVideoMetaNode" %}

```javascript
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1/media/audio-video-meta/',
  headers:
  {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 2323d124881bd3d63c9bb78458252454f80a676b'
  },
  body:
  {
    source: "5c3421788318ed7f50e5ea8b"
  },
  json: true
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
});
```

{% content "audioVideoMetaPHP" %}

```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://cloud.minapp.com/oserve/v1/media/audio-video-meta/",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => "{\n\t\"source\": \"5c3421788318ed7f50e5ea8b\"\n}",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer 050c5121242eda175e8d0ee1cbe6950dadc777db",
    "Content-Type: application/json",
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {
  echo $response;
}
```

{% endtabs %}

**返回示例**

```javascript
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
