{% block pageTitile %}
# 检测违规图片、文本
{% endblock pageTitile %}

{% block tips1 %}

> **info**
> 使用此 API 前需要配置 AppSecret，请前往 设置 - 小程序 中配置 AppSecret。

{% endblock tips1 %}


{% block censorImageSign %}

## 检测违规图片

`BaaS.wxCensorImage(fileID)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| fileID | string | 文件列表中的文件ID |

{% endblock censorImageSign %}

{% block censorImageCode %}

**示例代码**
```javascript
exports.main = async function (event) {
  return await BaaS.wxCensorImage('5b71568674f0e509bb5ecc30')
}
```
{% endblock censorImageCode %}

{% block censorTextSignNode %}

## 检测违规文本

`BaaS.wxCensorText(params)`

{% endblock censorTextSignNode %}

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| user_id     | Integer | 必填，有微信 openid 的用户 ID |
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

{% block censorTextCodeNode %}

**示例代码**

```javascript
exports.main = async function (event) {
  return await BaaS.wxCensorText({
    content: '测试文本',
    scene: 'data',
    user_id: 123
  })
}
```

{% endblock censorTextCodeNode %}

{% block censorTextSign %}

## <span style="color: #f04134;">`已废弃`</span> 检测违规文本（SDK < 3.21.0）

`BaaS.wxCensorText(text)`

{% endblock censorTextSign %}

{% block censorTextCode %}

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

```javascript
exports.main = async function (event) {
  return await BaaS.wxCensorText('123')
}
```

{% endblock censorTextCode %}

{% block censorAsync %}
{% endblock censorAsync %}
