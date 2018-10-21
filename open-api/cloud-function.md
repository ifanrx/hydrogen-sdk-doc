# 云函数

## 触发云函数

`POST https://cloud.minapp.com/oserve/v1/cloud-function/job/`

> **info**
> 推荐使用[发起一个云函数请求](#发起一个云函数请求)触发云函数。

**参数说明**

Content-Type: `Content-Type: application/json`

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| function_name | String | 是  | 云函数名 |
| data          | Object | 否  | 传递给云函数的参数 |
| sync          | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

在 sync 为 true 的情况下

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

## 测试云函数

**接口地址**

`POST https://cloud.minapp.com/oserve/v1.3/cloud-function/:cloud_function_name/debug/`

其中 `:cloud_function_name` 是云函数的名字。

**参数说明**
 
Content-Type: `Content-Type: application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
|  data         | Object | N   | 自定义数据 |
|  subject      | String | N   | 触发类型，若不提供默认为 sdk, 可选值有：sdk, open_api, cloud_function, flex_schema, wechat_pay_success, timer, file_operation |
|  schema_id    | Integer| N   | 表 ID，如果 subject 为 FlexSchema 则必填 |

**返回参数**

| 参数           | 类型   | 说明 |
| :----------   | :----- | :-- |
| billing_time | Integer |计费时间|
| code | Integer | 函数调用正常：0，函数调用出错：1 |
| data | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object |包含三个键，错误信息：message, 错误堆栈：stack, 错误类型：type |
| execution_time | Float | 执行时间，毫秒 |
| job_id | String | 任务 ID |
| log | String | 日志 |
| mem_usage | Integer | 内存使用量，字节数 |

**代码示例** 

{% tabs debugCloudFunctionCurl="Curl",debugCloudFunctionNode="Node",debugCloudFunctionPHP="PHP" %}

{% content "debugCloudFunctionCurl" %}

```
curl -X POST \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/test/debug/ \
  -H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
  -H 'Content-Type: application/json' \
  -d '{
        "data": {}
      }'
```

{% content "debugCloudFunctionNode" %}

```js
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/debug/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  body: { data: {} },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "debugCloudFunctionPHP" %}

```php
<?php
$token = '';
$cloud_function_name = ''; // 云函数的名字
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/{$cloud_function_name}/debug/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"data\": {}}")

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

正常返回：
```javascript
{
    "billing_time": 100,
    "code": 0,
    "data": "hello world",
    "error": {},
    "execution_time": 13.46,
    "job_id": "490f08ff9b2e4a6b874581de53950e54",
    "log": "2018-09-21T03:46:26.026Z LOG event.data:  {}\n2018-09-21T03:46:26.029Z LOG return:  hello world\n",
    "mem_usage": 78340096
}
```

异常返回：
```javascipt
{
    "billing_time": 100,
    "code": 1,
    "data": null,
    "error": {
        "message": "Unexpected identifier",
        "stack": ":2\n  callback(null, \"hello world\")  fot debug\n                                 ^^^\n\nSyntaxError: Unexpected identifier\n    at createScript (vm.js:80:10)\n    at Object.runInThisContext (vm.js:139:10)\n    at Module._compile (module.js:607:28)\n    at loadUserFunction (/opt/hydrogen/worker.js:37:11)\n    at IncomingMessage.request.on.on (/opt/hydrogen/worker.js:82:18)\n    at emitNone (events.js:106:13)\n    at IncomingMessage.emit (events.js:208:7)\n    at endReadableNT (_stream_readable.js:1055:12)\n    at _combinedTickCallback (internal/process/next_tick.js:138:11)\n    at process._tickCallback (internal/process/next_tick.js:180:9)",
        "type": "SyntaxError"
    },
    "execution_time": 18.46,
    "job_id": "9f9fe6f08be94888b8b56e981a5a041e",
    "log": "2018-09-21T07:49:54.792Z LOG event.data:  {}\n2018-09-21T07:49:54.799Z ERROR :2\n  callback(null, \"hello world\")  fot debug\n                                 ^^^\n\nSyntaxError: Unexpected identifier\n    at createScript (vm.js:80:10)\n    at Object.runInThisContext (vm.js:139:10)\n    at Module._compile (module.js:607:28)\n    at loadUserFunction (/opt/hydrogen/worker.js:37:11)\n    at IncomingMessage.request.on.on (/opt/hydrogen/worker.js:82:18)\n    at emitNone (events.js:106:13)\n    at IncomingMessage.emit (events.js:208:7)\n    at endReadableNT (_stream_readable.js:1055:12)\n    at _combinedTickCallback (internal/process/next_tick.js:138:11)\n    at process._tickCallback (internal/process/next_tick.js:180:9)\n",
    "mem_usage": 78528512
}
```

**状态码说明**

`200`: 成功

`400`: 参数校验失败，任务调度失败。

## 获取某云函数的任务记录

**接口地址**

`GET https://cloud.minapp.com/oserve/v1.3/cloud-function/:cloud-function-name/job/`

