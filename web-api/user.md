# 用户注册

**接口**

`POST https://cloud.minapp.com/hserve/v2.0/register/:register-type/`

**:register-type** 有两种:

* email: 通过邮箱注册
* username: 通过用户名注册


{% tabs createTableEmail="通过邮箱注册",
createTableUsername="通过用户名注册" %}

{% content "createTableEmail" %}
**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email           | String   |  是 | 邮箱地址 |
| password         | String       |  是 | 密码 |

**请求示例**
```json
POST /hserve/v2.0/register/email/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***

{
    "email": "aaa@bbb.com",
    "password": "abc***abd"
}
```

{% content "createTableUsername" %}
**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| username           | String   |  是 | 用户名 |
| password         | String       |  是 | 密码 |

**请求示例**
```json
POST /hserve/v2.0/register/username/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***

{
    "username": "he",
    "password": "abc***abd"
}
```

{% endtabs %}

**返回参数说明**

参考[用户(user)](/web-api/object-struct.md)

**状态码说明**

`201`: 注册成功

`400`: 参数错误

# 用户登录

**接口**

`POST https://cloud.minapp.com/hserve/v2.0/login/:login-type/`

**:login-type** 有两种:

* email: 通过邮箱登陆
* username: 通过用户名登陆

{% tabs createTableEmailLogin="通过邮箱登陆",
createTableUsernameLogin="通过用户名登陆" %}

{% content "createTableEmailLogin" %}
**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email           | String   |  是 | 邮箱地址 |
| password         | String       |  是 | 密码 |

**请求示例**
```json
POST /hserve/v2.0/login/email/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***

{
    "email": "aaa@bbb.com",
    "password": "abc***abd"
}
```

{% content "createTableUsernameLogin" %}
**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| username           | String   |  是 | 用户名 |
| password         | String       |  是 | 密码 |

**请求示例**
```json
POST /hserve/v2.0/login/username/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***

{
    "username": "he",
    "password": "abc***abd"
}
```

{% endtabs %}


**返回示例**

参考[用户(user)](/web-api/object-struct.md)

**状态码说明**

`201`: 登陆成功

`400`: 参数错误

# 查询用户信息

**接口**

`GET https://cloud.minapp.com/hserve/v2.0/user/info/:user_id/`

**:user_id** 为[用户(user)](/web-api/object-struct.md)中的 user_id 

**请求示例**
```json
GET /hserve/v2.0/user/info/1/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
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
```
字段详细说明请参考[用户](/web-api/object-struct.md)

**状态码说明**

`200`: 查询成功

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确

`404`: 用户不存在


# 批量查询用户信息

**接口**

`GET https://cloud.minapp.com/hserve/v2.0/user/info/`


**请求示例**
```json
GET /hserve/v2.0/user/info/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
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
字段的详细请参考[用户](/web-api/object-struct.md)

**状态码说明**

`200`: 查询成功

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确

`404`: 用户不存在

# 用户邮箱验证

**接口**

`POST https://cloud.minapp.com/hserve/v2.0/user/email-verify/`


**请求示例**
```json
POST /hserve/v2.0/user/email-verify/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
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

`POST https://cloud.minapp.com/hserve/v2.0/session/destroy/`


**请求示例**
```json
POST /hserve/v2.0/session/destroy/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
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

`PUT https://cloud.minapp.com/hserve/v2.0/user/account/`


**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email          | String   |  否 | 新的邮箱地址 |
| username       | String   |  否 | 新的用户名 |
| password       | String   |  否 | 旧密码 |
| new_password   | String   |  否 | 新密码 |

如果选择**修改密码**, 必须同时传入 `password` 和 `new_password`

**请求示例**
```json
PUT /hserve/v2.0/user/account/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
{
    "password": "oldpassword",
    "new_password": "new_password"
}
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
| email         | String   | 目前的邮箱 |
| email_verified| Boolean  | 邮箱是否已经验证 |
| username      | String   | 目前的用户名 |

**状态码说明**

`200`: 更新成功

`400`: 参数错误(可能是旧密码错误)

`401`: 未授权，请检查请求头中的 Authorization 字段是否正确


# 用户通过邮箱重置密码

**接口**

`POST https://cloud.minapp.com/hserve/v2.0/user/password/reset/`


**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| email           | String   |  是 | 需要重置密码的用户的邮箱地址 |

**请求示例**
```json
POST /hserve/v2.0/user/password/reset/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
{
    "email": "aaa@bbb.com"
}
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


# 发送短信验证码

**接口**

`POST https://cloud.minapp.com/hserve/v1.8/sms-verification-code/`

发送短信前请先进行[短信签名审核](https://cloud.minapp.com/dashboard/#/app/sms/setting)，审核通过后才能发送短信

**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| phone           | String   |  是 | 发送短信验证码的手机 |

**请求示例**
```json
POST /hserve/v1.8/sms-verification-code/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
{
      "phone": "12345678910",
}
```


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

`402`: 当前应用已欠费



# 验证短信验证码

**接口**

`POST https://cloud.minapp.com/hserve/v1.8/sms-verification-code/verify/`

**请求参数**

Content-Type: `application/json`

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| phone           | String   |  是 | 需要验证的手机号 |
| code | String   |  是 | 收到的验证码 |

**请求示例**
```json
POST /hserve/v1.8/sms-verification-code/verify/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
{
      "phone": "12345678910",
      "code": "352353"
}
```


**返回示例**
```json
{
    "status": "ok"
}
```

**状态码说明**

`200`: 成功发送

`400`: 验证码错误 / 参数错误
