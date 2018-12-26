# 云函数

## 触发云函数

**接口地址**

`POST https://cloud.minapp.com/userve/v1.3/cloud-function/:cloud-function-name/job/`

其中 `:cloud-function-name` 是云函数的名字。

**请求参数说明**

Content-Type: `Content-Type: application/json`

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| data          | Object | 是  | 传递给云函数的参数，如果没有需要提供一个空对象 |
| sync          | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

sync 为 true 时：

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |

sync 为 false 时：

| 参数          | 类型  | 说明 |
| :----------   | :--- | :--- |
| status | String |  默认为 'ok' |

