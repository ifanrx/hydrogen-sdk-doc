# 微信加密数据解密

> **info**
> SDK >= 3.15.0

当调用微信小程序接口获取敏感信息时，返回的数据往往是经过加密的，开发者如需获取这些敏感数据，需要对接口返回的加密数据进行对称解密。

`BaaS.wechat.decryptData({encryptedData, iv, type, userID})`

**参数说明**

| 参数          | 类型    | 必填 | 说明                                                         |
| :------------ | :------ | :--- | :----------------------------------------------------------- |
| encryptedData | String  | Y    | 加密的数据，可通过 wx.getWeRunData 等微信 api 返回获取。     |
| iv            | String  | Y    | 加密算法的初始向量，可通过 wx.getWeRunData 等微信 api 返回获取 |
| type          | String  | Y    | 数据类型，现支持 'we-run-data', 'phone-number', 'open-gid'   |
| userID        | Integer | Y    | 用户ID                                                       |

当前支持解密的数据包括：

- 通过调用 [`wx.getWeRunData`](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/werun/wx.getWeRunData.html) 获取到的微信用户的微信运动步数，此时设置 type = 'we-run-data'
- 通过设置 button 的 open-type 为 [`getPhoneNumber`](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html) 获取到的微信用户绑定的手机号，此时设置 type = 'phone-number'
- 通过调用 [`wx.getShareInfo`](https://developers.weixin.qq.com/miniprogram/dev/api/share/wx.getShareInfo.html) 获取到的转发详细信息，此时设置 type = 'open-gid'

> **danger**
> 该功能涉及到敏感数据接口使用，需前往 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/) 手动开启。

**请求示例**

对微信加密数据进行解密需要使用到本次登录的会话密钥（session_key），因此，在调用该接口前，最好先调用一下 `wx.checkSession` 检查一下 session_key 是否过期，如果过期的话，可以先调用 `wx.BaaS.auth.logout` 再调用 `wx.BaaS.auth.loginWithWechat` 接口进行重新登录。

```javascript
// 云函数部分
BaaS.useVersion("v3.15.0");
exports.main = async function (event, callback) {
  const res = await BaaS.wechat.decryptData({
    encryptedData: event.data.encryptedData,
    iv: event.data.iv,
    type: event.data.type,
    userID: event.request.user.id,
  });
  callback(null, res);
};
```

```javascript
// 微信小程序调用部分
wx.getWeRunData({
  success(res) {
    const { encryptedData, iv } = res;
    wx.checkSession({
      success: function () {
        wx.BaaS.invoke("decrypt_data", {
          encryptedData,
          iv,
          type: "we-run-data",
        }).then((res) => {
          console.log(res);
        });
      },
      fail: function () {
        wx.BaaS.auth.logout();
        wx.BaaS.auth.loginWithWechat();
      },
    });
  },
});
```

**返回示例**

```javascript
{
  data: {
    stepInfoList: [
      {step: 6267, timestamp: 1612195200},
      {step: 6420, timestamp: 1612281600},
      …
    ],
    watermark: {appid: "wx3b040d33346e1b21", timestamp: 1614845183}
  },
  headers: {connection: "close",…},
  status: 200,
  statusText: "OK"
}
```
