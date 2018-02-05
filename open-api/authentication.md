# 授权认证

知晓云开放 API 授权通过 Access Token 作为接口调用的凭证，开发者需要保证 **Access Token** 的安全性。

## 开放 API 鉴权方式

在对开放 API 发起请求时，均需要在 HTTP Header 加入一下授权参数

```

  Authorization: Bearer <Access Token>

```

> Access Token 的获取请阅读👇 的内容


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

> ID/Secert 为知晓云应用的 `ClientID`、`ClientSecret`，可通过知晓云管理后台进行获取。

## 获取 Code

**接口**

`POST https://cloud.minapp.com/api/oauth2/hydrogen/openapi/authorize/`

**Content-Type**

`application/json`

**参数说明**

| 参数               | 类型    | 必填 | 说明 |
| :------------     | :----- | :-- | :-- |
| client_id         | String | Y  | 知晓云应用的 ClientID |
| client_secret     | String | Y  | 知晓云应用的 ClientSecret |

**返回参数**

| 参数         | 类型         | 说明 |
| :---------- | :----------- | :-- |
| code        | String       | 授权码 |
| expires_in  | Number       | 过期时间 |

> **danger**
> 注意事项

获取 Code 会经过两次的 `HTTP 302 Found` 跳转，开发者在实现时需要允许客户端跟随跳转。

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
    <title>  爱范儿 · 报道未来，服务新生活引领者
</title>
....
```

## 获取 Access Token

**接口地址**

`POST https://cloud.minapp.com/api/oauth2/access_token/`

**Content-Type**

`multipart/form-data`

**参数说明**

| 参数               | 类型    | 必填 | 说明 |
| :------------     | :----- | :-- | :-- |
| client_id         | String | Y  | 知晓云应用的 ClientID |
| client_secret     | String | Y  | 知晓云应用的 ClientSecret |
| code              | String | Y  | 授权码 |
| grant_type        | String | Y  | 授权类型(需指定为"authorization_code") |

**返回参数**

| 参数           | 类型         | 说明 |
| :----------   | :----------- | :-- |
| access_token  | String       | 访问令牌(token) |
| token_type    | String       | 令牌(token)类型 |
| expires_in    | Number       | 过期时间 |
| refresh_token | String       | 更新令牌(token)） |
| scope         | String       | 权限范围 |

**代码示例** 

{% tabs first="Node", second="Python" %}

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

  ```python
    ptthon code ……
  ```

{% endtabs %}