{% extends "/js-sdk/qq/censor.md" %}

# 检测违规图片、文本


{% block censorImageSign %}

## 检测违规图片

`BaaS.qq.censorImage(fileID)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| fileID | string | 文件列表中的文件ID |

{% endblock censorImageSign %}

{% block censorImageCode %}

**示例代码**
```javascript
exports.main = async function (event, callback) {
  callback(null, await BaaS.qq.censorImage('5b71568674f0e509bb5ecc30'))
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
  callback(null, await BaaS.qq.censorText('123'))
}
```

{% endblock censorTextCode %}

{% block censorAsync %}
{% endblock censorAsync %}
