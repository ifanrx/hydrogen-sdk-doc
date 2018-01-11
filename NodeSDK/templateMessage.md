# 发送模板消息

`BaaS.sendTemplateMessage(data)`

##### 参数说明

data 是 Object 类型，它包括以下几个属性
|      参数名      |  类型   |  必填  |    描述   |
| :-------------: | :----: | :----: | :------: |
|     user_id     | Number |   是   |  用户 ID  |
|   template_id   | String |   是   |  模板 ID  |
| submission_type | String |   是   |   标题    |
|    keywords     | Object |   是   |   关键字  |

##### 请求示例

```
let data = 	{
	user_id: 23425,
  template_id: "tadfDf23asdi8dfd",
  submission_type: "email title",
  keywords: {
    keyword1: {
      value: 124sdfaf",
      color: "#173177"  // 可为空
    }
    keyword2: {
      value: "qgfq4erg",
      color: "#173177"  // 可为空
    }
  }
}

BaaS.sendTemplateMessage(data).then(res => {

})
```