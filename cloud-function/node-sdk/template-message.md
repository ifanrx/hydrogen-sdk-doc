<!-- ex_nonav -->

# 发送模板消息

`BaaS.sendTemplateMessage(data)`

**参数说明**

data 是 Object 类型，它包括以下几个属性

| 参数             | 类型   | 必填  | 说明 |
| :-------------- | :----- | :--- | :-- |
| user_id         | Number | 是   | 用户 ID |
| template_id     | String | 是   | 模板 ID |
| submission_type | String | 是   | 模板消息触发条件，`form_id` 或者 `prepay_id` |
| keywords        | Object | 是   | 关键字（在微信小程序后台配置）|

**请求示例**

```js
let data = {
  user_id: 23425,
  template_id: "tadfDf23asdi8dfd",
  submission_type: "form_id",
  keywords: {
    keyword1: {
      value: "书籍",
      color: "#173177"  // 可为空
    }
    keyword2: {
      value: "50.5",
      color: "#173177"  // 可为空
    }
  }
}

BaaS.sendTemplateMessage(data).then(res => {
  // 发送成功
}, err => {
  // 发送失败
})
```

其中 keyword1, keyword2 为微信后台中实际关键词对应的键值

![关键词对应键值示例](/images/cloud-function/keyword.png)


> **info**
> 如果 `submission_type = 'form_id'`，请确保在调用 `BaaS.sendTemplateMessage` 前，已在小程序端调用 `wx.BaaS.wxReportTicker`上报模版消息所需的 `formid`