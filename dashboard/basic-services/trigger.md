# 触发器

[触发器（Trigger）](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]engine/trigger/table/)是知晓云平台的事件驱动引擎，配置好事件源和触发动作，引擎就会在事件发生时自动触发动作。例如，触发器 A 的事件源是数据表新增了数据，触发动作是发送短信给管理员，那么当新增数据时，引擎就会触发短信的发送。    
使用触发器，可以将复杂的业务流程串联起来，形成自动化的处理机制，大大简化开发。

## 触发器配置

![触发器配置](/images/dashboard/trigger-config.png)

触发类型：即触发源，每个触发器都只能选定一种触发类型，不同的触发类型可执行的动作选项也不一样。知晓云目前支持的触发类型有：[数据表](#数据表)、[微信支付回调](#微信支付回调)、[定时任务](#定时任务)、[文件操作](#文件操作)、[IncomingWebhook](#incomingwebhook)、[微信消息推送](#微信消息推送)、[支付宝支付回调](#支付宝支付回调)。

执行状态：用于控制触发器的开关，默认为开启。

## 条件

![触发器条件](/images/dashboard/trigger-condition.png)

当选定触发类型后，开发者需要指定触发条件来触发后续动作的执行，触发条件与触发类型一一相关，详见[触发类型 & 条件示例](#触发类型--条件示例)。

## 动作

![触发器动作](/images/dashboard/trigger-action.png)

动作是在满足触发条件后会被执行的具体事件，开发者可以同时为一个触发器配置多个动作。

不同的触发类型对应可选的动作类型不同，具体如下表所示：

| 动作类型↓ \ 触发类型→ | 数据表  | 微信支付回调 | 定时任务 | 文件操作 | IncomingWebhook | 微信消息推送 | 支付宝支付回调 |
| ------------------ | :----- | :--------- | :------ | :----- | :----------------| :-------- | :----------- |
| 发送邮件                | Y️      | Y          | Y       | Y      | Y               | Y          | Y            |
| 发送微信模板消息         | Y️      | Y️           | Y       | Y     | Y                | Y           | Y          |
| 发送 webhook            | Y️      | Y️           | N       | Y     | Y                | Y           | Y          |
| 操作数据表             | Y️      | Y️           | N       | Y     | Y                | Y            | Y         |
| 执行云函数              | Y️      | Y           | Y       | Y     | Y                | Y            | Y          |
| 发送支付宝模板消息           | Y️      | Y           | Y       | Y     | Y                | Y            | Y          |
| 发送 QQ 模板消息           | Y️      | Y           | Y       | Y     | Y                | Y            | Y          |
| 发送短信             | Y️      | Y           | Y       | Y     | Y                | Y            | Y          |

## 触发频率

![触发频率](/images/dashboard/basic-services/trigger-frequency.png)

用于决定触发器被多次触发的情况下是否每一次都执行动作。你可以在每一条动作设置中进行。配置应用场景如：余额不足的预警短信每天执行一次/支付成功通知每次都会执行。

| 触发频率     | 说明                                  |
| :---------- | :-----------------------------       |
| 可重复触发    | 每一次满足触发条件时都会执行该动作         |
| 间歇性触发    | 该动作执行一次后某段时间内不会再被触发执行   |
| 仅触发一次    | 该动作执行一次后不会再被触发执行           |

## 模板变量

模板变量是开发者可以在触发器某些动作中自定义的参数，如收货通知中的「产品名称」或「地址信息」。

`可选变量：你可以将鼠标移至动作类型右侧的「查看范例」来查看当前动作可以使用的变量。`

![模板变量](/images/dashboard/basic-services/trigger-template-variable.png)

模板变量的使用规则如下：

如需插入变量，请按照`{{变量名}}`的形式插入到邮件文本中。   
例：`您购买的产品{{product}}已经发货，请注意查收。`


如需插入微信用户信息，请输入`{{created_by.***}}`。   
例：`尊敬的{{created_by.nickname}}，您购买的产品{{product}}已经发货，请注意查收。`

对于 date 类型的变量，可以自定义输出的格式，格式为 `{{created_at | date:"format"}}`，其中 format 为输出的格式，例如需要 2017-09-20 16:05:14 这样的输出格式，变量的格式为 `{{created_at | date:"Y-m-d H:i:s"}}`，具体 format 的意义可参考「[date 格式参数说明](http://support.minapp.com/hc/kb/article/1085622/?from=draft)」

对于 object 类型，可以输入 `{{<OBJECT_FIELD>.<PROP_NAME>[.<PROP_NAME>]}}` 格式，例如 `{{obj.name}}` 或 `{{obj.foo.bar}}`


## 基础操作

### 创建触发器

![创建触发器](/images/dashboard/basic-services/create-trigger.png)

点击左边栏「添加」按钮即可开始添加一个新的触发器。依据操作流程依次填写触发器配置、条件、动作即可。

### 开启/关闭触发器

![开启/关闭触发器](/images/dashboard/basic-services/trigger-control.png)

你可以在触发器配置中编辑触发器的执行状态来开启或关闭触发器。


### 编辑触发器

![编辑触发器](/images/dashboard/basic-services/trigger-edit.png)

**点击设置卡片右上角的「编辑」按钮即可开始编辑触发器，注意编辑完成后需要点击「保存」触发器才会被更新。**

### 删除触发器

![删除触发器](/images/dashboard/basic-services/trigger-delete.png)

将光标移动到左侧栏对应触发器上，点击删除图标即可。

### 查看触发器日志

![查看触发器日志](/images/dashboard/basic-services/trigger-check-log.png)

点击触发器配置卡片右上角的「日志」按钮，即可查看触发器的执行日志。目前仅会保存 180 天内的日志记录。

### 校验模板变量

![校验模板变量](/images/dashboard/basic-services/trigger-template-check.png)

在可以插入模板动作卡片的地步有一个「模板校验」按钮，点击后可以检查开发者填写的变量信息是否被正确识别。

### 触发类型 & 条件示例

#### 数据表

![数据表](/images/dashboard/basic-services/trigger-schema.png)

指定的数据表发生变化后触发（增、删、改）：

| 事件类型 | 说明 |
| :-------|:--- |
| create  | 数据行被创建时触发 |
| update  | 数据行被更新时触发 |
| delete  | 数据行被删除时触发 |

开发者可以为数据表变化指定一个或多个条件：

| 满足条件 | 说明 |
| :----- |:---- |
| 任一    | OR  满足任一条件 |
| 所有    | AND 同时满足所有条件 |

不同的数据类型支持的操作符如下所示：

| 数据类型 | 操作符                            |
| :------ | :------------------------------- |
| array   | contains, isempty |
| boolean | =, !=, isempty |
| date    | =, !=, >, >=, <, <=, isempty, range |
| integer | =, !=, >, >=, <, <=, isempty, range |
| number  | =, !=, >, >=, <, <=, isempty, range |
| string  | regex, =, !=, isempty |
| object  | has_key, isempty      |
| pointer | =, !=                 |

#### 定时任务

![定时任务](/images/dashboard/basic-services/trigger-timing-task.png)

根据 cron 规则周期性的触发。使用规则请查看 [cron 表达式简介](http://support.minapp.com/hc/kb/article/1109371/)。

> **info**
> 注：触发周期最小时间粒度为 1 分钟

#### 文件操作

![文件操作](/images/dashboard/basic-services/trigger-file-upload.png)

指定操作（文件上传、文件删除、图片违规校验）成功或失败时触发。

#### IncomingWebhook

![IncomingWebhook](/images/dashboard/basic-services/trigger-incomingwebhook.png)

用户直接访问特定的 URL，也可以通过 Ajax 方式发起一个请求。

详细说明：支持的 HTTP 方法有 GET, POST, PUT, PATCH, DELETE；请求体只支持 JSON 数据，支持自定义 http header, 但是必须以 X_HYDROGEN_ 开头，全部会被转换为大写，此外如自定义 HTTP 头中包含 -会被转换为 _。

`速率限制： 每个小程序 5 QPS。`

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

#### 微信消息推送

![微信消息推送](/images/dashboard/basic-services/trigger-wechat-message.png)

当用户在小程序中向开发者发送客服消息的时候，开发者可判断消息关键词是否满足条件来决定是否执行动作。

设置条件触发器参数规则请参考[微信文档](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025274)。

#### 微信支付回调

![微信支付回调](/images/dashboard/basic-services/trigger-alipay-payment.png)

当用户使用微信支付支付成功时，可以触发指定动作。

#### 支付宝支付回调

![支付宝支付回调](/images/dashboard/basic-services/trigger-alipay-payment.png)

当用户使用支付宝支付支付成功时，可以触发指定动作。

#### QQ 支付回调

![QQ 支付回调](/images/dashboard/basic-services/trigger-qq-payment.png)

当用户使用 QQ 支付支付成功时，可以触发指定动作。

### 动作示例

#### 发送邮件

![发送邮件](/images/dashboard/basic-services/trigger-send-email.png)

收件人、邮件标题、邮件内容均可使用模板变量，其中可选变量可以将鼠标移至动作类型右侧的「查看范例」来查看。

#### 发送微信模板消息

![发送微信模板消息](/images/dashboard/basic-services/trigger-send-template.png)

发送微信模板消息前需要先完成小程序授权并[添加消息模板](/dashboard/miniapp/template-message.md#添加模板)，并完成 [formid 收集](/js-sdk/wechat/template-message.md)。

收件人支持类型如下：

| 收件人        | 说明                           |
| :----------  | :---------------------------   |
| 消息创建人    | 触发当前动作的用户，只能是单个用户   |
| 指定用户      | 指定某一批用户，开发者需要设置用户查询条件来筛选用户。当收件人为指定用户时，建议使用[智能过滤](/dashboard/miniapp/template-message.md#智能过滤)服务，实现精准发送 |
| 指定用户组    | 选定的用户分组，常用于管理员或 VIP 分组 |

发送策略：短时间内大量发送模板消息容易导致模板消息被封，建议单次发送条数小于 5000 条，每次发送间隔大于 5 分钟。

> **info**
> 注：发送微信模板消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

#### 发送 WebHook

![发送 WebHook](/images/dashboard/basic-services/trigger-webhook.png)

该动作会向指定 URL 发送一个 POST 请求。

执行动作时，服务器发送请求参数如下：

`请求 Headers`

| 请求头部                      | 说明 |
| ---------------------------- | --- |
| X-Hydrogen-Webhook-Action-Id | 本次触发器触发动作的 uuid，webhook 重试时此 id 保持不变 |
| X-Hydrogen-Trigger-Event     | on_create, on_update, on_delete |

`请求 Body`

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

#### 操作数据表

![操作数据表](/images/dashboard/basic-services/trigger-operate-schema.png)

批量修改指定的数据表的数据行。

数据表操作动作的一些参数说明如下：

| 操作 | 被触发时动作说明 |
| :-- | :------------ |
| 创建 | 创建一行数据 |
| 更新 | 修改符合条件的数据行，需要配置查询条件，筛选出指定的数据行。数据表查询条件相关文档请[参考这里](/dashboard/basic-services/schema.md#查询数据)。 |
| 删除 | 删除符合条件的数据行，需要配置查询条件，筛选出指定的数据行。数据表查询条件相关文档请[参考这里](/dashboard/basic-services/schema.md#查询数据)。 |

> **info**
> 注：若使用类型为 object 的模板变量来进行赋值，则被赋值的字段必须为 string 类型。例如：在动作中赋值给 _userprofile 表的 gender 字段是错误的，只能赋值给 nickname 等 string 类型的字段。

目前赋值操作支持的数据类型及其对应的操作符如下：

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
>注：append, append_unique, remove, inc_by 为原子操作符，相关文档请[参考这里](/js-sdk/schema/update-record.md)

#### 执行云函数

不同的触发类型下的云函数动作被触发时，云函数接收到的 event.data 参数内容也会有所不同。以下为参数的具体内容说明：

**定时任务**
vent.data 参数为空。

**IncomingWebhook**
event.data 参数请求信息，参考 [IncomingWebhook](#incomingwebhook) 小节。

**数据表**
event.data 参数为数据表记录，File 类型的数据可以直接赋值给数据表 File 类型的字段。数据类型信息请查看[数据表中支持的数据类型](/js-sdk/schema/data-type.md#数据表中支持的数据类型)。

{% ifanrxfold summary="示例:" %}
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
{% endifanrxfold %}

**支付回调**
event.data 参数为订单记录。

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

{% ifanrxfold summary="示例：" %}
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
{% endifanrxfold %}

**微信消息推送**

微信推送的[消息](https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1451025274)，已自动转换为 JSON 数据，此外会增加一个字段：_AppId 表示消息所属的公众号或小程序 appid。

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

**文件上传**
event.data 参数为文件记录。

示例：上传成功
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

示例：上传失败
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

**敏感图片校验**
event.data 参数为文件记录。

示例：校验通过
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

示例：校验失败
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

示例：删除成功
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

**发送支付宝模板消息**

![发送支付宝模板消息](/images/dashboard/basic-services/trigger-send-alipay-message.png)

发送支付宝模板消息前需要先完成小程序授权并[添加消息模板](/dashboard/miniapp/template-message.md#添加模板)，并完成 [formid 收集](/js-sdk/alipay/template-message.md)。

> **info**
> 注：下发消息需绑定生活号（重要）：开发者需要绑定上线可运营的生活号，由生活号来承接服务提醒的消息；   
> 交易类：当用户在小程序内完成支付行为，可允许开发者向付款用户在7天内推送有限条数的模板消息（同个订单号只能发送3条消息，不限制模板数），当开发者调用交易类的模板消息时，必须要传入 tradeNo   
> 表单类：当用户在小程序内发生过提交表单行为且该表单为要发模板消息的，可允许开发者向用户在7天内推送有限条数的模板消息（1次提交表单可下发3条，不限制模板数），当开发者调用表单类的模板消息时，必须要传入 formId

收件人支持类型如下：

| 收件人        | 说明                           |
| :----------  | :---------------------------   |
| 消息创建人    | 触发当前动作的用户，只能是单个用户   |
| 指定用户      | 指定某一批用户，开发者需要设置用户查询条件来筛选用户。当收件人为指定用户时，建议使用[智能过滤](/dashboard/miniapp/template-message.md#智能过滤)服务，实现精准发送 |
| 指定用户组    | 选定的用户分组，常用于管理员或 VIP 分组 |

发送策略：短时间内大量发送模板消息容易导致模板消息被封，建议单次发送条数小于 5000 条，每次发送间隔大于 5 分钟。

> **info**
> 注：发送支付宝模板消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

**发送 QQ 模板消息**

发送 QQ 模板消息前需要先完成小程序授权并[添加消息模板](/dashboard/miniapp/template-message.md#添加模板)，并完成 [formid 收集](/js-sdk/qq/template-message.md)。

> **info**
> 注：表单类：当用户在小程序内发生过提交表单行为且该表单声明为要发模板消息的，开发者需要向用户提供服务时，可允许开发者向用户在 7 天内推送有限条数的模板消息（ 1 次提交表单可下发 1 条，多次提交下发条数独立，相互不影响）

收件人支持类型如下：

| 收件人        | 说明                           |
| :----------  | :---------------------------   |
| 消息创建人    | 触发当前动作的用户，只能是单个用户   |
| 指定用户      | 指定某一批用户，开发者需要设置用户查询条件来筛选用户。当收件人为指定用户时，建议使用[智能过滤](/dashboard/miniapp/template-message.md#智能过滤)服务，实现精准发送 |
| 指定用户组    | 选定的用户分组，常用于管理员或 VIP 分组 |

发送策略：短时间内大量发送模板消息容易导致模板消息被封，建议单次发送条数小于 5000 条，每次发送间隔大于 5 分钟。

> **info**
> 注：发送 QQ 模板消息时，pointer 数据不进行数据展开，即模板变量中 pointer 只能获取到对应数据 ID。

**发送短信**

![发送短信](/images/dashboard/basic-services/trigger-send-sms.png)

> **info**
> 注：在发送短信前，开发者需要先开通短信服务并通过短信签名和模板的审核，具体请查看[短信](/dashboard/operation/sms.md)章节。   
> 系统会自动过滤没有手机的用户。   
> 短信服务单价为 ¥0.05/条。  

收件人支持类型如下：

| 收件人        | 说明                           |
| :----------  | :---------------------------   |
| 消息创建人    | 触发当前动作的用户，只能是单个用户   |
| 指定用户      | 指定某一批用户 |
| 指定用户组    | 选定的用户分组，常用于管理员或 VIP 分组 |

### 实战教程

[触发器实战教程请移步这里](/support/practice/trigger.md)