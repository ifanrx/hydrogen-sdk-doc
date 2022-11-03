# 运营后台

## 部署运营后台

**接口**

`POST https://cloud.minapp.com/oserve/v2.6/miniapp/custom-userdash/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| repository_path      | String | N   | 自定义管理后台部署压缩包地址，需要先调用上传文件接口获取文件上传成功后的访问地址 |
| url_refresh   | String | N   | 是否刷新管理后台部署地址，取值为：true or false，可为空，默认为 true |

**代码示例**

{% tabs getTokenV21Curl="Curl", getTokenV21Node="Node", getTokenV21PHP="PHP" %}

{% content "getTokenV21Curl"%}

```
curl -X POST \
-H "Authorization: Bearer 52ce223c5adbb66fa188a959a8b08889adb3580c" \
-H "Content-Type: application/json" \
-d '{
      "repository_path":"https://baas-hello-world.cloud.ifanrusercontent.com/test.zip",
      "url_refresh": true
    }' \
https://cloud.minapp.com/oserve/v2.6/miniapp/custom-userdash/
```

{% content "getTokenV21Node"%}

```js
var request = require('request');

var opt = {
  uri: 'https://cloud.minapp.com/oserve/v2.6/miniapp/custom-userdash/',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`
  },
  json: {
    repository_path: 'https://baas-hello-world.cloud.ifanrusercontent.com/test.zip',
    url_refresh: 'true'
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
  'repository_path' =>'https://baas-hello-world.cloud.ifanrusercontent.com/test.zip',
  'url_refresh'=> 'true'
);
$url = 'https://cloud.minapp.com/oserve/v2.6/miniapp/custom-userdash/';

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
      "message": "Submit deploy request succeed.",
      "status": "ok"
  }
```

**状态码说明**

`200` 成功
`403` 套餐不符合或企业认证未完成
