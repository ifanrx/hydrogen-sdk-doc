<!-- ex_nonav -->

# 内容库

内容库是知晓云提供的一个方便进行内容管理的功能，你可以在上面创建多个内容库，可以在内容库中创建分类，并提供一个功能丰富的富文本编辑器用于创建内容。借助内容表的功能，你还可以设置自定义的字段，实现更多复杂内容的展示。

SDK 中内置了多个接口，方便你对在控制台中创建的内容库及其中的分类和内容进行获取和查找，如下是查找指定内容库下在指定分类下的内容列表的代码示例：

{% ifanrxCodeTabs %}
```js
let contentGroupID = 1513076211190694
let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
let query = new wx.BaaS.Query()

query.arrayContains('categories', [1513076252710475])
MyContentGroup.setQuery(query).find().then(res => {
  console.log(res.data)
})
```
{% endifanrxCodeTabs %}

同时，为了方便你将创建的内容显示到小程序上，我们提供了 wxParser 工具。其作用是将富文本转为成能被微信小程序正确解析的 WXML，效果如下：

富文本 `HTML`：

```html
<b>Hello, world!</b>
<div>
  <i>客村地铁站</i>
</div>
<div>
  <u>TIT 创意园</u>
</div>
```

转换后生成的 `WXML`

```html
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

阅读以下章节，了解更多内容库操作接口：

* [内容操作](./operate.md)
* [渲染内容](./render.md)