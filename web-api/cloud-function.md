# 云函数

## 触发云函数

`POST https://cloud.minapp.com/hserve/v1/cloud-function/job/`

**请求参数说明**

Content-Type: `Content-Type: application/json`

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| function_name | String | 是  | 要运行的云函数名 |
| data          | Object | 否  | 传递给云函数的参数 |
| sync          | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**请求示例**
```json
POST /hserve/v1/cloud-function/job/ HTTP/1.1
Host: cloud.minapp.com
Accept: application/json  
Content-Type: application/json
X-Hydrogen-Client-ID: AwBeIhQeTDReSUQHltzabBhddcrXf***
Authorization: Hydrogen-r1 tKqfyPberbIroVRPRVxcrlVmFHnAI***
{
      "function_name": "sdk_helloWorld"
}
```

**返回参数说明**

在 sync 为 true 的情况下

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

**状态码**


`200`: 云函数执行成功

`404`: 传入的参数 function_name 不合法）

`400`: 云函数调度/执行失败
