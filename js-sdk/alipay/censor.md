# 检测违规文本

当小程序中有允许用户输入文本的场景时，SDK 封装了支付宝小程序“文本风险识别”检测文本的合法性的 API。

关于这个接口的频次限制及效果说明，请参阅支付宝官方文档：[文本风险识别](https://opendocs.alipay.com/mini/introduce/text-identification)。

{% block censorTextSign %}

## 检测违规文本

`my.BaaS.censorText(text)`

{% endblock censorTextSign %}

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| text     | String | 要检测的文本 |

**返回示例**

```javascript
{
  risky: true
}
```

**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为支付宝尚未推送检查结果  |

**示例代码**

{% block censorTextCode %}

```javascript
my.BaaS.censorText("测试文本").then(res => {
  console.log(res.data.risky)
}, err => {
  // HError 对象
})
```

{% endblock censorTextCode %}

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)

