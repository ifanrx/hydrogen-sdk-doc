# 云函数

## 触发云函数

`POST /hserve/v1/cloud-function/job/`

**请求参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| function_name | String | 是  | 要运行的云函数名 |
| data          | Object | 否  | 传递给云函数的参数 |
| sync          | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**请求示例**
```shell
curl -X POST \
  -H "X-Hydrogen-Client-ID: {{ClientID}}" \
  -H "Authorization: Hydrogen-r1 {{AccessToken}}" \
  -H "Content-Type: application/json" \
  -d '{"function_name":"test"}' \
  https://{{服务器域名}}/hserve/v1/cloud-function/job/
```

**返回参数说明**

在 `sync` 为 `true` 的情况下

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

**返回示例**
在 `sync` 为 `true` 的情况下, 返回
```json
{
    "code": 0,
    "data": "hello world",
    "error": {}
}
```

在 `sync` 为 `false` 的情况下, 返回
```json
{
    "status": "ok"
}
```

**状态码**

`200`: 云函数执行成功

`404`: 传入的参数 `function_name` 不合法

`400`: 云函数调度/执行失败
