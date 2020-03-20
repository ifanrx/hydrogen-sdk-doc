# 触发器 V2 使用指南

触发器 V2 支持更多可选变量，使得业务构建更加方便。

## 可选变量

可选变量在触发器 V1 中可直接通过变量名进行访问，如 `{{ nickname }}`，而在触发器 V2 中，所有变量将会被对象包装，以便区分其场景。

下表是不同触发器中可使用的对象列表，所有变量被包含在对象中：

|触发器触发类型|可使用对象|对象含义|使用示例|
|------------|--------|-------|-------|
|数据表|`after`|触发器执行签的数据行|`{{ after.nickname }}`|
|数据表|`before`|触发器执行后的数据行|`{{ before.nickname }}`|
|微信支付回调|`payload`|支付订单对象|`{{ payload.trade_no }}`|
|支付宝支付回调|`payload`|支付订单对象|`{{ payload.trade_no }}`|
|QQ 支付回调|`payload`|支付订单对象|`{{ payload.trade_no }}`|
|百度支付回调|`payload`|支付订单对象|`{{ payload.trade_no }}`|
|文件操作|`payload`|文件创建者对象|`{{ payload.created_by.nickname }}`|

> 数据表的 `after` 对象仅会在触发器事件类型为 `create` 或者 `update` 时才有相对应的数据行。

> 数据表的 `before` 对象仅在触发器事件类型为 `update` 或者 `delete` 时才有相对应的数据行。

总结：变量名与触发器 V1 保持一致，根据不同的触发类型选择需要的对象获取变量。

## date 格式化操作符

触发器 V2 中支持使用 date 操作符对 Date 类型的变量进行日期格式化，其语法为：

    {{ <date_field> | date: "Y-m-d" }}

通过 `|` 将 `date` 操作符与所需要格式化的 Date 类型变量连接起来，`"Y-m-d"` 则表示日期格式化字符串，具体可参考下文的可用格式化字符串列表。

### 示例

如当设置 Email 正文中使用变量：

    创建时间：{{ after.created_at | date: "Y-m-d" }}

在邮件发送时，则会根据上述变量进行转换成以下格式：

    创建时间: 2020-03-20


### 格式化字符串列表

|格式化字符|描述|输出示例|
|--------|----|---|
|y|年，两位数字|'20'|
|Y|年，四位数字| '2020'|
|m|月，补 0|'01' to '12'|
|n|月，不补 0|'1' to '12'|
|d|日，补 0|'01' to '31'|
|j|日，不补 0|'1' to '31'|
|h|小时，12 小时制|'01' to '12'|
|H|小时，24 小时制|'00' to '23'|
|g|小时，12 小时制，不补 0|'1' to '12'|
|G|小时，24 小时制，不补 0|'0' to '23'|
|i|分钟|'00' to '59'|
|s|秒|'00' to '59'|
|u|毫秒|000000 to 999999|
|A|'AM' or 'PM'|'AM'|

## 触发器执行云函数时 event.data 格式说明

触发器 V2 在执行云函数时，会将触发器相关的信息传入 event.data 中，以便云函数更好地处理来自触发器的调用。

不同的触发类型，event.data 均会不同，开发者可根据以下说明获取相对应的格式说明。

### 数据表

数据格式：

    {
        "after": {},
        "before": {},
        "subject": "FlexSchema",
        "event": "on_create",
        "schema_id": 1,
        "schema_name": "test_schema"
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|after|对象|运行触发器后的对象（创建/更新才有值）|
|before|对象|运行触发器前的对象（删除/更新才有值）|
|subject|字符串|触发类型，此值固定为 `FlexSchema`|
|event|字符串|触发事件，取值：`on_create`，`on_update`，`on_delete`|
|schema_id|整型|数据表 ID|
|schema_name|字符串|数据表名称|

### 定时任务

数据格式：

    {
        "subject": "Timer",
        "name": "timer_name"
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|subject|字符串|触发类型，此值固定为 `Timer`|
|name|字符串|触发器名称|

### 微信支付回调

数据格式：

    {
        "subject": "WeChatPaySuccess",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|支付订单对象|
|subject|字符串|触发类型，此值固定为 `WeChatPaySuccess`|

### 文件操作

数据格式：

    {
        "subject": "FileOperation",
        "payload": {},
        "event": "file_upload",
        "pattern": {"result": "success"}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|文件记录对象|
|subject|字符串|触发类型，此值固定为 `FileOperation`|
|event|字符串|取值：`file_upload`（文件上传）, `file_delete`（文件删除）, `file_upload_and_image_sec_check`（图片违规校验）|
|pattern|对象|取值：`{"result": "success"}` (成功)，`{"result": "fail"}`（失败）|

### ImcomingWebHook

数据格式：

    {
        "subject": "IncomingWebHook",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|请求 WebHook 的 Payload 对象|
|subject|字符串|触发类型，此值固定为 `IncomingWebHook`|

### 微信消息推送

数据格式：

    {
        "subject": "WeChatMessage",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|微信推送消息的对象|
|subject|字符串|触发类型，此值固定为 `WeChatMessage`|

### 支付宝支付回调

数据格式：

    {
        "subject": "AlipayPaySuccess",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|支付订单对象|
|subject|字符串|触发类型，此值固定为 `AlipayPaySuccess`|

### QQ 支付回调

数据格式：

    {
        "subject": "QPaySuccess",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|支付订单对象|
|subject|字符串|触发类型，此值固定为 `QPaySuccess`|

### 百度支付回调

数据格式：

    {
        "subject": "BaiduPaySuccess",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|支付订单对象|
|subject|字符串|触发类型，此值固定为 `BaiduPaySuccess`|

### 用户状态变更

数据格式：

    {
        "subject": "UserActivity",
        "event": "",
        "pattern": "",
        "payload": {}
    }

字段说明：

|字段|类型|备注|
|----|---|---|
|payload|对象|用户信息字段|
|subject|字符串|触发类型，此值固定为 `UserActivity`|
|event|字符串|取值: `user_login`（登入），`user_logout`（登出），`user_register`（注册）|
|pattern|对象|取值：`{"result": "new_user"}`（新用户登入），`{"result": "username_register"}`（用户名注册）， `{"result": "phone_register"}`（手机号注册）， `{"result": "email_register"}`（邮箱注册）|
