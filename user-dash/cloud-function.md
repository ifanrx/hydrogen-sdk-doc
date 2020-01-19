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


## 获取某云函数的任务记录

**接口地址**

`GET https://cloud.minapp.com/userve/v1.3/cloud-function/:cloud-function-name/job/`

其中 `:cloud-function-name` 是云函数的名字。

**参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| source | String | 否 |云函数任务来源，可选值：sdk, open_api, cloud_function, flex_schema, wechat_pay_success, alipay_pay_success, qpay_success, baidu_pay_success, timer, file_operation, user_dash, incoming_webhook, wechat_message, user_activity |
| status | String | 否 | 云函数任务状态，可选值：waiting, executing, fulfilled, schedule_failed, execution_rejected, deadline_exceeded, execution_failed |
| service_type | String | 否 | 云函数同步类型，可选值：time_sensitive, batch |

**返回参数**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| id | Integer | 任务 ID |
| created_at | Float | 创建时间 |
| finished_at | Float | 完成时间 |
| mem_usage | Integer | 内存用量 |
| service_type | String | 可能的值：time_sensitive, batch |
| source | String | 任务来源 |
| status | String | 任务状态 |
| user_log_url | String | 日志地址 |

**返回示例**

```javascript
{
    "meta": {
        "limit": 20,
        "next": "/userve/v1.3/cloud-function/test/job/?limit=20&offset=20",
        "offset": 0,
        "previous": null,
        "total_count": 1525
    },
    "objects": [
        {
            "created_at": 1537505171.419368,
            "finished_at": 1537505171.605735,
            "id": 779734,
            "mem_usage": 78336000,
            "service_type": "batch",
            "source": "flex_schema",
            "started_at": 1537505171.5807,
            "status": "fulfilled",
            "user_log_url": "https://hydrogen-faas-logs.s3.cn-north-1.amazonaws.com.cn/ticket_778289.log?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=86400&X-Amz-Security-Token=FQoDYXdzEP3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDM50xRDK8JETeulNLiK%2FA08zFCZM8zvsnb6VG81mDV0onfgVwXhAjUi6p3Y250g9GiVeWVs%2FpI6S9d0S6mD9xPjmkWw9ven%2BkRVME2xAbzfgio8%2BUbQkrOgvnFx%2BziHj0DGGvMEZYnoT6ui4QD8y8YQaJd7oWH%2B0hdIUGdE%2BFTSiZzSicuVgdr6WLkxipnuujV2yS9%2ByrXK4A0g1HaUifZVnD3K2Bz1AiHrr9abaFSFoWzyzhGYGcyp7TM4iodW%2FTI5CkPFj2f%2BNvCOSCBWWWOsY%2FUyaAdCFZFqXJoJ6uuXFZ5yl7xd5W28egT5Jgfeq%2FG5j9xp9OVu8sAlnPre8WoSpspHt8R%2BRMDPr6klJE3yxXIxRODlt4nHAA30wcwunO09x8zoK54pgrveIWNlIRYeSSMG%2FGAzYXNq%2FxXjcpQOa3ekyirC%2Bj0n45dBZY4oS8c3au32WjoLjD2gnPAZsvBg1gR2wcUxs3PFi30ochY9VAxXQyXeqcy1Jw0LXQnBLT6Uw9pVV8%2BikrK13EBUiIAow1FEeKJ3xjng7mrPz60pEDYZcymJ0Uj4VkNBXMQwPHBfsfChxsLWYXaQ3EitWD3GhBaim65Tz%2FoZHU6TPRijP5ZHdBQ%3D%3D&X-Amz-Date=20180921T044620Z&X-Amz-Signature=f5d74870d8b52cbb490fae4d81fc486b09da1e026bf9571c172b4d8d29c84a66&X-Amz-Credential=ASIAQUWH6XTCOEBVBVFG%2F20180921%2Fcn-north-1%2Fs3%2Faws4_request&X-Amz-SignedHeaders=host"
        },
        ...
    ]
}
```

**状态码说明**

`200`: 成功。

`400`: 参数错误。


## 新建云函数

**接口地址**

` POST https://cloud.minapp.com/userve/v1.3/cloud-function/`

