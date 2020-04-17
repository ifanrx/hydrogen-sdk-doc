<!-- ex_nonav -->

# 获取可用 formId 数量

用于提示即将用完 formid 的用户返回小程序继续填充 formid，以保证可以收到模板消息通知（如下单提醒）

{% if platform == 'wechat' %}
`BaaS.getTemplateMsgTicketCount({userID, submissionType})`
{% elif platform == 'alipay' %}
`BaaS.alipay.getTemplateMsgTicketCount({userID, submissionType})`
{% elif platform == 'baidu' %}
`BaaS.baidu.getTemplateMsgTicketCount({userID, submissionType})`
{% elif platform == 'bytedance' %}
`BaaS.bytedance.getTemplateMsgTicketCount({userID, submissionType})`

> **info**
> SDK >= 3.7
{% else %}
`BaaS.qq.getTemplateMsgTicketCount({userID, submissionType})`
{% endif %}

{% if platform == 'bytedance' %}

**参数说明**

| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| userID  | Integer | 否   | 用户 ID (对应 _userprofile 表中的 id 字段)  |
| submissionType | String | 否   | 提交场景，暂时只支持 `form_id` |

{% else %}

| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| userID  | Integer | 否   | 用户 ID (对应 _userprofile 表中的 id 字段)  |
| submissionType | String | 否   | 提交场景 `form_id` 或者 {% if platform == 'wechat' %}`prepay_id`{% elif platform == 'baidu' %}`order_id`{% else %}`trade_no`{% endif %}|

{% endif %}


**请求示例**


{% if platform == 'wechat' %}
```js
BaaS.getTemplateMsgTicketCount({
  userID: 12345,
  submissionType: "form_id",
}).then(num => {
  // success
  console.log(num)  // 10
}).catch(e => {
  // err
})
```
{% elif platform == 'alipay' %}
```js
BaaS.alipay.getTemplateMsgTicketCount({
  userID: 12345,
  submissionType: "form_id",
}).then(num => {
  // success
  console.log(num)  // 10
}).catch(e => {
  // err
})
```
{% elif platform == 'baidu' %}
```js
BaaS.baidu.getTemplateMsgTicketCount({
  userID: 12345,
  submissionType: "form_id",
}).then(num => {
  // success
  console.log(num)  // 10
}).catch(e => {
  // err
})
```
{% elif platform == 'bytedance' %}
```js
BaaS.bytedance.getTemplateMsgTicketCount({
  userID: 12345,
  submissionType: "form_id",
}).then(num => {
  // success
  console.log(num)  // 10
}).catch(e => {
  // err
})
```
{% else %}
```js
BaaS.qq.getTemplateMsgTicketCount({
  userID: 12345,
  submissionType: "form_id",
}).then(num => {
  // success
  console.log(num)  // 10
}).catch(e => {
  // err
})
```
{% endif %}


**返回示例**
```js
10
```
