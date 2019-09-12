# 短信服务

# 发送短信验证码

**接口**

`POST https://cloud.minapp.com/userve/v2.1/sms-verification-code/`

支持指定短信签名向指定手机号发送短信验证码。

> **info**
> 发送短信前请先进行[短信签名审核](https://cloud.minapp.com/dashboard/#/app/sms/setting)，审核通过后才能发送短信

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| phone           | string   |  是 | 发送短信验证码的手机 |
| signature_id    | integer  |  否 | 发送短信验证码使用的签名 ID，若不指定，将选择最新的过审签名进行发送 |

**代码示例**

{% tabs SMSCodeCurl="Curl", SMSCodeNode="Node", SMSCodePHP="PHP" %}

{% content "SMSCodeCurl" %}

```
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/oserve/v2.1/sms-verification-code/',
  {
    phone: "12345678910",
    signature_id: 1
  }).then(res => {
  console.log(res.data)
})
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


# 验证短信验证码

**接口**

`POST https://cloud.minapp.com/userve/v1.8/verify/`

**请求参数**

|       参数       |       类型    | 必填 | 说明 |
| :------------   | :----------- | :---| :--- |
| phone           | string   |  是 | 需要验证的手机号 |
| code             | string   |  是 | 收到的验证码 |

**代码示例**

{% tabs VerifyCurl="Curl", VerifyNode="Node", VerifyPHP="PHP" %}

{% content "VerifyCurl" %}

```
var axios = require('axios').create({
  withCredentials: true
})

axios.post('https://cloud.minapp.com/userve/v1.8/verify/',
  {
    phone: "12345678910",
    code: "352353"
  }).then(res => {
  console.log(res.data)
})
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