其中 `:cloud-function-name` 是云函数的名字。

**参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| source | String | N |云函数任务来源，可选值：sdk, open_api, cloud_function, flex_schema, wechat_pay_success, timer, file_operation |
| status | String | N | 云函数任务状态，可选值：waiting, executing, fulfilled, schedule_failed, execution_rejected, deadline_exceeded, execution_failed |
| service_type | String | N | 云函数同步类型，可选值：time_sensitive, batch |
| created_at__gte | Integer | N | 创建时间大于，unix 时间戳 |
| created_at__lte | Integer | N | 创建时间小于，unix 时间戳 |

**返回参数**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| id | Integer | 任务 ID |
| created_at | Float | 创建时间 |
| finished_at | Float | 完成时间 |
| mem_usage | Integer | 内存用量 |
| service_type | String | 可能的值：time_sensitive, batch |
| source | String | 任务来源 |
| status | String | 任务状态 |
| user_log_url | String | 日志地址 |

**代码示例**

{% tabs getCloudFunctionJobCurl="Curl",getCloudFunctionJobNode="Node",getCloudFunctionJobPHP="PHP" %}

{% content "getCloudFunctionJobCurl" %}

```
curl -X GET \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/test/job/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b'
```

{% content "getCloudFunctionJobNode" %}

```js
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/job/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getCloudFunctionJobPHP" %}

```php
<?php
$token = '';
$cloud_function_name = 'test'; // 云函数的名字
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/{$cloud_function_name}/job/";

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
    "meta": {
        "limit": 20,
        "next": "/oserve/v1.3/cloud-function/test/job/?limit=20&offset=20",
        "offset": 0,
        "previous": null,
        "total_count": 1525
    },
    "objects": [
        {
            "created_at": 1537505171.419368,
            "finished_at": 1537505171.605735,
            "id": 779734,
            "mem_usage": 78336000,
            "service_type": "batch",
            "source": "flex_schema",
            "started_at": 1537505171.5807,
            "status": "fulfilled",
            "user_log_url": "https://hydrogen-faas-logs.s3.cn-north-1.amazonaws.com.cn/ticket_778289.log?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=86400&X-Amz-Security-Token=FQoDYXdzEP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDM50xRDK8JETeulNLiK%2FA08zFCZM8zvsnb6VG81mDV0onfgVwXhAjUi6p3Y250g9GiVeWVs%2FpI6S9d0S6mD9xPjmkWw9ven%2BkRVME2xAbzfgio8%2BUbQkrOgvnFx%2BziHj0DGGvMEZYnoT6ui4QD8y8YQaJd7oWH%2B0hdIUGdE%2BFTSiZzSicuVgdr6WLkxipnuujV2yS9%2ByrXK4A0g1HaUifZVnD3K2Bz1AiHrr9abaFSFoWzyzhGYGcyp7TM4iodW%2FTI5CkPFj2f%2BNvCOSCBWWWOsY%2FUyaAdCFZFqXJoJ6uuXFZ5yl7xd5W28egT5Jgfeq%2FG5j9xp9OVu8sAlnPre8WoSpspHt8R%2BRMDPr6klJE3yxXIxRODlt4nHAA30wcwunO09x8zoK54pgrveIWNlIRYeSSMG%2FGAzYXNq%2FxXjcpQOa3ekyirC%2Bj0n45dBZY4oS8c3au32WjoLjD2gnPAZsvBg1gR2wcUxs3PFi30ochY9VAxXQyXeqcy1Jw0LXQnBLT6Uw9pVV8%2BikrK13EBUiIAow1FEeKJ3xjng7mrPz60pEDYZcymJ0Uj4VkNBXMQwPHBfsfChxsLWYXaQ3EitWD3GhBaim65Tz%2FoZHU6TPRijP5ZHdBQ%3D%3D&X-Amz-Date=20180921T044620Z&X-Amz-Signature=f5d74870d8b52cbb490fae4d81fc486b09da1e026bf9571c172b4d8d29c84a66&X-Amz-Credential=ASIAQUWH6XTCOEBVBVFG%2F20180921%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host"
        },
        ...
    ]
}
```

**状态码说明**

`200`: 成功

`400`: 参数错误

## 发起一个云函数请求

**接口地址**

`POST https://cloud.minapp.com/oserve/v1.3/cloud-function/:cloud-function-name/job/`

