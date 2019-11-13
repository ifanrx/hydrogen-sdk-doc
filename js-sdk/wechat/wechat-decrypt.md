<!-- ex_nonav -->

# 微信加密数据解密

当调用微信小程序接口获取敏感信息时，返回的数据往往是经过加密的，开发者如需获取这些敏感数据，需要对接口返回的加密数据进行对称解密。

`wx.BaaS.wxDecryptData(encryptedData, iv, type)`

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------ | :------ | :-- | :-- |
| encryptedData | String  | Y   | 加密的数据 |
| iv            | String  | Y   | 加密算法的初始向量 |
| type          | String  | Y   | 数据类型，现支持 'we-run-data', 'phone-number', 'open-gid' |

当前支持解密的数据包括：
- 通过调用 [`wx.getWeRunData`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/we-run.html#wxgetwerundataobject) 获取到的微信用户的微信运动步数，此时设置 type = 'we-run-data'
- 通过设置 button 的 open-type 为 [`getPhoneNumber`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html) 获取到的微信用户绑定的手机号，，此时设置 type = 'phone-number'
- 通过调用 [`wx.getShareInfo`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxgetshareinfoobject) 获取到的转发详细信息，此时设置 type = 'open-gid'

> **danger**
> 该功能涉及到敏感数据接口使用，需前往 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/dashboard/#/app/[[app_id | addSlashPostfixIfNotEmpty]]settings/sdk/) 手动开启。

**请求示例**

对微信加密数据进行解密需要使用到本次登录的会话密钥（session_key），因此，在调用该接口前，最好先调用一下 `wx.checkSession` 检查一下 session_key 是否过期，如果过期的话，可以先调用 `wx.BaaS.logout` 再调用 `wx.BaaS.login` 接口进行重新登录。

```
wx.getWeRunData({
  success(res) {
    wx.checkSession({
      success: function() {
        wx.BaaS.wxDecryptData(res.encryptedData, res.iv, 'we-run-data').then(decrytedData =>  {
          console.log('decrytedData: ', decrytedData)
        }, err => {
          // HError 对象
          // 失败的原因有可能是以下几种：用户未登录或 session_key 过期，微信解密插件未开启，提交的解密信息有误
        })
      },
      fail: function() {
        wx.BaaS.logout()
        wx.BaaS.login()
      }
    })
  }
})
```

HError 对象结构请参考[错误码和 HError 对象](./error-code.md)
