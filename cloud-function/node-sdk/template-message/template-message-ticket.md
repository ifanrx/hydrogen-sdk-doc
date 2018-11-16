<!-- ex_nonav -->

# 获取可用 formId 数量

用于提示即将用完 formid 的用户返回小程序继续填充 formid，以保证可以收到模板消息通知（如下单提醒）

`BaaS.getTemplateMsgTicketCount({userID, submissionType})`

**参数说明**

| 参数            | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| userID  | Integer | 否   | 用户 ID (对应 _userprofile 表中的 id 字段)  |
| submissionType | String | 否   | 提交场景 `form_id` 或者 `prepay_id` |


**请求示例**

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


**返回示例**
```js
10
```
