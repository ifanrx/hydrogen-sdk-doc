# 数据导入导出操作

数据的导入、导出任务一旦成功建立，结果将以邮件的形式发送到创建任务的用户邮箱里。

## 数据导出

**接口**

`POST https://cloud.minapp.com/oserve/v1.5/table/:table_id/export/`

其中 `table_id` 是数据表的 ID

**请求参数**

|       参数     |       类型    | 必填  | 说明 |
| :------------ | :-----------  | :--- | :--- |
| file_type     | String        |  是  | 导出文件的格式，支持 csv、json 格式 |
| mode          | String        |  是  | 导出任务的模式 |
| where         | Object        |  否  | 导出数据的查询条件 |
| exclude_keys  | Array         |  否  | 导出数据时排除的字段列表 |
| include_keys  | Array         |  否  | 导出数据时包含的字段列表 |
| order_by      | Array         |  否  | 导出数据时需要进行排序的字段列表 |
| csv_customize_headers   | Array         |  否  | 导出数据为 CSV 时，可指定列名 |
| timestamp_convert_keys  | Array         |  否  | 导出数据时需要进行时间类型转换的字段列表 |

导出任务支持两种模式：

|    值   |    说明      |
| :-----  | :---------  |
| all     |  导出全部数据 |
| part    |  导出部分数据 |

order_by 排序支持指定正序或者倒序，在字段前面加 "-" 表示倒序，目前支持排序的字段类型有 5 种，分别是 {"boolean", "date", "integer", "number", "string"}

**代码示例**

{% tabs exportCurl="Curl", exportNode="Node", exportPHP="PHP" %}

{% content "exportCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{
    "file_type": "csv",
    "mode": "all"
  }' \
https://cloud.minapp.com/oserve/v1.5/table/:table_id/export/
```

{% content "exportNode" %}

```js
var request = require('request')

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1.5/table/:table_id/export/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    file_type: 'csv',
    mode: 'all'
  }
}

request(opt, function (err, res, body) {
  console.log(res.statusCode)
})
```

{% content "exportPHP" %}

```php
<?php
$table_id = 1; // 数据表的 ID
$url = "https://cloud.minapp.com/oserve/v1.5/table/{$table_id}/export/";
$param = array(
  'file_type' => 'csv',
  "mode" => "all"
);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER,$header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_POST,true);
curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($param));
curl_setopt($ch, CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,true);

$res['response'] = curl_exec($ch); // 反馈结果
$res['status_code'] = curl_getinfo($ch, CURLINFO_HTTP_CODE); // 请求状态码
curl_close($ch);
```

{% endtabs %}

**返回示例**

```json
{
  "status": "ok"
}
```

**状态码说明**

`201`: 导出任务创建成功

`400`: 1min 内多次创建任务；数据量超过 100W；数据格式错误


## 数据导入

**接口**

`POST https://cloud.minapp.com/oserve/v1/table/:table_id/import/`

**提交参数**

Content-Type: `multipart/form-data`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| file          | String | Y   | 上传的文件流 |

>**info**
>支持 csv、json 文件导入，格式请于[帮助中心](http://support.minapp.com/hc/kb/article/1079263/?from=draft)查看

**代码示例**

{% tabs importCurl="Curl", importNode="Node", importPHP="PHP" %}

{% content "importCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: multipart/form-data" \
-F file=@"filename" \
https://cloud.minapp.com/oserve/v1/table/:table_id/import/
```

{% content "importNode" %}

```js
var request = require('request');
var fs = require('fs');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1/table/:table_id/import/',  
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  formData: {   // 指定 data 以 "Content-Type": "multipart/form-data" 传送
    file: fs.createReadStream(__dirname + '/test.csv')   // 参数需为文件流
  }
}

request(opt, function(err, res, body) {
  console.log(res.statusCode, body)
})
```

{% content "importPHP" %}

```php
<?php
$table_id = 1; // 数据表的 ID
$url = "https://cloud.minapp.com/oserve/v1/table/{$table_id}/import/";

if (class_exists('CURLFile')) {
  $param = array(
    'file' => new \CURLFile(realpath( __DIR__.'/demo.csv'), 'csv', 'demo.csv')
  );
} else {
  $param = array(
    'file'=>'@'.realpath( __DIR__.'/demo.csv')
  );
}

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

```json
{
  "status": "ok"
}
```

**状态码说明**

`201`: 导入任务创建成功

`400`: 无效的文件
