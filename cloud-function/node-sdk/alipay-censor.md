{% extends "/js-sdk/alipay/censor.md" %}

# 检测违规文本

{% block censorTextSign %}

## 检测违规文本

`BaaS.alipay.censorText(text)`

{% endblock censorTextSign %}

{% block censorTextCode %}

```javascript
exports.main = async function (event, callback) {
  callback(null, await BaaS.alipay.censorText('123'))
}
```

{% endblock censorTextCode %}

{% block censorAsync %}
{% endblock censorAsync %}
