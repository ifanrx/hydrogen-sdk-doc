# <span id="user-object">用户(user)对象结构</span>

### 字段

|        参数       |      类型    |   说明    |
| :--------------- | :----------- | :------- |
| user_id           | integer      | 用户 ID |
| avatar           | string      | 用户头像 |
| _username           | string       | 用户名 |
| _email           | string       | 用户邮件地址 |
| _email_verified       | boolean | 用户邮件地址是否已经验证 |
| _provider | object | 用户在平台方的用户信息(见 `v2.0/user/info` 接口)以及其他 _userprofile 表的内置字段及用户自定义字段 |
| country | string | 用户所在的国家 |
| province | string | 用户所在的省份 |
| city | string | 用户所在城市 |
| gender | string | 用户的性别，值为 1 时是男性，值为 2 时是女性，值为 0 时是未知 |


### 示例
```json
{
    "_email": "hgzchn@qq.com",
    "_email_verified": false,
    "_provider": {},
    "avatar": "https://media.ifanrusercontent.com/hydrogen/default_avatar.png",
    "id": 34719381111111,
    "user_id": 3471938111111,
    "country": "China",
    "province": "Guangdong",
    "city": "Guangzhou",
    "gender": 1
}
```

# 用户注册

**接口**

`POST /hserve/v2.0/register/:register-type/`

**:register-type** 有两种:

* email: 通过邮箱注册
* username: 通过用户名注册

{% tabs createTableEmail="通过邮箱注册",
createTableUsername="通过用户名注册" %}

{% content "createTableEmail" %}

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email           | string   |  是 | 邮箱地址 |
| password         | string       |  是 | 密码 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  -d '{"email":"hegz@qq.com","password":"mbbmb*cb"}' \
  https://{{服务器域名}}/hserve/v2.0/register/email/
```

{% content "createTableUsername" %}

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| username           | string   |  是 | 用户名 |
| password         | string       |  是 | 密码 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  -d '{"username":"hegz","password":"mbbmb*cb"}' \
  https://{{服务器域名}}/hserve/v2.0/register/username/
```

{% endtabs %}

**返回参数说明**

|        参数       |      类型    |   说明    |
| :--------------- | :----------- | :------- |
| token             | string       | User authentication token |
| expires_in | integer | token 的有效时间，最长为 30 天，单位：秒；token 过期时间 = 注册时间 + token 有效时间 |

