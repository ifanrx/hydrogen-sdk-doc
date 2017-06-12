# 内容渲染

用户可以在 BaaS 后台创建富文本内容, 然后通过 SDK 获取能被微信小程序正确解析的富文本内容。

### HTML -> WXML 转化说明

富文本 `HTML`：

```
<b>Hello, world!</b>
<div>
  <i>客村地铁站</i>
</div>
<div>
  <u>TIT 创意园</u>
</div>
```

以上富文本 `HTML` 将会被转化为能被微信小程序解析的内容：

```
<view class="wxParser">
  <view class=" wxParser-b wxParser-inline">
    <view class="wxParserText wxParser-inline">Hello, world!</view>
  </view>
  <view class=" wxParser-div">
    <view class=" wxParser-i wxParser-inline">
      <view class="wxParserText wxParser-inline">客村地铁站</view>
    </view>
  </view>
  <view class=" wxParser-div">
    <view class=" wxParser-u wxParser-inline">
      <view class="wxParserText wxParser-inline">TIT 创意园</view>
    </view>
  </view>
</view>
```

> 通过上面的示例可以发现，为了能用 WXML 和 WXSS 解析富文本内容，HTML 标签默认的样式会用相应的 `CSS` 类样式表示。

### 引入小程序内容渲染组件

为了能让微信小程序正确的解析 BaaS 后台创建的富文本内容，首先需要引入 [小程序内容渲染组件](https://github.com/ifanrx/wxParser)。

推荐在小程序根目录下新建 `wxParser` 目录，把下载好的小程序内容渲染组件放到该目录下。

**在小程序项目根目录的 `app.wxss` 内引入内容渲染模块样式库**

```
@import '../wxParser/index.wxss'
```

### 注意事项

- 如果要修改默认内容库样式时，不要直接修改 `/wxParser/index.wxss`（因为内容库样式会有定期更新），应该新增一个内容库补丁文件用来自定义某些内容库样式。