其中 `:cloud-function-name` 是云函数的名字。

**请求参数说明**

Content-Type: `Content-Type: application/json`

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| data          | Object | 否  | 传递给云函数的参数 |
| sync          | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

> **info**
> 当 data 和 sync 字段都不提供时，需要提供一个空的对象。

**返回参数说明**

sync 为 true 时：

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

sync 为 false 时：

| 参数          | 类型  | 说明 |
| :----------   | :--- | :--- |
| status | String |  默认为 'ok' |

**代码示例**

{% tabs invokeCloudFunctionCurl="Curl",invokeCloudFunctionNode="Node",invokeCloudFunctionPHP="PHP" %}

{% content "invokeCloudFunctionCurl" %}

```
curl -X POST \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/test/job/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b' \
  -H "Content-Type: application/json" \
  -d '{}'
```

{% content "invokeCloudFunctionNode" %}

```js
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/job/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  body:
   {},
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "invokeCloudFunctionPHP" %}

```php
<?php
$token = '';
$cloud_function_name = 'test'; // 云函数的名字
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/{$cloud_function_name}/job/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, "{}",)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

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

sync 为 true:

```javascript
{
    "code": 1,
    "data": null,
    "error": {
        "message": "Unexpected identifier",
        "type": "SyntaxError"
    }
}
```

sync 为 false:

```javascript
{
    "status": "ok"
}
```

**状态码说明**

`200`: 成功

`404`: 没有找到对应的云函数

## 新建云函数

**接口地址**

` POST https://cloud.minapp.com/oserve/v1.3/cloud-function/`

**请求参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| name | String | Y | 云函数名，不能为空字符串 |
| function_code | String | Y | 云函数代码，不能为空字符串 |
| remark | String | N | 备注 |

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型 |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |

**代码示例**

{% tabs newCloudFunctionCurl="Curl",newCloudFunctionNode="Node", newCloudFunctionPHP="PHP" %}

{% content "newCloudFunctionCurl" %}

```
curl -X POST \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b' \
  -H "Content-Type: application/json" \
  -d '{
  "name": "come_from_open_API",
  "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
  "remark": "你好啊，云函数"
}'
```

{% content "newCloudFunctionNode" %}

```js
var request = require("request");

var options = { method: 'POST',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  body:
   { name: 'come_from_open_API',
     function_code: 'exports.main = function functionName(event, callback) {\n  callback(null, "hello world")\n}',
     remark: '你好啊，云函数' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "newCloudFunctionPHP" %}

```php
<?php
$token = '';
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n\t\"name\": \"come_from_open_API\",\n    \"function_code\": \"exports.main = function functionName(event, callback) {\\n  callback(null, \\\"hello world\\\")\\n}\",\n    \"remark\": \"你好啊，云函数\"\n}",)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

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
    "audit_status": "approved",
    "created_at": 1537704381,
    "created_by": "",
    "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
    "id": 1105,
    "name": "come_from_open_api",
    "plan_circle": "P_FREE",
    "remark": "你好啊，云函数",
    "updated_at": 1537704381,
    "updated_by": ""
}
```

**状态码说明**

`201`: 创建成功

`401`: 参数不合法：云函数名或代码为字段为空

## 获取当前小程序的所有云函数

**接口地址**

`GET https://cloud.minapp.com/oserve/v1.3/cloud-function/`

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型 |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |

**代码示例**

{% tabs getAllCloudFunctionCurl="Curl", getAllCloudFunctionNode="Node", getAllCloudFunctionPHP="PHP" %}

{% content "getAllCloudFunctionCurl" %}

```
curl -X GET \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b'
```

{% content "getAllCloudFunctionNode" %}

```javascript
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getAllCloudFunctionHP" %}

```php
<?php
$token = '';
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/";

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
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 2
    },
    "objects": [
        {
            "audit_status": "approved",
            "created_at": 1537924886,
            "created_by": "somebody",
            "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
            "id": 1121,
            "name": "come_from_open_API_v1.3",
            "plan_circle": "P_FREE",
            "remark": "你好啊，云函数",
            "updated_at": 1537924886,
            "updated_by": ""
        },
        {
            "audit_status": "approved",
            "created_at": 1537704269,
            "created_by": "somebody",
            "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
            "id": 1102,
            "name": "测试",
            "plan_circle": "P_FREE",
            "remark": "你好啊，云函数",
            "updated_at": 1537704426,
            "updated_by": "somebody"
        },
    ]
}
```

**状态码说明**

`200`:  成功

## 获取云函数详细信息

**接口地址**

`GET https://cloud.minapp.com/oserve/v1.3/cloud-function/:cloud-function-name/`

