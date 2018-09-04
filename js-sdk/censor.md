# 检测违规图片、文本

> **info**
> 使用此 API 前需要配置 AppSecret，请前往 设置 - 小程序 中配置 AppSecret

## 检测违规图片

`wx.BaaS.wxCensorImage(filePath)`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| filePath | string | 文件路径 |

### 返回示例 

```javascript
{
  risky: true
}
```

### 示例代码
```javascript
wx.chooseImage({
  success: function(res) {
    wx.BaaS.wxCensorImage(res.tempFilePaths[0]).then(res => {
       console.log(res.data.risky)     
    }, err => {
      // err
    })
  }})
```

**配置 upload 合法域名**

如果你是使用文件版 sdk，请在微信后台将您的 request 合法域名中知晓云域名（形如 xxx.xiaoapp.io）添加到 uploadFile 合法域名中
![配置 uploadFile 域名](https://s3.cn-north-1.amazonaws.com.cn/sso-media/baas/request-domain.png)

## 检测违规文本

`wx.BaaS.wxCensorText(text)`

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

```javascript
  wx.BaaS.wxCensorText("测试文本").then(res => {
       console.log(res.data.risky)     
    }, err => {
      // err
    })
```