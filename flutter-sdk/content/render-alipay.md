# 渲染内容

支付宝小程序可通过其自带的 `rich-text` 富文本标签组件渲染富文本，详情可查阅[支付宝小程序开发文档](https://docs.alipay.com/mini/component/rich-text)

**示例代码**

```html
<!-- API-DEMO page/component/rich-text.axml -->
<view>
  <rich-text nodes="{{nodes}}" onTap="tap"></rich-text>
</view>
```

```javascript
// API-DEMO page/component/rich-text.js
Page({
  data: {
    nodes: [{
      name: 'div',
      attrs: {
        class: 'wrapper',
        style: 'color: orange;',
      },
      children: [{
        type: 'text',
        text: 'Hello&nbsp;World!',
      }],
    }],
  },
  tap() {
    console.log('tap');
  },
});
```

```css
/* API-DEMO page/component/rich-text.acss */
.wrapper {
  padding: 20rpx;
}
```