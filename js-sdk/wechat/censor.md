{% block pageTitile %}
# 检测违规图片、音频、文本
{% endblock pageTitile %}

当小程序中有允许用户上传图片或输入文本的场景时，SDK 封装了微信小程序“内容安全”检测图片、文本的合法性的 API。

关于这两个接口的频次限制及效果说明，请参阅微信官方文档：[内容安全-小程序](https://developers.weixin.qq.com/miniprogram/dev/api/imgSecCheck.html)。

{% block tips1 %}

> **info**
> 以下操作仅适用于 SDK version >= 1.7.0

> 使用此 API 前需要配置 AppSecret，请前往 设置 - 小程序 中配置 AppSecret。

> 如果您使用的是文件版 sdk，请在微信后台将您的 request 合法域名中知晓云域名（形如 xxx.myminapp.com）添加到 uploadFile 合法域名中，如下图所示：
> ![配置 uploadFile 域名](https://s3.cn-north-1.amazonaws.com.cn/sso-media/baas/request-domain.png)

{% endblock tips1 %}

{% block censorImageSign %}

## 检测违规图片

`wx.BaaS.wxCensorImage(filePath)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| filePath | String | 文件路径 |

**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为微信尚未推送检查结果  |

{% endblock censorImageSign %}

**返回示例**

```javascript
{
  risky: true
}
```

{% block censorImageCode %}

**示例代码**
```javascript
wx.chooseImage({
  success: function(res) {
    wx.BaaS.wxCensorImage(res.tempFilePaths[0]).then(res => {
       console.log(res.data.risky)
    }, err => {
      // HError 对象
    })
  }})
```

HError 对象结构请参考[错误码和 HError 对象](../error-code.md)

{% endblock censorImageCode %}

{% block censorTextSign %}

## 检测违规文本

{% if apiPrefix %}
> **info**
> 以下操作仅适用于 SDK version >= 3.24.0
{% endif %}

`wx.BaaS.wxCensorText(params)`
{% endblock censorTextSign %}

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| content     | String | 必填，需要检测的内容 |
| scene     | String | 必填，场景枚举值。必须为以下四个值之一：data: 资料；comment: 评论；forum: 论坛；social_log: 社交日志 |
| nickname     | String | 选填，用户昵称 |
| signature     | String | 选填，个性签名 |
| title     | String | 选填，文本标题 |


**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| result         | Object | 检测结果 |
| detail         | Array | 检测详情 |

**返回示例**

```javascript
{
  "errcode": 0,
  "errmsg": "ok",
  "result": {
      "suggest": "risky",
      "label": 20001
  },
  "detail": [
      {
          "strategy": "content_model",
          "errcode": 0,
          "suggest": "risky",
          "label": 20006,
          "prob": 90
      },
      {
          "strategy": "keyword",
          "errcode": 0,
          "suggest": "pass",
          "label": 20006,
          "level": 20,
          "keyword": "命中的关键词1"
      },
      {
          "strategy": "keyword",
          "errcode": 0,
          "suggest": "risky",
          "label": 20006,
          "level": 90,
          "keyword": "命中的关键词2"
      }
  ],
  "trace_id": "60ae120f-371d5872-7941a05b"
}
```
**示例代码**

{% block censorTextCode %}

```javascript
  wx.BaaS.wxCensorText("测试文本").then(res => {
       console.log(res.data.risky)
    }, err => {
      // HError 对象
    })
```

HError 对象结构请参考[错误码和 HError 对象](../error-code.md)

{% endblock censorTextCode %}



{% macro returns() %}
**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| id            | String | 检测记录 id  |
| error_code    | Integer | 错误码 |
| error_message | String | 错误信息  |
| status_code   | Number | 默认为：0，4294966288(-1008)为链接无法下载  |
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为微信尚未推送检查结果  |
{% endmacro %}

## 异步检测图片、音频

异步校验图片/音频是否含有违法违规内容。

{% block censorAsync %}

### 检测请求

`wx.BaaS.censorAsync(fileID, scene)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| fileID   | String | 文件 ID  |
| scene   | String | （SDK version >= 3.24.0）场景枚举值。必填，必须为以下四个值之一：data: 资料；comment: 评论；forum: 论坛；social_log: 社交日志 |

{{returns()}}

**返回示例**

```json
{
  "error_message": "ok",
  "error_code": 0,
  "risky": null,
  "status_code": null,
  "id": 1,
  "result": null, //（SDK version >= 3.24.0）检测结果，null 为微信尚未推送检查结果
  "detail": null //（SDK version >= 3.24.0）检测详情，null 为微信尚未推送检查结果
}
```

**状态码**

| 状态码   | 说明     |
|----------|----------|
| 201      | 成功     |
| 400      | 失败（参数错误）|
| 402      | 当前应用已欠费  |
| 404      | 文件不存在      |
| 500      | 服务错误        |

HError 对象结构请参考[错误码和 HError 对象](../error-code.md)

**示例代码**

```javascript
wx.BaaS.censorAsync("...").then(res => {
  console.log(res.data.risky)
}, err => {
  // HError 对象
})
```

### 获取异步检测结果

`wx.BaaS.getCensorResult(id)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| id       | String | 检测记录 id |

{{returns()}}

**返回示例**

```json
{
  "error_message": "ok",
  "error_code": 0,
  "risky": null,
  "status_code": null,
  "id": 1,
  "result": { // （SDK version >= 3.24.0）检测结果
    "suggest": "risky",
    "label": 20001
  },
  "detail": [ // （SDK version >= 3.24.0）检测详情
    {
        "strategy": "content_model",
        "errcode": 0,
        "suggest": "risky",
        "label": 20006,
        "prob": 90
    },
    {
        "strategy": "keyword",
        "errcode": 0,
        "suggest": "pass",
        "label": 20006,
        "level": 20,
        "keyword": "命中的关键词1"
    },
    {
        "strategy": "keyword",
        "errcode": 0,
        "suggest": "risky",
        "label": 20006,
        "level": 90,
        "keyword": "命中的关键词2"
    }
  ]
}
```

**状态码**

| 状态码   | 说明     |
|----------|----------|
| 200      | 成功     |
| 404      | 检测记录不存在 |

HError 对象结构请参考[错误码和 HError 对象](../error-code.md)

**示例代码**

```javascript
wx.BaaS.getCensorResult("...").then(res => {
  console.log(res.data.risky)
}, err => {
  // HError 对象
})
```

{% endblock censorAsync %}

{% block censorTextSignOld %}

## <span style="color: #f04134;">`已废弃`</span> 检测违规文本（SDK < 3.24.0）

`wx.BaaS.wxCensorText(text)`
{% endblock censorTextSignOld %}

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| text     | String | 要检测的文本 |


**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为微信尚未推送检查结果  |

**返回示例**

```javascript
{
  risky: true
}
```
**示例代码**

{% block censorTextCodeOld %}

```javascript
  wx.BaaS.wxCensorText({
    content: "测试文本",
    scene: "data"
  }).then(res => {
       console.log(res.data.risky)
    }, err => {
      // HError 对象
    })
```

HError 对象结构请参考[错误码和 HError 对象](../error-code.md)

{% endblock censorTextCodeOld %}



{% macro returns() %}
**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| id            | String | 检测记录 id  |
| error_code    | Integer | 错误码 |
| error_message | String | 错误信息  |
| status_code   | Number | 默认为：0，4294966288(-1008)为链接无法下载  |
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为微信尚未推送检查结果  |
{% endmacro %}