**请求参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| name | String | 是 | 云函数名，不能为空字符串 |
| function_code | String | 是 | 云函数代码，不能为空字符串 |
| remark | String | 否 | 备注 |

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型 |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |
| created_at | Integer | 创建时间 |

**状态码说明**

`201`: 创建成功。

`400`: 参数不合法：云函数名或代码为字段为空。


## 获取当前小程序的所有云函数

**接口地址**

`GET https://cloud.minapp.com/userve/v1.3/cloud-function/`

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型 |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |
| created_at | Integer | 创建时间 |

**返回示例**

```javascript
{
    "meta": {
        "limit": 20,
        "next": null,
        "offset": 0,
        "previous": null,
        "total_count": 2
    },
    "objects": [
        {
            "audit_status": "approved",
            "created_at": 1537924886,
            "created_by": "somebody",
            "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
            "id": 1121,
            "name": "come_from_open_API_v1.3",
            "plan_circle": "P_FREE",
            "remark": "你好，云函数",
            "updated_at": 1537924886,
            "updated_by": ""
        },
        {
            "audit_status": "approved",
            "created_at": 1537704269,
            "created_by": "somebody",
            "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
            "id": 1102,
            "name": "测试",
            "plan_circle": "P_FREE",
            "remark": "你好，云函数",
            "updated_at": 1537704426,
            "updated_by": "somebody"
        },
    ]
}
```

**状态码说明**

`200`: 成功。


## 获取云函数详细信息

**接口地址**

`GET https://cloud.minapp.com/userve/v1.3/cloud-function/:cloud-function-name/`

其中 `:cloud-function-name` 为云函数的名字。

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型 |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |
| created_at | Integer | 创建时间 |

**返回示例**

```javascript
{
    "audit_status": "approved",
    "created_at": 1535903214,
    "created_by": "somebody",
    "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")  fot debug\n}",
    "id": 847,
    "name": "test",
    "plan_circle": "P_FREE",
    "remark": "",
    "updated_at": 1537516164,
    "updated_by": "somebody"
}
```

**状态码说明**

`200`: 成功。

`404`: 云函数不存在。


## 修改云函数

**接口地址**

`PATCH https://cloud.minapp.com/userve/v1.3/cloud-function/:cloud-function-name/`

其中 `:cloud-function-name` 为云函数名字。

**请求参数说明**

| 参数          | 类型 | 必填 | 说明 |
| :----------   | :--- | :--- | :--- |
| name | String | 否 | 云函数名，不能为空字符串 |
| function_code | String | 否 | 云函数代码，不能为空字符串 |
| plan_circle | String | 否 | 套餐类型，可能的值：P_FREE（128 MB 内存）, P_PERSONAL（256 MB 内存）|
| remark | String | 否 | 备注 |

**返回参数说明**

| 参数          | 类型 | 说明 |
| :----------   | :--- | :--- |
| audit_status | String | 可能的值： approved, rejected, waiting |
| created_by | String | 创建者昵称 |
| function_code | String | 云函数代码 |
| id | Integer | 云函数 ID |
| name | String | 云函数名 |
| plan_circle | String | 套餐类型，可能的值：P_FREE（128 MB 内存）, P_PERSONAL（256 MB 内存） |
| remark | String | 备注 |
| updated_at | Integer | 最近一次更新时间 |
| updated_by | String | 更新者昵称 |
| created_at | Integer | 创建时间 |

**返回示例**

```javascipt
{
    "audit_status": "approved",
    "created_at": 1535903214,
    "created_by": "somebody",
    "function_code": "exports.main = function functionName(event, callback) {\n  callback(null, \"hello world\")\n}",
    "id": 847,
    "name": "modify_from_open_api",
    "plan_circle": "P_FREE",
    "remark": "",
    "updated_at": 1537710962,
    "updated_by": "somebody"
}
```

**状态码说明**

`202`: 修改成功。

`400`: 参数不合法：云函数名或代码为空。


## 删除一个云函数

**接口地址**

`DELETE https://cloud.minapp.com/userve/v1.3/cloud-function/:cloud-function-name/`

其中 `:cloud-function-name` 是云函数的名字。

**状态码说明**

`204`: 删除成功。

`404`: 没有找到对应的云函数。
