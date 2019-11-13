# 短信服务

# 发送短信验证码

**接口**

`POST https://cloud.minapp.com/oserve/v2.1/sms-verification-code/`

支持指定短信签名向指定手机号发送短信验证码。

> **info**
> 发送短信前请先进行[短信签名审核](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]sms/setting)，审核通过后才能发送短信

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| phone           | string   |  是 | 发送短信验证码的手机 |
| user_id         | integer  |  是 | 用户 ID (对应 _userprofile 表中的 id 字段)|
| signature_id    | integer  |  否 | 发送短信验证码使用的签名 ID，若不指定，将选择最新的过审签名进行发送 |

**代码示例**

{% tabs SMSCodeCurl="Curl", SMSCodeNode="Node", SMSCodePHP="PHP" %}

{% content "SMSCodeCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{"phone": "12345678910", "user_id": 66879698, "signature_id": 1}' \
https://cloud.minapp.com/oserve/v2.1/sms-verification-code/
```

{% content "SMSCodeNode" %}

```js
var request = require('request')

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.1/sms-verification-code/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    phone: '12345678910',
    signature_id: 1,
    user_id: 66879698
  }
}

request(opt, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(response);
});
```

{% content "SMSCodePHP" %}

```php
<?php
$table_id = 1; // 数据表的 ID
$url = "https://cloud.minapp.com/oserve/v2.1/sms-verification-code/";
$param = array(
  "phone" => "12345678910",
  "signature_id" => 1,
  "user_id" => 66879698
);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
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

`200`: 成功发送

`400`: 失败（rate limit 或短信签名没有通过审核）

`402`: 当前应用已欠费


# 验证短信验证码

**接口**

`POST https://cloud.minapp.com/oserve/v1.8/sms-verification-code/verify/`

**请求参数**

|       参数       |       类型    | 必填 | 说明 |
| :------------   | :----------- | :---| :--- |
| phone           | string   |  是 | 需要验证的手机号 |
| code            | string   |  是 | 收到的验证码 |
| user_id         | integer  |  是 | 用户 ID (对应 _userprofile 表中的 id 字段)|

**代码示例**

{% tabs VerifyCurl="Curl", VerifyNode="Node", VerifyPHP="PHP" %}

{% content "VerifyCurl" %}

```
curl -X POST \
-H "Authorization: Bearer cfb5912724dd7ff0b0c17683cc3074bb548bc7f4" \
-H "Content-Type: application/json" \
-d '{"phone": "12345678910", "user_id": 66879698, "code": "352353"}' \
https://cloud.minapp.com/oserve/v1.8/sms-verification-code/verify/
```

{% content "VerifyNode" %}

```js
var request = require('request')

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v1.8/sms-verification-code/verify/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {   // 指定 data 以 "Content-Type": 'application/json' 传送
    phone: '12345678910',
    code: '352353',
    user_id: 66879698
  }
}

request(opt, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(response);
});
```

{% content "VerifyPHP" %}

```php
<?php
$table_id = 1; // 数据表的 ID
$url = "https://cloud.minapp.com/oserve/v1.8/sms-verification-code/verify/";
$param = array(
  "phone" => "12345678910",
  "code" => "352353",
  "user_id" => 66879698
);

$ch = curl_init();
$header = array(
  "Authorization: Bearer {$token}",
  "Content-Type: application/json; charset=utf-8"
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

`200`: 成功发送

`400`: 验证码错误 / 参数错误
