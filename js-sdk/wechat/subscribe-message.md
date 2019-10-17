# 订阅消息

消息能力是小程序能力中的重要组成，我们为开发者提供了订阅消息能力，以便实现服务的闭环和更优的体验。
请移步[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)了解微信订阅消息

## 上报订阅状态

通过上报订阅状态，可以在发送时过滤掉无效用户，使发送更精准。

> **info**
> 目前只支持一次性订阅

> 只需要上报订阅结果为 `accept` 的模版 ID

`wx.BaaS.subscribeMessage(options)`

**参数说明**

options:

| 参数          | 类型   | 必填 | 说明 |
| :------------ | :----- | :--- | :-- |
| subscription | Subscription[] | 是   | 订阅关系列表 |

Subscription:

| 参数          | 类型   | 必填 | 说明 |
| :------------ | :----- | :--- | :-- |
| template_id   | string | 是   | 模版 id |
| subscription_type  | string | 是   | 订阅类型，目前只支持 `once`（一次性订阅）|

上报模板消息卡片点击事件，只需要在 `app.js` 的 `onShow` 中做一个埋点，其他的事情由 SDK 自动完成。

**示例代码**

```js
wx.requestSubscribeMessage({
  tmplIds: [this.data.id],
  success: (res) => {
    let subscription = []
    if (res[this.data.id] === 'accept') {
      subscription.push({
        template_id: this.data.id,
        subscription_type: 'once',
      })
    }
    app.BaaS.subscribeMessage({subscription}).then(res => {
      // success
    }, err => {
      // fail
    })
  },
})
```

**返回示例**
```JSON
{
  "statusCode": 201,
  "data": {
    "status": "ok"
  }
}
```
