# 短信服务

# 发送短信验证码

**接口**

`POST /hserve/v1.8/sms-verification-code/`

发送短信前请先进行[短信签名审核](https://cloud.minapp.com/dashboard/#/app/sms/setting)，审核通过后才能发送短信

**请求参数**

|       参数     |       类型    | 必填 | 说明 |
| :------------  | :----------- | :---| :--- |
| phone           | string   |  是 | 发送短信验证码的手机 |

**请求示例**

```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"phone": "12345678910"}' \
  https://{{服务器域名}}/hserve/v1.8/sms-verification-code/
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

`POST /hserve/v1.8/sms-verification-code/verify/`

**请求参数**

|       参数       |       类型    | 必填 | 说明 |
| :------------   | :----------- | :---| :--- |
| phone           | string   |  是 | 需要验证的手机号 |
| code             | string   |  是 | 收到的验证码 |

**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"phone": "12345678910", "code": "352353"}' \
  https://{{服务器域名}}/hserve/v1.8/sms-verification-code/verify/
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
