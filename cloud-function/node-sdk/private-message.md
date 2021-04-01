# 微信小程序私密消息

小程序私密消息功能是这样一种能力：当分享者分享小程序卡片给其他用户或者微信群后，其他用户点击此小程序卡片时，开发者可以鉴别出点击卡片的用户是否被分享者分享过小程序卡片。具体使用说明和步骤可以参考[微信小程序私密消息文档](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share/private-message.html)。

> **info**
> SDK version >= 3.17.0

## 创建私密消息的 activity_id

`BaaS.wechat.createActivityID(options)`

**参数说明**

options 是对象类型,包含以下参数:

| 参数    | 类型   | 必填 | 说明                                                         |
| ------- | ------ | ---- | ------------------------------------------------------------ |
| unionid | String | N    | 用户的 unionid，指定分享者为 unionid 用户。其余用户不能用此 activity_id 分享私密消息。openid 与 unionid 填一个即可。 |
| openid  | String | N    | 用户的 openid，指定分享者为 openid 用户。其余用户不能用此 activity_id 分享私密消息。openid 与 unionid 填一个即可。 |

**返回字段说明**

| 属性            | 类型   | 说明                                         |
| --------------- | ------ | -------------------------------------------- |
| activity_id     | String | 消息的 ID                                    |
| expiration_time | Number | activity_id 的过期时间戳。默认 24 小时后过期 |
| errcode         | Number | 错误码                                       |

**返回示例**

```JSON
{
  "activity_id": "",
  "expiration_time": "",
  "errcode": ""
}
```

**示例代码**

```js
exports.main = async function (event) {
  return await BaaS.wechat.createActivityID({
    unionid: "******",
  });
};
```
