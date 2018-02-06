<!-- ex_nonav -->

# 微信加密数据解密

> **danger**
> 以下操作仅适用于 SDK version >= v1.1.0

`wx.BaaS.wxDecryptData(encryptedData, iv, type)`

当调用微信小程序接口获取敏感信息时，返回的数据往往是经过加密的，开发者如需获取这些敏感数据，需要对接口返回的加密数据进行对称解密。

**注意**：该功能涉及到敏感数据接口使用，需前往 [知晓云管理后台-小程序设置页面-SDK 功能设置](https://cloud.minapp.com/admin/profile/) 手动开启。

当前支持解密的数据包括：
- 通过调用 [`wx.getWeRunData`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/we-run.html#wxgetwerundataobject) 获取到的微信用户的微信运动步数
- 通过设置 button 的 open-type 为 [`getPhoneNumber`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/getPhoneNumber.html) 获取到的微信用户绑定的手机号
- 通过调用 [`wx.getShareInfo`](https://mp.weixin.qq.com/debug/wxadoc/dev/api/share.html#wxgetshareinfoobject) 获取到的转发详细信息

**参数说明**

| 参数           | 类型    | 必填 | 说明 |
| :------------ | :------ | :-- | :-- |
| encryptedData | String  | Y   | 加密的数据 |
| iv            | String  | Y   | 加密算法的初始向量 |
| type          | String  | Y   | 数据类型，现支持 'we-run-data', 'phone-number', 'open-gid' |

- 当解密微信运动步数时，type = 'we-run-data'
- 当解密手机号时，type = 'phone-number'
- 当解密转发详细信息时，type = 'open-gid'


**请求示例**

```js
wx.getWeRunData({
  success(res) {
    wx.BaaS.wxDecryptData(res.encryptedData, res.iv, 'we-run-data').then((decrytedData) =>  {
      console.log('decrytedData: ', decrytedData)
    }, (err) => {
      // 失败的原因有可能是以下几种：用户未登录或 session_key 过期，微信解密插件未开启，提交的解密信息有误
    })
  }
})
```
