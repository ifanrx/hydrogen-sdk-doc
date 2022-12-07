# 渲染内容

{% tabs first="wxParser 插件版", second="wxParser 文件版" %}

{% content "first" %}

[插件版使用指南](https://github.com/ifanrx/wxParser-plugin)

{% content "second" %}

> **info**
> wxParser 文件版已停止维护，推荐使用插件版。

## 使用步骤

1. 下载 [小程序内容渲染包 wxParser](https://github.com/ifanrx/wxParser/tree/master/wxParser)
2. 把 `wxParser` 目录放到小程序项目的根目录下
3. 在需要富文本解析的的 `WXML` 内引入 `wxParser/index.wxml`
4. 在页面 `JS` 文件内使用 `wxParser.parse(options)` 方法解析 `HTML` 内容
5. 在需要展示富文本内容的页面的 `wxss` 文件内引入 `wxParser` 的默认样式库 `wxParser/index.wxss`，或者在小程序项目根目录的 `app.wxss` 中引入


## wxParser 参数说明

**`wxParser.parse(options)` 方法的 `options` 参数说明**

| 参数                |   类型   | 必填 | 说明 |
| :----------------- | :------- | :-- | :-- |
| bind               | String   | 是  | 要绑定的数据名称 |
| html               | String   | 是  | HTML 内容 |
| target             | Object   | 是  | 绑定数据的模块对象 |
| enablePreviewImage | Boolean  | 否  | 是否启用富文本内的图片预览功能，默认是 |
| tapLink            | Function | 否  | 点击超链接时的回调函数 |


## 示例

**WXML**

```html
<import src="../../wxParser/index.wxml"/>
<view class="wxParser">
  <template is="wxParser" data="{{wxParserData:richText.nodes}}"/>
</view>
```

**JS**

```js
const wxParser = require('../../wxParser/index')

Page({
  data: {},
  onLoad: function () {
    let that = this
    let html = `<div style="color: #f00;">hello, wxParser!</div>`

    wxParser.parse({
      bind: 'richText',
      html: html,
      target: that,
      enablePreviewImage: false, // 禁用图片预览功能
      tapLink: (url) => { // 点击超链接时的回调函数
        // url 就是 HTML 富文本中 a 标签的 href 属性值
        // 这里可以自定义点击事件逻辑，比如页面跳转
        wx.navigateTo({
          url
        })
      }
    })
  }
})
```

**WXSS**

```text
@import '../wxParser/index.wxss'
```


同时，你可以下载我们在 github 上上传的一个简单的 [demo](https://github.com/ifanrx/hydrogen-demo/tree/master/wxparser-demo) 来作参考


<span class="attention">注:</span>

- `JS` 中的 `richText` 可以自定义，但是必须要与 `WXML` 中的 `richText` 对应
- 推荐把 template 放到 `<view class="wxParser"></view>` 内部，这样可以受 `wxParser` 控制并具有 `wxParser` 的一些默认样式
- 不建议直接修改 `wxParser` 的默认样式（因为内容库样式会有定期更新），应该新增一个样式补丁文件用来自定义样式


{% endtabs %}
