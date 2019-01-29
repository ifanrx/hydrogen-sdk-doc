# 检测违规图片、文本

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

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| filePath | string | 文件路径 |

{% endblock censorImageSign %}

### 返回示例

```javascript
{
  risky: true
}
```

{% block censorImageCode %}

### 示例代码
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

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)

{% endblock censorImageCode %}

{% block censorTextSign %}

## 检测违规文本

`wx.BaaS.wxCensorText(text)`
{% endblock censorTextSign %}

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| text | string | 要检测的文本 |

### 返回示例

```javascript
{
  risky: true
}
```
### 示例代码

{% block censorTextCode %}

```javascript
  wx.BaaS.wxCensorText("测试文本").then(res => {
       console.log(res.data.risky)
    }, err => {
      // HError 对象
    })
```

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)

{% endblock censorTextCode %}
