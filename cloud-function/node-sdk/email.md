<!-- ex_nonav -->

# 发送邮件

SDK支持向用户提供的邮箱发送邮件的功能，以便用户在找回密码、绑定邮箱的一些场景使用

`BaaS.sendEmail(data)`

**参数说明**

data 是 Object 类型，它包括以下几个属性

|   参数名   |  类型   |  必填  |    描述   |
| :-------: | :----: | :----: | :------: |
| recipient | String |   是   | 收件人邮箱 |
|  subject  | String |   是   |  邮件标题  |
|    body   | String |   是   |  邮件内容  |

**请求示例**

```js
let data = {
  recipient: "aa@bb.com",
  subject: "email title",
  body: "email body"
}

BaaS.sendEmail(data).then(res => {
  // 发送成功
}, err => {
  // 发送失败
  console.log(err)
})
```