# 授权认证

## 鉴权方式

知晓云开放 API 授权通过 **Access Token** 作为接口调用的凭证，在对开放 API 发起请求时，均需要在 HTTP Header 加入以下授权参数：

```
  Authorization: Bearer <Access Token>
```


## 授权流程

```

  +--------+      ID/Secrct      +--------+
  |        | +-----------------> |        |
  |        |                     |        |
  |        |         Code        |        |
  |        | <-----------------+ |        |
  | Client |                     | 知晓云  |
  |        |         Code        |        |
  |        | +-----------------> |        |
  |        |                     |        |
  |        |    Access Token     |        |
  |        | <-----------------+ |        |
  +--------+                     +--------+

```

> **info**
> ID/Secert 为知晓云应用的 `ClientID`、`ClientSecret`，可通过知晓云管理后台进行获取。


## 获取 Access Token

获取 Access Token 需要经过以下两个步骤

### 获取 code

**接口**

`POST https://cloud.minapp.com/api/oauth2/hydrogen/openapi/authorize/`

**参数说明**

Content-Type: `application/json`

| 参数          | 类型    | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| client_id     | String | Y  | 知晓云应用的 ClientID |
| client_secret | String | Y  | 知晓云应用的 ClientSecret |

**返回参数**

| 参数        | 类型   | 说明 |
| :--------- | :----- | :-- |
| code       | String | 授权码 |
| expires_in | Number | code 的过期时间 |

> **info**
> 获取 Code 会经过两次的 `HTTP 302 Found` 跳转，开发者在实现时需要允许客户端跟随跳转。

不跟随跳转示例：

```
$ curl ifanr.com
<html>
<head><title>302 Found</title></head>
<body bgcolor="white">
  <center><h1>302 Found</h1></center>
  <hr><center>nginx/1.11.5</center>
</body>
</html>
```

跟随跳转示例：

```
$ curl -L ifanr.com
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta property="og:site_name" content="爱范儿" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="http://www.ifanr.com" />
  <meta name="MSSmartTagsPreventParsing" content="true"/>
  <meta http-equiv="imagetoolbar" content="no"/>
  <meta name="robots" content="all"/>
  <title>  爱范儿 · 报道未来，服务新生活引领者</title>
  ....
```

### 使用 code 获取 Access Token

**接口地址**

`POST https://cloud.minapp.com/api/oauth2/access_token/`

**参数说明**

Content-Type: `multipart/form-data`

| 参数           | 类型   | 必填 | 说明 |
| :------------ | :----- | :-- | :-- |
| client_id     | String | Y   | 知晓云应用的 ClientID |
| client_secret | String | Y   | 知晓云应用的 ClientSecret |
| code          | String | Y   | 授权码，通过上一步获取到的 |
| grant_type    | String | Y   | 授权类型，这里需指定为 "authorization_code" |

**返回参数**

| 参数           | 类型   | 说明 |
| :----------   | :----- | :-- |
| access_token  | String | 用户授权的唯一票据 |
| token_type    | String | token 类型 |
| expires_in    | Number | access_token 过期时间 |
| refresh_token | String | 用于刷新授权有效期 |
| scope         | String | 权限范围 |

**代码示例** 

{% tabs first="Node",second="PHP" %}

{% content "first" %}

  ```js
  var request = require('request');

  // 获取 code
  var opt = {
    uri: 'https://cloud.minapp.com/api/oauth2/hydrogen/openapi/authorize/',
    method: 'POST',
    json: {
      client_id: 'a4d2d62965ddb57fa4xx',
      client_secret: 'e5802b40135baab9b4e84e35bed058a264c37dxx'
    },
    jar: true,                // 允许记住 cookie 
    followAllRedirects: true,     // 允许重定向
  }

  request(opt, function(err, res, body) {
      getToken(body.code)  // 回调调用 getToken 函数
  })

  // 获取 token
  function getToken(code) {
    var opt = {
      uri: 'https://cloud.minapp.com/api/oauth2/access_token/',
      method: 'POST',
      formData: {   // 指定 data 以 "Content-Type": "multipart/form-data" 传送
        client_id: 'a4d2d62965ddb57fa4xx',
        client_secret: 'e5802b40135baab9b4e84e35bed058a264c37dxx',
        grant_type: 'authorization_code',
        code,
      }
    }

    request(opt, function(err, res, body) {
      let token = JSON.parse(body).access_token
    })
  }
  ```

{% content "second" %}

```php
<?php
$param = array(
  'client_id' => 'a4d2d62965ddb57fa4xx',
  'client_secret' => 'e5802b40135baab9b4e84e35bed058a264c37dxx'
  );

// 获取 code
$code_url = 'https://cloud.minapp.com/api/oauth2/hydrogen/openapi/authorize/';
$code_data = postData($code_url, json_encode($param));

// 使用 code 获取 Access Token
$code_data = json_decode($code_data, true);

$access_token_url = 'https://cloud.minapp.com/api/oauth2/access_token/';
$param['code'] = $code_data['code'];
$param['grant_type'] = 'authorization_code';
$access_token = postData($access_token_url, $param, 'multipart/form-data'); // 获取到的 Access Token
// 封装请求函数
function postData($url, $param, $content_type = 'application/json') 
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_TIMEOUT, 30);
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $param);

  // 设置允许重定向
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
  curl_setopt($ch, CURLOPT_COOKIEFILE, '');

  // 要求结果为字符串且输出到屏幕上
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_COOKIESESSION, true);
  // 设置 Content-Type，默认 application/json
  curl_setopt($ch, CURLINFO_CONTENT_TYPE,  $content_type);
  
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

  $response = curl_exec($ch);

  curl_close($ch);
  return $response;
}
```

{% endtabs %}

> **danger**
> 开发者需要保证 **Access Token** 的安全性