# 订阅消息

消息能力是小程序能力中的重要组成，我们为开发者提供了订阅消息能力，以便实现服务的闭环和更优的体验。
{% if apiPrefix == "wx." %}
请移步[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)了解微信订阅消息
{% else %}
请移步[这里](https://q.qq.com/wiki/develop/miniprogram/API/open_port/port_subscription.html)了解 QQ 订阅消息
{% endif %}

## 上报订阅状态

通过上报订阅状态，可以在发送时过滤掉无效用户，使发送更精准。

{% if apiPrefix == "wx." %}
`wx.BaaS.subscribeMessage(options)`
{% else %}
`qq.BaaS.subscribeMessage(options)`
{% endif %}

**参数说明**

options:

| 参数          | 类型   | 必填 | 说明 |
| :------------ | :----- | :--- | :-- |
| subscription | Subscription[] | 是   | 订阅关系列表 |

Subscription:

| 参数          | 类型   | 必填 | 说明 |
| :------------ | :----- | :--- | :-- |
| template_id   | string | 是   | 模版 id |
| subscription_type  | string | 是   | 订阅类型， `once`（一次性订阅），`permanent`（永久订阅）|

用户发生点击行为或者发起支付回调后，调起订阅消息界面，其他的事情由 SDK 自动完成。

**示例代码**

{% if apiPrefix == "wx." %}
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
    wx.BaaS.subscribeMessage({subscription}).then(res => {
      // success
    }, err => {
      // fail
    })
  },
})
```
{% else %}
```js
qq.subscribeAppMsg({
  tmplIds: [this.data.id],
  subscribe: true,
  success: (res) => {
    // 用户在真机上同意订阅消息后才上报订阅消息，否则订阅记录无效
    let subscription = []
    subscription.push({
      template_id: this.data.id,
      subscription_type: 'permanent',
    })
    qq.BaaS.subscribeMessage({subscription}).then(res => {
      // success
    }, err => {
      // fail
    })
  },
})
```
{% endif %}

**返回示例**
```JSON
{
  "statusCode": 201,
  "data": {
    "status": "ok"
  }
}
```