其余字段可参考[用户(user)](#user-object)

**状态码说明**

`201`: 注册成功

`400`: 参数错误

# 用户登录

**接口**

`POST /hserve/v2.0/login/:login-type/`

**:login-type** 有两种:

* email: 通过邮箱登陆
* username: 通过用户名登陆

{% tabs createTableEmailLogin="通过邮箱登陆",
createTableUsernameLogin="通过用户名登陆" %}

{% content "createTableEmailLogin" %}

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email           | string   |  是 | 邮箱地址 |
| password         | string       |  是 | 密码 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  -d '{"email":"hegz@qq.com","password":"mbbmb*cb"}' \
  https://{{服务器域名}}/hserve/v2.0/login/email/
```

{% content "createTableUsernameLogin" %}

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| username           | string   |  是 | 用户名 |
| password         | string       |  是 | 密码 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  -d '{"username":"hegz","password":"mbbmb*cb"}' \
  https://{{服务器域名}}/hserve/v2.0/login/username/
```

{% endtabs %}

**返回示例**

|        参数       |      类型    |   说明    |
| :--------------- | :----------- | :------- |
| token             | string       | User authentication token |
| expires_in | integer | token 的有效时间，最长为 30 天，单位：秒；token 过期时间 = 登录时间 + token 有效时间 |

其余字段可参考[用户(user)](#user-object)

**状态码说明**

`201`: 登陆成功

`400`: 参数错误

# 查询用户信息

**接口**

`GET /hserve/v2.0/user/info/:user_id/`

**:user_id** 为[用户(user)](#user-object)中的 user_id 

**请求示例**

```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/user/info/72818312393/
```

**返回示例**
```json     
{
    "country": "China",
    "avatar": "https://media.ifanrusercontent.com/blablabla.jpg",
    "gender": 1,
    "unionid": null,
    "age": 40,
    "created_at": 1513088820,
    "id": 72818312393,
    "custom_name": "custom_default_value",
    "nickname": "hgz",
    "updated_at": 1531543768,
    "is_authorized": true,
    "_provider": {},
    "openid": "oXUfx0HKez4xxxxxxxx-xxxxxxx",
    "created_by": 36395395,
    "province": "Guangdong",
    "city": "Guangzhou"
}
```
字段详细说明请参考[用户(user)](#user-object)

**状态码说明**

`200`: 查询成功

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确

`404`: 用户不存在


# 批量查询用户信息

**接口**

`GET /hserve/v2.0/user/info/`


**请求示例**
```shell
curl -X GET \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/user/info/
```

**返回示例**
```json
{
    "objects": [
        {
            "country": "China",
            "avatar": "https://media.ifanrusercontent.com/blablabla.jpg",
            "gender": 1,
            "unionid": null,
            "age": 40,
            "created_at": 1513088820,
            "id": 30000000,
            "custom_name": "custom_default_value",
            "nickname": "hgz",
            "updated_at": 1531543768,
            "is_authorized": true,
            "_provider": {},
            "openid": "oXUfx0HKez4xxxxxxxx-xxxxxxx",
            "created_by": 36395395,
            "province": "Guangdong",
            "city": "Guangzhou"
        }
    ],
    "meta": {
        "total_count": 140,
        "limit": 1,
        "previous": null,
        "next": "/userve/v2.0/user/info/?limit=1&offset=1",
        "offset": 0
    }
}
```
字段的详细请参考[用户(user)](#user-object)

**状态码说明**

`200`: 查询成功

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确

`404`: 用户不存在

# 用户邮箱验证

**接口**

`POST /hserve/v2.0/user/email-verify/`


**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  https://{{服务器域名}}/hserve/v2.0/user/email-verify/
```

**返回示例**
```json
{
    "status": "ok"
}
```

**状态码说明**

`201`: 成功发送验证邮件

`400`: 发送失败

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确


# 用户登出

**接口**

`POST /hserve/v2.0/session/destroy/`


**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d "{}" \
  https://{{服务器域名}}/hserve/v2.0/session/destroy/
```

**返回示例**
```json
{
    "message": "Destroy succeed.",
    "status": "ok"
}
```

**状态码说明**

`201`: 登出成功

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确


# 修改用户信息
可更改密码、用户名、邮箱

**接口**

`PUT /hserve/v2.0/user/account/`


**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email          | string   |  否 | 新的邮箱地址 |
| username       | string   |  否 | 新的用户名 |
| password       | string   |  否 | 旧密码 |
| new_password   | string   |  否 | 新密码 |

如果选择**修改密码**, 必须同时传入 `password` 和 `new_password`

**请求示例**
```shell
curl -X PUT \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"password": "oldpassword", "new_password": "new_password"}' \
  https://{{服务器域名}}/hserve/v2.0/user/account/
```


**返回示例**
```json
{
    "email": "hgzchn@qq.com",
    "email_verified": false,
    "username": "123"
}
```

**返回字段说明**

|       参数     |       类型   | 说明 |
| :------------ | :----------- | :---| :--- |
| email         | string   | 目前的邮箱 |
| email_verified| boolean  | 邮箱是否已经验证 |
| username      | string   | 目前的用户名 |

**状态码说明**

`200`: 更新成功

`400`: 参数错误(可能是旧密码错误)

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确


# 用户通过邮箱重置密码

**接口**

`POST /hserve/v2.0/user/password/reset/`


**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email           | string   |  是 | 需要重置密码的用户的邮箱地址 |

**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Content-Type: application/json" \
  -d '{"email":"hgzchn@qq.com"}' \
  https://{{服务器域名}}/hserve/v2.0/user/password/reset/
```


**返回示例**
```json
{
    "status": "ok"
}
```

**状态码说明**

`201`: 已向用户发送密码重置邮件

`400`: 参数错误

`404`: 用户不存在
