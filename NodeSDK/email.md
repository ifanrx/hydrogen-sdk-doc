# 发送邮件

`BaaS.sendEmail(data)`

##### 参数说明

data 是 Object 类型，它包括以下几个属性
|   参数名   |  类型   |  必填  |    描述   |
| :-------: | :----: | :----: | :------: |
| recipient | String |   是   | 收件人邮箱 |
|  subject  | String |   是   |  邮件标题  |
|    body   | String |   是   |  邮件内容  |

##### 请求示例

```
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