其中 `:cloud-function-name` 为云函数的名字。

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型 |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |

**代码示例**

{% tabs getCloudFunctionInfoCurl="Curl", getCloudFunctionInfoNode="Node", getCloudFunctionInfoPHP="PHP" %}

{% content "getCloudFunctionInfoCurl" %}

```
curl -X GET \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/test/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b'
```

{% content "getCloudFunctionInfoNode" %}

```javascript
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'GET',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "getCloudFunctionInfoPHP" %}

```php
<?php
$token = '';
$cloud_function_name = '';
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/{$cloud_function_name}/";

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
    "audit_status": "approved",
    "created_at": 1535903214,
    "created_by": "somebody",
    "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")  fot debug\n}",
    "id": 847,
    "name": "test",
    "plan_circle": "P_FREE",
    "remark": "",
    "updated_at": 1537516164,
    "updated_by": "somebody"
}
```

**状态码说明**

`200`: 成功

`404`: 云函数不存在

## 修改云函数

**接口地址**

`PATCH https://cloud.minapp.com/oserve/v1.3/cloud-function/:cloud-function-name/`

其中 `:cloud-function-name` 为云函数名字。

**请求参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| name | String | N | 云函数名，不能为空字符串 |
| function_code | String | N | 云函数代码，不能为空字符串 |
| remark | String | N | 备注 |

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型，可能的值：P_FREE, P_PERSONAL, P_ENTERPRISE |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |

**代码示例**

{% tabs modifyCloudFunctionCurl="Curl", modifyCloudFunctionNode="Node", modifyCloudFunctionPHP="PHP" %}

{% content "modifyCloudFunctionCurl" %}

```
curl -X PATCH \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/test/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b' \
  -H "Content-Type: application/json" \
  -d '{
  "name": "modify_from_open_API",
  "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
  "remark": "你好啊，云函数"
}'
```

{% content "modifyCloudFunctionNode" %}

```javascript
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'PATCH',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  body:
   { name: 'modify_from_open_API',
     function_code: 'exports.main = function functionName(event, callback) {\n  callback(null, "hello world")\n}',
     remark: '你好啊，云函数' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "modifyCloudFunctionPHP" %}

```php
<?php
$token = '';
$cloud_function_name = '';
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/{$cloud_function_name}/";

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  'Content-Type: application/json; charset=utf-8'
);

curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n\t\"name\": \"modify_from_open_API\",\n   \"function_code\": \"exports.main = function functionName(event, callback) {\\n  callback(null, \\\"hello world\\\")\\n}\",\n    \"remark\": \"你好啊，云函数\"\n}",)
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

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

```javascipt
{
    "audit_status": "approved",
    "created_at": 1535903214,
    "created_by": "somebody",
    "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
    "id": 847,
    "name": "modify_from_open_api",
    "plan_circle": "P_FREE",
    "remark": "",
    "updated_at": 1537710962,
    "updated_by": "somebody"
}
```

**状态码说明**

`202`: 修改成功

`401`: 参数不合法：云函数名或代码为空

## 删除一个云函数

**接口地址**

`DELETE https://cloud.minapp.com/oserve/v1.3/cloud-function/:cloud-function-name/`

其中 `:cloud-function-name` 是云函数的名字。

**代码示例**

{% tabs deleteCloudFunctionCurl="Curl",deleteCloudFunctionNode="Node",deleteCloudFunctionPHP="PHP" %}

{% content "deleteCloudFunctionCurl" %}

```
curl -X DELETE \
  https://cloud.minapp.com/oserve/v1.3/cloud-function/test/ \
  -H 'Authorization: Bearer 2323d124881bd3d63c9bb78458252454f676b'
```

{% content "deleteCloudFunctionNode" %}

```js
var request = require("request");

var cloudFunctionName = '';
var options = { method: 'DELETE',
  url: 'https://cloud.minapp.com/oserve/v1.3/cloud-function/' + cloudFunctionName + '/',
  headers:
   { 'Content-Type': 'application/json',
     Authorization: 'Bearer 2323d124881bd3d63c9bb78452454f80a676b' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

{% content "deleteCloudFunctionPHP" %}

```php
<?php
$token = '';
$cloud_function_name = ''; // 云函数的名字
$url = "https://cloud.minapp.com/oserve/v1.3/cloud-function/{$cloud_function_name}/";

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

返回体为空。

**状态码说明**

`204`: 删除成功

`404`: 没有找到对应的云函数