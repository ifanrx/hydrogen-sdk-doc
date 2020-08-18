# 订阅消息

消息能力是小程序能力中的重要组成，我们为开发者提供了订阅消息能力，以便实现服务的闭环和更优的体验。
请移步[这里](https://q.qq.com/wiki/develop/game/API/open-port/port_subscription.html)了解 QQ 小程序消息订阅

## 上报订阅状态

通过上报订阅状态，可以在发送时过滤掉无效用户，使发送更精准。

`qq.BaaS.subscribeMessage(options)`

**参数说明**

options:

| 参数          | 类型   | 必填 | 说明 |
| :------------ | :----- | :--- | :-- |
| subscription | Subscription[] | 是   | 订阅关系列表 |

Subscription:

| 参数          | 类型   | 必填 | 说明 |
| :------------ | :----- | :--- | :-- |
| template_id   | string | 是   | 模版 id，永久订阅则无需上传 |
| subscription_type  | string | 是   | 订阅类型， `once`（一次性订阅），`permanent`（永久订阅）|

用户发生点击行为或者发起支付回调后，调起订阅消息界面，其他的事情由 SDK 自动完成。

> **info**
> 永久订阅消息订阅后，一位用户 1 天内最多收到 1 次订阅消息。

**示例代码**

```js
// 一次性订阅
const subscription = tmplIds.map(template_id => ({
  template_id,
  subscription_type: 'once',
}))

// 永久订阅
const subscription = [{subscription_type: 'permanent'}]

qq.subscribeAppMsg({
  tmplIds: [this.data.id], // 一次性订阅需要上传模版 id，永久订阅则无需上传
  subscribe: true,
  success: (res) => {
    qq.BaaS.subscribeMessage({subscription}).then(res => {
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
