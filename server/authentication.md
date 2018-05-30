# 授权认证

## 鉴权方式

石墨 API 授权通过 **Access Token** 作为接口调用的凭证，接口调用方在对 API 发起请求时，需在 HTTP Header 加入以下授权参数：

```
  Authorization: Bearer <Access Token>
```


## 授权流程

```

  +--------+      ID/Secrct      +--------+
  |        | +-----------------> |        |
  |        |                     |        |
  | Client |                     |  石墨   |
  |        |    Access Token     |        |
  |        | <-----------------+ |        |
  +--------+                     +--------+

```

> **info**
> ID/Secert 为石墨提供的 `ClientID`、`ClientSecret`。


## 获取 Access Token

### 使用 Client Credentials 获取 Access Token

**接口**

`POST <SHIMO_API>/oauth2/token/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明                   |
| :------------ | :----- | :-- | :---                  |
| clientId     | String | Y   | 石墨提供的 ClientID     |
| clientSecret | String | Y   | 石墨提供的 ClientSecret |
| grantType    | String | Y   | `client_credentials`  |
| userId       | Number | Y   | 请求授权的用户标识       |

**返回参数**

| 参数          | 类型   | 说明                            |
| :----------- | :----- | :--                            |
| accessToken | String | 授权码                          |
| refreshToken | String | 用于刷新授权码                    |
| scope        | String | access token 授权的范围          |
| expiresIn  | String | access token 的过期时间          |
| tokenType   | String | access token 类型，默认 `bearer` |

### 使用 Refresh Token 获取新的 Access Token

**接口**

`POST <SHIMO_API>/oauth2/token/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明                   |
| :------------ | :----- | :-- | :---                  |
| clientId     | String | Y   | 石墨提供的 ClientID     |
| clientSecret | String | Y   | 石墨提供的 ClientSecret |
| grantType    | String | Y   | `refresh_token` |
| userId       | Number | Y   | 请求授权的用户标识       |
| refreshToken | String | N   | 用于刷新授权码 |

**返回参数**

| 参数          | 类型   | 说明                            |
| :----------- | :----- | :--                            |
| accessToken | String | 授权码                          |
| refreshToken | String | 用于刷新授权码                    |
| scope        | String | access token 授权的范围          |
| expiresIn  | String | access token 的过期时间          |
| tokenType   | String | access token 类型，默认 `bearer` |
