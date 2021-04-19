# 微信小程序私密消息

小程序私密消息功能是这样一种能力：当分享者分享小程序卡片给其他用户或者微信群后，其他用户点击此小程序卡片时，开发者可以鉴别出点击卡片的用户是否被分享者分享过小程序卡片。具体使用说明和步骤可以参考[微信小程序私密消息文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share/private-message.html)。

> **info**
> SDK version >= 3.20.0

## 创建私密消息的 activity_id

`wx.BaaS.wxCreateActivityID()`

**返回字段说明**

| 属性            | 类型   | 说明                                         |
| --------------- | ------ | -------------------------------------------- |
| activity_id     | String | 消息的 ID                                    |
| expiration_time | Number | activity_id 的过期时间戳。默认 24 小时后过期 |
| errcode         | Number | 错误码                                       |

**返回示例**

```JSON
{
  "activity_id": "",
  "expiration_time": "",
  "errcode": ""
}
```

**示例代码**

创建私密消息的 activity_id ，并通过 [wx.updateShareMenu](https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.updateShareMenu.html) 接口声明本次分享的消息为私密消息。

```js
wx.BaaS.wxCreateActivityID().then((res) => {
  if (res.data.activity_id) {
    // 声明本次分享的消息为私密消息
    wx.updateShareMenu({
      withShareTicket: true,
      isPrivateMessage: true,
      activityId: res.data.activity_id,
    });
  }
});
```

分享后，用户点开消息卡片进入小程序，在 onShow 中取到 shareTicket ，通过 [wx.authPrivateMessage](https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.authPrivateMessage.html) 接口可以验证当前用户是否是私密消息的接收者。

```js
// app.js
App({
  onShow(options) {
    this.shareTicket = options.shareTicket;
  },
});

const app = getApp();
// 验证当前用户是否是私密消息的接收者
wx.authPrivateMessage({
  shareTicket: app.shareTicket,
  success(res) {
    const { valid } = res;
    console.log("验证是否通过 ==>", valid);
  },
});
```
