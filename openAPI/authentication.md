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

> ID/Secert 为知晓云应用的 `ClientID`, `ClientSecret` 可通过知晓云管理后台进行获取。

## 获取 Code

### 接口地址

`https://cloud.minapp.com/api/oauth2/hydrogen/openapi/authorize/`

### 请求方法

`POST`

### Content-Type

`application/json`

### 提交参数

  - client_id
  - client_secret

### 返回参数

```json
{
  "code": "7743956163d65914c63ba1a5d48370ff791d1e16",
  "expires_in": 600
}
```

### 注意事项

获取 Code 会经过两次的 `HTTP 302 Found` 跳转，开发者在实现时需要请求客户端跟随跳转。

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

### 接口地址

`https://cloud.minapp.com/api/oauth2/access_token/`

### 请求方法

`POST`

### Content-Type

`multipart/form-data`

### 提交参数

  - client_id
  - client_secret
  - code
  - grant_type（需指定为：authorization_code）

### 返回参数

```json
{
  "access_token": "11898f29ce1c4ab6284f22ccaa691d8c03f7e4ce",
  "expires_in": 31535999
}
```
