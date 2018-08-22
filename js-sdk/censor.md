# 检测违规图片、文本

## 检测违规图片

`wx.BaaS.wxCensorImage(filePath)`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| filePath | string | 文件路径 |

### 返回值 
Promise

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


## 检测违规文本

`wx.BaaS.wxCensorText(text)`

### 参数说明

| 参数名   | 类型   | 说明     |
|----------|--------|----------|
| text | string | 要检测的文本 |

### 返回值 
Promise 

### 示例代码

```javascript
  wx.BaaS.wxCensorText("测试文本").then(res => {
       console.log(res.data.risky)     
    }, err => {
      // err
    })
```