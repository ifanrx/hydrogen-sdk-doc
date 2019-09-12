# 触发器

[触发器（Trigger）](https://cloud.minapp.com/dashboard/#/app/engine/trigger/table/)的执行不是由程序调用，也不是手工启动，而是由事件来触发，比如当对一个表进行操作（ create，delete， update）时就会激活它执行。使用触发器，你可以更加方便的实现业务逻辑。

## 概览
### 触发器配置卡片

![触发器配置](/images/dashboard/trigger-config.png)

此面板配置一些触发器的基本信息，或者进行查阅触发器触发日志等操作。

触发类型目前有七种：

- [数据表](#数据表)
- [微信支付回调](#微信支付回调)
- [定时任务](#定时任务)
- [文件操作](#文件操作)
- [IncomingWebhook](#Incomingwebhook)
- [微信消息推送](#微信消息推送)
- [支付宝支付回调](#支付宝支付回调)

### 条件卡片

![触发器条件](/images/dashboard/trigger-condition.png)

对应上面的触发类型，设置不同触发类型的参数。

### 动作卡片

![触发器动作](/images/dashboard/trigger-action.png)

当触发器的条件被满足，将会执行触发器中的动作。

目前有五种动作类型可选，分别如下：

- 邮件
- 微信模板消息
- webhook
- 数据表操作
- 云函数

不同的触发类型对应可选的动作类型不同，总结如下：

| 动作类型↓ \ 触发类型→ | 数据表  | 微信支付回调 | 定时任务 | 文件操作 | IncomingWebhook | 微信消息推送 | 支付宝支付回调 |
| ------------------ | :----- | :--------- | :------ | :----- | :----------------| :-------- | :----------- |
| 邮件                | Y️      | Y          | Y       | Y      | Y               | Y          | Y            |
| 微信模板消息         | Y️      | Y️           | Y       | Y     | Y                | Y           | Y          |
| webhook            | Y️      | Y️           | N       | Y     | Y                | Y           | Y          |
| 数据表操作           | Y️      | Y️           | N       | Y     | Y                | Y            | Y         |
| 云函数              | Y️      | Y           | Y       | Y     | Y                | Y            | Y          |

## 触发类型

### 数据表
触发条件：当指定的数据表发生改变（增、删、改），满足触发器设置的条件时。

使用场景：新用户注册成功，向新用户发送一封欢迎邮件。

下面是一些参数说明：

| 事件类型 | 说明 |
| :-------|:--- |
| create  | 数据行被创建时触发 |
| update  | 数据行被更新时触发 |
| delete  | 数据行被删除时触发 |

| 满足条件 | 说明 |
| :----- |:---- |
| 任一    | OR  满足任一条件 |
| 所有    | AND 同时满足所有条件 |

目前触发条件支持的数据类型及其对应的操作符如下：

| 数据类型 | 操作符                            |
| :------ | :------------------------------- |
| array   | contains, isempty |
| boolean | =, !=, isempty |
| date    | =, !=, >, >=, <, <=, isempty, range |
| integer | =, !=, >, >=, <, <=, isempty, range |
| number  | =, !=, >, >=, <, <=, isempty, range |
| string  | regex, =, !=, isempty |


### 微信支付回调
触发条件：当用户微信支付成功时。

使用场景：用户微信支付成功，微信模板消息提醒用户订单详情。

在动作中可以使用的跟订单相关的模板变量如下：
> trade_no, created_by, merchandise_schema_id, merchandise_record_id, merchandise_description, merchandise_snapshot, total_cost, paid_at, created_at, updated_at, transaction_no

### 支付宝支付回调
触发条件：当用户支付宝支付成功时。

使用场景：用户支付宝支付成功，支付宝模板消息提醒用户订单详情。

在动作中可以使用的跟订单相关的模板变量如下：
> trade_no, created_by, merchandise_schema_id, merchandise_record_id, merchandise_description, merchandise_snapshot, total_cost, paid_at, created_at, updated_at, transaction_no

### QQ 支付回调
触发条件：当用户 QQ 支付成功时。

使用场景：用户 QQ 支付成功，QQ 模板消息提醒用户订单详情。

在动作中可以使用的跟订单相关的模板变量如下：
> trade_no, created_by, merchandise_schema_id, merchandise_record_id, merchandise_description, merchandise_snapshot, total_cost, paid_at, created_at, updated_at, transaction_no

### 微信消息推送
触发条件：当接收到微信推送的所有类型消息时，比如用户在小程序或公众号中发送客服消息的时候触发。

使用场景：当用户在小程序中向开发者发送客服消息的时候，开发者可判断消息关键词并作出相应的动作，比如发送邮件、执行云函数等。

设置条件触发器参数规则请参考[微信文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025274)。

### 定时任务
触发条件：根据 cron 规则周期性的触发。

使用场景：用户设定一个每小时的定时任务，用于检查网站健康状态，网站宕机时会自动调用云函数发送邮件提醒管理员

> **info**
> 注：定时任务下的邮件、模板消息动作不支持模板变量

### 文件操作
触发条件：当用户触发文件相关操作（文件上传、文件删除、图片违规校验），以及符合对应设置的操作结果时触发

使用场景：当有用户上传文件成功，发送模版消息提醒到指定用户。

> **info**
> 注：文件操作下的WebHook、云函数动作不支持模板变量

在邮件、微信模版消息、数据表操作动作中可以使用的模板变量如下：
> created_by.id, created_by.nickname, created_by.gender, created_by.country, created_by.province, created_by.city, created_by.language, created_by.openid, created_by.unionid, created_by.avatar, created_by.is_authorized, created_by.hello, created_by.type, created_by.test, created_by.has_seen_demand, created_by.latest_seen_time, created_by.created_at, created_by.updated_at

### IncomingWebhook
触发条件：用户直接访问特定的 URL，也可以通过 Ajax 方式发起一个请求。

详细说明：支持的 HTTP 方法有 GET, POST, PUT, PATCH, DELETE；请求体只支持 JSON 数据，支持自定义 http header, 但是必须以 `X_HYDROGEN_` 开头，全部会被转换为大写，此外如自定义 HTTP 头中包含 `-` 会被转换为 `_`。

速率限制： 每个小程序 5 QPS。

提交示例：
```javascript
    POST /oserve/v1/incoming-webhook/7YnQmaClzc/ HTTP/1.1
    Host: cloud.minapp.com
    Content-Type: application/json
    Customize-Header: hello

    {
      "hello": "incoming-webhook"
    }
```

返回示例：

```javascript
    HTTP/1.1 200 OK
    Content-Type: application/json;charset:utf-8

    {
      "status": "ok"
    }
```

对应触发器日志：
```javascript
    {
      "_id": 0,
      "meta": {
        "headers": {
          "CONTENT_LENGTH": 3,
          "CONTENT_TYPE": "application/json",
          "HOST": "cloud.minapp.com",
          "X_HYDROGEN_CUSTOMIZE_HEADER": "hello"
        },
        "remote_address": "1.1.1.1",
        "request_method": "POST",
      },
      "payload": {
        "hello": "incoming-webhook"
      }
    }
```

使用场景：当用户访问特定的 URL 时，执行指定的云函数。

> **info**
> 注：IncomingWebhook 下的动作不支持模板变量

## 动作

### 邮件
执行结果：向指定邮件地址发送一封邮件。

>**info**
>注：收件人和邮件标题也可以输入模板变量

### 微信模板消息

>**info**
>注：发送微信模板消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

执行结果：向指定用户发送一条微信模板消息。

使用前要在[微信小程序后台][1]添加消息模板。当在微信小程序后台增加、删除模板后，请在微信模板消息动作编辑卡片点击**更新模板**按钮，用以更新知晓云保存的模板缓存。

微信模板消息需要配合小程序来触发，无法单独在后台触发。具体触发方法为：在小程序页面中添加 form 组件，在提交表单的回调中取得 formId，调用 [BaaS.wxReportTicket](../js-sdk/template-message.md) 保存 formId，保存成功后，当触发器被触发后，这时用户就可以在手机收到通知。
注意这里 form 组件需要添加 **report-submit** 属性，否则在回调事件对象中无法获取 formId。

formId 使用限制说明：

- 发送前必须已有真机提交 formId （开发者工具无效）或已支付成功
- formId 仅供其提交者使用，即你无法使用 A 提交的 formId 给 B 发送模板消息
- formId 自提交日 7 天内有效
- 表单提交场景的 formId 可使用发送 1 次，支付场景的 formId 可使用发送 3 次
- 跳转路径请按照“pages/...“格式填写，“/pages/....“可能会导致发送错误

### 支付宝模板消息

>**info**
>注：发送支付宝模板消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

执行结果：向指定用户发送一条支付宝模板消息。

使用前要在[支付宝小程序后台](https://openhome.alipay.com/platform/miniIndex.htm#/)添加消息模板。

支付宝模板消息需要配合小程序来触发，无法单独在后台触发。具体触发方法为：在小程序页面中添加 form 组件，在提交表单的回调中取得 formId，调用 [my.BaaS.reportTicket](../js-sdk/alipay/template-message.md) 保存 formId，保存成功后，当触发器被触发后，这时用户就可以在手机收到通知。
注意这里 form 组件需要添加 **report-submit** 属性，否则在回调事件对象中无法获取 formId。

formId 使用限制说明：

- 发送前必须已有真机提交 formId （开发者工具无效）或已支付成功
- formId 仅供其提交者使用，即你无法使用 A 提交的 formId 给 B 发送模板消息
- formId 自提交日 7 天内有效
- 表单提交场景的 formId 和支付场景的 formId 都可使用发送 3 次
- 跳转路径请按照“pages/...“格式填写，“/pages/....“可能会导致发送错误

### QQ 模板消息

>**info**
>注：发送 QQ 模板消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

执行结果：向指定用户发送一条 QQ 模板消息。

使用前要在[QQ 小程序后台](https://q.qq.com/#/home/steps)添加消息模板。

QQ 模板消息需要配合小程序来触发，无法单独在后台触发。具体触发方法为：在小程序页面中添加 form 组件，在提交表单的回调中取得 formId，调用 [qq.BaaS.reportTicket](../js-sdk/qq/template-message.md) 保存 formId，保存成功后，当触发器被触发后，这时用户就可以在手机收到通知。
注意这里 form 组件需要添加 **report-submit** 属性，否则在回调事件对象中无法获取 formId。

formId 使用限制说明：

- 发送前必须已有真机提交 formId （开发者工具无效）或已支付成功
- formId 仅供其提交者使用，即你无法使用 A 提交的 formId 给 B 发送模板消息
- formId 自提交日 7 天内有效
- 表单提交场景的 formId 可使用发送 1 次
- 由于 qq 方面的 bug，支付场景的 form_id 目前暂时无法用于发送模板消息
- 跳转路径请按照“pages/...“格式填写，“/pages/....“可能会导致发送错误

### WebHook
执行结果：向指定 URL 发送一个 POST 请求。

执行动作时，服务器发送请求参数如下：

#### 请求 Headers
| 请求头部                      | 说明 |
| ---------------------------- | --- |
| X-Hydrogen-Webhook-Action-Id | 本次触发器触发动作的 uuid，webhook 重试时此 id 保持不变 |
| X-Hydrogen-Trigger-Event     | on_create, on_update, on_delete |

#### 请求 Body
**请求 Body 为一个 JSON Web Tokens 的文本，需要开发者自己去验证并解码，可以在这里[在线调试 jwt](https://jwt.io/)**

示例：
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMTIzIn0.FGhYH5IF-PkNV8b4SNh-1WKwV8h-Gj8JYVlXmUdCGs8
```

若触发类型为数据表，则请求 Body 解码后为数据行内容，示例如下：
```json
{
  _read_perm: [ 'user:*' ],
  name: '1',
  created_at: 1517970094,
  updated_at: 1517970094,
  created_by: 35674431,
  _write_perm: [ 'user:35674431' ],
  id: '5a7a62aefff1d610ab2ddb10'
}
```
数据行内容根据 event 类型有所差别，具体差异如下

| event 类型 | 请求 Body |
| --------- | ----------|
| on_create | 创建后的数据行信息 |
| on_update | 更新后的数据行信息 |
| on_delete | 被删除的数据行的原信息 |

若触发类型为微信支付回调，则请求 Body 解码后为微信支付结果。示例如下：
```json
{ trade_no: '5a7a695008443e1a69e1a06a',
  transaction_no: '5a7a695008443e1a69e1a06a',
  merchandise_description: 'test',
  merchandise_snapshot: {},
  merchandise_schema_id: 1,
  merchandise_record_id: '5a7a695008443e1a69e1a06a',
  status: 'success',
  refund_status: null,
  ip_address: '127.0.0.1',
  created_by_id: 123,
  paid_at: 1517970094 }
```

> **info**
> 注：webhook 不支持模板变量


### 数据表操作
执行结果：批量修改指定的数据表的数据行。
数据表操作动作的一些参数说明如下：

| 操作 | 被触发时动作说明 |
| :-- | :------------ |
| 创建 | 创建一行数据 |
| 更新 | 修改符合条件的数据行 |
| 删除 | 删除符合条件的数据行 |

当操作为**更新**或者**删除**时，需要配置查询条件，筛选出指定的数据行。数据表查询条件相关文档请[参考这里](schema.md)

> **info**
> 注：此处的查询条件中也可以输入模板变量

> 若使用类型为 object 的模板变量来进行赋值，则被赋值的字段必须为 string 类型。例如：在动作中将 {{obj.field}} 赋值给 _userprofile 表的 gender 字段是错误的，只能赋值给 nickname 等 string 类型的字段 

目前**赋值操作**支持的数据类型及其对应的操作符如下：

| 数据类型 | 操作符 |
| :------ | :---------------------------- |
| array   | =, append, append_unique, remove |
| boolean | = |
| date    | = |
| integer | =, inc_by |
| number  | =, inc_by |
| string  | = |
| geojson | = |

>**info**
>注：append, append_unique, remove, inc_by 为原子操作符，相关文档请[参考这里](../js-sdk/schema/update-record.md)

### 云函数

执行结果：执行对应的云函数 

不同的触发类型下的云函数动作被触发时，云函数接收到的参数也会有所不同。

event.data 参数内容：

- 定时任务：空。
- IncomingWebhook：请求信息，参考 [IncomingWebhook](#incomingwebhook) 小节。
- 数据表：数据表记录，File 类型的数据可以直接赋值给数据表 File 类型的字段。数据类型信息请查看[数据表中支持的数据类型](https://doc.minapp.com/js-sdk/schema/data-type.html#%E6%95%B0%E6%8D%AE%E8%A1%A8%E4%B8%AD%E6%94%AF%E6%8C%81%E7%9A%84%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B)。

示例：

```json
{
  "id": "5d76230f1db94f6cf2aa7ae1",
  "num": 1314.52,
  "int": 520,
  "str": "This is a string.",
  "bool": false,
  "date": "2019-09-09T17:56:38.758000+08:00",
  "file": {
    "cdn_path": "1g50PgtbHMNWFntB.png",
    "path": "https://cloud-minapp-0000.cloud.ifanrusercontent.com/1g50PgtbHMNWFntB.png",
    "created_at": 1537932176,
    "id": "5baafb906e73240d2acfb67e",
    "mime_type": "image/png",
    "name": "file1.png",
    "size": 105224
  },
  "object": {
    "key": "value"
  },
  "pointer_userprofile": {
    "_table": "_userprofile",
    "id": 88950987673979
  },
  "geo_polygon": "{\"coordinates\": [[[10.123, 10], [20.12453, 10], [30.564654, 20], [20.654, 30], [10.123, 10]]], \"type\": \"Polygon\"}",
  "geo_point": "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}",
    "array_geo": [
    "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}",
    "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}"
  ],
  "array_bool": [
    true,
    false
  ],
  "array_integer": [
    1,
    2
  ],
  "array_string": [
    "This is a string."
  ],
  "array_date": [
    "2018-12-04T16:59:37.153000+08:00",
    "2018-12-03T16:52:44.413000+08:00",
    "2018-12-02T16:52:40.023000+08:00",
    "2018-12-01T16:52:36.028000+08:00"
  ],
  "array_number": [
    1314.52,
    520.1314
  ],
  "array_object": [
    {
      "key1": "value"
    },
    {
      "key1": "value"
    }
  ],
  "array_file": [
    {
      "cdn_path": "1g50PgtbHMNWFntB.png",
      "path": "https://cloud-minapp-0000.cloud.ifanrusercontent.com/1g50PgtbHMNWFntB.png",
      "created_at": 1537932176,
      "id": "5baafb906e73240d2acfb67e",
      "mime_type": "image/png",
      "name": "file1.png",
      "size": 105224
    }
  ],
  "array_geomars": [
    "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}",
    "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}"
  ],
  "array_geoearth": [
    "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}",
    "{\"coordinates\": [10.123, 8.543], \"type\": \"Point\"}"
  ],
  "updated_at": 1568023357,
  "created_by": 62689516,
  "created_at": 1568023260,
  "_write_perm": [
    "user:anonymous"
  ],
  "_read_perm": [
    "user:anonymous"
  ]
}
```

- 支付回调：订单记录。

| 字段                     |  字段名                        |  类型                          | 枚举值                     |
| :----------------------- | :---------------------------- | :---------------------------- | :------------------------ |
| id                       | 订单记录 ID                    |   integer           | 不可枚举 |
| miniapp                  | 小程序 ID |integer | 不可枚举 |
| gateway_type             | 支付类型 | string | 枚举值见表格下方 |
| currency_type            | 货币类型 | string | 人民币：CNY |
| trade_no                 | 订单号 | string |  不可枚举 |
| transaction_no           | 流水号 | string | 不可枚举 |
| status                   | 支付状态 | string | 待支付：pending，支付失败：failed，支付成功：success |
| refund_status            | 退款状态 | string | 退款成功：complete， 部分退款：partial |
| merchandise_schema_id    | 表 ID | integer | 不可枚举 |
| merchandise_record_id    | 记录 ID | integer | 不可枚举 |
| merchandise_description  | 商品描述 | string | 不可枚举 |
| merchandise_snapshot     | 商品快照 | object | 不可枚举 |
| total_cost               | 金额 | number | 不可枚举 |
| ip_address               | 发起订单的 IP 地址 | string | 不可枚举 |
| paid_at                  | 支付时间（时间戳） | integer | 不可枚举 |
| created_by               | 创建者（支付用户）ID | integer | 不可枚举 |
| created_at               | 创建时间（时间戳） | integer | 不可枚举 |
| updated_at               | 最近一次更新时间（时间戳） | integer | 不可枚举 |

gateway_type 枚举值:

  - 微信支付回调:
  
    - 微信小程序：weixin_tenpay
    - 微信 H5：weixin_tenpay_wap
    - 微信 Native：weixin_tenpay_native
    - 微信 App：weixin_tenpay_app
    - 微信 JSAPI：weixin_tenpay_js
  
  - 支付宝支出回调：
  
    - 支付宝小程序：alipay
    - 支付宝手机网页：alipay_wap
    - 支付宝网页：alipay_page
    - 支付宝移动：alipay_app
  
  - QQ 支付回调：
  
    - QQ 小程序：qpay
    - QQ Native：qpay_native

示例：

```json
{
  "trade_no": "1i7HJ1t6UZdyQ2fLNHrgDQHQrlbgm2g8",
  "status": "success",
  "merchandise_record_id": null,
  "gateway_type": "weixin_tenpay",
  "refund_status": null,
  "currency_type": "CNY",
  "merchandise_snapshot": {},
  "created_at": 1568026439,
  "updated_at": 1568026488,
  "merchandise_schema_id": null,
  "transaction_no": "lVBtmjssROOwbLraez5WpeGKFmfcbK2w",
  "total_cost": 0.01,
  "created_by": 83909082304832,
  "merchandise_description": "一条支付描述",
  "miniapp": 7894,
  "ip_address": "14.17.86.113",
  "id": "1i7HJ1t6UZdyQ2fLNHrgDQHQrlbgm2g8",
  "paid_at": 1568026488
}
```

- 微信消息推送：微信推送的[消息](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025274)，已自动转换为 JSON 数据，此外会增加一个字段：`_AppId` 表示消息所属的公众号或小程序 appid。

示例：卡券未通过审核

```json
{
  "CardId": "Wzq1bxvtOD",
  "CreateTime": 1568019887,
  "Event": "card_not_pass_check",
  "FromUserName": "CL2qIPYwrr",
  "MsgType": "event",
  "RefuseReason": "4W9ltUWdtT",
  "ToUserName": "0VeUo2Kh4l",
  "_AppId": "wxO1x6SwAEC"
}
```

文件记录字段解释：

| 字段       | 字段名                 | 类型    | 枚举值 |
| :--------- | :------------------- | :------ | :------ | 
| id         | 文件 ID              | string  |  不可枚举 |
| name       | 文件名称              | string  |  不可枚举 |
| status     | 文件状态              | string  |  等待上传：pending，上传成功：success，正在处理：running |
| categories | 文件所属分类           | array   |  不可枚举  |
| size       | 文件大小（单位：Byte） | integer |  不可枚举 |
| media_type | 媒体类型              | string  |  图像：image，音乐：music，录音：voice，视频：video，其他：other |
| mime_type  | MIME 类型            | string   |  [标准 MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types) |
| reference  | 最近一次引用信息       | object  |  不可枚举，具体解释见表格下方 |
| cdn_path   | 文件在 CDN 中的路径     | string  | 不可枚举 |
| path       | 文件路径               | string  | 不可枚举  |
| created_at | 创建时间（时间戳）       | integer | 不可枚举  |
| updated_at | 最近一次更新时间（时间戳）| integer | 不可枚举  |
| created_by | 创建人 ID              |  integer | 不可枚举 |

reference:

| 字段      | 字段名     | 类型 | 枚举值 |
| :-------- | :-------- | :-------- | :------  | 
| schema_id | 表 ID     | integer | 不可枚举 |
| field     | 字段名     | string | 不可枚举 |
| record_id | 记录 ID    | string | 不可枚举 |


- 文件上传成功：文件记录。

示例：

```json
{
  "status": "success",
  "cdn_path": "1i7HWTgtd80LDaUj.PNG",
  "name": "WW.PNG",
  "reference": "",
  "created_at": 1568027273,
  "updated_at": 1568027274,
  "created_by": 62689516,
  "mime_type": "image/jpeg",
  "media_type": "image",
  "path": null,
  "id": "5d7632891db94f23bd68f2b7",
  "categories": [],
  "size": 34283
}
```

- 文件上传失败：文件记录。

示例：

```json
{
  "status": "pending",
  "cdn_path": "1i7HWTgtd80LDaUj.PNG",
  "name": "WW.PNG",
  "reference": "",
  "created_at": 1568027273,
  "updated_at": 1568027274,
  "created_by": 62689516,
  "mime_type": null,
  "media_type": null,
  "path": null,
  "id": "5d7632891db94f23bd68f2b7",
  "categories": [],
  "size": null
}
```

- 敏感图片校验（通过）：文件记录。

示例：

```json
{
  "status": "success",
  "cdn_path": "1i7HWTgtd80LDaUj.PNG",
  "name": "WW.PNG",
  "reference": "",
  "created_at": 1568027273,
  "updated_at": 1568027274,
  "created_by": 62689516,
  "mime_type": "image/jpeg",
  "media_type": "image",
  "path": null,
  "id": "5d7632891db94f23bd68f2b7",
  "categories": [],
  "size": 34283
}
```

- 敏感图片校验（失败）：文件记录。

示例：

```json
{
  "status": "success",
  "cdn_path": "1i7HWTgtd80LDaUj.PNG",
  "name": "WW.PNG",
  "reference": "",
  "created_at": 1568027273,
  "updated_at": 1568027274,
  "created_by": 62689516,
  "mime_type": "image/jpeg",
  "media_type": "image",
  "path": null,
  "id": "5d7632891db94f23bd68f2b7",
  "categories": [],
  "size": 34283
}
```

- 文件删除成功：文件记录。

示例：

```json
{
  "status": "running",
  "cdn_path": "1i7HWTgtd80LDaUj.PNG",
  "name": "WW.PNG",
  "reference": "",
  "created_at": 1568027273,
  "updated_at": 1568027497,
  "created_by": 62689516,
  "mime_type": "image/jpeg",
  "media_type": "image",
  "path": null,
  "id": "5d7632891db94f23bd68f2b7",
  "categories": [],
  "size": 34283
}
```

### 发送短信

>**info**
>注：发送短信消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

执行结果： 向指定用户发送对应的短信

使用前要先在 控制台 - 短信 开通短信服务，并先创建一个短信签名，等待审核通过后再创建一个短信模版并通过审核

短信发送的对象可以是：指定手机号码的用户、指定分组用户及自定义筛选条件的指定用户

## 定时任务
创建一个触发类型为定时任务的触发器后，该触发器将被周期性的触发。

目前默认提供的触发周期如下：

| 周期  | cron 表达式| 说明    |
| ----  | --------- | ------ |
| 每年  | `0 0 1 1 *` | 每年的 1 月 1 号 00:00  |
| 每月  | `0 0 1 * *` | 每个月的 1 号 00:00 |
| 每周  | `0 0 * * 0` | 每周日的 00:00 |
| 每天  | `0 0 * * *` | 每天的 00:00  |
| 每小时| `0 * * * *` | 每天整点时间，如 18：00、19：00 ... |

[Cron 表达式简介](http://support.minapp.com/hc/kb/article/1109371/)

> **info**
> 注：触发周期最小时间粒度为 1 分钟

## 模板变量的使用
部分动作中支持插入变量，您可以点击动作底部的"**可选变量**"查看该动作中支持添加的所有变量。

如需插入变量，请按照`{{变量名}}`的形式插入到邮件文本中

    例：您购买的产品{{product}}已经发货，请注意查收。

如需插入微信用户信息，请输入`{{created_by.***}}`。

    例：尊敬的{{created_by.nickname}}，您购买的产品{{product}}已经发货，请注意查收。

对于 date 类型的变量，可以自定义输出的格式，格式为 `{{created_at | date:"format"}}`，其中 format 为输出的格式，例如需要 2017-09-20 16:05:14 这样的输出格式，变量的格式为 `{{created_at | date:"Y-m-d  H:i:s"}}`，具体 format 的意义可参考「[date 格式参数说明][2]」

对于 object 类型，可以输入 `{{<OBJECT_FIELD>.<PROP_NAME>[.<PROP_NAME>]}}` 格式，例如 `{{obj.name}}` 或 `{{obj.foo.bar}}`

## 实战教程
[触发器实战教程请移步这里](../support/practice/trigger.md)

  [1]: https://mp.weixin.qq.com/
  [2]: http://support.minapp.com/hc/kb/article/1085622/?from=draft
