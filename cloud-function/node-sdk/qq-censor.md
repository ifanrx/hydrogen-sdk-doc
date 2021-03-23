{% extends "/js-sdk/qq/censor.md" %}

# 检测违规图片、文本


{% block censorImageSign %}

## 检测违规图片

`BaaS.qq.censorImage(fileID)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| fileID | string | 文件列表中的文件ID |

**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为微信尚未推送检查结果  |

{% endblock censorImageSign %}

{% block censorImageCode %}

**示例代码**
```javascript
exports.main = async function (event, callback) {
  return await BaaS.qq.censorImage('5b71568674f0e509bb5ecc30')
}
```
{% endblock censorImageCode %}


{% block censorTextSign %}

## 检测违规文本

`BaaS.qq.censorText(text)`

{% endblock censorTextSign %}

{% block censorTextCode %}

```javascript
exports.main = async function (event, callback) {
  return await BaaS.qq.censorText('123')
}
```

{% endblock censorTextCode %}

{% block censorAsync %}
{% endblock censorAsync %}
