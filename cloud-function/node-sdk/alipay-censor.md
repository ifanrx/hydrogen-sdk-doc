{% extends "/js-sdk/alipay/censor.md" %}

{% block censorTextSign %}

`BaaS.alipay.censorText(text)`

{% endblock censorTextSign %}

{% block censorTextCode %}

```javascript
exports.main = async function (event) {
  return await BaaS.alipay.censorText('123')
}
```

{% endblock censorTextCode %}

