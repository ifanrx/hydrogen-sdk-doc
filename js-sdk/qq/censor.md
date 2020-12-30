# 检测违规图片、文本

当小程序中有允许用户上传图片或输入文本的场景时，SDK 封装了 QQ 小程序“内容安全”检测图片、文本的合法性的 API。

关于这两个接口的频次限制及效果说明，请参阅 QQ 官方文档：[内容安全-小程序](https://q.qq.com/wiki/develop/miniprogram/server/open_port/port_safe.html)。

{% block censorImageSign %}

## 检测违规图片

`qq.BaaS.censorImage(filePath)`

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| filePath | String | 文件路径 |

{% endblock censorImageSign %}


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

{% block censorImageCode %}

**示例代码**
```javascript
qq.chooseImage({
  success: function(res) {
    qq.BaaS.censorImage(res.tempFilePaths[0]).then(res => {
       console.log(res.data.risky)
    }, err => {
      // HError 对象
    })
  }
})
```

{% endblock censorImageCode %}

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)


{% block censorTextSign %}

## 检测违规文本

`qq.BaaS.censorText(text)`

{% endblock censorTextSign %}

**参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| text     | String | 要检测的文本 |

**返回参数说明**

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| risky         | Boolean | 是否为违规内容，true 为风险，false 为未检测到风险，null 为支付宝尚未推送检查结果  |

**返回示例**

```javascript
{
  risky: true
}
```
**示例代码**

{% block censorTextCode %}

```javascript
qq.BaaS.censorText("测试文本").then(res => {
  console.log(res.data.risky)
}, err => {
  // HError 对象
})
```

{% endblock censorTextCode %}

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)

