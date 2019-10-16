{% extends "/js-sdk/wechat/censor.md" %}

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
exports.main = async function (event, callback) {
  callback(null, await BaaS.wxCensorImage('5b71568674f0e509bb5ecc30'))
}
```
{% endblock censorImageCode %}


{% block censorTextSign %}

## 检测违规文本

`BaaS.wxCensorText(text)`

{% endblock censorTextSign %}

{% block censorTextCode %}

```javascript
exports.main = async function (event, callback) {
  callback(null, await BaaS.wxCensorText('123'))
}
```

{% endblock censorTextCode %}

{% block censorAsync %}
{% endblock censorAsync %}
