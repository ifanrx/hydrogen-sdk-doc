<!-- ex_nonav -->

# 获取微信订阅消息可用订阅记录数量（SDK >= v3.3）

用于检查订阅消息模版的订阅记录数量，以保证用户可以收到订阅消息通知（如下单提醒）

`BaaS.wechat.getSubscribeMsgTicketCount(options)`

**参数说明**

options（类型：Object），属性说明：

| 属性             | 类型    | 必填  | 说明 |
| :--------------- | :------ | :---- | :-- |
| userID           | Integer | 否    | 用户 ID (对应 _userprofile 表中的 id 字段)  |
| subscriptionType | String  | 否    | 订阅类型，目前只支持 `once`（一次性订阅）|
| templateID       | String  | 否    | 订阅消息模版 id |

**请求示例**

```js
const count = await BaaS.wechat.getSubscribeMsgTicketCount({
  userID: "...",
  templateID: "...",
  subscriptionType: "once",
})
```


**返回示例**
```js
10
```
