<!-- ex_nonav -->

{% if platform == 'wechat' %}
# 获取微信订阅消息可用订阅记录数量（SDK >= v3.3）
{% else %}
# 获取 QQ 订阅消息可用订阅记录数量（SDK >= v3.10）
{% endif %}

用于检查订阅消息模版的订阅记录数量，以保证用户可以收到订阅消息通知（如下单提醒）

{% if platform == 'wechat' %}
`BaaS.wechat.getSubscribeMsgTicketCount(options)`
{% else %}
`BaaS.qq.getSubscribeMsgTicketCount(options)`
{% endif %}

**参数说明**

options（类型：Object），属性说明：

| 属性             | 类型    | 必填  | 说明 |
| :--------------- | :------ | :---- | :-- |
| userID           | Integer | 否    | 用户 ID (对应 _userprofile 表中的 id 字段)  |
| subscriptionType | String  | 否    | 订阅类型，目前只支持 `once`（一次性订阅）|
| templateID       | String  | 否    | 订阅消息模版 id |

**请求示例**

{% if platform == 'wechat' %}
```js
BaaS.useVersion('v3.3')
exports.main = async function(event) {
  return await BaaS.wechat.getSubscribeMsgTicketCount({
    userID: "...",
    templateID: "...",
    subscriptionType: "once",
  })
}
```
{% else %}
```js
BaaS.useVersion('v3.3')
exports.main = async function(event) {
  return await BaaS.qq.getSubscribeMsgTicketCount({
    userID: "...",
    templateID: "...",
    subscriptionType: "once",
  })
}
```
{% endif %}

**返回示例**
```js
{
  "error": {},
  "code": 0,
  "data": 10
}
```
