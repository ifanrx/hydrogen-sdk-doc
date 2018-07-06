# 授权认证

## 鉴权方式

石墨 API 授权通过 **Access Token** 作为接口调用的凭证，接口调用方在对 API 发起请求时，需在 HTTP Header 加入以下授权参数：

```
  Authorization: Bearer <Access Token>
```

**一个 Access Token 对应一个文档，即页面刷新、关闭重新打开或打开其他文档均需要重新生成 Access Token。**

## 授权流程

```

  +--------+      ID/Secret      +--------+
  |        | +-----------------> |        |
  |        |                     |        |
  | Client |                     |  石墨   |
  |        |    Access Token     |        |
  |        | <-----------------+ |        |
  +--------+                     +--------+

```

> **info**
> ID/Secret 为石墨提供的 `ClientID`、`ClientSecret`。


## 获取 Access Token

### 使用 Client Credentials 获取 Access Token

**接口**

`POST <SHIMO_API>/oauth2/token/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明                   |
| :------------ | :----- | :-- | :---                  |
| clientId     | String | Y   | 石墨提供的 ClientID     |
| ClientSecret | String | Y   | 石墨提供的 ClientSecret |
| clientUserId | String | Y   | 请求授权的用户标识       |
| grantType    | String | Y   | 授权模式  |
| scope    | String | Y   | 授权范围，默认为 `write`  |
| teamId | Number | N   | 请求授权的用户的团队标识       |
| info | String | N   | 额外附加信息，JSON 数据需序列化为字符串  |

#### 什么是 `clientUserId`

`clientUserId` 意为所请求授权的用户的身份标识，可以用户 ID、用户名或用户邮箱等。

用于在用户和文档数据不储存在石墨数据库时，和石墨所存储的数据进行用户关联用。

如果是使用石墨数据库的场合，则 `clientUserId` 等于石墨的 `userId`。

#### `info`？

在用户和文档数据不储存在石墨数据库的场合，就需要使用 `info`，其所包含的信息用于判断该用户是否有相应的文档权限，如**文档所需的信息**如下：

```json
{
  "fileGuid": "JyRX1679PL86rbTk",
  "filePermissions": {
    "editable": true,
    "readonly": true
  }
}
```

- `editable` 对该文档有编辑权限，如文档拥有者，被邀请且有写权限的用户
- `readonly` 对该文档只有可读权限，如匿名用户访问仅开放读取的文档

#### `scope`

不同 API 需要的权限不一样，`scope` 用于判断该 access token 能否请求对应 API：

- `public` 只可访问公开数据，常用匿名用户
- `read` 只可访问公开和需验证用户权限的数据。包含 `public` 的权限。
- `write` 可读取和写入数据。包含 `read` 和 `public` 的权限。

和 `info` 不同的是，`scope` **仅**用于判断能否访问该 API，举例来说：

- `scope: 'write'` 和 `info.filePermissions.editable: false` 的 access token 能更新用户信息 `PATCH /users/:user`，但不能撰写文档，`POST /files/:guid/compose` 将会返回 `401` 错误
- `scope: 'read'` 和 `info.filePermissions.editable: true` 的 access token 由于 `scope` 不是 `write`，因此即使 `editable` 为 `true` 也不能撰写文档，`POST /files/:guid/compose` 将会返回 `401` 错误

**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/oauth2/token', {
  method: 'POST',
  body: JSON.stringify({
    clientId: 'shimo',
    ClientSecret: 'shimo',
    grantType: 'client_credentials',
    clientUserId: '1',
    scope: 'write',
    info: JSON.stringify({
      fileGuid: 'JyRX1679PL86rbTk',
      filePermissions: {
        editable: true,
        writeable: true,
        readonly: true
      }
    })
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回示例**

```json
{
  "scope": "write",
  "tokenType": "bearer",
  "accessToken": "70615e7c1e08fc7805c0df0e4dbc595600814f70b2b916c0e737e6ca2f914e7d",
  "refreshToken": "70615e7c1e08fc7805c0df0e4dbc595600814f70b2b916c0e737e6ca2f914e7d",
  "expireTime": "2018-06-12T09:50:23.000Z"
}
```

### 使用 Refresh Token 获取新的 Access Token

**接口**

`POST <SHIMO_API>/oauth2/token/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明                   |
| :------------ | :----- | :-- | :---                  |
| grantType    | String | Y   | `refresh_token` |
| clientUserId       | Number | Y   | 请求授权的用户标识       |
| refreshToken | String | N   | 用于刷新授权码 |


**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/oauth2/token', {
  method: 'POST',
  body: JSON.stringify({
    grantType: 'refresh_token',
    clientUserId: 'shimo',
    refreshToken: '70615e7c1e08fc7805c0df0e4dbc595600814f70b2b916c0e737e6ca2f914e7d'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**返回参数**

| 参数          | 类型   | 说明                            |
| :----------- | :----- | :--                            |
| accessToken | String | 授权码                          |
| refreshToken | String | 用于刷新授权码                    |
| scope        | String | access token 授权的范围          |
| expiresIn  | String | access token 的过期时间          |
| tokenType   | String | access token 类型，默认 `bearer` |

## 吊销 Access Token

**接口**

`POST <SHIMO_API>/oauth2/revoke/`

**参数说明**

Content-Type: `application/json`

| 参数           | 类型   | 必填 | 说明                   |
| :------------ | :----- | :-- | :---                  |
| accessToken    | String | Y   | 需要吊销的 Access Token |


**代码示例**

{% tabs nodeDemo="Node.js" %}

{% content "nodeDemo" %}

```js
const request = require('node-fetch')

fetch('<SHIMO_API>/oauth2/revoke', {
  method: 'POST',
  body: JSON.stringify({
    accessToken: '70615e7c1e08fc7805c0df0e4dbc595600814f70b2b916c0e737e6ca2f914e7d'
  })
})
  .then(res => res.json())
  .then(body => console.log(body.data))
```

{% endtabs %}

**状态码说明**

`204` 删除成功
