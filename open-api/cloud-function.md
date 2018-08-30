# 云函数

## 触发云函数

~~`POST https://cloud.minapp.com/oserve/v1/cloud-function/job/`

参数说明

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| function_name | String | 是  | 云函数名 |
| data          | Object | 否  | 传递给云函数的参数 |
| sync          | Bool   | 否  | 是否等待返回函数执行结果，默认为 true。同步与异步云函数有不同的超时时间，同步云函数为 5 秒，而异步云函数为 5 分钟（300 秒）|

**返回参数说明**

在 sync 为 true 的情况下

| 参数   | 类型                   | 描述 |
| :---- | :--------------------- | :-- |
| code  | Number                 | code 为 0 时表示成功执行云函数，否则为执行云函数失败 |
| data  | 由云函数返回的数据类型决定 | 函数通过 callback 返回的数据 |
| error | Object                 | 返回的错误信息，成功则返回空对象 |
