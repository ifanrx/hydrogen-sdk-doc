<!-- ex_nonav -->

# 错误响应
对于所有的请求，响应格式都是一个 `JSON` 对象，结构如下:

| 字段名    | 类型   | 说明         |
| --------- | ------ | ------------ |
| status    | string | 恒为 `error` |
| error_msg | string | 错误描述     |


## 示例代码
```python
import requests

# 请求参数
playload = {
    "email": "hgzchn@qq.com",
    "password": "itellyou"
}
# 请求头
headers = {
    "Content-Type": "application/json",
    "X-Hydrogen-Client-ID": "0f17262d58e0071e6cf3"
}
# 假设此应用未开始邮箱注册，则会发生错误
response = requests.post(
    url="http://{{服务器域名}}/hserve/v2.0/register/email/",
    headers=headers,
    data=playload
)

print(response.status_code)
# 405
print(response.json())
# {'status': 'error', 'error_msg': 'Please enable email login first.'}
```

## 错误码详解

响应的 `HTTP` 状态码列表(`status_code`)与其含义

`400`  Bad Request 参数错误

`401`  Unauthorized 未授权  

`402`  Payment Required 应用欠费

`403`  Forbidden 禁止访问  

`404`  Not Found 服务器找不到给定的资源

`405`  Method Not Allowed 不允许的请求方法

`500`  Internal Server Error 内部服务器错误
