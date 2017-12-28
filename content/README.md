# 内容库

- [内容操作](./operate.md)
- [内容操作 (SDK 1.1.3 以下版本)](./operate-legacy.md)
- [渲染内容](./render.md)

用户可以在 BaaS 后台创建富文本内容, 然后通过 SDK 获取富文本内容，借助 wxParser 工具，将富文本转为成能被微信小程序正确解析的 WXML，具体步骤可参考 [渲染内容](./render.md) 部分。

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

借助 wxParser, 以上富文本 `HTML` 将会被转化为能被微信小程序解析的 WXML：

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